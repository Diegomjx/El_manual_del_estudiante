class MessageLink extends go.Link {
    constructor() {
      super();
      this.time = 0;  // use this "time" value when this is the temporaryLink
    }
  
    getLinkPoint(node, port, spot, from, ortho, othernode, otherport) {
      const p = port.getDocumentPoint(go.Spot.Center);
      const r = port.getDocumentBounds();
      const op = otherport.getDocumentPoint(go.Spot.Center);
  
      const data = this.data;
      const time = data !== null ? data.time : this.time;  // if not bound, assume this has its own "time" property
  
      const aw = this.findActivityWidth(node, time);
      const x = (op.x > p.x ? p.x + aw / 2 : p.x - aw / 2);
      const y = convertTimeToY(time);
      return new go.Point(x, y);
    }
  
    findActivityWidth(node, time) {
      let aw = 10;
      if (node instanceof go.Group) {
        // see if there is an Activity Node at this point -- if not, connect the link directly with the Group's lifeline
        if (!node.memberParts.any(mem => {
          const act = mem.data;
          return (act !== null && act.start <= time && time <= act.start + act.duration);
        })) {
          aw = 0;
        }
      }
      return aw;
    }
  
    getLinkDirection(node, port, linkpoint, spot, from, ortho, othernode, otherport) {
      const p = port.getDocumentPoint(go.Spot.Center);
      const op = otherport.getDocumentPoint(go.Spot.Center);
      const right = op.x > p.x;
      return right ? 0 : 180;
    }
  
    computePoints() {
      if (this.fromNode === this.toNode) {  // also handle a reflexive link as a simple orthogonal loop
        const data = this.data;
        const time = data !== null ? data.time : this.time;  // if not bound, assume this has its own "time" property
        const p = this.fromNode.port.getDocumentPoint(go.Spot.Center);
        const aw = this.findActivityWidth(this.fromNode, time);
  
        const x = p.x + aw / 2;
        const y = convertTimeToY(time);
        this.clearPoints();
        this.addPoint(new go.Point(x, y));
        this.addPoint(new go.Point(x + 50, y));
        this.addPoint(new go.Point(x + 50, y + 5));
        this.addPoint(new go.Point(x, y + 5));
        return true;
      } else {
        return super.computePoints();
      }
    }
  }
  // end MessageLink
  
// A custom LinkingTool that fixes the "time" (i.e. the Y coordinate)
// for both the temporaryLink and the actual newly created Link
class MessagingTool extends go.LinkingTool {
    constructor() {
      super();
  
      // Since 2.2 you can also author concise templates with method chaining instead of GraphObject.make
      // For details, see https://gojs.net/latest/intro/buildingObjects.html
      const $ = go.GraphObject.make;
      this.temporaryLink =
        $(MessageLink,
          $(go.Shape, "Rectangle",
            { stroke: "magenta", strokeWidth: 2 }),
          $(go.Shape,
            { toArrow: "OpenTriangle", stroke: "magenta" }));
    }
  
    doActivate() {
      super.doActivate();
      const time = convertYToTime(this.diagram.firstInput.documentPoint.y);
      this.temporaryLink.time = Math.ceil(time);  // round up to an integer value
    }
  
    insertLink(fromnode, fromport, tonode, toport) {
      const newlink = super.insertLink(fromnode, fromport, tonode, toport);
      if (newlink !== null) {
        const model = this.diagram.model;
        // specify the time of the message
        const start = this.temporaryLink.time;
        const duration = 1;
        newlink.data.time = start;
        model.setDataProperty(newlink.data, "text", "msg");
        // and create a new Activity node data in the "to" group data
        const newact = {
          group: newlink.data.to,
          start: start,
          duration: duration
        };
        model.addNodeData(newact);
        // now make sure all Lifelines are long enough
        ensureLifelineHeights();
      }
      return newlink;
    }
  }
  // end MessagingTool

// A custom DraggingTool that supports dragging any number of MessageLinks up and down --
// changing their data.time value.
class MessageDraggingTool extends go.DraggingTool {
    // override the standard behavior to include all selected Links,
    // even if not connected with any selected Nodes
    computeEffectiveCollection(parts, options) {
      const result = super.computeEffectiveCollection(parts, options);
      // add a dummy Node so that the user can select only Links and move them all
      result.add(new go.Node(), new go.DraggingInfo(new go.Point()));
      // normally this method removes any links not connected to selected nodes;
      // we have to add them back so that they are included in the "parts" argument to moveParts
      parts.each(part => {
        if (part instanceof go.Link) {
          result.add(part, new go.DraggingInfo(part.getPoint(0).copy()));
        }
      })
      return result;
    }
  
    // override to allow dragging when the selection only includes Links
    mayMove() {
      return !this.diagram.isReadOnly && this.diagram.allowMove;
    }
  
    // override to move Links (which are all assumed to be MessageLinks) by
    // updating their Link.data.time property so that their link routes will
    // have the correct vertical position
    moveParts(parts, offset, check) {
      super.moveParts(parts, offset, check);
      const it = parts.iterator;
      while (it.next()) {
        if (it.key instanceof go.Link) {
          const link = it.key;
          const startY = it.value.point.y;  // DraggingInfo.point.y
          let y = startY + offset.y;  // determine new Y coordinate value for this link
          const cellY = this.gridSnapCellSize.height;
          y = Math.round(y / cellY) * cellY;  // snap to multiple of gridSnapCellSize.height
          const t = Math.max(0, convertYToTime(y));
          link.diagram.model.set(link.data, "time", t);
          link.invalidateRoute();
        }
      }
    }
  }
  // end MessageDraggingTool
    
function init() {

    // Since 2.2 you can also author concise templates with method chaining instead of GraphObject.make
    // For details, see https://gojs.net/latest/intro/buildingObjects.html
    const $ = go.GraphObject.make;

    myDiagram =
      $(go.Diagram, "myDiagramDiv",
        {
          // when the user drags a node, also move/copy/delete the whole subtree starting with that node
          "commandHandler.copiesTree": true,
          "commandHandler.copiesParentKey": true,
          "commandHandler.deletesTree": true,
          "draggingTool.dragsTree": true,
          "undoManager.isEnabled": true
        });

    // when the document is modified, add a "*" to the title and enable the "Save" button
    myDiagram.addDiagramListener("Modified", e => {
      var button = document.getElementById("SaveButton");
      if (button) button.disabled = !myDiagram.isModified;
      var idx = document.title.indexOf("*");
      if (myDiagram.isModified) {
        if (idx < 0) document.title += "*";
      } else {
        if (idx >= 0) document.title = document.title.slice(0, idx);
      }
    });

    // a node consists of some text with a line shape underneath
    myDiagram.nodeTemplate =
      $(go.Node, "Vertical",
        { selectionObjectName: "TEXT" },
        $(go.TextBlock,
          {
            name: "TEXT",
            minSize: new go.Size(30, 15),
            editable: true
          },
          // remember not only the text string but the scale and the font in the node data
          new go.Binding("text", "text").makeTwoWay(),
          new go.Binding("scale", "scale").makeTwoWay(),
          new go.Binding("font", "font").makeTwoWay()),
        $(go.Shape, "LineH",
          {
            stretch: go.GraphObject.Horizontal,
            strokeWidth: 3, height: 3,
            // this line shape is the port -- what links connect with
            portId: "", fromSpot: go.Spot.LeftRightSides, toSpot: go.Spot.LeftRightSides
          },
          new go.Binding("stroke", "brush"),
          // make sure links come in from the proper direction and go out appropriately
          new go.Binding("fromSpot", "dir", d => spotConverter(d, true)),
          new go.Binding("toSpot", "dir", d => spotConverter(d, false))),
        // remember the locations of each node in the node data
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        // make sure text "grows" in the desired direction
        new go.Binding("locationSpot", "dir", d => spotConverter(d, false))
      );

    // selected nodes show a button for adding children
    myDiagram.nodeTemplate.selectionAdornmentTemplate =
      $(go.Adornment, "Spot",
        $(go.Panel, "Auto",
          // this Adornment has a rectangular blue Shape around the selected node
          $(go.Shape, { fill: null, stroke: "dodgerblue", strokeWidth: 3 }),
          $(go.Placeholder, { margin: new go.Margin(4, 4, 0, 4) })
        ),
        // and this Adornment has a Button to the right of the selected node
        $("Button",
          {
            alignment: go.Spot.Right,
            alignmentFocus: go.Spot.Left,
            click: addNodeAndLink  // define click behavior for this Button in the Adornment
          },
          $(go.TextBlock, "+",  // the Button content
            { font: "bold 8pt sans-serif" })
        )
      );

    // the context menu allows users to change the font size and weight,
    // and to perform a limited tree layout starting at that node
    myDiagram.nodeTemplate.contextMenu =
      $("ContextMenu",
        $("ContextMenuButton",
          $(go.TextBlock, "Bigger"),
          { click: (e, obj) => changeTextSize(obj, 1.1) }),
        $("ContextMenuButton",
          $(go.TextBlock, "Smaller"),
          { click: (e, obj) => changeTextSize(obj, 1 / 1.1) }),
        $("ContextMenuButton",
          $(go.TextBlock, "Bold/Normal"),
          { click: (e, obj) => toggleTextWeight(obj) }),
        $("ContextMenuButton",
          $(go.TextBlock, "Copy"),
          { click: (e, obj) => e.diagram.commandHandler.copySelection() }),
        $("ContextMenuButton",
          $(go.TextBlock, "Delete"),
          { click: (e, obj) => e.diagram.commandHandler.deleteSelection() }),
        $("ContextMenuButton",
          $(go.TextBlock, "Undo"),
          { click: (e, obj) => e.diagram.commandHandler.undo() }),
        $("ContextMenuButton",
          $(go.TextBlock, "Redo"),
          { click: (e, obj) => e.diagram.commandHandler.redo() }),
        $("ContextMenuButton",
          $(go.TextBlock, "Layout"),
          {
            click: (e, obj) => {
              var adorn = obj.part;
              adorn.diagram.startTransaction("Subtree Layout");
              layoutTree(adorn.adornedPart);
              adorn.diagram.commitTransaction("Subtree Layout");
            }
          }
        )
      );

    // a link is just a Bezier-curved line of the same color as the node to which it is connected
    myDiagram.linkTemplate =
      $(go.Link,
        {
          curve: go.Link.Bezier,
          fromShortLength: -2,
          toShortLength: -2,
          selectable: false
        },
        $(go.Shape,
          { strokeWidth: 3 },
          new go.Binding("stroke", "toNode", n => {
            if (n.data.brush) return n.data.brush;
            var colour_new = generateRandomColor();
            n.data.brush = colour_new;
            return colour_new;
          }).ofObject())
      );

    // the Diagram's context menu just displays commands for general functionality
    myDiagram.contextMenu =
      $("ContextMenu",
        $("ContextMenuButton",
          $(go.TextBlock, "Paste"),
          { click: (e, obj) => e.diagram.commandHandler.pasteSelection(e.diagram.toolManager.contextMenuTool.mouseDownPoint) },
          new go.Binding("visible", "", o => o.diagram && o.diagram.commandHandler.canPasteSelection(o.diagram.toolManager.contextMenuTool.mouseDownPoint)).ofObject()),
        $("ContextMenuButton",
          $(go.TextBlock, "Undo"),
          { click: (e, obj) => e.diagram.commandHandler.undo() },
          new go.Binding("visible", "", o => o.diagram && o.diagram.commandHandler.canUndo()).ofObject()),
        $("ContextMenuButton",
          $(go.TextBlock, "Redo"),
          { click: (e, obj) => e.diagram.commandHandler.redo() },
          new go.Binding("visible", "", o => o.diagram && o.diagram.commandHandler.canRedo()).ofObject()),
        $("ContextMenuButton",
          $(go.TextBlock, "Save"),
          { click: (e, obj) => save() }),
        $("ContextMenuButton",
          $(go.TextBlock, "Load"),
          { click: (e, obj) => load() })
      );

    myDiagram.addDiagramListener("SelectionMoved", e => {
      var rootX = myDiagram.findNodeForKey(0).location.x;
      myDiagram.selection.each(node => {
        if (node.data.parent !== 0) return; // Only consider nodes connected to the root
        var nodeX = node.location.x;
        if (rootX < nodeX && node.data.dir !== "right") {
          updateNodeDirection(node, "right");
        } else if (rootX > nodeX && node.data.dir !== "left") {
          updateNodeDirection(node, "left");
        }
        layoutTree(node);
      });
    });

    // read in the predefined graph using the JSON format data held in the "mySavedModel" textarea
    load();
  }

  function spotConverter(dir, from) {
    if (dir === "left") {
      return (from ? go.Spot.Left : go.Spot.Right);
    } else {
      return (from ? go.Spot.Right : go.Spot.Left);
    }
  }

  function changeTextSize(obj, factor) {
    var adorn = obj.part;
    adorn.diagram.startTransaction("Change Text Size");
    var node = adorn.adornedPart;
    var tb = node.findObject("TEXT");
    tb.scale *= factor;
    adorn.diagram.commitTransaction("Change Text Size");
  }

  function toggleTextWeight(obj) {
    var adorn = obj.part;
    adorn.diagram.startTransaction("Change Text Weight");
    var node = adorn.adornedPart;
    var tb = node.findObject("TEXT");
    // assume "bold" is at the start of the font specifier
    var idx = tb.font.indexOf("bold");
    if (idx < 0) {
      tb.font = "bold " + tb.font;
    } else {
      tb.font = tb.font.slice(idx + 5);
    }
    adorn.diagram.commitTransaction("Change Text Weight");
  }

  function updateNodeDirection(node, dir) {
    myDiagram.model.setDataProperty(node.data, "dir", dir);
    // recursively update the direction of the child nodes
    var chl = node.findTreeChildrenNodes(); // gives us an iterator of the child nodes related to this particular node
    while (chl.next()) {
      updateNodeDirection(chl.value, dir);
    }
  }

  function addNodeAndLink(e, obj) {
    var adorn = obj.part;
    var diagram = adorn.diagram;
    diagram.startTransaction("Add Node");
    var oldnode = adorn.adornedPart;
    var olddata = oldnode.data;
    // copy the brush and direction to the new node data
    var newdata = { text: "idea", brush: olddata.brush, dir: olddata.dir, parent: olddata.key };
    diagram.model.addNodeData(newdata);
    layoutTree(oldnode);
    diagram.commitTransaction("Add Node");

    // if the new node is off-screen, scroll the diagram to show the new node
    var newnode = diagram.findNodeForData(newdata);
    if (newnode !== null) diagram.scrollToRect(newnode.actualBounds);
  }

  function layoutTree(node) {
    if (node.data.key === 0) {  // adding to the root?
      layoutAll();  // lay out everything
    } else {  // otherwise lay out only the subtree starting at this parent node
      var parts = node.findTreeParts();
      layoutAngle(parts, node.data.dir === "left" ? 180 : 0);
    }
  }

  function layoutAngle(parts, angle) {
    var layout = go.GraphObject.make(go.TreeLayout,
      {
        angle: angle,
        arrangement: go.TreeLayout.ArrangementFixedRoots,
        nodeSpacing: 5,
        layerSpacing: 20,
        setsPortSpot: false, // don't set port spots since we're managing them with our spotConverter function
        setsChildPortSpot: false
      });
    layout.doLayout(parts);
  }

  function layoutAll() {
    var root = myDiagram.findNodeForKey(0);
    if (root === null) return;
    myDiagram.startTransaction("Layout");
    // split the nodes and links into two collections
    var rightward = new go.Set(/*go.Part*/);
    var leftward = new go.Set(/*go.Part*/);
    root.findLinksConnected().each(link => {
      var child = link.toNode;
      if (child.data.dir === "left") {
        leftward.add(root);  // the root node is in both collections
        leftward.add(link);
        leftward.addAll(child.findTreeParts());
      } else {
        rightward.add(root);  // the root node is in both collections
        rightward.add(link);
        rightward.addAll(child.findTreeParts());
      }
    });
    // do one layout and then the other without moving the shared root node
    layoutAngle(rightward, 0);
    layoutAngle(leftward, 180);
    myDiagram.commitTransaction("Layout");
  }

  // Show the diagram's model in JSON format
  function save() {
  overlay = document.getElementById('overlay'),
  popup = document.getElementById('popup'),
  overlay.classList.add('active');
  popup.classList.add('active');

    document.getElementById("mySavedModel").value = myDiagram.model.toJson();
    myDiagram.isModified = false;
  }
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function load() {
    await sleep(300);
    myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
  }

  function loadNewMap(){
    const default_json ={ "class": "TreeModel",
    "nodeDataArray": [{"key":0,"text":"Nuevo Mapa","loc":"0 0"}]}

    myDiagram.model = go.Model.fromJson(default_json);
  }

  function printDiagram() {
    var svgWindow = window.open();
    if (!svgWindow) return;  // failure to open a new Window
    var printSize = new go.Size(1080, 1920);
    var bnds = myDiagram.documentBounds;
    var x = bnds.x;
    var y = bnds.y;
    while (y < bnds.bottom) {
      while (x < bnds.right) {
        var svg = myDiagram.makeSvg({ scale: 1.0, position: new go.Point(x, y), size: printSize });
        svgWindow.document.body.appendChild(svg);
        x += printSize.width;
      }
      x = bnds.x;
      y += printSize.height;
    }
    setTimeout(() => svgWindow.print(), 1);
  }

  function saveSvg() {
    var svgWindow = window.open();
    if (!svgWindow) return;  // failure to open a new Window
    var name = 'untitiled'
    var printSize = new go.Size(1080, 1920);
    var bnds = myDiagram.documentBounds;
    var x = bnds.x;
    var y = bnds.y;
    while (y < bnds.bottom) {
      while (x < bnds.right) {
        var svg = myDiagram.makeSvg({ scale: 1.0, position: new go.Point(x, y), size: printSize });
        svgWindow.document.body.appendChild(svg);
        x += printSize.width;
      }
      x = bnds.x;
      y += printSize.height;
    }

    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    var svgData = svg.outerHTML;
    var preface = '<?xml version="1.0" standalone="no"?>\r\n';
    var svgBlob = new Blob([preface, svgData], {type:"image/svg+xml;charset=utf-8"});
    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = name;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

function generateRandomColor(){
  let maxVal = 0xFFFFFF; // 16777215
  let randomNumber = Math.random() * maxVal; 
  randomNumber = Math.floor(randomNumber);
  randomNumber = randomNumber.toString(16);
  let randColor = randomNumber.padStart(6, 0);   
  return `#${randColor.toUpperCase()}`
}

function changeColour(){

}

  init();
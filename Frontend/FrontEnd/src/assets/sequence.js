function init() {

    // Since 2.2 you can also author concise templates with method chaining instead of GraphObject.make
    // For details, see https://gojs.net/latest/intro/buildingObjects.html
    const $ = go.GraphObject.make;

    myDiagram =
      $(go.Diagram, "myDiagramDiv", // must be the ID or reference to an HTML DIV
        {
          allowCopy: false,
          linkingTool: $(MessagingTool),  // defined below
          "resizingTool.isGridSnapEnabled": true,
          draggingTool: $(MessageDraggingTool),  // defined below
          "draggingTool.gridSnapCellSize": new go.Size(1, 20 / 4),
          "draggingTool.isGridSnapEnabled": true,
          // automatically extend Lifelines as Activities are moved or resized
          "SelectionMoved": ensureLifelineHeights,
          "PartResized": ensureLifelineHeights,
          "undoManager.isEnabled": true
        });

    // when the document is modified, add a "*" to the title and enable the "Save" button
    myDiagram.addDiagramListener("Modified", e => {
      const button = document.getElementById("mySavedModel");
      if (button) button.disabled = !myDiagram.isModified;
      const idx = document.title.indexOf("*");
      if (myDiagram.isModified) {
        if (idx < 0) document.title += "*";
      } else {
        if (idx >= 0) document.title = document.title.slice(0, idx);
      }
    });

    // define the Lifeline Node template.
    myDiagram.groupTemplate =
      $(go.Group, "Vertical",
        {
          locationSpot: go.Spot.Bottom,
          locationObjectName: "HEADER",
          minLocation: new go.Point(0, 0),
          maxLocation: new go.Point(9999, 0),
          selectionObjectName: "HEADER"
        },
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Panel, "Auto",
          { name: "HEADER" },
          $(go.Shape, "Rectangle",
            {
              fill: $(go.Brush, "Linear", { 0: "#bbdefb", 1: go.Brush.darkenBy("#bbdefb", 0.1) }),
              stroke: null
            }),
          $(go.TextBlock,
            {
              margin: 5,
              font: "400 10pt Source Sans Pro, sans-serif",
              editable: true,
              wrap: go.TextBlock.WrapFit
            },
            new go.Binding("text", "text"))
        ),
        $(go.Shape,
          {
            figure: "LineV",
            fill: null,
            stroke: "gray",
            strokeDashArray: [3, 3],
            width: 1,
            alignment: go.Spot.Center,
            portId: "",
            fromLinkable: true,
            fromLinkableDuplicates: true,
            toLinkable: true,
            toLinkableDuplicates: true,
            cursor: "pointer"
          },
          new go.Binding("height", "duration", computeLifelineHeight))
      );

    // define the Activity Node template
    myDiagram.nodeTemplate =
      $(go.Node,
        {
          locationSpot: go.Spot.Top,
          locationObjectName: "SHAPE",
          minLocation: new go.Point(NaN, 20 - 5),
          maxLocation: new go.Point(NaN, 19999),
          selectionObjectName: "SHAPE",
          resizable: true,
          resizeObjectName: "SHAPE",
          resizeAdornmentTemplate:
            $(go.Adornment, "Spot",
              $(go.Placeholder),
              $(go.Shape,  // only a bottom resize handle
                {
                  alignment: go.Spot.Bottom, cursor: "col-resize",
                  desiredSize: new go.Size(6, 6), fill: "yellow"
                })
            )
        },
        new go.Binding("location", "", computeActivityLocation).makeTwoWay(backComputeActivityLocation),
        $(go.Shape, "Rectangle",
          {
            name: "SHAPE",
            fill: "white", stroke: "black",
            width: 10,
            // allow Activities to be resized down to 1/4 of a time unit
            minSize: new go.Size(10, computeActivityHeight(0.25))
          },
          new go.Binding("height", "duration", computeActivityHeight).makeTwoWay(backComputeActivityHeight))
      );

    // define the Message Link template.
    myDiagram.linkTemplate =
      $(MessageLink,  // defined below
        { selectionAdorned: true, curviness: 0 },
        $(go.Shape, "Rectangle",
          { stroke: "black" }),
        $(go.Shape,
          { toArrow: "OpenTriangle", stroke: "black" }),
        $(go.TextBlock,
          {
            font: "400 9pt Source Sans Pro, sans-serif",
            segmentIndex: 0,
            segmentOffset: new go.Point(NaN, NaN),
            isMultiline: false,
            editable: true
          },
          new go.Binding("text", "text").makeTwoWay())
      );

    // create the graph by reading the JSON data saved in "mySavedModel" textarea element
    load();
  }

  function ensureLifelineHeights(e) {
    // iterate over all Activities (ignore Groups)
    const arr = myDiagram.model.nodeDataArray;
    let max = -1;
    for (let i = 0; i < arr.length; i++) {
      const act = arr[i];
      if (act.isGroup) continue;
      max = Math.max(max, act.start + act.duration);
    }
    if (max > 0) {
      // now iterate over only Groups
      for (let i = 0; i < arr.length; i++) {
        const gr = arr[i];
        if (!gr.isGroup) continue;
        if (max > gr.duration) {  // this only extends, never shrinks
          myDiagram.model.setDataProperty(gr, "duration", max);
        }
      }
    }
  }

  // some parameters
  //const LinePrefix = 20;  // vertical starting point in document for all Messages and Activations
 // const LineSuffix = 30;  // vertical length beyond the last message time
  //const MessageSpacing = 20;  // vertical distance between Messages at different steps
  //const ActivityWidth = 10;  // width of each vertical activity bar
  //const ActivityStart = 5;  // height before start message time
  //const ActivityEnd = 5;  // height beyond end message time

  function computeLifelineHeight(duration) {
    return 20 + duration * 20 + 30;
  }

  function computeActivityLocation(act) {
    const groupdata = myDiagram.model.findNodeDataForKey(act.group);
    if (groupdata === null) return new go.Point();
    // get location of Lifeline's starting point
    const grouploc = go.Point.parse(groupdata.loc);
    return new go.Point(grouploc.x, convertTimeToY(act.start) - 5);
  }
  function backComputeActivityLocation(loc, act) {
    myDiagram.model.setDataProperty(act, "start", convertYToTime(loc.y + 5));
  }

  function computeActivityHeight(duration) {
    return 5 + duration * 20 + 5;
  }
  function backComputeActivityHeight(height) {
    return (height - 5 - 5) / 20;
  }

  // time is just an abstract small non-negative integer
  // here we map between an abstract time and a vertical position
  function convertTimeToY(t) {
    return t * 20 + 20;
  }
  function convertYToTime(y) {
    return (y - 20) / 20;
  }


// a custom routed Link





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
//myDiagram.nodeTemplateMap.add("group", inputTemplate);

init();
var red = "orangered";  // 0 or false
var green = "forestgreen";  // 1 or true

function init() {

  // Since 2.2 you can also author concise templates with method chaining instead of GraphObject.make
  // For details, see https://gojs.net/latest/intro/buildingObjects.html
  const $ = go.GraphObject.make;  // for conciseness in defining templates

  myDiagram =
    $(go.Diagram, "myDiagramDiv",  // create a new Diagram in the HTML DIV element "myDiagramDiv"
      {
        "draggingTool.isGridSnapEnabled": true,  // dragged nodes will snap to a grid of 10x10 cells
        "undoManager.isEnabled": true
      });

  // when the document is modified, add a "*" to the title and enable the "Save" button
  myDiagram.addDiagramListener("Modified", e => {



    var button = document.getElementById("saveModel");
    if (button) button.disabled = !myDiagram.isModified;
    var idx = document.title.indexOf("*");
    if (myDiagram.isModified) {
      if (idx < 0) document.title += "*";
      
    } else {
      if (idx >= 0) document.title = document.title.slice(0, idx);
    }
  });

  var palette = new go.Palette("palette");  // create a new Palette in the HTML DIV element "palette"

  // creates relinkable Links that will avoid crossing Nodes when possible and will jump over other Links in their paths
  myDiagram.linkTemplate =
    $(go.Link,
      {
        routing: go.Link.AvoidsNodes,
        curve: go.Link.JumpOver,
        corner: 3,
        relinkableFrom: true, relinkableTo: true,
        selectionAdorned: false, // Links are not adorned when selected so that their color remains visible.
        shadowOffset: new go.Point(0, 0), shadowBlur: 5, shadowColor: "blue",
      },
      new go.Binding("isShadowed", "isSelected").ofObject(),
      $(go.Shape,
        { name: "SHAPE", strokeWidth: 2, stroke: red }));

  // node template helpers
  var sharedToolTip =
    $("ToolTip",
      { "Border.figure": "RoundedRectangle" },
      $(go.TextBlock, { margin: 2 },
        new go.Binding("text", "", d => d.category)));

  // define some common property settings
  function nodeStyle() {
    return [new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
    new go.Binding("isShadowed", "isSelected").ofObject(),
    {
      selectionAdorned: false,
      shadowOffset: new go.Point(0, 0),
      shadowBlur: 15,
      shadowColor: "blue",
      toolTip: sharedToolTip
    }];
  }

  function shapeStyle() {
    return {
      name: "NODESHAPE",
      fill: "lightgray",
      stroke: "darkslategray",
      desiredSize: new go.Size(40, 40),
      strokeWidth: 2
    };
  }

  function portStyle(input) {
    return {
      desiredSize: new go.Size(6, 6),
      fill: "black",
      fromSpot: go.Spot.Right,
      fromLinkable: !input,
      toSpot: go.Spot.Left,
      toLinkable: input,
      toMaxLinks: 1,
      cursor: "pointer"
    };
  }

  // define templates for each type of node
  var inputTemplate =
    $(go.Node, "Spot", nodeStyle(),
      $(go.Shape, "Circle", shapeStyle(),
        { fill: red }),  // override the default fill (from shapeStyle()) to be red
      $(go.Shape, "Rectangle", portStyle(false),  // the only port
        { portId: "", alignment: new go.Spot(1, 0.5) }),
      { // if double-clicked, an input node will change its value, represented by the color.
        doubleClick: (e, obj) => {
          e.diagram.startTransaction("Toggle Input");
          var shp = obj.findObject("NODESHAPE");
          shp.fill = (shp.fill === green) ? red : green;
          updateStates();
          e.diagram.commitTransaction("Toggle Input");
        }
      }
    );

  var outputTemplate =
    $(go.Node, "Spot", nodeStyle(),
      $(go.Shape, "Rectangle", shapeStyle(),
        { fill: green }),  // override the default fill (from shapeStyle()) to be green
      $(go.Shape, "Rectangle", portStyle(true),  // the only port
        { portId: "", alignment: new go.Spot(0, 0.5) })
    );

  var andTemplate =
    $(go.Node, "Spot", nodeStyle(),
      $(go.Shape, "AndGate", shapeStyle()),
      $(go.Shape, "Rectangle", portStyle(true),
        { portId: "in1", alignment: new go.Spot(0, 0.3) }),
      $(go.Shape, "Rectangle", portStyle(true),
        { portId: "in2", alignment: new go.Spot(0, 0.7) }),
      $(go.Shape, "Rectangle", portStyle(false),
        { portId: "out", alignment: new go.Spot(1, 0.5) })
    );

  var orTemplate =
    $(go.Node, "Spot", nodeStyle(),
      $(go.Shape, "OrGate", shapeStyle()),
      $(go.Shape, "Rectangle", portStyle(true),
        { portId: "in1", alignment: new go.Spot(0.16, 0.3) }),
      $(go.Shape, "Rectangle", portStyle(true),
        { portId: "in2", alignment: new go.Spot(0.16, 0.7) }),
      $(go.Shape, "Rectangle", portStyle(false),
        { portId: "out", alignment: new go.Spot(1, 0.5) })
    );

  var xorTemplate =
    $(go.Node, "Spot", nodeStyle(),
      $(go.Shape, "XorGate", shapeStyle()),
      $(go.Shape, "Rectangle", portStyle(true),
        { portId: "in1", alignment: new go.Spot(0.26, 0.3) }),
      $(go.Shape, "Rectangle", portStyle(true),
        { portId: "in2", alignment: new go.Spot(0.26, 0.7) }),
      $(go.Shape, "Rectangle", portStyle(false),
        { portId: "out", alignment: new go.Spot(1, 0.5) })
    );

  var norTemplate =
    $(go.Node, "Spot", nodeStyle(),
      $(go.Shape, "NorGate", shapeStyle()),
      $(go.Shape, "Rectangle", portStyle(true),
        { portId: "in1", alignment: new go.Spot(0.16, 0.3) }),
      $(go.Shape, "Rectangle", portStyle(true),
        { portId: "in2", alignment: new go.Spot(0.16, 0.7) }),
      $(go.Shape, "Rectangle", portStyle(false),
        { portId: "out", alignment: new go.Spot(1, 0.5) })
    );

  var xnorTemplate =
    $(go.Node, "Spot", nodeStyle(),
      $(go.Shape, "XnorGate", shapeStyle()),
      $(go.Shape, "Rectangle", portStyle(true),
        { portId: "in1", alignment: new go.Spot(0.26, 0.3) }),
      $(go.Shape, "Rectangle", portStyle(true),
        { portId: "in2", alignment: new go.Spot(0.26, 0.7) }),
      $(go.Shape, "Rectangle", portStyle(false),
        { portId: "out", alignment: new go.Spot(1, 0.5) })
    );

  var nandTemplate =
    $(go.Node, "Spot", nodeStyle(),
      $(go.Shape, "NandGate", shapeStyle()),
      $(go.Shape, "Rectangle", portStyle(true),
        { portId: "in1", alignment: new go.Spot(0, 0.3) }),
      $(go.Shape, "Rectangle", portStyle(true),
        { portId: "in2", alignment: new go.Spot(0, 0.7) }),
      $(go.Shape, "Rectangle", portStyle(false),
        { portId: "out", alignment: new go.Spot(1, 0.5) })
    );

  var notTemplate =
    $(go.Node, "Spot", nodeStyle(),
      $(go.Shape, "Inverter", shapeStyle()),
      $(go.Shape, "Rectangle", portStyle(true),
        { portId: "in", alignment: new go.Spot(0, 0.5) }),
      $(go.Shape, "Rectangle", portStyle(false),
        { portId: "out", alignment: new go.Spot(1, 0.5) })
    );

  // add the templates created above to myDiagram and palette
  myDiagram.nodeTemplateMap.add("input", inputTemplate);
  myDiagram.nodeTemplateMap.add("output", outputTemplate);
  myDiagram.nodeTemplateMap.add("and", andTemplate);
  myDiagram.nodeTemplateMap.add("or", orTemplate);
  myDiagram.nodeTemplateMap.add("xor", xorTemplate);
  myDiagram.nodeTemplateMap.add("not", notTemplate);
  myDiagram.nodeTemplateMap.add("nand", nandTemplate);
  myDiagram.nodeTemplateMap.add("nor", norTemplate);
  myDiagram.nodeTemplateMap.add("xnor", xnorTemplate);
  

  // share the template map with the Palette
  palette.nodeTemplateMap = myDiagram.nodeTemplateMap;

  palette.model.nodeDataArray = [
    { category: "input" },
    { category: "output" },
    { category: "and" },
    { category: "or" },
    { category: "xor" },
    { category: "not" },
    { category: "nand" },
    { category: "nor" },
    { category: "xnor" }
  ];

  // load the initial diagram
  load();

  // continually update the diagram
  loop();
  
}

// update the diagram every 250 milliseconds
function loop() {
  setTimeout(() => { updateStates(); loop(); }, 250);
}

// update the value and appearance of each node according to its type and input values
function updateStates() {
  var oldskip = myDiagram.skipsUndoManager;
  myDiagram.skipsUndoManager = true;
  // do all "input" nodes first
  myDiagram.nodes.each(node => {
    if (node.category === "input") {
      doInput(node);
    }
  });
  // now we can do all other kinds of nodes
  myDiagram.nodes.each(node => {
    switch (node.category) {
      case "and": doAnd(node); break;
      case "or": doOr(node); break;
      case "xor": doXor(node); break;
      case "not": doNot(node); break;
      case "nand": doNand(node); break;
      case "nor": doNor(node); break;
      case "xnor": doXnor(node); break;
      case "output": doOutput(node); break;
      case "input": break;  // doInput already called, above
    }
  });
  myDiagram.skipsUndoManager = oldskip;
}

// helper predicate
function linkIsTrue(link) {  // assume the given Link has a Shape named "SHAPE"
  return link.findObject("SHAPE").stroke === green;
}

// helper function for propagating results
function setOutputLinks(node, color) {
  node.findLinksOutOf().each(link => link.findObject("SHAPE").stroke = color);
}

// update nodes by the specific function for its type
// determine the color of links coming out of this node based on those coming in and node type

function doInput(node) {
  // the output is just the node's Shape.fill
  setOutputLinks(node, node.findObject("NODESHAPE").fill);
}

function doAnd(node) {
  var color = node.findLinksInto().all(linkIsTrue) ? green : red;
  setOutputLinks(node, color);
}
function doNand(node) {
  var color = !node.findLinksInto().all(linkIsTrue) ? green : red;
  setOutputLinks(node, color);
}
function doNot(node) {
  var color = !node.findLinksInto().all(linkIsTrue) ? green : red;
  setOutputLinks(node, color);
}

function doOr(node) {
  var color = node.findLinksInto().any(linkIsTrue) ? green : red;
  setOutputLinks(node, color);
}
function doNor(node) {
  var color = !node.findLinksInto().any(linkIsTrue) ? green : red;
  setOutputLinks(node, color);
}

function doXor(node) {
  var truecount = 0;
  node.findLinksInto().each(link => { if (linkIsTrue(link)) truecount++; });
  var color = truecount % 2 !== 0 ? green : red;
  setOutputLinks(node, color);
}
function doXnor(node) {
  var truecount = 0;
  node.findLinksInto().each(link => { if (linkIsTrue(link)) truecount++; });
  var color = truecount % 2 === 0 ? green : red;
  setOutputLinks(node, color);
}

function doOutput(node) {
  // assume there is just one input link
  // we just need to update the node's Shape.fill
  node.linksConnected.each(link => { node.findObject("NODESHAPE").fill = link.findObject("SHAPE").stroke; });
}

// save a model to and load a model from JSON text, displayed below the Diagram
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
//window.addEventListener('DOMContentLoaded', init);


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

function loadNewMap(){
  const default_json ={ "class": "GraphLinksModel",
  "linkFromPortIdProperty": "fromPort",
  "linkToPortIdProperty": "toPort",
  "nodeDataArray": [],
  "linkDataArray": []}

  myDiagram.model = go.Model.fromJson(default_json);
}

init();

//window.addEventListener();
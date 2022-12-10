
function init() {
    var $ = go.GraphObject.make;

    myDiagram =
      $(go.Diagram, "myDiagramDiv");

    myDiagram.toolManager.mouseDownTools.insertAt(3, new GeometryReshapingTool());

    myDiagram.nodeTemplateMap.add("FreehandDrawing",
      $(go.Part,
        { locationSpot: go.Spot.Center, isLayoutPositioned: false },
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        {
          selectionAdorned: true, selectionObjectName: "SHAPE",
          selectionAdornmentTemplate:  // custom selection adornment: a blue rectangle
            $(go.Adornment, "Auto",
              $(go.Shape, { stroke: "dodgerblue", fill: null }),
              $(go.Placeholder, { margin: -1 }))
        },
        { resizable: true, resizeObjectName: "SHAPE" },
        { rotatable: true, rotateObjectName: "SHAPE" },
        { reshapable: true },  // GeometryReshapingTool assumes nonexistent Part.reshapeObjectName would be "SHAPE"
        $(go.Shape,
          { name: "SHAPE", fill: null, strokeWidth: 1.5 },
          new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
          new go.Binding("angle").makeTwoWay(),
          new go.Binding("geometryString", "geo").makeTwoWay(),
          new go.Binding("fill"),
          new go.Binding("stroke"),
          new go.Binding("strokeWidth"))
      ));

    // create drawing tool for myDiagram, defined in FreehandDrawingTool.js
    var tool = new FreehandDrawingTool();
    // provide the default JavaScript object for a new polygon in the model
    var new_colour = generateRandomColor();
    tool.archetypePartData =
      { stroke: new_colour, strokeWidth: 3, category: "FreehandDrawing" };
    // allow the tool to start on top of an existing Part
    tool.isBackgroundOnly = false;
    // install as first mouse-move-tool
    myDiagram.toolManager.mouseMoveTools.insertAt(0, tool);

    load();  // load a simple diagram from the textarea
  }

  function mode(draw) {
    var tool = myDiagram.toolManager.findTool("FreehandDrawing");
    tool.isEnabled = draw;
  }

  function updateAllAdornments() {  // called after checkboxes change Diagram.allow...
    myDiagram.selection.each(function(p) { p.updateAdornments(); });
  }

  // save a model to and load a model from Json text, displayed below the Diagram
  function save() {
    overlay = document.getElementById('overlay'),
  popup = document.getElementById('popup'),
  overlay.classList.add('active');
  popup.classList.add('active');

    var str = '{ "position": "' + go.Point.stringify(myDiagram.position) + '",\n  "model": ' + myDiagram.model.toJson() + ' }';
    document.getElementById("mySavedModel").value = str;
  }
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function load() {
  await sleep(900);
    var str = document.getElementById("mySavedModel").value;
    try {
      var json = JSON.parse(str);
      myDiagram.initialPosition = go.Point.parse(json.position || "0 0");
      myDiagram.model = go.Model.fromJson(json.model);
      myDiagram.model.undoManager.isEnabled = true;
    } catch (ex) {
      alert(ex);
    }
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

function default_draw(){
 const default_json = { "position": "-28.296875 -5",
 "model": { "class": "GraphLinksModel",
 "nodeDataArray": [],
 "linkDataArray": []} }

myDiagram.model = go.Model.fromJson(default_json);

}

function generateRandomColor(){
  let maxVal = 0xFFFFFF; // 16777215
  let randomNumber = Math.random() * maxVal; 
  randomNumber = Math.floor(randomNumber);
  randomNumber = randomNumber.toString(16);
  let randColor = randomNumber.padStart(6, 0);   
  return `#${randColor.toUpperCase()}`
}



  init();
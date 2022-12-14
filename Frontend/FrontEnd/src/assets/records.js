function init() {

    // Since 2.2 you can also author concise templates with method chaining instead of GraphObject.make
    // For details, see https://gojs.net/latest/intro/buildingObjects.html
    const $ = go.GraphObject.make;  // for conciseness in defining templates

    myDiagram =
      $(go.Diagram, "myDiagramDiv",
        {
          validCycle: go.Diagram.CycleNotDirected,  // don't allow loops
          // For this sample, automatically show the state of the diagram's model on the page
          "ModelChanged": e => {
            if (e.isTransactionFinished) showModel();
          },
          validCycle: go.Diagram.CycleNotDirected,  // don't allow loops
          "clickCreatingTool.archetypeNodeData": {
            key: "Record1",
            fields: [
                { name: "fieldA", info: "", color: "#FFB900", figure: "Diamond" },
                { name: "fieldB", info: "", color: "#F25022", figure: "Rectangle" },
                { name: "fieldC", info: "", color: "#7FBA00", figure: "Diamond" },
                { name: "fieldD", info: "fourth", color: "#00BCF2", figure: "Rectangle" }
            ],
            loc: "0 0"
          },
          "undoManager.isEnabled": true,
          
        });

    // This template is a Panel that is used to represent each item in a Panel.itemArray.
    // The Panel is data bound to the item object.
    var fieldTemplate =
      $(go.Panel, "TableRow",  // this Panel is a row in the containing Table
        new go.Binding("portId", "name"),  // this Panel is a "port"
        {
          background: "transparent",  // so this port's background can be picked by the mouse
          fromSpot: go.Spot.Right,  // links only go from the right side to the left side
          toSpot: go.Spot.Left,
          // allow drawing links from or to this port:
          fromLinkable: true, toLinkable: true
        },
        $(go.Shape,
          {
            width: 12, height: 12, column: 0, strokeWidth: 2, margin: 4,
            // but disallow drawing links from or to this shape:
            fromLinkable: false, toLinkable: false,
          },
          new go.Binding("figure", "figure"),
          new go.Binding("fill", "color")),
        $(go.TextBlock,
          {
            margin: new go.Margin(0, 5), column: 1, font: "bold 13px sans-serif",
            alignment: go.Spot.Left,
            // and disallow drawing links from or to this text:
            fromLinkable: false, toLinkable: false,
            editable: true
          },
          new go.Binding("text", "name")),
        $(go.TextBlock,
          { margin: new go.Margin(0, 5), column: 2, font: "13px sans-serif", alignment: go.Spot.Left,editable: true },
          new go.Binding("text", "info"))
      );

    // This template represents a whole "record".
    myDiagram.nodeTemplate =
      $(go.Node, "Auto",
        { copyable: true, deletable: true },
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        // this rectangular shape surrounds the content of the node
        $(go.Shape,
          { fill: "#EEEEEE" }),
        // the content consists of a header and a list of items
        $(go.Panel, "Vertical",
          // this is the header for the whole node
          $(go.Panel, "Auto",
            { stretch: go.GraphObject.Horizontal },  // as wide as the whole node
            $(go.Shape,
              { fill: "#1570A6", stroke: null }),
            $(go.TextBlock,
              {
                alignment: go.Spot.Center,
                margin: 3,
                stroke: "white",
                textAlign: "center",
                font: "bold 12pt sans-serif",
                editable: true
              },
              new go.Binding("text", "key"))),
          // this Panel holds a Panel for each item object in the itemArray;
          // each item Panel is defined by the itemTemplate to be a TableRow in this Table
          $(go.Panel, "Table",
            {
              padding: 2,
              minSize: new go.Size(100, 10),
              defaultStretch: go.GraphObject.Horizontal,
              itemTemplate: fieldTemplate
            },
            new go.Binding("itemArray", "fields")
          )  // end Table Panel of items
        )  // end Vertical Panel
      );  // end Node

    myDiagram.linkTemplate =
      $(go.Link,
        {
          relinkableFrom: true, relinkableTo: true, // let user reconnect links
          toShortLength: 4, fromShortLength: 2
        },
        $(go.Shape, { strokeWidth: 1.5 }),
        $(go.Shape, { toArrow: "Standard", stroke: null })
      );

    myDiagram.model =
      new go.GraphLinksModel(
        {
          copiesArrays: true,
          copiesArrayObjects: true,
          linkFromPortIdProperty: "fromPort",
          linkToPortIdProperty: "toPort",
          nodeDataArray: [
            {
              key: "Record1",
              fields: [
                { name: "field1", info: "", color: "#F7B84B", figure: "Ellipse" },
                { name: "field2", info: "the second one", color: "#F25022", figure: "Ellipse" },
                { name: "fieldThree", info: "3rd", color: "#00BCF2" }
              ],
              loc: "0 0"
            },
            {
              key: "Record2",
              fields: [
                { name: "fieldA", info: "", color: "#FFB900", figure: "Diamond" },
                { name: "fieldB", info: "", color: "#F25022", figure: "Rectangle" },
                { name: "fieldC", info: "", color: "#7FBA00", figure: "Diamond" },
                { name: "fieldD", info: "fourth", color: "#00BCF2", figure: "Rectangle" }
              ],
              loc: "280 0"
            }
          ],
          linkDataArray: [
            { from: "Record1", fromPort: "field1", to: "Record2", toPort: "fieldA" },
            { from: "Record1", fromPort: "field2", to: "Record2", toPort: "fieldD" },
            { from: "Record1", fromPort: "fieldThree", to: "Record2", toPort: "fieldB" }
          ]
        });

    showModel();  // show the diagram's initial model

    function showModel() {
      document.getElementById("mySavedModel").textContent = myDiagram.model.toJson();
    }
  }

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

function loadNewMap(){
  const default_json ={ "class": "GraphLinksModel",
  "copiesArrays": true,
  "copiesArrayObjects": true,
  "linkFromPortIdProperty": "fromPort",
  "linkToPortIdProperty": "toPort",
  "nodeDataArray": [],
  "linkDataArray": []}

  myDiagram.model = go.Model.fromJson(default_json);
}


init();
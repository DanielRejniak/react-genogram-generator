import React, { useState } from 'react';

import * as go from 'gojs';
import { ReactDiagram, TreeLayout } from 'gojs-react';

import './App.css';

function initDiagram() {
  const $ = go.GraphObject.make;
  // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
  const diagram =
    $(go.Diagram,
      {
        'undoManager.isEnabled': true,  // must be set to allow for model change listening
        // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
        'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'lightblue' },
        model: $(go.GraphLinksModel,
          {
            linkKeyProperty: 'key'  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
          })
      });

  // define a simple Node template
  diagram.nodeTemplate =
    $(go.Node, 'Auto',  // the Shape will go around the TextBlock
      new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
      $(go.Shape, 'RoundedRectangle',
        { name: 'SHAPE', fill: 'white', strokeWidth: 0 },
        // Shape.fill is bound to Node.data.color
        new go.Binding('fill', 'color')),
      $(go.TextBlock,
        { margin: 8, editable: true },  // some room around the text
        new go.Binding('text').makeTwoWay()
      )
    );

  diagram.linkTemplate =
    $(go.Link,
      $(go.Shape),                           // this is the link shape (the line)
      $(go.TextBlock,                        // this is a Link label
        new go.Binding("text", "text"))
    );

  return diagram;
}

/**
 * This function handles any changes to the GoJS model.
 * It is here that you would make any updates to your React state, which is dicussed below.
 */
function handleModelChange(changes) { }

function App() {

  // Store the input
  const [input, setInput] = useState('[]')
  const [jsonError, setJasonError] = useState(false)

  const [nodeArrayNew, setNodeArray] = useState([])
  const [linkDataArrayNew, setLinkDataArray] = useState([])


  // Handle input form text filed
  function handleInput(event) {
    setInput(event.target.value)
  }

  // Submit input
  function submitInput() {
    setNodeArray([])
    setLinkDataArray([])
    setJasonError(false)
    try {
      const jsonString = JSON.parse(input)
      formatJSON(jsonString)
    } catch (e) {
      setJasonError(true)
    }
  }

  // Format JSON into node and link arrays
  function formatJSON(json) {
    const nodeArrayTemp = []
    const linkDataArrayTemp = []
    json.forEach(function (obj) {
      nodeArrayTemp.push({ key: obj.id, text: obj.name, color: 'green' })
      if(obj.parent != undefined) {
        linkDataArrayTemp.push({ key: obj.id, from: obj.id, to: obj.parent, text: obj.Role})
      }
    })
    setNodeArray(nodeArrayTemp)
    setLinkDataArray(linkDataArrayTemp)
    console.log(nodeArrayTemp)
    console.log(linkDataArrayTemp)
  }

  function clearInput() {
    setInput("[]")
  }

  // if(nodeArrayNew.length > 0 && linkDataArrayNew.length >0 ) {
  //   return(
  //     <div className="App">
  //       <h1>Display Data!!!</h1>
  //     </div>)
  // } else {
  //   <div className="App">
  //     <h1>Don't Display</h1>
  //   </div>    
  // }

  return (
    <div className="App">
      <div>
        <div className="container">
          <nav class="navbar navbar-light bg-white">
            <div class="container-fluid">
              <a class="navbar-brand" href="#">Genogram Generator</a>
            </div>
          </nav>
          {(nodeArrayNew.length > 0 && linkDataArrayNew.length > 0) && (
            <ReactDiagram
              initDiagram={initDiagram}
              divClassName='diagram-component'
              nodeDataArray={nodeArrayNew}
              linkDataArray={linkDataArrayNew}
              onModelChange={handleModelChange}
            />
          )}
          {jsonError && (
            <div class="alert alert-danger" role="alert">
              JSON is not in valid format. Please update the input.
            </div>
          )}
          <div class="mb-3">
            <textarea onChange={handleInput} value={input} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>
          <button type="button" class="btn btn-primary" onClick={() => submitInput()}>Generate Genogram</button>
          <button type="button" class="btn btn-secondary" onClick={() => clearInput()}>Clear Input</button>
        </div>
      </div>
    </div>
  );
}

export default App;

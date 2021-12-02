import "./App.css";

import React, { useState } from "react";

import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

const options = {
  cMapUrl: "cmaps/",
  cMapPacked: true,
};

function Test() {
  const [file, setFile] = useState("./sample/sample.pdf");
  const [numPages, setNumPages] = useState(null);

  function onFileChange(event) {
    setFile(event.target.files[0]);
  }

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
    const canvas = document.getElementsByTagName("canvas")[0];
    console.log(canvas);
  }

  const [drawing, setDrawing] = useState(false);
  // mouse;
  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
  });

  return (
    <div className="annotator-heading">
      <header>
        <h1>PDF Annotator</h1>
      </header>
      <div>
        <div className="document-load-container">
          <label htmlFor="file">Load from file:</label>{" "}
          <input onChange={onFileChange} type="file" />
        </div>
        <div className="document-container">
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                onClick={(e) => {
                  const canvas = document.getElementsByTagName("canvas")[0];

                  // aspect ratio
                  let multiplyWidth =
                    canvas.width / parseFloat(canvas.style.width.slice(0, -2));
                  let multiplyHeight =
                    canvas.height /
                    parseFloat(canvas.style.height.slice(0, -2));

                  if (!drawing) {
                    setDrawing(true);
                    let m = mouse;
                    let rect = e.target.getBoundingClientRect();
                    m.startX = (e.pageX - rect.left) * multiplyWidth;
                    m.startY = (e.pageY - rect.top) * multiplyHeight;
                    setMouse(m);
                  } else {
                    if (canvas.getContext) {
                      let m = mouse;
                      let rect = e.target.getBoundingClientRect();
                      m.endX = (e.pageX - rect.left) * multiplyWidth;
                      m.endY = (e.pageY - rect.top) * multiplyHeight;
                      var ctx = canvas.getContext("2d");
                      ctx.strokeStyle = "red";
                      ctx.lineWidth = 3.0;
                      ctx.strokeRect(
                        m.startX,
                        m.startY,
                        m.endX - m.startX,
                        m.endY - m.startY
                      );
                    }
                    setDrawing(false);
                  }
                }}
              />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App-header">
      <Test />
    </div>
  );
}

export default App;

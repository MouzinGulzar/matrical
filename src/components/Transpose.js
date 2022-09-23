import React from "react";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import MathJax from "react-mathjax";

export default function Transpose() {
  // HELPER FUNCTIONS
  const setAttributes = (el, attrs) => {
    Object.keys(attrs).forEach((key) => el.setAttribute(key, attrs[key]));
  };

  const value = (x) => {
    return Number(document.querySelector(x).value);
  };

  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);
  const [isOpen, setIsOpen] = React.useState(false);
  const [transpoTex, setTranspoTex] = useState("");

  var trans = Array.from(Array(cols), () => {
    return new Array(rows).fill(0);
  });

  var tBody = document.createElement("tbody");
  let dAttrs = { className: "input-group mb-3 text-center" };
  let elAttrs = { className: "table table-bordered table-condensed" };
  let inpAttrs = {
    // type: "number",
    type: "text",
    // inputmode: "numeric",
    className: "form-control w-auto",
    size: "3",
    style: "text-align: center;",
  };

  const renderRowsAndCols = (rowsCount, colsCount) => {
    var row, el, d, inp;
    for (let i = 0; i < rowsCount; i++) {
      row = document.createElement("tr");
      for (let j = 0; j < colsCount; j++) {
        el = document.createElement("td");
        setAttributes(el, elAttrs);
        d = document.createElement("div");
        setAttributes(d, dAttrs);
        inp = document.createElement("input");
        setAttributes(inp, inpAttrs);
        setAttributes(inp, { id: `i_${i + 1}${j + 1}` });
        setAttributes(inp, { placeholder: `(${i + 1},${j + 1})` });
        d.appendChild(inp);
        el.appendChild(d);
        row.appendChild(el);
      }
      tBody.append(row);
    }
  };
  renderRowsAndCols(rows, cols);

  // useEffect(() => {
  //   renderRowsAndCols(rows, cols);
  // }, []);

  const rightExpand = () => {
    setCols(cols + 1);
    renderRowsAndCols(rows, cols);
  };

  const downExpand = () => {
    setRows(rows + 1);
    renderRowsAndCols(rows, cols);
  };

  const diagonalExpand = () => {
    setRows(rows + 1);
    setCols(cols + 1);
    renderRowsAndCols(rows, cols);
  };

  const transpose = (matrix) => {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        matrix[i][j] = value(`#i_${j + 1}${i + 1}`);
      }
    }
  };

  let temp = "";
  const writeTranspose = (matrix, rows, cols) => {
    temp = "";
    transpose(matrix, rows, cols);
    temp += "\\begin{bmatrix}{}";
    let itr = 0;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        temp += `${trans[i][j]}`;
        if (j === rows - 1) continue;
        else {
          temp += " & ";
        }
      }

      if (itr === cols - 1) continue;
      else {
        temp += "\\\\ ";
      }

      itr++;
    }
    temp += "\\end{bmatrix}";
    return temp;
  };

  const show = () => {
    setIsOpen(true);
    setTranspoTex(writeTranspose(trans, rows, cols));
  };
  const buttonAction = document.querySelector("#button_action");

  const handleButtonAction = () => {
    if(buttonAction.getAttribute("data-status") === "expand")
      buttonAction.setAttribute("data-status", "collapse");
    if(!buttonAction.getAttribute("data-status") === "collapse")
      buttonAction.setAttribute("data-status", "expand");
  }

  return (
    <div className="container mt-5">
      <MathJax.Provider>
        <div style={{ textAlign: "center" }}>
          <div className="mt-2">
            <Button className="mx-1" onClick={downExpand}>
              <i className="fa-solid fa-down-long"></i>
            </Button>
            <Button className="mx-1" onClick={diagonalExpand}>
              <i className="fa-solid fa-up-right-and-down-left-from-center"></i>
            </Button>
            <Button className="mx-1" onClick={rightExpand}>
              <i className="fa-solid fa-right-long"></i>
            </Button>
          </div>
        </div>
        <div className="overflow-auto">
          <table
            className="table table-bordered table-condensed mt-2"
            style={{ width: "0%", margin: "0 auto" }}
          >
            <tbody
              dangerouslySetInnerHTML={{ __html: tBody.innerHTML }}
            ></tbody>
          </table>
        </div>
        <div className="text-center">
          <Button
            className="text-center mt-3 mb-5"
            variant="primary"
            onClick={show}
          >
            <b>Transpose</b>
          </Button>
        </div>

        <Modal
          size="lg"
          show={isOpen}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Transpose of your matrix is:
            </Modal.Title>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setIsOpen(false)}
            ></button>
          </Modal.Header>
          <Modal.Body>
            <div style={{ fontSize: "1.1rem" }}>
              <MathJax.Node formula={`${transpoTex}`} />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </MathJax.Provider>
    </div>
  );
}

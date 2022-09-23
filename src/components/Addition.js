import "../App.css";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import MathJax from "react-mathjax";

export default function Multiply(props) {
  // HELPER FUNCTIONS
  const setAttributes = (el, attrs) => {
    Object.keys(attrs).forEach((key) => el.setAttribute(key, attrs[key]));
  };

  const value = (x) => {
    return Number(document.querySelector(x).value);
  };

  // STATE HOOKS AND VARIABLES
  const [isOpen, setIsOpen] = React.useState(false);
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);
  const [addTex, setAddTex] = useState("");

  var mat1 = Array.from(Array(rows), () => {
    return new Array(cols).fill(0);
  });
  var mat2 = Array.from(Array(rows), () => {
    return new Array(cols).fill(0);
  });
  var resMat = Array.from(Array(rows), () => {
    return new Array(cols).fill(0);
  });

  var tBody1 = document.createElement("tbody");
  var tBody2 = document.createElement("tbody");
  let dAttrs = { className: "input-group mb-3 text-center" };
  let elAttrs = { className: "table table-bordered table-condensed" };
  let inpAttrs = {
    // type: "number",
    type: "text",
    inputmode: "numberic",
    className: "form-control w-auto",
    autocomplete: "off",
    size: "3",
    style: "text-align: center; outline-color: #116DFA ;}",
  };

  // FUNCTIONS
  const renderRowsAndColsOf1 = (rowsCount, colsCount) => {
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
        setAttributes(inp, { id: `f_${i + 1}${j + 1}` });
        setAttributes(inp, { placeholder: `(${i + 1},${j + 1})` });
        d.appendChild(inp);
        el.appendChild(d);
        row.appendChild(el);
      }
      tBody1.append(row);
    }
  };
  renderRowsAndColsOf1(rows, cols);

  const renderRowsAndColsOf2 = (rowsCount, colsCount) => {
    var row, el, d, inp;
    for (let i = 0; i < rowsCount; i++) {
      row = document.createElement("tr");
      for (let j = 0; j < colsCount; j++) {
        el = document.createElement("td");
        setAttributes(el, elAttrs);
        d = document.createElement("div");
        setAttributes(d, dAttrs);
        inp = document.createElement("input");
        inp.value = 1;
        setAttributes(inp, inpAttrs);
        setAttributes(inp, { id: `s_${i + 1}${j + 1}` });
        setAttributes(inp, { placeholder: `(${i + 1},${j + 1})` });
        d.appendChild(inp);
        el.appendChild(d);
        row.appendChild(el);
      }
      tBody2.append(row);
    }
  };
  renderRowsAndColsOf2(rows, cols);

  const rightExpand = () => {
    setCols(cols + 1);
    renderRowsAndColsOf1(rows, cols);
    renderRowsAndColsOf2(rows, cols);
  };

  const downExpand = () => {
    setRows(rows + 1);
    renderRowsAndColsOf1(rows, cols);
    renderRowsAndColsOf2(rows, cols);
  };

  const diagonalExpand = () => {
    setRows(rows + 1);
    setCols(cols + 1);
    renderRowsAndColsOf1(rows, cols);
    renderRowsAndColsOf2(rows, cols);
  };

  const setMat1 = () => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        mat1[i][j] = value(`#f_${i + 1}${j + 1}`);
      }
    }
  };

  const setMat2 = () => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        mat2[i][j] = value(`#s_${i + 1}${j + 1}`);
      }
    }
  };

  const add = (matrix1, matrix2) => {
    setMat1();
    setMat2();

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        resMat[i][j] = matrix1[i][j] + matrix2[i][j];
      }
    }
    console.log(mat1, mat2, resMat);
  };

  let temp = "";
  const writeSum = (matrix1, matrix2) => {
    temp = "";
    add(matrix1, matrix2);

    temp += "\\begin{bmatrix}{}";
    let itr = 0;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        temp += `${resMat[i][j]}`;
        if (j === cols - 1) continue;
        else {
          temp += " & ";
        }
      }

      if (itr === rows - 1) continue;
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
    setAddTex(writeSum(mat1, mat2));
    console.log(writeSum(mat1, mat2));
  };

  return (
    <div className="container mt-5">
      <MathJax.Provider>
        <div className="row justify-content-center">
          <div className="mt-2" style={{ textAlign: "center" }}>
            {/* {props.button("mx-1", "downExpand", "fa-solid fa-down-long")} */}
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
          <div className="col-md-5" style={{ overflow: "auto" }}>
            <table
              className="table table-bordered table-condensed mt-2"
              style={{ width: "0%", margin: "0 auto" }}
            >
              <tbody
                dangerouslySetInnerHTML={{ __html: tBody1.innerHTML }}
              ></tbody>
            </table>
          </div>

          <div className="col-md-5" style={{ overflow: "auto" }}>
            <table
              className="table table-bordered table-condensed mt-2"
              style={{ width: "0%", margin: "0 auto" }}
            >
              <tbody
                dangerouslySetInnerHTML={{ __html: tBody2.innerHTML }}
              ></tbody>
            </table>
          </div>
        </div>
        <div className="text-center">
          <Button className="text-center mt-5" variant="primary" onClick={show}>
            <b>Add</b>
          </Button>
        </div>
        <Modal
          aria-labelledby="contained-modal-title-vcenter"
          centered
          backdrop="static"
          show={isOpen}
          onHide={() => setIsOpen(false)}
          size="lg"
        >
          <Modal.Header>
            <Modal.Title>Sum of entered matrices is:</Modal.Title>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setIsOpen(false)}
            ></button>
          </Modal.Header>
          <Modal.Body
            style={{
              overflowX: "auto",
            }}
          >
            <div style={{ fontSize: "1.1rem" }}>
              <MathJax.Node formula={`${addTex}`} />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="button"
              data-bs-dismiss="modal"
              onClick={() => setIsOpen(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </MathJax.Provider>
    </div>
  );
}

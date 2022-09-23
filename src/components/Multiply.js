import "../App.css";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import MathJax from "react-mathjax";

export default function Multiply(props) {
  // HELPER FUNCTIONS
  const value = (x) => {
    return Number(document.querySelector(x).value);
  };
  const setAttributes = (el, attrs) => {
    Object.keys(attrs).forEach((key) => el.setAttribute(key, attrs[key]));
  };

  // STATE HOOKS AND VARIABLES
  const [isOpen, setIsOpen] = React.useState(false);
  const [rows1, setRows1] = useState(2);
  const [cols1, setCols1] = useState(2);
  const [rows2, setRows2] = useState(2);
  const [cols2, setCols2] = useState(2);
  const [multipLex, setmultipLex] = useState("");

  var mat1 = Array.from(Array(rows1), () => {
    return new Array(cols1).fill(0);
  });
  var mat2 = Array.from(Array(rows2), () => {
    return new Array(cols2).fill(0);
  });
  var resMat = Array.from(Array(rows1), () => {
    return new Array(cols2).fill(0);
  });

  var tBody1 = document.createElement("tbody");
  var tBody2 = document.createElement("tbody");
  let dAttrs = { className: "input-group mb-3 text-center" };
  let elAttrs = { className: "table table-bordered table-condensed" };
  let inpAttrs = {
    // type: "number",
    type: "text",
    // inputmode: "numeric",
    className: "form-control",
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
  renderRowsAndColsOf1(rows1, cols1);

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
  renderRowsAndColsOf2(rows2, cols2);

  const rightExpand1 = () => {
    setCols1(cols1 + 1);
    setRows2(rows2 + 1);
    renderRowsAndColsOf1(rows1, cols1);
  };

  const downExpand1 = () => {
    setRows1(rows1 + 1);
    renderRowsAndColsOf1(rows1, cols1);
  };

  const diagonalExpand1 = () => {
    setRows1(rows1 + 1);
    setCols1(cols1 + 1);
    setRows2(rows2 + 1);
    renderRowsAndColsOf1(rows1, cols1);
  };

  const rightExpand2 = () => {
    setCols2(cols2 + 1);
    renderRowsAndColsOf2(rows2, cols2);
  };

  const downExpand2 = () => {
    setRows2(rows2 + 1);
    setCols1(cols1 + 1);
    renderRowsAndColsOf2(rows2, cols2);
  };

  const diagonalExpand2 = () => {
    setRows2(rows2 + 1);
    setCols2(cols2 + 1);
    setCols1(cols1 + 1);
    renderRowsAndColsOf2(rows2, cols2);
  };

  const setMat1 = () => {
    for (let i = 0; i < rows1; i++) {
      for (let j = 0; j < cols1; j++) {
        mat1[i][j] = value(`#f_${i + 1}${j + 1}`);
      }
    }
  };

  const setMat2 = () => {
    for (let i = 0; i < rows2; i++) {
      for (let j = 0; j < cols2; j++) {
        mat2[i][j] = value(`#s_${i + 1}${j + 1}`);
      }
    }
  };

  const multiply = (matrix1, matrix2) => {
    setMat1();
    setMat2();

    for (let i = 0; i < rows1; i++) {
      for (let j = 0; j < cols2; j++) {
        for (let k = 0; k < rows2; k++) {
          resMat[i][j] += matrix1[i][k] * matrix2[k][j];
        }
      }
    }
    setIsOpen(true);

    console.log(mat1, mat2, resMat);
  };

  let temp;
  const writeProduct = (matrix1, matrix2) => {
    temp = "";
    multiply(matrix1, matrix2);
    temp += "\\begin{bmatrix}{}";
    let itr = 0;
    for (let i = 0; i < rows1; i++) {
      for (let j = 0; j < cols2; j++) {
        temp += `${resMat[i][j]}`;
        if (j === cols2 - 1) continue;
        else {
          temp += " & ";
        }
      }

      if (itr === rows1 - 1) continue;
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
    setmultipLex(writeProduct(mat1, mat2));
  };

  return (
    <div className="container mt-5">
      <MathJax.Provider>
        <div className="row justify-content-center">
          <div className="col-md-5 mt-1">
            {/* <div class="input-group col-md-6 mt-2" style={{margin: "0 auto", textAlign: "center"}}>
          <Button>
            Enter Manually
          </Button>
        </div>
        <div class="input-group col-md-6 mt-2" style={{margin: "0 auto"}}>
          <input type="number" class="form-control" placeholder="Rows" style={{textAlign: "center"}} onClick={handleRows1}/>
          <input type="number" class="form-control" placeholder="Cols" style={{textAlign: "center"}}/>
        </div> */}
            <div className="mt-2" style={{ textAlign: "center" }}>
              <Button className="mx-1" onClick={downExpand1}>
                <i className="fa-solid fa-down-long"></i>
              </Button>
              <Button className="mx-1" onClick={diagonalExpand1}>
                <i className="fa-solid fa-up-right-and-down-left-from-center"></i>
              </Button>
              <Button className="mx-1" onClick={rightExpand1}>
                <i className="fa-solid fa-right-long"></i>
              </Button>
            </div>
            <div style={{ overflow: "auto" }}>
              <table
                className="table table-bordered table-condensed mt-2"
                style={{ width: "0%", margin: "0 auto" }}
              >
                <tbody
                  dangerouslySetInnerHTML={{ __html: tBody1.innerHTML }}
                ></tbody>
              </table>
            </div>
          </div>
          <div className="col-md-5" style={{ overflow: "auto" }}>
            <div className="mt-2" style={{ textAlign: "center" }}>
              <Button className="mx-1" onClick={downExpand2}>
                <i className="fa-solid fa-down-long"></i>
              </Button>
              <Button className="mx-1" onClick={diagonalExpand2}>
                <i className="fa-solid fa-up-right-and-down-left-from-center"></i>
              </Button>
              <Button className="mx-1" onClick={rightExpand2}>
                <i className="fa-solid fa-right-long"></i>
              </Button>
            </div>
            <div style={{ overflow: "auto" }}>
              <table
                className="table table-bordered table-condensed mt-1"
                style={{ width: "0%", margin: "0 auto" }}
              >
                <tbody
                  dangerouslySetInnerHTML={{ __html: tBody2.innerHTML }}
                ></tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="text-center">
          <Button
            className="text-center mt-3 mb-5"
            variant="primary"
            onClick={show}
          >
            <b>Multiply</b>
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
            <Modal.Title>Product of entered matrices is:</Modal.Title>
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
            <div style={{fontSize: "1.1rem"}}>
              <MathJax.Node formula={`${multipLex}`}/>
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

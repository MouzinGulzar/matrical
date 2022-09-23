import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { MathComponent } from "mathjax-react";
import MathJax from "react-mathjax";

export default function Determinent() {
  // HELPER FUNCTIONS
  const setAttributes = (el, attrs) => {
    Object.keys(attrs).forEach((key) => el.setAttribute(key, attrs[key]));
  };

  const value = (x) => {
    return Number(document.querySelector(x).value);
  };
  
  const [order, setOrder] = useState(2);
  const [isOpen, setIsOpen] = React.useState(false);
  const [adjoinTex, setadjoinTex] = useState("");
  
  let matrix = Array.from(Array(order), () => {
    return new Array(order).fill(0);
  });

  let minorArr = Array.from(Array(order), () => {
    return new Array(order).fill(0);
  });

  let adjointArr = Array.from(Array(order), () => {
    return new Array(order).fill(0);
  });
  
  // matrix = [2];
  // matrix = [[2, 3], [1, 4]];
  // matrix = [[1, 2, 4], [-1, 3, 0], [4, 1, 0]];
  // matrix = [[1, 3, 3], [1, 4, 3], [1,3, 4]];
  // matrix = [[-1, 1, 4, 2], [2, -1, 2, 5], [1, 2, 3, 4], [3, 4, -1, 2]];
  // matrix = [[3, 5, 1, 6, 2], [7, 1, 8, 2 ,0], [1, 8, 2, 9, 9], [1, 7, 2, 8, 4], [3, 6, 7 ,1, 0]];
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
        // setAttributes(inp, { value: `${i + j}` });
        setAttributes(inp, { placeholder: `(${i + 1},${j + 1})` });
        d.appendChild(inp);
        el.appendChild(d);
        row.appendChild(el);
      }
      tBody.append(row);
    }
  };
  renderRowsAndCols(order, order);

  const diagonalExpand = () => {
    setOrder(order + 1);
    setOrder(order + 1);
    renderRowsAndCols(order, order);
  };

  const setMatArr = () => {
    for (let i = 0; i < order; i++) {
      for (let j = 0; j < order; j++) {
        matrix[i][j] = value(`#i_${i + 1}${j + 1}`);
      }
    }
  };

  const subMatrix = (matrix, order, row, col) => {
    // let temp = new Array(order - 1);
    // for(let i = 0;i < order - 1;i++)
    //     temp[i]=new Array(order - 1);
    let temp = Array.from(Array(order - 1), () => {
      return new Array(order - 1).fill(0);
    });
    let i = 0,
      j = 0;
    for (let r = 0; r < order; r++) {
      for (let c = 0; c < order; c++) {
        if (r === row || c === col) continue;
        else {
          temp[i][j] = matrix[r][c];
          j++;
          if (j === order - 1) {
            i++;
            j = 0;
          }
        }
      }
    }
    return temp;
  };

  const determinant = (matrix, order) => {
    let D = 0;
    if (order === 1) return matrix[0][0];
    else if (order === 2)
      return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    else {
      for (let col = 0; col < order; col++) {
        D +=
          Math.pow(-1, 1 + (col + 1)) *
          matrix[0][col] *
          determinant(subMatrix(matrix, order, 0, col), order - 1);
      }
    }
    return D;
  };

  const minor = (matrix, order, row, col) => {
    minorArr[row][col] = determinant(
      subMatrix(matrix, order, row, col),
      order - 1
    );

    return minorArr[row][col];
  };

  const adjoint = (matrix, order) => {
    setMatArr();
    for (let i = 0; i < order; i++) {
      for (let j = 0; j < order; j++) {
        adjointArr[j][i] =
          Math.pow(-1, i + 1 + (j + 1)) * minor(matrix, order, i, j);
        if (adjointArr[j][i] === -0) adjointArr[j][i] = 0;
      }
    }
    // return adjointArr;
  };

  //     var parse = require('html-react-parser');
  // parse('<div>text</div>');
  let temp = "";
  const writeAdjoint = (matrix, adjointArr, order) => {
    temp = "";
    adjoint(matrix, order);
    temp += "\\begin{bmatrix}{}";
    let itr = 0;
    for (let i = 0; i < order; i++) {
      for (let j = 0; j < order; j++) {
        temp += `${adjointArr[i][j]}`;
        if (j === order - 1) continue;
        else {
          temp += " & ";
        }
      }

      if (itr === order - 1) continue;
      else {
        temp += "\\\\ ";
      }

      itr++;
    }
    temp += "\\end{bmatrix}";
    return temp;
  };

  const show = () => {
    setadjoinTex(writeAdjoint(matrix, adjointArr, order));
    // adjoinTeX = writeAdjoint(matrix, adjointArr, order);
    // document.querySelector("#modal-body").innerHTML = `<MathJax.Node formula={adjointArr}/>`;
    console.log(writeAdjoint(matrix, adjointArr, order));
    // writeAdjoint(matrix, adjointArr, order);
    setIsOpen(true);
  };

  // const tex = `
  // \\begin{vmatrix}{}
  // a & b & c \\\\
  // d & e & f & g \\\\
  // & h & i & \\theta
  // \\end{vmatrix}
  // `
  // const tex = writeAdjoint(matrix, adjointArr, order);

  return (
    <>
      <div className="container mt-5">
        <MathJax.Provider>
          <div>
            <div className="mt-2" style={{ textAlign: "center" }}>
              <Button className="mx-2" onClick={diagonalExpand}>
                <i className="fa-solid fa-up-right-and-down-left-from-center"></i>
              </Button>
            </div>
            <div>
              <table
                className="table table-bordered table-condensed mt-2"
                style={{ width: "0%", margin: "0 auto" }}
              >
                <tbody
                  dangerouslySetInnerHTML={{ __html: tBody.innerHTML }}
                ></tbody>
              </table>
            </div>
          </div>
          <div className="text-center">
            <Button
              className="text-center mt-3 mb-5"
              variant="primary"
              onClick={show}
            >
              <b>Calculate</b>
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
                Adjoint of the entered matrix is:
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
              <div style={{fontSize: "1.1rem"}}>
                <MathJax.Node formula={`adj = ${adjoinTex}`} />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => setIsOpen(false)}>Close</Button>
            </Modal.Footer>
          </Modal>
        </MathJax.Provider>
      </div>
    </>
  );
}

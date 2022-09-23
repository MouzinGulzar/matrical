import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import MathJax from "react-mathjax";

export default function Inverse(props) {
  // HELPER FUNCTIONS
  const setAttributes = (el, attrs) => {
    Object.keys(attrs).forEach((key) => el.setAttribute(key, attrs[key]));
  };

  const value = (x) => {
    return Number(document.querySelector(x).value);
  };

  const ifFloat = (num) => {
    return Number(num) === num && num % 1 !== 0;
  };

  const [order, setOrder] = useState(2);
  const [isOpen, setIsOpen] = React.useState(false);
  const [ifDivisible, setIfDivisible] = useState(false);
  const [inverTex, setInverTex] = useState("");
  let matrix = Array.from(Array(order), () => {
    return new Array(order).fill(0);
  });

  let minorArr = Array.from(Array(order), () => {
    return new Array(order).fill(0);
  });

  let adjointArr = Array.from(Array(order), () => {
    return new Array(order).fill(0);
  });

  let inverseArr = Array.from(Array(order), () => {
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
    for (let i = 0; i < order; i++) {
      for (let j = 0; j < order; j++) {
        adjointArr[j][i] =
          Math.pow(-1, i + 1 + (j + 1)) * minor(matrix, order, i, j);
        if (adjointArr[j][i] === -0) adjointArr[j][i] = 0;
      }
    }
  };

  const ifInverseExist = (matrix, order) => {
    if (determinant(matrix, order) === 0) return false;
    else return true;
  };

  const checkDivisiblity = (matrix, order, determinant) => {
    adjoint(matrix, order);
    for (let i = 0; i < order; i++) {
      for (let j = 0; j < order; j++) {
        if (adjointArr[i][j] % determinant(matrix, order) !== 0)
          setIfDivisible(false);
      }
    }
  };

  const inverse = (matrix, order, determinant) => {
    setMatArr();
    // adjoint(matrix, order);
    checkDivisiblity(matrix, order, determinant);
    if (ifDivisible) {
      for (let i = 0; i < order; i++) {
        for (let j = 0; j < order; j++) {
          inverseArr[i][j] = adjointArr[i][j] / determinant;
        }
      }
    } else {
      for (let i = 0; i < order; i++) {
        for (let j = 0; j < order; j++) {
          inverseArr[i][j] = adjointArr[i][j];
        }
      }
    }
  };

  let temp = "";
  const writeInverse = (matrix, order, determinant) => {
    temp = "";
    inverse(matrix, order, determinant);
    checkDivisiblity(matrix, order, determinant);
    // let det = determinant(matrix, order)

    if (!ifDivisible) {
      temp += `\\frac{1}{${determinant(matrix, order)}}`;
    }

    temp += "\\begin{bmatrix}{}";
    let itr = 0;
    for (let i = 0; i < order; i++) {
      for (let j = 0; j < order; j++) {
        temp += `${inverseArr[i][j]}`;
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
    setIsOpen(true);
    setInverTex(writeInverse(matrix, order, determinant));
    console.log(writeInverse(matrix, order, determinant));
  };

  return (
    <>
      <div className="containe mt-5">
        <MathJax.Provider>
          <div className="mt-2" style={{ textAlign: "center" }}>
            <Button className="mx-2" onClick={diagonalExpand}>
              <i className="fa-solid fa-up-right-and-down-left-from-center"></i>
            </Button>
          </div>
          <div style={{ overflow: "auto" }}>
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
                Inverse of the entered matrix is:
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
              <div>
                <MathJax.Node formula={`A^{-1} = ${inverTex}`} />
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

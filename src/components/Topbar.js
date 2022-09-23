import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="container">

      <div class="btn-group dropend ml-2">
        <button
          type="button"
          class="btn btn-primary dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          >
          <span style={{ fontWeight: "bold" }}>Select an Operation</span>
        </button>
        <ul class="dropdown-menu">
          <li style={{ width: "100%" }}>
            <NavLink
              to="/"
              className="nav-link list-group-item list-group-item-action py-2 ripple"
            >
              <i className="fa-solid fa-square-plus me-3"></i>
              <span>Addition</span>
            </NavLink>
          </li>
          <li style={{ width: "100%" }}>
            <NavLink
              to="/subtraction"
              className="list-group-item list-group-item-action py-2 ripple"
            >
              <i className="fa-solid fa-square-minus me-3"></i>
              <span>Subtraction</span>
            </NavLink>
          </li>
          <li style={{ width: "100%" }}>
            <NavLink
              to="/multiply"
              className="list-group-item list-group-item-action py-2 ripple"
            >
              <i className="fa-solid fa-square-xmark me-3"></i>
              <span>Multiplication</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/determinant"
              className="list-group-item list-group-item-action py-2 ripple"
              >
              <i className="fa-solid fa-calculator me-3"></i>
              <span>Determinant</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/minors"
              className="list-group-item list-group-item-action py-2 ripple"
            >
              <i className="fa-solid fa-arrows-to-dot me-3"></i>
              <span>Minors</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/adjoint"
              className="list-group-item list-group-item-action py-2 ripple"
              >
              <i className="fa-solid fa-arrows-to-dot me-3"></i>
              <span>Adjoint</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/inverse"
              className="list-group-item list-group-item-action py-2 ripple"
              >
              <i className="fa-solid fa-i me-4"></i>
              <span>Inverse</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/transpose"
              className="list-group-item list-group-item-action py-2 ripple"
              >
              <i className="fa-solid fa-arrows-rotate me-3"></i>
              <span>Transpose</span>
            </NavLink>
          </li>
        </ul>
      </div>
                </div>
  );
}

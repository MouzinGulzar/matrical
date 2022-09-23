import "./App.css";
import React from "react";
// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Multiply from "./components/Multiply";
import Alert from "./components/Alert";
import Addition from "./components/Addition";
import Subtraction from "./components/Subtraction";
import Transpose from "./components/Transpose";
import Determinant from "./components/Determinant";
import Minors from "./components/Minors";
import Adjoint from "./components/Adjoint";
import Inverse from "./components/Inverse";
import Topbar from "./components/Topbar";

function App() {
  // const [alert, setAlert] = useState(null);

  // const showAlert = (message, type) => {
  //   setAlert({
  //     msg: message,
  //     type: type,
  //   });
  //   setTimeout(() => {
  //     setAlert(null);
  //   }, 2000);
  // };

  return (
    <BrowserRouter>
      <Navbar />
      <Topbar />
      <Alert />
      <Routes>
        <Route path="/" element={<Addition />} />
        <Route path="subtraction" element={<Subtraction />} />
        <Route path="multiply" element={<Multiply />} />
        <Route path="determinant" element={<Determinant />} />
        <Route path="minors" element={<Minors />} />
        <Route path="adjoint" element={<Adjoint />} />
        <Route path="inverse" element={<Inverse /* showAlert={showAlert} */ />} />
        <Route path="transpose" element={<Transpose />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import SVGItem from "./components/SVGItem/SVGItem";

function App() {
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row">
          <nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <p>Options</p>
          </nav>
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
            <SVGItem url="/img/workflow.svg" />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;

import React from "react";
import SVGItem from "./components/SVGItem";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col">
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              defaultValue="Instructions"
            />
          </div>
          <div className="col">
            <SVGItem />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

import React from "react";
import SVGItem from "./components/SVGItem/SVGItem";

const tweens = [
  {
    targetId: "path278",
    method: "from",
    duration: 1,
    vars: {
      scaleX: 0.5
    }
  },
  {
    targetId: "path264",
    method: "from",
    duration: 1,
    vars: {
      scaleX: 0.5
    }
  }
];

function App() {
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row">
          <nav className="col-md-3 d-none d-md-block bg-light sidebar">
            <pre>{JSON.stringify(tweens, null, "  ")}</pre>
          </nav>
          <main role="main" className="col-md-9 ml-sm-auto px-4">
            <SVGItem
              url="/img/workflow.svg"
              tweens={tweens}
              controls={true}
              autoplay={true}
            />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;

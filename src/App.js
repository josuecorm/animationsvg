import React from "react";
import {
  Switch,
  Route,
  Link,
  Redirect,
  BrowserRouter as Router
} from "react-router-dom";
import SVGPage from "./views/SVGPage";
import IntroPage from "./views/IntroPage";
import WorkflowPage from "./views/WorkflowPage";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="container-fluid">
        <div className="row no-gutters">
          <nav className="col-md-3 col-xl-2 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link to="/workflow" className="nav-link">
                    Animated Workflow
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/text" className="nav-link">
                    Animated Text
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <main role="main" className="col-md-9 col-xl-10 ml-sm-auto">
            <Switch>
              <Route exact path="/">
                <Redirect to="/workflow" />
              </Route>
              <Route exact path="/workflow" component={WorkflowPage} />
              <Route exact path="/svg" component={SVGPage} />
              <Route exact path="/text" component={IntroPage} />
            </Switch>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;

import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SVGPage from "./views/SVGPage";

import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="container-fluid">
        <div className="row">
          <nav className="col-md-3 col-xl-2 d-none d-md-block bg-light">
            <div className="sidebar-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Animated SVG
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
          <main role="main" className="col-md-9 col-xl-10 ml-sm-auto px-4">
            <Switch>
              <Route path="/">
                <SVGPage />
              </Route>
              <Route path="/text">
                <SVGPage />
              </Route>
            </Switch>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;

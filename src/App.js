import React, { Component } from "react";
import SVGItem from "./components/SVGItem/SVGItem";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      url: "",
      animationData: []
    };
  }

  async componentDidMount() {
    const response = await fetch("/assets/animation.json");
    const data = await response.json();
    this.setState({
      loading: false,
      url: data.url,
      animationData: data.data
    });
  }

  render() {
    const { loading, url, animationData } = this.state;

    if (loading) return null;

    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row">
            <nav className="col-md-3 d-none d-md-block bg-light sidebar">
              <h4>Animation Data</h4>
              <pre>
                <code>{JSON.stringify(animationData, null, "  ")}</code>
              </pre>
            </nav>
            <main role="main" className="col-md-9 ml-sm-auto px-4">
              <SVGItem url={url} animationData={animationData} controls />
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

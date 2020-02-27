import React, { Component } from "react";
import SVGItem from "../components/SVGItem";

class SVGPage extends Component {
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
      <div className="row">
        <div className="col-md-9">
          <SVGItem url={url} animationData={animationData} controls />
        </div>
        <div className="col-md-3 ml-sm-auto">
          <div
            className="data"
            style={{
              borderLeft: "1px solid #eee",
              paddingLeft: "1rem"
            }}
          >
            <h4>Animation Data</h4>
            <pre>
              <code>{JSON.stringify(animationData, null, "  ")}</code>
            </pre>
          </div>
        </div>
      </div>
    );
  }
}

export default SVGPage;

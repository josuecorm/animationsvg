import React, { Component } from "react";
import workflow from "../images/workflow.svg";
import "./SVGItem.css";

class SVGFile extends Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
    this.svgRef = React.createRef();
  }

  componentDidMount() {}

  handleImageLoaded(event) {
    console.log(event);
  }

  render() {
    return (
      <div className="svg-container">
        <object type="image/svg+xml" data={workflow}>
          SVG File
        </object>
      </div>
    );
  }
}

export default SVGFile;

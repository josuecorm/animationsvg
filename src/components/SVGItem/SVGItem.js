/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from "react";
import { gsap } from "gsap";

import "./SVGItem.css";

class SVGFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoading: true,
      svgHTML: null
    };
    this.svgContainerRef = React.createRef();
  }

  componentDidMount() {
    this.loadFile();
  }

  async loadFile() {
    try {
      const { url } = this.props;

      const response = await fetch(url);
      const data = await response.text();

      this.setState({
        isLoading: false,
        svgHTML: data
      });
    } catch (error) {
      this.setState({
        isLoading: false,
        error: error
      });
    }
  }

  handleClick(event) {
    event.stopPropagation();
    console.log(event.target);
  }

  render() {
    const { isLoading, error, svgHTML } = this.state;

    if (isLoading) return null;
    if (error) return `Something went wrong: ${error.message}`;

    return (
      <div
        className="svg-container"
        onClick={this.handleClick}
        dangerouslySetInnerHTML={{ __html: svgHTML }}
      />
    );
  }
}

export default SVGFile;

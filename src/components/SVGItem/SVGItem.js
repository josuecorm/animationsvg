/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { gsap } from "gsap";

import "./SVGItem.css";

class SVGFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loaded: false,
      svgHTML: null
    };
    this.container = React.createRef();
  }

  componentDidMount() {
    this.loadFile();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.loaded !== prevState.loaded) {
      console.log("componentDidUpdate");
    }
  }

  createTimeline() {
    const { tweens } = this.props;
    const { current } = this.container;

    if (!tweens.length) return;

    const tl = gsap.timeline({ paused: true });

    tweens.forEach(tween => {
      const { method, duration, targetId, vars } = tween;
      const element = current.querySelector(`#${targetId}`);
      if (element) {
        tl[method](element, { ...vars, duration: duration });
      }
    });

    tl.play();
  }

  async loadFile() {
    try {
      const { url } = this.props;

      const response = await fetch(url);
      const data = await response.text();

      this.setState({
        loaded: true,
        svgHTML: data
      });

      this.createTimeline();
    } catch (error) {
      this.setState({
        loaded: false,
        error: error
      });
    }
  }

  // handleClick(event) {
  //   event.stopPropagation();

  //   if (event.target.tagName === "path") {
  //     // console.log(event.target.className);
  //     // event.target.className = "on";
  //     event.target.setAttribute("class", "on");
  //   }
  // }

  render() {
    const { loaded, error, svgHTML } = this.state;

    if (!loaded) return null;
    if (error) return `Something went wrong: ${error.message}`;

    return (
      <div
        className="svg-container"
        onClick={this.handleClick}
        dangerouslySetInnerHTML={{ __html: svgHTML }}
        ref={this.container}
      />
    );
  }
}

export default SVGFile;

SVGFile.propTypes = {
  url: PropTypes.string.isRequired,
  tweens: PropTypes.array
};

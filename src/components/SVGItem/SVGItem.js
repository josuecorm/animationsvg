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
    // this.loadFile();
    this.createNodes();
    // console.log(this.container.current.children);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.loaded !== prevState.loaded) {
      console.log("componentDidUpdate");
    }
  }

  createNodes() {
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
    } catch (error) {
      this.setState({
        loaded: false,
        error: error
      });
    }
  }

  handleClick(event) {
    event.stopPropagation();

    if (event.target.tagName === "path") {
      // console.log(event.target.className);
      // event.target.className = "on";
      event.target.setAttribute("class", "on");
    }
  }

  // render() {
  //   const { loaded, error, svgHTML } = this.state;

  //   if (!loaded) return null;
  //   if (error) return `Something went wrong: ${error.message}`;

  //   return (
  //     <div
  //       className="svg-container"
  //       onClick={this.handleClick}
  //       dangerouslySetInnerHTML={{ __html: svgHTML }}
  //       ref={this.container}
  //     />
  //   );
  // }

  render() {
    return (
      <div className="svg-container" onClick={this.handleClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1632 1056"
          height="1056"
          width="1632"
          id="svg62"
          version="1.1"
          ref={this.container}
        >
          <path
            id="path278"
            className="path"
            d="M 364.61,554.364 H 113.099 v 59.883 H 364.61 Z"
          />
        </svg>
      </div>
    );
  }
}

export default SVGFile;

SVGFile.propTypes = {
  url: PropTypes.string.isRequired,
  tweens: PropTypes.array
};

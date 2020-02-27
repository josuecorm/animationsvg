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
      svgHTML: null,
      currentStepIndex: 0
    };
    this.timeline = null;
    this.container = React.createRef();
  }

  componentDidMount() {
    this.loadFile();
  }

  componentDidUpdate(prevProps, prevState) {
    // SVG nodes has been added to the DOM
    if (this.state.loaded !== prevState.loaded) {
      this.createTimeline();
    }
  }

  createTimeline() {
    const { animationData, controls, autoplay } = this.props;

    if (!animationData.length) return;

    // Create timeline master
    this.timeline = gsap.timeline({
      paused: true,
      ...(controls && { onUpdate: this.updateSlider })
    });

    animationData.forEach(child => {
      const { type, position } = child;
      let gsap = null;

      if (type === "group" && child.children && child.children.length) {
        gsap = child.children.map(item => this.createTweenFromData(item));
      } else {
        gsap = this.createTweenFromData(child);
      }

      if (gsap) this.timeline.add(gsap, position || "+=0");
    });

    // Once created play if prop set
    if (autoplay) this.timeline.play();
  }

  // TODO: validate each selector
  createTweenFromData(data) {
    const { type, targets, vars } = data;
    const { current } = this.container;
    
    if (!targets || !vars) return null;
    
    // Validate target exits
    if(!current.querySelectorAll(targets).length) return null

    switch (type) {
      case "set":
        return gsap.set(targets, vars);
      case "to":
        return gsap.to(targets, vars);
      case "from":
        return gsap.from(targets, vars);
      case "fromTo":
        return gsap.fromTo(targets, vars.from, vars.to);
      default:
        return null;
    }
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

  handleInputChange = event => {
    const { value } = event.currentTarget;

    if (this.timeline) {
      this.timeline.progress(value).pause();
      this.setState({ currentStepIndex: value });
    }
  };

  updateSlider = () => {
    if (this.timeline) {
      this.setState({ currentStepIndex: this.timeline.progress() });
    }
  };

  render() {
    const { controls } = this.props;
    const { loaded, error, svgHTML, currentStepIndex } = this.state;

    if (!loaded) return null;
    if (error) return `Something went wrong: ${error.message}`;

    return (
      <div className="svg-wrapper">
        <div
          ref={this.container}
          className="svg-container"
          onClick={this.handleClick}
          dangerouslySetInnerHTML={{ __html: svgHTML }}
        />

        {/* Show Timeline Controls */}
        {controls && (
          <div className="svg-controls">
            <input
              type="range"
              className="custom-range"
              id="customRange1"
              min="0"
              max="1"
              step=".001"
              value={currentStepIndex}
              onChange={this.handleInputChange}
            />
            <div className="btn-group" role="group" aria-label="Basic example">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  if (this.timeline.progress() !== 1) {
                    this.timeline.play();
                  } else {
                    this.timeline.restart();
                  }
                }}
              >
                play
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => this.timeline.pause()}
              >
                pause
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => this.timeline.reverse()}
              >
                reverse
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => this.timeline.restart()}
              >
                restart
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

SVGFile.propTypes = {
  url: PropTypes.string.isRequired,
  animationData: PropTypes.array,
  controls: PropTypes.bool,
  autoplay: PropTypes.bool
};

export default SVGFile;

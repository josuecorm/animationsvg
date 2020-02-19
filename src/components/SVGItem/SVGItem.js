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
    if (this.state.loaded !== prevState.loaded) {
      console.log("componentDidUpdate");
    }
  }

  createTimeline() {
    const { tweens, controls, autoplay } = this.props;
    const { current } = this.container;

    if (!tweens.length) return;

    const tweenArray = [];

    this.timeline = gsap.timeline({
      paused: true,
      ...(this.props.controls && { onUpdate: this.updateSlider })
    });

    tweens.forEach(tween => {
      const { method, duration, targetId, vars } = tween;
      const element = current.querySelector(`#${targetId}`);
      if (element && vars) {
        tweenArray.push(gsap[method](element, { ...vars, duration: duration }));
      }
    });

    this.timeline.add(tweenArray);

    if (autoplay) this.timeline.play();
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

  handleClick(event) {
    event.stopPropagation();

    if (event.target.tagName === "path") {
      // console.log(event.target.className);
      // event.target.className = "on";
      event.target.setAttribute("class", "on");
    }
  }

  handleInputChange = event => {
    const { value } = event.currentTarget;

    if (this.timeline) {
      this.timeline.progress(value).pause();
    }

    this.setState({ currentStepIndex: value });
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
      <div className="wrapper">
        <div
          className="svg-container"
          onClick={this.handleClick}
          dangerouslySetInnerHTML={{ __html: svgHTML }}
          ref={this.container}
        />
        {controls && (
          <div className="controls">
            <input
              type="range"
              className="custom-range"
              id="customRange1"
              min="0"
              max="1"
              step=".001"
              value={currentStepIndex}
              onChange={this.handleInputChange}
            ></input>
            <div className="btn-group" role="group" aria-label="Basic example">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => this.timeline.play()}
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

export default SVGFile;

SVGFile.propTypes = {
  url: PropTypes.string.isRequired,
  tweens: PropTypes.array,
  controls: PropTypes.bool,
  autoplay: PropTypes.bool
};

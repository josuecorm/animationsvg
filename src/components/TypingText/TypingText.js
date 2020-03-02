import React, { Component } from "react";
import { gsap } from "gsap";

class TypingText extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.container = React.createRef();
    this.cursor = React.createRef();
    this.chars = [];
    this.resizeId = null;
    this.timeline = null;
    this.cursorAnimation = null;
    this.timelineProgress = 0;
    this.handleWindowResize = this.handleWindowResize.bind(this);
  }

  componentDidMount() {
    this.handleWindowResize();
    window.addEventListener("resize", this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
  }

  handleWindowResize() {
    this.destroyTimeline();
    // debounce
    clearTimeout(this.resizeId);
    this.resizeId = setTimeout(() => {
      this.createTimeline();
    }, 500);
  }

  destroyTimeline() {
    if (!this.timeline) return;

    this.timelineProgress = this.timeline.progress();
    this.timeline.kill();
    this.timeline = null;
    this.cursorAnimation.kill();
    this.cursorAnimation = null;
    this.cursor.current.removeAttribute("style");
    this.container.current.removeAttribute("style");
  }

  createTimeline() {
    const parentRec = this.container.current.getBoundingClientRect();
    const cursorRec = this.cursor.current.getBoundingClientRect();

    // Set container height
    gsap.set(this.container.current, {
      width: parentRec.width,
      height: parentRec.height
    });

    // Set cursor
    gsap.set(this.cursor.current, {
      position: "absolute",
      top: 0,
      left: 0,
      width: cursorRec.width,
      height: cursorRec.height,
      autoAlpha: 1
    });

    // Create cursor animation
    this.cursorAnimation = gsap.fromTo(
      this.cursor.current,
      { autoAlpha: 0 },
      { autoAlpha: 1, repeat: -1, ease: "steps(1)", duration: 0.5 }
    );

    // Hide characters
    gsap.set(this.chars, { autoAlpha: 0 });

    // Create timeline
    this.timeline = gsap.timeline({
      paused: true,
      repeatDelay: 3,
      repeat: -1
    });

    this.chars.forEach((char, index) => {
      const charRec = char.getBoundingClientRect();

      const coords = {
        top: charRec.top - parentRec.top,
        left: charRec.left - parentRec.left + charRec.width
      };
      const position = (index + 1) * 0.1;
      this.timeline.set(this.cursor.current, coords, position);
      this.timeline.set(char, { autoAlpha: 1 }, position);
    });

    this.timeline.progress(this.timelineProgress);
    this.timeline.play();
  }

  randomBgColor() {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 0.5)`;
  }

  render() {
    const { text, className } = this.props;
    const words = text.split(" ");
    return (
      <div
        className={className}
        ref={this.container}
        // style={{ background: "rgba(250, 235, 215, 0.5)" }}
      >
        {words.map((word, index) => (
          <React.Fragment key={`${word}${index}`}>
            <span className="word">
              {word.split("").map((char, subindex) => (
                <span
                  key={`${word}${char}${subindex}`}
                  ref={span => this.chars.push(span)}
                  className="char"
                  // style={{ background: this.randomBgColor() }}
                >
                  {char}
                </span>
              ))}
            </span>
            {index < words.length - 1 ? " " : ""}
          </React.Fragment>
        ))}
        <span
          className="cursor"
          ref={this.cursor}
          // style={{ background: "aqua" }}
        >
          |
        </span>
      </div>
    );
  }
}

export default TypingText;

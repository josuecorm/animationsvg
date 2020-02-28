import React, { Component } from "react";
import { gsap } from "gsap";

class TypingText extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.container = React.createRef();
    this.cursor = React.createRef();
    this.words = [];
    this.chars = [];
    this.resizeId = null;
    this.timeline = null;
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
    clearTimeout(this.resizeId);
    this.resizeId = setTimeout(() => {
      this.createTimeline();
    }, 500);
  }

  destroyTimeline() {
    console.log("destroyTimeline");
    if (!this.timeline) return;

    this.timelineProgress = this.timeline.progress();
    this.timeline.kill();
    this.timeline = null;
    gsap.set(this.chars, { autoAlpha: 1 });
    gsap.set(this.cursor.current, { autoAlpha: 0 });
    this.container.current.removeAttribute("style");
  }

  createTimeline() {
    console.log("createTimeline2");
    const parentRec = this.container.current.getBoundingClientRect();
    const cursorRec = this.cursor.current.getBoundingClientRect();

    // Set container height
    gsap.set(this.container.current, {
      width: parentRec.width,
      height: parentRec.height
    });

    // Positionar to start
    gsap.set(this.cursor.current, {
      position: "absolute",
      top: 0,
      left: 0,
      width: cursorRec.width,
      height: cursorRec.height,
      autoAlpha: 1
    });

    // Hide characters
    gsap.set(this.chars, { autoAlpha: 0 });

    // Create animation
    this.timeline = gsap.timeline({
      paused: true,
      repeatDelay: 3,
      repeat: -1
    });

    this.chars.forEach((char, index) => {
      // const charWidth = char.offsetWidth;
      const charRec = char.getBoundingClientRect();

      const coords = {
        top: charRec.top - parentRec.top,
        left: charRec.left - parentRec.left + charRec.width
      };
      const position = (index + 1) * 0.2;
      this.timeline.set(this.cursor.current, coords, position);
      this.timeline.set(char, { autoAlpha: 1 }, position);
    });

    // this.timeline.staggerTo(this.chars, 0, { autoAlpha: 1 }, 0.1);
    this.timeline.progress(this.timelineProgress);
    this.timeline.play();
  }

  randomBgColor() {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 0.5)`;
  }

  createTimeline2() {
    const parentRec = this.container.getBoundingClientRect();
    const cursorRec = this.cursor.current.getBoundingClientRect();

    gsap.set(this.chars, { autoAlpha: 0 });

    gsap.set(this.cursor.current, {
      position: "absolute",
      top: 0,
      left: 0,
      width: cursorRec.width,
      height: cursorRec.height
    });

    // const char = this.chars[8];
    // const parentRec = this.container.getBoundingClientRect();
    // const charRec = char.getBoundingClientRect();
    // console.log("charRec", charRec);
    // const coords = {
    //   top: charRec.top - parentRec.top,
    //   left: charRec.left - parentRec.left + charRec.width
    // };

    this.chars.forEach((char, index) => {
      // const charWidth = char.offsetWidth;
      const charRec = char.getBoundingClientRect();

      const coords = {
        top: charRec.top - parentRec.top,
        left: charRec.left - parentRec.left + charRec.width
      };
      const position = (index + 1) * 0.2;
      this.timeline.set(this.cursor.current, coords, position);
      this.timeline.set(char, { autoAlpha: 1 }, position);
    });

    // this.timeline.staggerTo(this.chars, 0, { autoAlpha: 1 }, 0.1);
    this.timeline.play();
  }

  render() {
    const { text, className } = this.props;
    const words = text.split(" ");
    return (
      <div className={className} ref={this.container}>
        {words.map((word, index) => (
          <React.Fragment key={`${word}${index}`}>
            <span className="word" ref={span => this.words.push(span)}>
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

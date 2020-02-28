import React, { Component } from "react";
import { gsap } from "gsap";

class TypingText extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.container = null;
    this.cursor = React.createRef();
    this.words = [];
    this.chars = [];
    this.timeline = gsap.timeline({
      paused: true,
      repeatDelay: 3,
      repeat: -1
    });
  }

  componentDidMount() {
    setTimeout(() => {
      this.createTimeline();
    }, 200);
  }

  // updateDimensions() {
  //   if (window.innerWidth < 500) {
  //     this.setState({ width: 450, height: 102 });
  //   } else {
  //     let update_width = window.innerWidth - 100;
  //     let update_height = Math.round(update_width / 4.4);
  //     this.setState({ width: update_width, height: update_height });
  //   }
  // }

  // componentDidMount() {
  //   this.updateDimensions();
  //   window.addEventListener("resize", this.updateDimensions.bind(this));
  // }

  // componentWillUnmount() {
  //   window.removeEventListener("resize", this.updateDimensions.bind(this));
  // }

  randomBgColor() {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 0.5)`;
  }

  createTimeline() {
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
    return (
      <div className={className} ref={div => (this.container = div)}>
        {text.split(" ").map((word, index) => (
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
            {index < text.split(" ").length - 1 ? " " : ""}
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

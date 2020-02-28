import React, { Component } from "react";
import { gsap } from "gsap";

class TypingText extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.words = [];
    this.chars = [];
    this.animation = gsap.timeline({
      paused: true,
      repeatDelay: 3,
      repeat: -1
    });
  }

  componentDidMount() {
    gsap.set(this.chars, { autoAlpha: 0 });
    this.animation.staggerTo(this.chars, 0, { autoAlpha: 1 }, 0.1);
    this.animation.play();
  }

  render() {
    const { text, className } = this.props;
    return (
      <div className={className}>
        {text.split(" ").map((word, index) => (
          <React.Fragment key={`${word}${index}`}>
            <div
              style={{
                position: "relative",
                display: "inline-block"
              }}
              ref={div => this.words.push(div)}
            >
              {word.split("").map((char, subindex) => (
                <div
                  key={`${word}${char}${subindex}`}
                  ref={div => this.chars.push(div)}
                  style={{
                    position: "relative",
                    display: "inline-block"
                  }}
                >
                  {char}
                </div>
              ))}
            </div>{" "}
          </React.Fragment>
        ))}
      </div>
    );
  }
}

export default TypingText;

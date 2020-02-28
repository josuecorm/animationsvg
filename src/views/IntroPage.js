import React from "react";
import TypingTextItem from "../components/TypingText";

const TypingText = () => {
  return (
    <div
      className="slide-item"
      style={{ backgroundImage: "url(img/intro-slide-1.jpg)" }}
    >
      <div className="row no-gutters h-100">
        <div className="slider-content col-sm-6 align-self-start h-100">
          <div className="row no-gutters h-100 justify-content-md-center">
            <div className="col-sm-8 align-self-center">
              <h2 className="mb-4">I want my CMS to:</h2>
              <TypingTextItem
                text="Increase my content's ROI"
                className="typing-text mb-4"
              />
              <p>
                From creation to delivery, Arc’s hosted suite of digital-first,
                end-to-end tools puts me in control of my content—improving
                performance and increasing our audience engagement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingText;

import React, { Component } from "react";
import PropTypes from "prop-types";
import { gsap } from "gsap";
import "./AnimatedWorkflow.css";

const ANIMATIONDATA = [
  {
    type: "group",
    children: [
      {
        targets: "#path278",
        type: "from",
        vars: {
          scaleX: 0.3,
          opacity: 0.3,
          duration: 3,
          ease: "Back.easeOut"
        }
      },
      {
        targets: "#path264",
        type: "from",
        vars: {
          x: "-176px",
          scaleX: 0,
          opacity: 0.3,
          duration: 3,
          ease: "Back.easeOut"
        }
      },
      {
        targets: "#g266",
        type: "from",
        vars: {
          x: "-313px",
          opacity: 0.3,
          duration: 3,
          ease: "Back.easeOut"
        }
      },
      {
        targets: "#g446",
        type: "from",
        vars: {
          scale: 0,
          opacity: 0.3,
          duration: 2,
          ease: "back.out(2)",
          transformOrigin: "center"
        }
      },
      {
        targets: ["#path438", "#path440", "#path442", "#path444"],
        type: "from",
        vars: {
          scaleX: 0,
          opacity: 0.3,
          duration: 1
        }
      }
    ]
  },
  {
    type: "group",
    position: 2,
    children: [
      {
        targets: "#path154",
        type: "from",
        vars: {
          scaleX: 0.32,
          opacity: 0.3,
          duration: 3
        }
      },
      {
        targets: "#path152",
        type: "from",
        vars: {
          x: "-129px",
          scaleX: 0.1,
          opacity: 0.3,
          duration: 3
        }
      },
      {
        targets: "#path150",
        type: "from",
        vars: {
          x: "-327px",
          scaleX: 0.1,
          opacity: 0.3,
          duration: 3
        }
      },
      {
        targets: ["#path430", "#path432", "#path434", "#path436"],
        type: "from",
        vars: {
          scaleX: 0,
          opacity: 0.3,
          duration: 1
        }
      }
    ]
  },
  {
    type: "group",
    position: 4,
    children: [
      {
        targets: ["#path126", "#path112", "#path124"],
        type: "from",
        vars: {
          opacity: 0.7,
          duration: 1
        }
      },
      {
        targets: "#path112",
        type: "from",
        vars: {
          scaleX: 0,
          duration: 1,
          ease: "back.out(1.7)"
        }
      },
      {
        targets: "#path124",
        type: "from",
        vars: {
          x: "-150px",
          duration: 1,
          ease: "back.out(1.7)"
        }
      },
      {
        targets: "#g485",
        type: "from",
        vars: {
          scale: 0,
          opacity: 0.3,
          duration: 2,
          ease: "back.out(3)",
          transformOrigin: "center"
        }
      }
    ]
  },
  {
    type: "group",
    children: [
      {
        targets: ["#path438", "#path440", "#path442", "#path444"],
        type: "to",
        vars: {
          fill: "#61c3ae",
          duration: 1
        }
      },
      {
        targets: ["#path430", "#path432", "#path434", "#path436"],
        type: "to",
        vars: {
          fill: "#aec6d6",
          duration: 1
        }
      },
      {
        targets: "#path392",
        type: "to",
        vars: {
          fill: "#ed4a2f",
          duration: 1
        }
      },
      {
        targets: ["#path460", "#path456"],
        type: "to",
        vars: {
          fill: "#1882bf",
          duration: 1
        }
      },
      {
        targets: [
          "#path396",
          "#path400",
          "#path404",
          "#path408",
          "#path412",
          "#path416",
          "#path420",
          "#path424",
          "#path428"
        ],
        type: "to",
        vars: {
          stroke: "#ffffff",
          duration: 1
        }
      }
    ]
  }
];

class AnimatedWorkflow extends Component {
  constructor(props) {
    super(props);
    this.timeline = null;
    this.container = React.createRef();
  }

  componentDidMount() {
    this.createTimeline();
  }

  createTimeline() {
    const { autoplay, repeat, repeatDelay } = this.props;

    if (!ANIMATIONDATA.length) return;

    // Create timeline master
    this.timeline = gsap.timeline({
      paused: true,
      ...(repeat && { yoyo: true, repeat: -1, repeatDelay })
    });

    // Create and add tweens to timeline
    ANIMATIONDATA.forEach(item => {
      const { type, position } = item;
      let gsap = null;

      if (type === "group" && item.children && item.children.length) {
        gsap = item.children.map(item => this.createTweenFromData(item));
      } else {
        gsap = this.createTweenFromData(item);
      }

      if (gsap) this.timeline.add(gsap, position || "+=0");
    });

    // Once timeline created play if prop
    if (autoplay) this.timeline.play();
  }

  // TODO: Validate each target selector
  createTweenFromData(data) {
    const { type, targets, vars } = data;

    if (!targets || !vars) return null;

    // Validate target node exits
    if (!this.container.current.querySelectorAll(targets).length) return null;

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

  render() {
    return (
      <div className="svg-container" ref={this.container}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 1632 1056"
          height="1056"
          width="1632"
          xmlSpace="preserve"
          id="svg62"
          version="1.1"
        >
          <defs id="defs66">
            <clipPath id="clipPath98" clipPathUnits="userSpaceOnUse">
              <path id="path96" d="M0 792h1224V0H0z" />
            </clipPath>
            <clipPath id="clipPath120" clipPathUnits="userSpaceOnUse">
              <path id="path118" d="M0 792h1224V0H0z" />
            </clipPath>
            <clipPath id="clipPath140" clipPathUnits="userSpaceOnUse">
              <path id="path138" d="M0 792h1224V0H0z" />
            </clipPath>
            <clipPath id="clipPath182" clipPathUnits="userSpaceOnUse">
              <path id="path180" d="M0 792h1224V0H0z" />
            </clipPath>
            <clipPath id="clipPath212" clipPathUnits="userSpaceOnUse">
              <path id="path210" d="M0 792h1224V0H0z" />
            </clipPath>
            <clipPath id="clipPath272" clipPathUnits="userSpaceOnUse">
              <path id="path270" d="M0 792h1224V0H0z" />
            </clipPath>
            <clipPath id="clipPath286" clipPathUnits="userSpaceOnUse">
              <path id="path284" d="M0 792h1224V0H0z" />
            </clipPath>
            <clipPath id="clipPath326" clipPathUnits="userSpaceOnUse">
              <path id="path324" d="M0 792h1224V0H0z" />
            </clipPath>
            <clipPath id="clipPath336" clipPathUnits="userSpaceOnUse">
              <path id="path334" d="M516.72 82.617h582.24V-.424H516.72z" />
            </clipPath>
            <clipPath id="clipPath340" clipPathUnits="userSpaceOnUse">
              <path id="path338" d="M516.72 82.617h582.24V-.424H516.72z" />
            </clipPath>
            <clipPath id="clipPath452" clipPathUnits="userSpaceOnUse">
              <path id="path450" d="M0 792h1224V0H0z" />
            </clipPath>
            <clipPath id="clipPath468" clipPathUnits="userSpaceOnUse">
              <path id="path466" d="M0 792h1224V0H0z" />
            </clipPath>
            <linearGradient
              id="linearGradient88"
              spreadMethod="pad"
              gradientTransform="matrix(391.39639 0 0 -391.39639 372.45 298.158)"
              gradientUnits="userSpaceOnUse"
              y2="0"
              x2="1"
              y1="0"
              x1="0"
            >
              <stop
                id="stop84"
                offset="0"
                stopOpacity="1"
                stopColor="#dde0e6"
              />
              <stop
                id="stop86"
                offset="1"
                stopOpacity="1"
                stopColor="#cbcfd4"
              />
            </linearGradient>
            <linearGradient
              id="linearGradient172"
              spreadMethod="pad"
              gradientTransform="matrix(262.49673 0 0 -262.49673 116.15 511.92)"
              gradientUnits="userSpaceOnUse"
              y2="0"
              x2="1"
              y1="0"
              x1="0"
            >
              <stop
                id="stop168"
                offset="0"
                stopOpacity="1"
                stopColor="#dde0e6"
              />
              <stop
                id="stop170"
                offset="1"
                stopOpacity="1"
                stopColor="#cbcfd4"
              />
            </linearGradient>
            <linearGradient
              id="linearGradient316"
              spreadMethod="pad"
              gradientTransform="matrix(511.4631 0 0 -511.4631 552.786 204.424)"
              gradientUnits="userSpaceOnUse"
              y2="0"
              x2="1"
              y1="0"
              x1="0"
            >
              <stop
                id="stop312"
                offset="0"
                stopOpacity="1"
                stopColor="#dde0e6"
              />
              <stop
                id="stop314"
                offset="1"
                stopOpacity="1"
                stopColor="#cbcfd4"
              />
            </linearGradient>
            <linearGradient
              id="linearGradient388"
              spreadMethod="pad"
              gradientTransform="matrix(561.17603 0 0 -561.17603 527.93 35.799)"
              gradientUnits="userSpaceOnUse"
              y2="0"
              x2="1"
              y1="0"
              x1="0"
            >
              <stop
                id="stop384"
                offset="0"
                stopOpacity="1"
                stopColor="#dde0e6"
              />
              <stop
                id="stop386"
                offset="1"
                stopOpacity="1"
                stopColor="#cbcfd4"
              />
            </linearGradient>
            <mask
              id="mask342"
              height="1"
              width="1"
              y="0"
              x="0"
              maskUnits="userSpaceOnUse"
            >
              <g id="g352">
                <g id="g350" clipPath="url(#clipPath340)">
                  <g id="g348">
                    <g
                      id="g346"
                      transform="matrix(582.23999 0 0 83.04 516.72 -.424)"
                    >
                      <image
                        id="image344"
                        xlinkHref="data:image/png;base64,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"
                        transform="matrix(1 0 0 -1 0 1)"
                        preserveAspectRatio="none"
                        height="1"
                        width="1"
                        imageRendering="optimizeSpeed"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </mask>
            <mask
              id="mask354"
              height="1"
              width="1"
              y="0"
              x="0"
              maskUnits="userSpaceOnUse"
            >
              <image
                id="image356"
                xlinkHref="data:image/png;base64,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"
                preserveAspectRatio="none"
                height="1"
                width="1"
                imageRendering="optimizeSpeed"
              />
            </mask>
          </defs>
          <g transform="matrix(1.33333 0 0 -1.33333 0 1056)" id="g70">
            <g id="g72">
              <g id="g74">
                <g id="g80">
                  <g id="g82">
                    <path
                      id="path90"
                      d="M389.838 328.099c-9.564 0-17.388-7.825-17.388-17.388v-25.107c0-9.563 7.824-17.388 17.388-17.388h356.62c9.564 0 17.387 7.825 17.387 17.388v25.107c0 9.563-7.823 17.388-17.387 17.388z"
                      fill="url(#linearGradient88)"
                      stroke="none"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g id="g92">
              <g clipPath="url(#clipPath98)" id="g94">
                <g transform="translate(347.222 268.216)" id="g100">
                  <path
                    id="path102"
                    d="M0 0h-68.851c-9.563 0-17.388 7.825-17.388 17.389v25.106c0 9.564 7.825 17.388 17.388 17.388H0c9.563 0 17.388-7.824 17.388-17.388V17.389C17.388 7.825 9.563 0 0 0"
                    fill="#dde0e6"
                    fillOpacity="1"
                    fillRule="nonzero"
                    stroke="none"
                  />
                </g>
                <g transform="translate(413.301 299.356)" id="g104">
                  <path
                    id="path106"
                    d="M0 0c0-5.885-4.771-10.656-10.656-10.656-5.885 0-10.656 4.771-10.656 10.656 0 5.886 4.771 10.656 10.656 10.656C-4.771 10.656 0 5.886 0 0"
                    fill="#fff"
                    fillOpacity="1"
                    fillRule="nonzero"
                    stroke="none"
                  />
                </g>
                <g transform="translate(304.05 299.356)" id="g108">
                  <path
                    id="path110"
                    d="M0 0c0-5.885-4.771-10.656-10.656-10.656-5.886 0-10.656 4.771-10.656 10.656 0 5.886 4.77 10.656 10.656 10.656C-4.771 10.656 0 5.886 0 0"
                    fill="#fff"
                    fillOpacity="1"
                    fillRule="nonzero"
                    stroke="none"
                  />
                </g>
              </g>
            </g>
            <path
              id="path112"
              d="M650.637 338.905h-151.35v59.883h151.35z"
              fill="#ed4a2f"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
            />
            <g id="g114">
              <g clipPath="url(#clipPath120)" id="g116">
                <g transform="translate(650.637 338.905)" id="g122">
                  <path
                    id="path124"
                    d="M0 0h1.14c15.034 0 27.222 13.405 27.222 29.941 0 16.537-12.188 29.942-27.222 29.942H0z"
                    fill="#ed4a2f"
                    fillOpacity="1"
                    fillRule="nonzero"
                    stroke="none"
                  />
                </g>
              </g>
            </g>
            <path
              id="path126"
              d="M499.143 338.905H439.26v59.883h59.883z"
              fill="#244363"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
            />
            <path
              id="path128"
              d="M1033.923 479.562H897.811v32.359h136.112z"
              fill="#dde0e6"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
            />
            <path
              id="path130"
              d="M1033.923 436.851H960.22v32.358h73.703z"
              fill="#aec6d6"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
            />
            <path
              id="path132"
              d="M1033.923 394.737H897.811v32.359h136.112z"
              fill="#dde0e6"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
            />
            <g id="g134">
              <g clipPath="url(#clipPath140)" id="g136">
                <g transform="translate(943.734 468.707)" id="g142">
                  <path
                    id="path144"
                    d="M0 0v-3.135c0-.738-.709-1.107-2.121-1.107-1.415 0-2.891-.83-4.427-2.489-1.538-1.66-2.306-4.09-2.306-7.286l.37-2.213c.613.614 1.904.922 3.874.922 1.964 0 3.716-.801 5.256-2.398 1.535-1.599 2.304-3.627 2.304-6.086 0-2.46-.829-4.518-2.49-6.178-1.659-1.66-3.904-2.49-6.731-2.49-2.83 0-5.135 1.167-6.917 3.504-1.784 2.334-2.674 6.3-2.674 11.896 0 5.594 1.352 10.02 4.058 13.279C-9.101-.524-5.597 1.107-1.291 1.107-.433 1.107 0 .738 0 0m-30.062 0v-3.135c0-.738-.71-1.107-2.122-1.107-1.415 0-2.891-.83-4.426-2.489-1.539-1.66-2.306-4.09-2.306-7.286l.369-2.213c.738.614 2.09.922 4.058.922 1.966 0 3.717-.769 5.256-2.305 1.536-1.539 2.305-3.568 2.305-6.087 0-2.521-.861-4.61-2.582-6.27-1.722-1.66-3.997-2.49-6.824-2.49-2.83 0-5.136 1.167-6.916 3.504-1.784 2.334-2.674 6.3-2.674 11.896 0 5.594 1.383 10.02 4.15 13.279 2.765 3.257 6.239 4.888 10.42 4.888.859 0 1.292-.369 1.292-1.107"
                    fill="#1882bf"
                    fillOpacity="1"
                    fillRule="nonzero"
                    stroke="none"
                  />
                </g>
                <g transform="translate(1084.974 501.67)" id="g146">
                  <path
                    id="path148"
                    d="M0 0c2.755-2.758 4.132-6.103 4.132-10.038 0-3.939-1.377-7.232-4.132-9.89-2.758-2.656-6.103-3.985-10.038-3.985-3.939 0-7.232 1.329-9.89 3.985-2.658 2.658-3.987 5.951-3.987 9.89 0 3.935 1.329 7.28 3.987 10.038 2.658 2.755 5.951 4.134 9.89 4.134C-6.103 4.134-2.758 2.755 0 0m-19.189-105.463v5.019c0 1.182 1.081 1.773 3.249 1.773 2.161 0 4.473 1.327 6.937 3.985 2.458 2.656 3.691 6.544 3.691 11.661l-.59 3.543c-.991-.982-3.055-1.476-6.201-1.476-3.151 0-5.958 1.282-8.415 3.837-2.464 2.556-3.69 5.803-3.69 9.743 0 3.935 1.329 7.233 3.986 9.89 2.656 2.657 6.245 3.985 10.775 3.985 4.525 0 8.266-1.872 11.218-5.609 2.952-3.741 4.428-10.089 4.428-19.041 0-8.954-2.212-15.99-6.64-21.109-4.43-5.115-10.09-7.676-16.977-7.676-1.181 0-1.771.493-1.771 1.475"
                    fill="#dde0e6"
                    fillOpacity="1"
                    fillRule="nonzero"
                    stroke="none"
                  />
                </g>
              </g>
            </g>
            <path
              id="path150"
              d="M868.589 409.595H722.831v59.882h145.758z"
              fill="#aec6d6"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
            />
            <path
              id="path152"
              d="M722.831 409.595h-220.46v59.882h220.46z"
              fill="#1882bf"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
            />
            <path
              id="path154"
              d="M502.371 409.595H312.797v59.882h189.574z"
              fill="#fcbc70"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
            />
            <g id="g156">
              <g id="g158">
                <g id="g164">
                  <g id="g166">
                    <path
                      id="path174"
                      d="M145.237 541.862c-15.035 0-27.223-13.405-27.223-29.942 0-16.536 12.188-29.94 27.223-29.94h267.059v59.882z"
                      fill="url(#linearGradient172)"
                      stroke="none"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g id="g176">
              <g clipPath="url(#clipPath182)" id="g178">
                <path
                  id="path184"
                  d="M610.494 482.626H422.322v59.882h188.172z"
                  fill="#c6c8cb"
                  fillOpacity="1"
                  fillRule="nonzero"
                  stroke="none"
                />
                <g transform="translate(627.23 542.508)" id="g186">
                  <path
                    id="path188"
                    d="M0 0v-59.882"
                    fill="none"
                    stroke="#f1f1f2"
                    strokeWidth="2"
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                    strokeMiterlimit="10"
                    strokeDasharray="none"
                    strokeOpacity="1"
                  />
                </g>
                <g transform="translate(648.035 542.508)" id="g190">
                  <path
                    id="path192"
                    d="M0 0v-59.882"
                    fill="none"
                    stroke="#f1f1f2"
                    strokeWidth="2"
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                    strokeMiterlimit="10"
                    strokeDasharray="none"
                    strokeOpacity="1"
                  />
                </g>
                <g transform="translate(666.944 542.508)" id="g194">
                  <path
                    id="path196"
                    d="M0 0v-59.882"
                    fill="none"
                    stroke="#f1f1f2"
                    strokeWidth="2"
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                    strokeMiterlimit="10"
                    strokeDasharray="none"
                    strokeOpacity="1"
                  />
                </g>
                <g transform="translate(687.276 542.508)" id="g198">
                  <path
                    id="path200"
                    d="M0 0v-59.882"
                    fill="none"
                    stroke="#f1f1f2"
                    strokeWidth="2"
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                    strokeMiterlimit="10"
                    strokeDasharray="none"
                    strokeOpacity="1"
                  />
                </g>
              </g>
            </g>
            <g transform="translate(689.62 599.66)" id="g202">
              <path
                id="path204"
                d="M0 0h75.915"
                fill="none"
                stroke="#dde0e6"
                strokeWidth="1"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeMiterlimit="10"
                strokeDasharray="none"
                strokeOpacity="1"
              />
            </g>
            <g id="g206">
              <g clipPath="url(#clipPath212)" id="g208">
                <g transform="translate(880.445 559.619)" id="g214">
                  <path
                    id="path216"
                    d="M0 0h-106.088c-4.873 0-8.823 4.825-8.823 10.778v52.081c0 5.953 3.95 10.778 8.823 10.778h48.699c1.93 0 3.806.772 5.341 2.199l11.741 10.907c1.536 1.426 3.412 2.199 5.342 2.199H0c4.873 0 8.823-4.826 8.823-10.778V10.778C8.823 4.825 4.873 0 0 0"
                    fill="#dde0e6"
                    fillOpacity="1"
                    fillRule="nonzero"
                    stroke="none"
                  />
                </g>
                <g transform="translate(854.002 596.516)" id="g218">
                  <path
                    id="path220"
                    d="M0 0c0-14.691-11.909-26.601-26.601-26.601-14.691 0-26.6 11.91-26.6 26.601 0 14.691 11.909 26.6 26.6 26.6C-11.909 26.6 0 14.691 0 0"
                    fill="#fff"
                    fillOpacity="1"
                    fillRule="nonzero"
                    stroke="none"
                  />
                </g>
                <g transform="translate(842.364 596.516)" id="g222">
                  <path
                    id="path224"
                    d="M0 0c0-8.264-6.699-14.963-14.963-14.963S-29.926-8.264-29.926 0s6.699 14.963 14.963 14.963S0 8.264 0 0"
                    fill="#61c3ae"
                    fillOpacity="1"
                    fillRule="nonzero"
                    stroke="none"
                  />
                </g>
                <path
                  id="path226"
                  d="M565.885 648.561h123.734v-88.942H565.885z"
                  fill="#dde0e6"
                  fillOpacity="1"
                  fillRule="nonzero"
                  stroke="none"
                />
                <g transform="translate(589.143 627.896)" id="g228">
                  <path
                    id="path230"
                    d="M0 0h77.431"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="1"
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                    strokeMiterlimit="10"
                    strokeDasharray="none"
                    strokeOpacity="1"
                  />
                </g>
                <g transform="translate(589.143 617.091)" id="g232">
                  <path
                    id="path234"
                    d="M0 0h77.431"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="1"
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                    strokeMiterlimit="10"
                    strokeDasharray="none"
                    strokeOpacity="1"
                  />
                </g>
                <g transform="translate(589.143 606.095)" id="g236">
                  <path
                    id="path238"
                    d="M0 0h16.789"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="1"
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                    strokeMiterlimit="10"
                    strokeDasharray="none"
                    strokeOpacity="1"
                  />
                </g>
                <g transform="translate(649.784 585.203)" id="g240">
                  <path
                    id="path242"
                    d="M0 0h16.789"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="1"
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                    strokeMiterlimit="10"
                    strokeDasharray="none"
                    strokeOpacity="1"
                  />
                </g>
                <g transform="translate(657.715 595.518)" id="g244">
                  <path
                    id="path246"
                    d="M0 0h8.394"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="1"
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                    strokeMiterlimit="10"
                    strokeDasharray="none"
                    strokeOpacity="1"
                  />
                </g>
                <g transform="translate(589.143 595.102)" id="g248">
                  <path
                    id="path250"
                    d="M0 0h28.601"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="1"
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                    strokeMiterlimit="10"
                    strokeDasharray="none"
                    strokeOpacity="1"
                  />
                </g>
                <g transform="translate(622.823 595.102)" id="g252">
                  <path
                    id="path254"
                    d="M0 0h28.601"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="1"
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                    strokeMiterlimit="10"
                    strokeDasharray="none"
                    strokeOpacity="1"
                  />
                </g>
                <g transform="translate(612.6 606.095)" id="g256">
                  <path
                    id="path258"
                    d="M0 0h53.973"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="1"
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                    strokeMiterlimit="10"
                    strokeDasharray="none"
                    strokeOpacity="1"
                  />
                </g>
                <g transform="translate(589.143 585.203)" id="g260">
                  <path
                    id="path262"
                    d="M0 0h53.973"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="1"
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                    strokeMiterlimit="10"
                    strokeDasharray="none"
                    strokeOpacity="1"
                  />
                </g>
              </g>
            </g>
            <path
              id="path264"
              d="M500.975 554.364H364.773v59.883h136.202z"
              fill="#61c3ae"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
            />
            <g id="g266">
              <g clipPath="url(#clipPath272)" id="g268">
                <g transform="translate(500.975 554.364)" id="g274">
                  <path
                    id="path276"
                    d="M0 0h.791c15.034 0 27.222 13.405 27.222 29.941 0 16.537-12.188 29.942-27.222 29.942H0z"
                    fill="#61c3ae"
                    fillOpacity="1"
                    fillRule="nonzero"
                    stroke="none"
                  />
                </g>
              </g>
            </g>
            <path
              id="path278"
              d="M364.61 554.364H113.099v59.883H364.61z"
              fill="#1882bf"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
            />
            <g id="g280">
              <g clipPath="url(#clipPath286)" id="g282">
                <g transform="translate(274.668 689.608)" id="g288">
                  <path
                    id="path290"
                    d="M0 0l-19.634 52.538h-.532L-39.976 0zm43.869-56.073H3.893c-1.416 0-2.124.707-2.124 2.123v9.02c0 1.416.708 2.124 2.124 2.124h12.381L4.777-12.205h-49.352l-11.499-30.601h12.384c1.414 0 2.122-.708 2.122-2.124v-9.02c0-1.416-.708-2.123-2.122-2.123h-39.801c-1.416 0-2.123.707-2.123 2.123v9.02c0 1.416.707 2.124 2.123 2.124h11.851l38.032 100.472h-9.553c-1.533 0-2.298.708-2.298 2.124v9.02c0 1.416.765 2.124 2.298 2.124h24.058c2.831 0 4.979-.592 6.456-1.769 1.473-1.181 2.743-3.126 3.804-5.837L31.84-42.806h12.029c1.416 0 2.124-.708 2.124-2.124v-9.02c0-1.416-.708-2.123-2.124-2.123"
                    fill="#dde0e6"
                    fillOpacity="1"
                    fillRule="nonzero"
                    stroke="none"
                  />
                </g>
                <path
                  id="path292"
                  d="M489.97 736.787H345.398v26.259H489.97z"
                  fill="#dde0e6"
                  fillOpacity="1"
                  fillRule="nonzero"
                  stroke="none"
                />
                <path
                  id="path294"
                  d="M489.97 702.127H345.398v26.259H489.97z"
                  fill="#dde0e6"
                  fillOpacity="1"
                  fillRule="nonzero"
                  stroke="none"
                />
                <path
                  id="path296"
                  d="M489.97 667.953H345.398v26.259H489.97z"
                  fill="#dde0e6"
                  fillOpacity="1"
                  fillRule="nonzero"
                  stroke="none"
                />
                <path
                  id="path298"
                  d="M489.97 633.536H345.398v26.259H489.97z"
                  fill="#dde0e6"
                  fillOpacity="1"
                  fillRule="nonzero"
                  stroke="none"
                />
              </g>
            </g>
            <g id="g300">
              <g id="g302">
                <g id="g308">
                  <g id="g310">
                    <path
                      id="path318"
                      d="M560.683 380.893c-4.344 0-7.897-3.554-7.897-7.896V35.851c0-4.343 3.553-7.897 7.897-7.897h495.669c4.344 0 7.897 3.554 7.897 7.897v337.146c0 4.342-3.553 7.896-7.897 7.896z"
                      fill="url(#linearGradient316)"
                      stroke="none"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g id="g320">
              <g clipPath="url(#clipPath326)" id="g322">
                <path
                  id="path328"
                  d="M1060.766 55.018H556.812v313.829h503.954z"
                  fill="#fff"
                  fillOpacity="1"
                  fillRule="nonzero"
                  stroke="none"
                />
                <g id="g330">
                  <g id="g370">
                    <g id="g368" opacity=".5" clipPath="url(#clipPath336)">
                      <g id="g366">
                        <g id="g364" mask="url(#mask342)">
                          <g
                            id="g362"
                            transform="matrix(582.23999 0 0 83.04 516.72 -.424)"
                          >
                            <image
                              id="image360"
                              mask="url(#mask354)"
                              xlinkHref="data:image/png;base64,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"
                              transform="matrix(1 0 0 -1 0 1)"
                              preserveAspectRatio="none"
                              height="1"
                              width="1"
                              imageRendering="optimizeSpeed"
                            />
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
            <g id="g372">
              <g id="g374">
                <g id="g380">
                  <g id="g382">
                    <path
                      id="path390"
                      d="M533.407 43.644c-3.013 0-5.477-1.546-5.477-3.433v-3.429c0-1.887 21.406-8.828 24.417-8.828h514.063c3.011 0 22.695 6.941 22.695 8.828v3.429c0 1.887-2.463 3.433-5.476 3.433z"
                      fill="url(#linearGradient388)"
                      stroke="none"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g id="g485">
              <path
                id="path392"
                d="M857.302 220.457h123.735v-88.942H857.302z"
                fill="#f1f1f2"
                fillOpacity="1"
                fillRule="nonzero"
                stroke="none"
              />
              <g transform="translate(880.56 199.793)" id="g394">
                <path
                  id="path396"
                  d="M0 0h77.43"
                  fill="none"
                  stroke="#939598"
                  strokeWidth="1"
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  strokeMiterlimit="10"
                  strokeDasharray="none"
                  strokeOpacity="1"
                />
              </g>
              <g transform="translate(880.56 188.987)" id="g398">
                <path
                  id="path400"
                  d="M0 0h77.43"
                  fill="none"
                  stroke="#939598"
                  strokeWidth="1"
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  strokeMiterlimit="10"
                  strokeDasharray="none"
                  strokeOpacity="1"
                />
              </g>
              <g transform="translate(880.56 177.991)" id="g402">
                <path
                  id="path404"
                  d="M0 0h16.788"
                  fill="none"
                  stroke="#939598"
                  strokeWidth="1"
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  strokeMiterlimit="10"
                  strokeDasharray="none"
                  strokeOpacity="1"
                />
              </g>
              <g transform="translate(941.202 157.099)" id="g406">
                <path
                  id="path408"
                  d="M0 0h16.788"
                  fill="none"
                  stroke="#939598"
                  strokeWidth="1"
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  strokeMiterlimit="10"
                  strokeDasharray="none"
                  strokeOpacity="1"
                />
              </g>
              <g transform="translate(949.132 167.414)" id="g410">
                <path
                  id="path412"
                  d="M0 0h8.395"
                  fill="none"
                  stroke="#939598"
                  strokeWidth="1"
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  strokeMiterlimit="10"
                  strokeDasharray="none"
                  strokeOpacity="1"
                />
              </g>
              <g transform="translate(880.56 166.999)" id="g414">
                <path
                  id="path416"
                  d="M0 0h28.6"
                  fill="none"
                  stroke="#939598"
                  strokeWidth="1"
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  strokeMiterlimit="10"
                  strokeDasharray="none"
                  strokeOpacity="1"
                />
              </g>
              <g transform="translate(914.241 166.999)" id="g418">
                <path
                  id="path420"
                  d="M0 0h28.6"
                  fill="none"
                  stroke="#939598"
                  strokeWidth="1"
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  strokeMiterlimit="10"
                  strokeDasharray="none"
                  strokeOpacity="1"
                />
              </g>
              <g transform="translate(904.019 177.991)" id="g422">
                <path
                  id="path424"
                  d="M0 0h53.972"
                  fill="none"
                  stroke="#939598"
                  strokeWidth="1"
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  strokeMiterlimit="10"
                  strokeDasharray="none"
                  strokeOpacity="1"
                />
              </g>
              <g transform="translate(880.56 157.099)" id="g426">
                <path
                  id="path428"
                  d="M0 0h53.972"
                  fill="none"
                  stroke="#939598"
                  strokeWidth="1"
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  strokeMiterlimit="10"
                  strokeDasharray="none"
                  strokeOpacity="1"
                />
              </g>
            </g>
            <path
              id="path430"
              d="M836.074 203.04H636.41v16.518h199.664z"
              fill="#f1f1f2"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
            />
            <path
              id="path432"
              d="M836.074 181.238H636.41v16.518h199.664z"
              fill="#f1f1f2"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
            />
            <path
              id="path434"
              d="M836.074 159.743H636.41v16.517h199.664z"
              fill="#f1f1f2"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
            />
            <path
              id="path436"
              d="M836.074 138.094H636.41v16.518h199.664z"
              fill="#f1f1f2"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
            />
            <path
              id="path438"
              d="M981.131 302.937H744.08v16.517h237.051z"
              fill="#f1f1f2"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
            />
            <path
              id="path440"
              d="M981.131 281.135H744.08v16.517h237.051z"
              fill="#f1f1f2"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
            />
            <path
              id="path442"
              d="M981.131 259.639H744.08v16.517h237.051z"
              fill="#f1f1f2"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
            />
            <path
              id="path444"
              d="M981.131 237.99H744.08v16.517h237.051z"
              fill="#f1f1f2"
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
            />
            <g id="g446">
              <g clipPath="url(#clipPath452)" id="g448">
                <g transform="translate(688.394 276.384)" id="g454">
                  <path
                    id="path456"
                    d="M0 0l-11.922 31.899h-.322L-24.273 0zm26.636-34.046H2.363c-.859 0-1.29.43-1.29 1.289v5.477c0 .859.431 1.289 1.29 1.289h7.518L2.9-7.41h-29.965l-6.982-18.581h7.519c.858 0 1.288-.43 1.288-1.289v-5.477c0-.859-.43-1.289-1.288-1.289h-24.165c-.861 0-1.29.43-1.29 1.289v5.477c0 .859.429 1.289 1.29 1.289h7.194l23.093 61.005h-5.801c-.931 0-1.396.43-1.396 1.289v5.477c0 .86.465 1.289 1.396 1.289H-11.6c1.719 0 3.024-.358 3.92-1.074.895-.716 1.665-1.897 2.31-3.544l24.702-64.442h7.304c.859 0 1.29-.43 1.29-1.289v-5.477c0-.859-.431-1.289-1.29-1.289z"
                    fill="none"
                    stroke="#a7a9ac"
                    strokeWidth=".5"
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                    strokeMiterlimit="4"
                    strokeDasharray="3.6"
                    strokeDashoffset="0"
                    strokeOpacity="1"
                  />
                </g>
                <g transform="translate(715.03 250.394)" id="g458">
                  <path
                    id="path460"
                    d="M0 0h-7.304l-13.58 35.429c-2.922-.453-5.845-.91-8.766-1.373l3.014-8.066h-24.273l1.845 4.891a1526.24 1526.24 0 01-10.038-1.735L-70.135 0h-7.194c-.86 0-1.29-.431-1.29-1.29v-5.477c0-.859.43-1.29 1.29-1.29h24.165c.858 0 1.288.431 1.288 1.29v5.477c0 .859-.43 1.29-1.288 1.29h-7.519l6.982 18.58h29.966L-16.755 0h-7.517c-.86 0-1.29-.431-1.29-1.29v-5.477c0-.859.43-1.29 1.29-1.29H0c.859 0 1.29.431 1.29 1.29v5.477C1.29-.431.859 0 0 0"
                    fill="#d1d3d4"
                    fillOpacity="1"
                    fillRule="nonzero"
                    stroke="none"
                  />
                </g>
              </g>
            </g>
            <g id="g462">
              <g clipPath="url(#clipPath468)" id="g464">
                <g transform="translate(162.716 584.305)" id="g470">
                  <path
                    id="path472"
                    d="M0 0c0-5.885-4.771-10.656-10.656-10.656-5.886 0-10.656 4.771-10.656 10.656 0 5.885 4.77 10.656 10.656 10.656C-4.771 10.656 0 5.885 0 0"
                    fill="#f1f1f2"
                    fillOpacity="1"
                    fillRule="nonzero"
                    stroke="none"
                  />
                </g>
                <g transform="translate(157.648 512.567)" id="g474">
                  <path
                    id="path476"
                    d="M0 0c0-5.885-4.771-10.656-10.656-10.656-5.886 0-10.656 4.771-10.656 10.656 0 5.885 4.77 10.656 10.656 10.656C-4.771 10.656 0 5.885 0 0"
                    fill="#fff"
                    fillOpacity="1"
                    fillRule="nonzero"
                    stroke="none"
                  />
                </g>
                <g transform="translate(353.813 439.536)" id="g478">
                  <path
                    id="path480"
                    d="M0 0c0-5.885-4.771-10.656-10.656-10.656-5.886 0-10.656 4.771-10.656 10.656 0 5.885 4.77 10.656 10.656 10.656C-4.771 10.656 0 5.885 0 0"
                    fill="#f1f1f2"
                    fillOpacity="1"
                    fillRule="nonzero"
                    stroke="none"
                  />
                </g>
                <g transform="translate(479.858 368.847)" id="g482">
                  <path
                    id="path484"
                    d="M0 0c0-5.885-4.771-10.656-10.656-10.656-5.886 0-10.656 4.771-10.656 10.656 0 5.886 4.77 10.656 10.656 10.656C-4.771 10.656 0 5.886 0 0"
                    fill="#f1f1f2"
                    fillOpacity="1"
                    fillRule="nonzero"
                    stroke="none"
                  />
                </g>
              </g>
            </g>
          </g>
        </svg>
      </div>
    );
  }
}

AnimatedWorkflow.propTypes = {
  repeat: PropTypes.bool,
  repeatDelay: PropTypes.number,
  autoplay: PropTypes.bool
};

AnimatedWorkflow.defaultProps = {
  repeatDelay: 2
};

export default AnimatedWorkflow;
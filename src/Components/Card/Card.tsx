import React, { Component, Fragment, createRef } from "react";

import Arrow from "../Arrow/Arrow";
import AppContext from "../../Context/AppContext";
import CardDecorator from "./CardDecorator";
import fonts from "../../Utils/fonts";

import "./Card.scss";

class Card extends Component<any> {
  state = {
    heading: "",
    mainText: "",
    signature: ""
  };

  private inputFile = createRef<HTMLInputElement>();

  appendColorPallete = (): React.CSSProperties => {
    if (
      this.context.currentPalette &&
      Object.keys(this.context.currentPalette).length > 0
    ) {
      return {
        ["--light" as string]: this.context.currentPalette.light,
        ["--medium-light" as string]: this.context.currentPalette.mediumLight,
        ["--medium" as string]: this.context.currentPalette.medium,
        ["--medium-dark" as string]: this.context.currentPalette.mediumDark,
        ["--medium-dark-shadow" as string]:
          this.context.currentPalette.mediumDark + 40,
        ["--dark" as string]: this.context.currentPalette.dark
      };
    }

    return {};
  };

  componentDidMount() {    
    const fileInput = this.inputFile.current!;

    fileInput.addEventListener("focus", () => fileInput.classList.add("has-focus"));
    fileInput.addEventListener("blur", () => fileInput.classList.remove("has-focus"));
  }


  render() {
    const cardStyle = {
      backgroundImage: `url(${this.context.photoSearchResults[
        this.context.currentImage
      ] &&
        (this.context.photoSearchResults[this.context.currentImage] as any)
          .regular})`,
      backgroundPosition: "center center",
      backgroundSize: "cover",
    };

    const { heading, text } = fonts[this.context.currentFontsIndex];

    return (
        <div className="scrolling-wrapper-flexbox">
          <section className="card-wrapper" style={this.appendColorPallete()}>
            <CardDecorator className="card-wrapper-decorator card-wrapper-decorator--before" />
            <div
              className="card-text"
              title={this.context.editModeOn ? "" : "Double click to edit"}
              style={
                this.context.editModeOn
                  ? { cursor: "auto" }
                  : { cursor: "pointer" }
              }
              onDoubleClick={this.context.enableEdit}
              onTouchEnd={this.context.enableEdit}
            >
              {this.context.editModeOn && (
                <Fragment>
                  <button
                    className="btn card-btn"
                    onClick={this.context.disableEdit}
                  >
                    Preview
                  </button>
                  <input
                    aria-label="Card heading text"
                    type="text"
                    className="heading"
                    style={{ fontFamily: heading }}
                    onChange={event =>
                      this.setState({ heading: event.target.value })
                    }
                    placeholder="Dear..."
                    value={this.state.heading ? this.state.heading : ""}
                  />
                  <textarea
                    aria-label="Card main text"
                    className="main-text"
                    style={{ fontFamily: text }}
                    onChange={event =>
                      this.setState({ mainText: event.target.value })
                    }
                    placeholder="Merry Christmas..."
                    value={this.state.mainText ? this.state.mainText : ""}
                  ></textarea>
                  <input
                    type="text"
                    aria-label="Card signature"
                    className="signature"
                    style={{ fontFamily: heading }}
                    onChange={event =>
                      this.setState({ signature: event.target.value })
                    }
                    placeholder="Yours..."
                    value={this.state.signature ? this.state.signature : ""}
                  />
                </Fragment>
              )}
              {!this.context.editModeOn && (
                <Fragment>
                  <h3 className="heading" style={{ fontFamily: heading }}>
                    {this.state.heading}
                  </h3>
                  <div className="main-text" style={{ fontFamily: text }}>
                    {this.state.mainText}
                  </div>
                  <div className="signature" style={{ fontFamily: heading }}>
                    {this.state.signature}
                  </div>
                </Fragment>
              )}
            </div>
            <div className="separator"></div>
            <div className="card-image" style={cardStyle}>
              <div className="loader image-loader"></div>             
              {this.context.editModeOn && this.context.currentImage && (
                <button
                  className="btn change-img-btn change-img-btn__left"
                  onClick={this.context.getPreviousImage}
                  title="Previous image"
                >
                  <Arrow />
                </button>
              )}
              {this.context.editModeOn && (
                <Fragment>
                  <input ref={this.inputFile} type="file" id="file" accept="image/*" onChange={this.context.uploadImage} />
                  <label htmlFor="file" title="Upload image">
                    <svg width="100" height="91" viewBox="0 0 100 91" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M52.8357 1.11945C51.8602 0.14242 50.2772 0.141246 49.3002 1.11683L33.3785 17.0149C32.4015 17.9905 32.4003 19.5734 33.3759 20.5505C34.3515 21.5275 35.9344 21.5287 36.9114 20.5531L51.064 6.42144L65.1957 20.5741C66.1713 21.5511 67.7542 21.5523 68.7312 20.5767C69.7083 19.6011 69.7094 18.0182 68.7338 17.0411L52.8357 1.11945ZM0.5 63V74H5.5V63H0.5ZM18 91.5H83V86.5H18V91.5ZM100.5 74V63H95.5V74H100.5ZM83 91.5C92.665 91.5 100.5 83.665 100.5 74H95.5C95.5 80.9036 89.9036 86.5 83 86.5V91.5ZM0.5 74C0.5 83.665 8.33502 91.5 18 91.5V86.5C11.0964 86.5 5.5 80.9036 5.5 74H0.5ZM53.5213 64.1159L53.5667 2.88776L48.5667 2.88406L48.5213 64.1122L53.5213 64.1159Z" fill="black"/>
                    </svg>
                  </label>
                </Fragment>
              )}              
              {this.context.editModeOn && (
                <button
                  className="btn change-img-btn change-img-btn__right"
                  onClick={this.context.toggleImage} 
                  title="Next image"
                >
                  <Arrow />
                </button>
              )}
              {this.context.fetchingError && 
                (<div className="fetching-error-msg">Something went wrong. Try again later.</div>)
              } 
            </div>
            <CardDecorator className="card-wrapper-decorator card-wrapper-decorator--after" />
          </section>
        </div>
    );
  }
}

Card.contextType = AppContext;
export default Card;

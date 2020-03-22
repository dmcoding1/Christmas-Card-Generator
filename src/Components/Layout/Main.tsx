import React, { useState, useContext } from "react";
import "../../Styles/fonts.scss";
import "./Main.scss";
import Arrow from "./Arrow";
import Card from "../Card/Card";
import palettes from "../../Utils/palettes";
import { fonts } from "../../Utils/fonts";
import AppContext from "../../Context/AppContext";

const Main: React.FC<any> = () => {
  const context: any = useContext(AppContext);

  const [stylePalettes, setStylePalettes] = useState({
    styleCssPalettes: {},
    currentDistancePalettes: 0
  });

  const [styleFonts, setStyleFonts] = useState({
    styleCssFonts: {},
    currentDistanceFonts: 0
  });

  const translatePalettes = (distance: number) => {
    if (
      stylePalettes.currentDistancePalettes + distance >
        5 * -Math.abs(distance) &&
      stylePalettes.currentDistancePalettes + distance <= 0
    ) {
      return () =>
        setStylePalettes({
          styleCssPalettes: {
            ...stylePalettes.styleCssPalettes,
            transform: `translateY(${stylePalettes.currentDistancePalettes +
              distance}rem)`
          },
          currentDistancePalettes:
            stylePalettes.currentDistancePalettes + distance
        });
    }
  };

  const translateFonts = (distance: number) => {
    if (
      styleFonts.currentDistanceFonts + distance > 9 * -Math.abs(distance) &&
      styleFonts.currentDistanceFonts + distance <= 0
    ) {
      setStyleFonts({
        styleCssFonts: {
          ...styleFonts.styleCssFonts,
          transform: `translateY(${styleFonts.currentDistanceFonts +
            distance}rem)`
        },
        currentDistanceFonts: styleFonts.currentDistanceFonts + distance
      });
    }
  };

  const generateFonts = () => {
    return fonts.map(({ heading, text }) => {
      return (
        <li className="font-pair" key={heading}>
          <span className="heading-font" style={{ fontFamily: heading }}>
            {heading}
          </span>
          <span className="text-font" style={{ fontFamily: text }}>
            {text}
          </span>
        </li>
      );
    });
  };

  function generatePalletes() {
    let results = [];
    for (let i = 0; i < 25; i = i + 5) {
      results.push(
        <div key={i} className="palette-group">
          {palettes.slice(i, i + 5).map(palette => {
            const { light, mediumLight, medium, mediumDark, dark } = palette;
            return (
              <li
                key={medium}
                className="palette"
                style={{
                  background: `linear-gradient(to right, ${light} 20%, ${mediumLight} 20%, ${mediumLight} 40%, ${medium} 40%, ${medium} 60%, ${mediumDark} 60%, ${mediumDark} 80%, ${dark} 80%)`
                }}
                onClick={() => context.setPalette(palette)}
                onKeyUp={event => {
                  if (event.key === "Enter") context.setPalette(palette);
                }}
                tabIndex={0}
                role="button"
                title="Select palette"
              ></li>
            );
          })}
        </div>
      );
    }

    return results;
  }

  return (
    <main className="main-content">
      <section className="container">
        <div className="palette-selection">
          <h2 className="selection-text">Choose Palette</h2>
          <div className="palette-selection-wrapper">
            <div className="divider"></div>
            <div className="palettes-container">
              {stylePalettes.currentDistancePalettes <= -6.4 && (
                <button
                  className="arrow arrow-up"
                  onClick={translatePalettes(6.4)}
                >
                  <Arrow />
                </button>
              )}

              <ul className="palettes" style={stylePalettes.styleCssPalettes}>
                {generatePalletes()}
              </ul>
            </div>
            {stylePalettes.currentDistancePalettes >= -6.4 * 3 && (
              <button
                className="arrow arrow-down"
                onClick={translatePalettes(-6.4)}
              >
                <Arrow />
              </button>
            )}
            <div className="divider"></div>
          </div>
        </div>
        <div className="fonts-selection">
          <h2 className="selection-text">Choose Fonts</h2>
          <div className="fonts-selection-wrapper">
            <div className="divider"></div>
            <div className="fonts-container">
              {styleFonts.currentDistanceFonts <= -6.4 && (
                <button
                  className="arrow arrow-up"
                  onClick={() => {
                    translateFonts(6.4);
                    context.decrementCurrentFontsIndex();
                  }}
                >
                  <Arrow />
                </button>
              )}
              <ul className="fonts" style={styleFonts.styleCssFonts}>
                {generateFonts()}
              </ul>
            </div>
            {styleFonts.currentDistanceFonts >= -6.4 * 8 && (
              <button
                className="arrow arrow-down"
                onClick={() => {
                  translateFonts(-6.4);
                  context.incrementCurrentFontsIndex();
                }}
              >
                <Arrow />
              </button>
            )}
            <div className="divider"></div>
          </div>
        </div>
      </section>
      <Card />
      <button
        className="btn download-btn"
        title="Download card"
        onClick={context.downloadCard}
      >
        {context.isDownloading ? (
          <span className="loader download-loader"></span>
        ) : (
          <svg width="50" height="45" viewBox="0 0 100 89" fill="none">
            <path
              d="M49.3002 63.8831C50.2772 64.8587 51.8602 64.8575 52.8357 63.8805L68.7338 47.9588C69.7094 46.9818 69.7083 45.3989 68.7312 44.4233C67.7542 43.4477 66.1713 43.4489 65.1957 44.4259L51.064 58.5785L36.9114 44.4469C35.9344 43.4713 34.3515 43.4725 33.3759 44.4495C32.4003 45.4265 32.4015 47.0094 33.3785 47.985L49.3002 63.8831ZM0.5 61V72H5.5V61H0.5ZM18 89.5H83V84.5H18V89.5ZM100.5 72V61H95.5V72H100.5ZM83 89.5C92.665 89.5 100.5 81.665 100.5 72H95.5C95.5 78.9036 89.9036 84.5 83 84.5V89.5ZM0.5 72C0.5 81.665 8.33502 89.5 18 89.5V84.5C11.0964 84.5 5.5 78.9036 5.5 72H0.5ZM48.5213 0.887779L48.5667 62.1159L53.5667 62.1122L53.5213 0.884072L48.5213 0.887779Z"
              fill="white"
            />
          </svg>
        )}
      </button>
      {context.downloadingError && (
        <div className="download-error-msg">
          Something went wrong. Try again later.
        </div>
      )}
    </main>
  );
};

export default Main;

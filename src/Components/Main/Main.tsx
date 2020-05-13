import React, { useState, useContext } from "react";

import AppContext from "../../Context/AppContext";
import Arrow from "../Arrow/Arrow";
import Card from "../Card/Card";
import Palette from "./Palette";

import palettes from "../../Utils/palettes";
import fonts from "../../Utils/fonts";
import "../../Styles/fonts.scss";
import "./Main.scss";

const Main: React.FC<any> = () => {
  const context: any = useContext(AppContext);

  const numberOfPaletteGroups = palettes.length % 5 ? Math.floor(palettes.length / 5 + 1) : palettes.length / 5;
  const lastFontIndex = fonts.length - 1;
  const cssPalettesAndFontsHeight = 6.4;

  const [paletteGroupStyle, setpaletteGroupStyle] = useState({
    styleCssPalettes: {},
    currentDistancePalettes: 0
  });

  const [fontGroupStyle, setfontGroupStyle] = useState({
    styleCssFonts: {},
    currentDistanceFonts: 0
  });

  const translatePalettes = (distance: number) => {
    if (
      paletteGroupStyle.currentDistancePalettes + distance >
      numberOfPaletteGroups * -Math.abs(distance) &&
      paletteGroupStyle.currentDistancePalettes + distance <= 0
    ) {
      return () =>
        setpaletteGroupStyle({
          styleCssPalettes: {
            ...paletteGroupStyle.styleCssPalettes,
            transform: `translateY(${paletteGroupStyle.currentDistancePalettes +
              distance}rem)`
          },
          currentDistancePalettes:
            paletteGroupStyle.currentDistancePalettes + distance
        });
    }
  };

  const translateFonts = (distance: number) => {
    if (
      fontGroupStyle.currentDistanceFonts + distance > lastFontIndex * -Math.abs(distance) &&
      fontGroupStyle.currentDistanceFonts + distance <= 0
    ) {
      setfontGroupStyle({
        styleCssFonts: {
          ...fontGroupStyle.styleCssFonts,
          transform: `translateY(${fontGroupStyle.currentDistanceFonts +
            distance}rem)`
        },
        currentDistanceFonts: fontGroupStyle.currentDistanceFonts + distance
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

  const generatePalletes = () => {
    let results = [];
    for (let i = 0; i < palettes.length + 4; i = i + 5) {
      results.push(
        <div key={i} className="palette-group">
          {palettes.slice(i, i + 5).map(palette => {
            return (
              <Palette
                key={Math.random()}
                palette={palette}
                onClick={() => context.setPalette(palette)}
                onKeyUp={(event: KeyboardEvent) => {
                  if (event.key === "Enter") context.setPalette(palette);
                }}
              ></Palette>
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
              {paletteGroupStyle.currentDistancePalettes <= -cssPalettesAndFontsHeight && (
                <button
                  className="arrow arrow-up"
                  onClick={translatePalettes(cssPalettesAndFontsHeight)}
                >
                  <Arrow />
                </button>
              )}

              <ul className="palettes" style={paletteGroupStyle.styleCssPalettes}>
                {generatePalletes()}
              </ul>
            </div>
            {paletteGroupStyle.currentDistancePalettes > -cssPalettesAndFontsHeight * (numberOfPaletteGroups - 1) && (
              <button
                className="arrow arrow-down"
                onClick={translatePalettes(-cssPalettesAndFontsHeight)}
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
              {fontGroupStyle.currentDistanceFonts <= -cssPalettesAndFontsHeight && (
                <button
                  className="arrow arrow-up"
                  onClick={() => {
                    translateFonts(cssPalettesAndFontsHeight);
                    context.decrementCurrentFontsIndex();
                  }}
                >
                  <Arrow />
                </button>
              )}
              <ul className="fonts" style={fontGroupStyle.styleCssFonts}>
                {generateFonts()}
              </ul>
            </div>
            {fontGroupStyle.currentDistanceFonts >= -cssPalettesAndFontsHeight * (lastFontIndex - 1) && (
              <button
                className="arrow arrow-down"
                onClick={() => {
                  translateFonts(-cssPalettesAndFontsHeight);
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

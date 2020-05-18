import React, { EventHandler } from "react";

type Palette = {
  light: string,
  mediumLight: string, 
  medium: string,
  mediumDark: string,
  dark: string
}

interface PaletteProps {
  onClick: () => void;
  onKeyUp: (event: any) => void;
  palette: Palette
}


const Palette: React.FC<PaletteProps> = ({onClick, onKeyUp, palette}) => {
  const { light, mediumLight, medium, mediumDark, dark } = palette;

  return (
    <li
      className="palette"
      style={{
        background: `linear-gradient(to right, ${light} 20%, ${mediumLight} 20%, ${mediumLight} 40%, ${medium} 40%, ${medium} 60%, ${mediumDark} 60%, ${mediumDark} 80%, ${dark} 80%)`
      }}
      onClick={onClick}
      onKeyUp={onKeyUp}
      tabIndex={0}
      role="button"
      title="Select palette"
    ></li>
  )
};

export default Palette;
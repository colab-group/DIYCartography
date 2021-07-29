import React, { useState, useEffect } from "react"; // we need this to make JSX compile
import { useTheme } from "@material-ui/core/styles";

import blue from "@material-ui/core/colors/blue";
import "../../../css/App.css";
import { getRandomNumber } from "../../../utils";
import { useStoreState } from "../../../hooks";
// import { PaletteColor } from "@types/material-ui";

type UnitProps = {
  color: number;
  isActiveFilter?: boolean;
  index?: number;
};

export const GridUnit = ({ color, isActiveFilter, index }: UnitProps) => {
  const theme = useTheme();
  const size = 12;
  const [hover, setHover] = useState(false);
  const mounted = true;
  const data_loaded = useStoreState((state) => state.studentsModel.loaded);
  const duration = getRandomNumber(0.5, 4);
  const containerStyle = {
    display: "block",
    // display: data_loaded ? "block" : "none",
    animation: data_loaded ? `fadein ${duration}s normal` : "",
    animationIterationCound: 1,
    marginTop: "auto",
  } as React.CSSProperties;

  useEffect(() => {
    console.log(index);
  }, [mounted]);

  const matchNumberToThemeColor = (ind: number) => {
    let col = "";
    switch (ind) {
      case -2:
        col = blue[500];
        break;
      case -1:
        col = blue[100];
        break;
      case 0:
        col = theme.palette.primary.main;
        break;
      case 1:
        // col = blue[300];
        col = theme.palette.primary.light;
        break;
      case 2:
        // col = blue[400];
        col = theme.palette.secondary.dark;
        break;
      case 3:
        col = theme.palette.secondary.main;
        break;
      case 4:
        col = theme.palette.secondary.dark;
        break;
    }
    return col;
  };

  const boxStyle = (is_active_filter?: boolean) => {
    if (is_active_filter) {
      // console.log("GOT ACTIVE FILTER~~");
      return {
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: matchNumberToThemeColor(color),
        marginTop: "auto",
        opacity: 1,
      } as React.CSSProperties;
    } else {
      if (color == -2) {
        return {
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: matchNumberToThemeColor(color),
          marginTop: "auto",
          opacity: 0.5,
        } as React.CSSProperties;
      } else {
        return {
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: matchNumberToThemeColor(color),
          marginTop: "auto",
          marginBottom: "3px",
          opacity: 1.0,
        } as React.CSSProperties;
      }
    }
  };
  return (
    <div
      className={"grid unit"}
      style={boxStyle(isActiveFilter)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    ></div>
  );
};

export default GridUnit;

import React, { useState, useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const ThemeContext = React.createContext({});

export function useThemeContext() {
  return useContext(ThemeContext);
}

const ThemeProviderContext = (props) => {
  const [theme, setTheme] = useState("light");

  const handleSetTheme = (data) => {
    setTheme(data);
  };
  const contextValue = {
    theme,
    handleSetTheme,
  };

  const ProdThemes = createTheme({
    palette: {
      type: theme,
      primary: {
        main: "#00897B",
        light: "#30323e",
      },
      secondary: {
        main: "#ce9c07",
        light: "#7190c4",
      },
      neutral: {
        main: "#5c6ac4",
      },
      secondary2: {
        main: "#18243A",
        light: "#7190c4",
      },
      background: {
        default: "#18243A",
      },
    },
    typography: {
      fontFamily: "Noto Sans Thai , sans-serif",
      fontSize: 12,
      color: '#ffff',
      button: {
        textTransform: "none",
      },
    },
    divider: {
      // Theme Color, or use css color in quote
      background: "#eee",
    },
  });

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={ProdThemes}>{props.children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
export { ThemeContext, ThemeProviderContext };

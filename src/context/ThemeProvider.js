import React from "react";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider as Provider } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const theme = createTheme({
  palette : {
    primary : red,
  },
  typography : {
    subtitle1 : {
      fontSize : "1.2rem",
      fontWeight : "700"
    }
  }
});

function ThemeProvider({ children }) {
  return (
    <Provider theme={theme}>
      <CssBaseline />
      {children}
    </Provider>
  );
}

export default ThemeProvider;

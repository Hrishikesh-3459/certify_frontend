import React from "react";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider as Provider } from "@mui/material/styles";

const theme = createTheme();

function ThemeProvider({ children }) {
  return (
    <Provider theme={theme}>
      <CssBaseline />
      {children}
    </Provider>
  );
}

export default ThemeProvider;

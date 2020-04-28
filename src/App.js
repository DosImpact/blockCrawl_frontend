import React from "react";
import GlobalStyles from "./styles/Globalstyles";
import Router from "./components/Router";

import theme from "./styles/theme";
import { ThemeProvider } from "styled-components";
function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router />
        <GlobalStyles />
      </ThemeProvider>
    </>
  );
}

export default App;

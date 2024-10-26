import { CssBaseline } from "@mui/material";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { SuspenseProgressBackdrop } from "./components/SuspenseProgress/SusProg";
import "./index.css";
import StoreRedux from "./redux/store";
import theme from "./themes/theme";

ReactDOM.createRoot(document.getElementById("root")).render


(
  <ThemeProvider theme={theme}>
    <StyledEngineProvider injectFirst>
      <CssBaseline enableColorScheme />
      <SuspenseProgressBackdrop>
        <Provider store={StoreRedux}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </SuspenseProgressBackdrop>
    </StyledEngineProvider>
  </ThemeProvider>
);

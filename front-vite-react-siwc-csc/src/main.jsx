import { Backdrop, CircularProgress, CssBaseline } from "@mui/material";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import StoreRedux from "./redux/store";
import theme from "./themes/theme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <StyledEngineProvider injectFirst>
      <CssBaseline enableColorScheme />
      <Suspense
        fallback={
          <Backdrop
            sx={{
              color: "primary",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={true}
          >
            <CircularProgress color="primary" />
          </Backdrop>
        }
      >
        <Provider store={StoreRedux}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </Suspense>
    </StyledEngineProvider>
  </ThemeProvider>
);

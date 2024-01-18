import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import App from "./app";
import "src/components/styles/index.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
import store from "src/store/store";
import { Provider } from "react-redux";
root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

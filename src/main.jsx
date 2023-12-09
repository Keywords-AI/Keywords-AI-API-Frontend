import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import App from "./app";
import "./styles/index.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
import store from "./store/store";
import { Provider } from "react-redux";
root.render(
  <StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </StrictMode>
);

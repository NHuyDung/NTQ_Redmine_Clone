import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./app/store";
import { ZIndexProvider } from "./pages/MyPage/components/TableIssue/ModalContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ZIndexProvider>
      <App />
    </ZIndexProvider>
  </Provider>,
);

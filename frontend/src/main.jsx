import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store.js";

import "./index.css";
import { DelayedLoader } from "./components";
import router from "./router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback={<DelayedLoader />}>
          <RouterProvider router={router} />
        </Suspense>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PrivateRoute from "../src/components/PrivateRoute"; // Import PrivateRoute component

import Home from "../src/pages/Home";
import Login from "../src/pages/Login"; 
import store, { persistor } from "./redux/store";
import Advertising from "./pages/Advertising";

const router = createBrowserRouter([
  {
    path: "/app",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
    children: [
      {
        path: "home", 
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
     
    ],
  },
  {
    path: "/",
    element: <Login />, // Login остаётся без PrivateRoute
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);

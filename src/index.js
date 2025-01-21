import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import store, { persistor } from "./redux/store";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Home from "./pages/Home/Home";
import Login from "../src/pages/Login/Login";
import Advertising from "./pages/Advertising/Advertising";
import Analyze from "./pages/Analyze/Analyze";
import AllUsers from "./pages/Users/AllUsers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <PrivateRoute component={Home} />,
      },
      {
        path: "/advertising",
        element: <PrivateRoute component={Advertising} />,
      },
      {
        path: "/analyze",
        element: <PrivateRoute component={Analyze} />,
      },
      {
        path: "/all-users",
        element: <PrivateRoute component={AllUsers} />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
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

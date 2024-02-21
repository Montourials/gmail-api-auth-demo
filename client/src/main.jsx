import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";
import { CssBaseline } from "@mui/material";
import "./assets/index.css";

import Router from "src/router.jsx";

const queryClient = new QueryClient();
const dataRouter = createBrowserRouter(Router());

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {
      /* https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid */
      /* "When using http/localhost, set Referrer-Policy header to no-referrer-when-downgrade" */
      import.meta?.env?.DEV && (
        <meta name="referrer" content="no-referrer-when-downgrade" />
      )
    }
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <ToastContainer
        limit={3}
        style={{
          minWidth: "min-content",
        }}
      />
      <RouterProvider router={dataRouter} />
    </QueryClientProvider>
  </React.StrictMode>
);

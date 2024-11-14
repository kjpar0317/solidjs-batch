import { Suspense, ErrorBoundary, onMount } from "solid-js";
import { createStore } from "solid-js/store";

import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Toaster } from "solid-toast";

import { Provider } from "~/store";
import { Loading } from "~/components/layouts/common";
import ErrorBoundartFallback from "~/components/layouts/error/ErrorBoundaryFallback";

import "./app.css";
import "tippy.js/dist/tippy.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export const APPLICATION_ID = "test";

export default function Root() {
  function reset() {
    location.href = "/login";
  }

  return (
    <Provider>
      <Router
        root={(props) => (
          <Suspense fallback={<Loading />}>
            <ErrorBoundary
              fallback={(e) => ErrorBoundartFallback({ err: e, reset: reset })}
            >
              {props.children}
            </ErrorBoundary>
          </Suspense>
        )}
      >
        <FileRoutes />
      </Router>
      <Toaster
        position="bottom-right"
        // Spacing between each toast in pixels
        gutter={8}
      />
    </Provider>
  );
}

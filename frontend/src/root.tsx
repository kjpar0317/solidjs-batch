// @refresh reload
import { Suspense } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
  useNavigate,
} from "solid-start";

import { Provider } from "~/store";
import ErrorBoundartFallback from "~/components/layouts/error/ErrorBoundaryFallback";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./root.css";

export default function Root() {
  const navigate = useNavigate();

  function reset() {
    navigate("/login");
  }

  return (
    <Provider>
      <Html lang="en">
        <Head>
          <Title>SolidStart - With TailwindCSS</Title>
          <Meta charset="utf-8" />
          <Meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Body class="w-full h-full">
          <Suspense>
            <ErrorBoundary
              fallback={(e) => ErrorBoundartFallback({ err: e, reset: reset })}
            >
              <Routes>
                <FileRoutes />
              </Routes>
            </ErrorBoundary>
          </Suspense>
          <Scripts />
        </Body>
      </Html>
    </Provider>
  );
}

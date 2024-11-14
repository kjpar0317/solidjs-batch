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
  const [messages, setMessages] = createStore<Array<Message>>([]);
  let wsContext: WsContext;

  onMount(() => {
    // Initialize once monted client side
    wsContext = {
      ws: undefined,
      href: hrefToWs(location),
      onMessage,
      log,
      clear,
      send: (data) => wsContext.ws?.send(data),
    };
    connect();
  });

  // const navigate = useNavigate();
  const log = (user: string, ...args: Array<string>) => {
    console.log("[ws]", user, ...args);
    const message = {
      text: args.join(" "),
      user,
      createdAt: new Date().toLocaleString(),
    };
    const index = messages.length;
    setMessages(index, message);
    scroll();
  };

  const clear = () => {
    setMessages([]);
    log(APPLICATION_ID, "previous messages cleared");
  };

  // Websocket message handler & support
  const onMessage = (event: MessageEvent<string>) => {
    const { user, message } = event.data.startsWith("{")
      ? (JSON.parse(event.data) as { user: string; message: unknown })
      : { user: APPLICATION_ID, message: event.data };

    log(user, typeof message === "string" ? message : JSON.stringify(message));
  };

  const connect = () => wsConnect(wsContext);
  const ping = () => {
    if (!wsContext.ws) return;

    log("ws", "Sending ping");
    wsContext.send("ping");
  };

  const hrefToWs = (location: Location) =>
    `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/_ws/`;

  // WebSocket related
  function wsConnect(ctx: WsContext) {
    if (ctx.ws) {
      ctx.log("ws", "Closing previous connection before reconnecting…");
      ctx.ws.close();
      ctx.ws = undefined;
      ctx.clear();
    }

    ctx.log("ws", "Connecting to", ctx.href, "…");
    const ws = new WebSocket(ctx.href);

    ws.addEventListener("message", ctx.onMessage);
    ws.addEventListener("open", () => {
      ctx.ws = ws;
      ctx.log("ws", "Connected!");
    });
  }

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

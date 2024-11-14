import { createStore } from "solid-js/store";

const APPLICATION_ID = "ws";

export default function createWsSocket(
  state: any,
  setState: any,
  actions: any
) {
  const [messages, setMessages] = createStore<Array<Message>>([]);
  let wsContext: WsContext;

  Object.assign(actions, {
    connect() {
      console.log("websocket connect");
      wsConnect(wsContext);
    },
    ping() {
      if (!wsContext.ws) return;

      log("ws", "Sending ping");
      wsContext.send("ping");
    },
  });

  function clear() {
    setMessages([]);
    log(APPLICATION_ID, "previous messages cleared");
  }

  // const navigate = useNavigate();
  function log(user: string, ...args: Array<string>) {
    console.log("[ws]", user, ...args);
    const message = {
      text: args.join(" "),
      user,
      createdAt: new Date().toLocaleString(),
    };
    const index = messages.length;
    setMessages(index, message);
    scroll();
  }

  // Websocket message handler & support
  function onMessage(event: MessageEvent<string>) {
    const { user, message } = event.data.startsWith("{")
      ? (JSON.parse(event.data) as { user: string; message: unknown })
      : { user: APPLICATION_ID, message: event.data };

    log(user, typeof message === "string" ? message : JSON.stringify(message));
  }

  function hrefToWs(location: Location) {
    return `${location.protocol === "https:" ? "wss" : "ws"}://${
      location.hostname
    }:8080/websocket`;
  }

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

  if (typeof location !== "undefined") {
    wsContext = {
      ws: undefined,
      href: location && hrefToWs(location),
      onMessage,
      log,
      clear,
      send: (data) => wsContext.ws?.send(data),
    };
  }

  return { messages };
}

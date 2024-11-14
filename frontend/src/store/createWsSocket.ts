import { createStore } from "solid-js/store";

import {
  createReconnectingWS,
  createWSState,
} from "@solid-primitives/websocket";

export default function createWsSocket(
  state: any,
  setState: any,
  actions: any
) {
  const [data, setData] = createStore<any>();
  // const ws = createReconnectingWS(`ws://localhost:8080/websocket`);

  const socketState = 0;
  // const socketState = createWSState(ws);

  // ws.addEventListener("message", (ev: MessageEvent) => setData(ev.data));

  return { data, socketState };
}

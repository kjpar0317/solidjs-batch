import { createSignal } from "solid-js";
import createWebsocket from "@solid-primitives/websocket";

export default function createWsSocket(state: any, setState: any, actions: any) {
    const [data, setData] = createSignal<string>("");
    const [connect, disconnect, send, socketState] = createWebsocket(
      `ws://${window.location.hostname}:8080/websocket`,
      (msg: MessageEvent) => setData(msg.data),
      (msg: any) => setData(msg.error),
      [],
      5,
      5000
    );
    
    return { connect, disconnect, socketState };
}

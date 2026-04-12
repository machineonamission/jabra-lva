import { ReconnectingWebSocket } from "@iam4x/reconnecting-websocket";

import * as events from "node:events";

import * as models from "./models.ts";

export class LVA extends events.EventEmitter {
  wsurl: string = Deno.env.get("LVA_WS_URL") || "ws://0.0.0.0:6055";
  ws: ReconnectingWebSocket;

  constructor() {
    super();
    this.ws = new ReconnectingWebSocket(
      this.wsurl,
    );

    this.ws.addEventListener("open", () => {
      console.log(`connected to lva at ${this.wsurl}`);
    });

    this.ws.addEventListener("message", (event: MessageEvent) => {
      const raw = JSON.parse(event.data);
      const lvaevent = new models.LVAEvent(raw);
      console.log(`FROM LVA: ${lvaevent.type}`, lvaevent.data);
      this.emit("event", lvaevent);
    });

    this.ws.addEventListener("close", (event) => {
      console.log("LVA Connection closed:", event.code, event.reason);
    });

    this.ws.addEventListener("reconnect", () => {
      console.log("Reconnected to LVA successfully!");
    });

    this.ws.addEventListener("error", (event: Event) => {
      console.error("LVA WebSocket error:", event);
    });
  }

  send_command(command: models.LVACommandType) {
    console.log(`TO LVA: ${command}`);
    const message = JSON.stringify({ "command": command });
    this.ws.send(message);
  }
}

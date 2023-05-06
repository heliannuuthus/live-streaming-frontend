import { IconButton } from "@mui/material";
import { AddLinkOutlined, LinkOffOutlined } from "@mui/icons-material";
import { MutableRefObject, SetStateAction } from "react";

interface IProps {
  ws: MutableRefObject<WebSocket | null>;
  messageSetter: React.Dispatch<SetStateAction<string>>;
  stateSetter: React.Dispatch<SetStateAction<number | undefined>>;
}

export default ({ ws, messageSetter, stateSetter }: IProps) => {
  const connected = () => {
    if (ws.current && ws.current.readyState !== WebSocket.CLOSED) {
      console.log("unclosed connection");
      return;
    }
    ws.current = new WebSocket("ws://localhost:10090/ws");
    ws.current.onmessage = (e) => {
      messageSetter(e.data);
    };
    ws.current.onopen = () => {
      stateSetter(ws.current?.readyState);
      console.log("connecting");
    };
    ws.current.onclose = () => {
      console.log("closed");
      stateSetter(ws.current?.readyState);
    };
    ws.current.onerror = (err) => {
      console.log("error", err);
      disconnect();
      stateSetter(ws.current?.readyState);
    };
  };
  const disconnect = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.close();
      stateSetter(ws.current?.readyState);
    }
  };
  return ws.current?.readyState == WebSocket.OPEN ? (
    <IconButton onClick={disconnect} color="error" size="large">
      <LinkOffOutlined />
    </IconButton>
  ) : (
    <IconButton onClick={connected} color="success" size="large">
      <AddLinkOutlined />
    </IconButton>
  );
};

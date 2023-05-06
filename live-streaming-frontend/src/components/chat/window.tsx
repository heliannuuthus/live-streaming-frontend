import { useState, useRef, useEffect } from "react";
import { Button, Grid, TextField } from "@mui/material";
import ConnectButton from "./connectButton";
const Window = () => {
  const ws = useRef<WebSocket | null>(null);
  const [message, setMessage] = useState("");
  const [state, setState] = useState<number | undefined>(WebSocket.CLOSED);

  useEffect(() => {
    return () => {
      ws.current?.close();
    };
  }, [ws]);

  return (
    <Grid container columnSpacing={2}>
      <Grid item xs display="flex" justifyContent="center" alignItems="center">
        <TextField
          multiline
          maxRows="30"
          rows="1"
          disabled={state !== WebSocket.OPEN}
          label="textplain message"
          variant="outlined"
        />
      </Grid>

      <Grid item xs display="flex" justifyContent="center" alignItems="center">
        <Button
          disabled={state !== WebSocket.OPEN}
          variant="outlined"
          size="large"
        >
          send
        </Button>
      </Grid>
      <Grid item xs display="flex" justifyContent="center" alignItems="center">
        <ConnectButton
          ws={ws}
          messageSetter={setMessage}
          stateSetter={setState}
        />
      </Grid>
    </Grid>
  );
};

export default Window;

interface AuthProps {
  id: string;
  password: string;
}

interface JobInfo {
  jobId?: string;
  jobName?: string;
  jobDesc?: string;
  jobStats?: string;
  jobCronExpression?: string;
  jobParams?: string;
  errorSkipYn?: string;
  useYn?: string;
}

// Custom types
type Message = {
  text: string;
  user: string;
  createdAt: string;
};

type WsContext = {
  ws: WebSocket | undefined;
  href: string;
  onMessage: (event: MessageEvent<string>) => void;
  log: (user: string, ...args: Array<string>) => void;
  clear: () => void;
  send: (data: string | ArrayBufferLike | Blob | ArrayBufferView) => void;
};

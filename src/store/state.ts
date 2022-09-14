type Url = string;

enum DisplayMethod {
  Default,
  Raw,
  Plot,
}

interface Message {
  id: string;
  sender: string;
  origin: string;
  description: string;
  subSpecification: string;
  firstTForbit: number;
  tfCounter: number;
  runNumber: number;
  startTime: number | undefined;
  duration: number | undefined;
  creationTime: number | undefined;
  taskHash: number | undefined;
  payloadSize: number;
  payloadParts: number;
  payloadSerialization: string;
  payloadSplitIndex: number;
  payload: string | undefined;
  isDisplayed: boolean;
  payloadDisplay: DisplayMethod;
}

interface Device {
  isSelected: boolean;
  name: string;
  messages: Message[];
}

interface State {
  analysisHost: Url | undefined;
  devices: Device[];
}

export default State;
export { DisplayMethod };
export type { Device, Message, Url };

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
  payload: unknown;
  isDisplayed: boolean;
  payloadDisplay: DisplayMethod;
}

interface MessageSummary {
  id: string;
  device: string;
}

interface Device {
  isSelected: boolean; //remove
  name: string;
  messages: Message[]; //remove
  ids: string[];
  specs: DeviceSpec;
  displayedMessage: string;
}

interface DeviceSpec {
  rank: number;
  nSlots: number;
  inputTimesliceId: number;
  maxInputTimeslices: number;
  inputs: DeviceIO[];
  outputs: DeviceIO[];
  forwards: DeviceIO[];
}

interface DeviceIO {
  binding: string;
  sourceChannel: string;
  timeslice: number;
  origin: string;
  description: string;
  subSpec: number;
}

interface State {
  analysisHost: Url | undefined;
  devices: Device[];
  lastMessageId: string | undefined;
}

export default State;
export { DisplayMethod };
export type { Device, Message, Url, MessageSummary };

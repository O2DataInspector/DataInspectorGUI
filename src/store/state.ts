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
  binPayload: string;
  payloadEndiannes: string;
  payloadDisplay: DisplayMethod;
}

interface MessageSummary {
  creationTimer: string;
  description: string;
  device: string;
  duration: number;
  id: string;
  origin: string;
  payloadSerialization: string;
  payloadSize: number;
  startTime: number;
}

interface Device {
  name: string;
  messages: MessageMap;
  isSelected: boolean;
  ids: string[];
  specs: DeviceSpec;
  displayedMessage: Message | undefined;
}

interface DeviceSpec {
  rank: number;
  nSlots: number;
  inputTimesliceId: number;
  maxInputTimeslices: number;
  inputs: DeviceInput[];
  outputs: DeviceOutput[];
  forwards: DeviceForward[];
}

interface DeviceInput {
  binding: string;
  sourceChannel: string;
  timeslice: number;
  origin: string | undefined;
  description: string | undefined;
  subSpec: number | undefined;
}

interface DeviceOutput {
  binding: string;
  channel: string;
  timeslice: number;
  maxTimeslices: number;
  origin: string;
  description: string;
  subSpec: number | undefined;
}

interface DeviceForward {
  binding: string;
  channel: string;
  timeslice: number;
  maxTimeslices: number;
  origin: string | undefined;
  description: string | undefined;
  subSpec: number | undefined;
}

type MessageMap = {
  [key: string]: Message;
};

interface State {
  analysisHost: Url | undefined;
  devices: Device[];
  isRunActive: boolean;
  lastMessageId: string | undefined;
}

export default State;
export { DisplayMethod };
export type { Device, DeviceSpec, Message, Url, MessageSummary, MessageMap };

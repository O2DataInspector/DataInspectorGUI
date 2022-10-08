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

interface Device {
  isSelected: boolean;
  name: string;
  messages: Message[];
  ids: string[];
  specs: DeviceSpec;
}

interface DeviceSpec {
  rank: number,
  nSlots: number,
  inputTimesliceId: number, 
  maxInputTimeslices: number,
  inputs: DeviceIO[],
  outputs: DeviceIO[],
  forwards: DeviceIO[],
}

interface DeviceIO{
  binding: string,
  sourceChannel: string,
  timeslice: number,
  origin: string,
  description: string,
  subSpec: number
}

interface State {
  analysisHost: Url | undefined;
  devices: Device[];
}

export default State;
export { DisplayMethod };
export type { Device, Message, Url };

import {
  Device,
  DisplayMethod,
  Message,
  Url,
  MessageSummary,
} from "store/state";

const DISCONNECT = "DISCONNECT";
const CLEAN_RUN_DATA = "CLEAN_RUN_DATA";
const SET_DEVICES = "SET_DEVICES";
const SET_IS_RUN_ACTIVE = "SET_IS_RUN_ACTIVE";
const SET_MESSAGES = "SET_MESSAGES";
const SET_DISPLAYED = "SET_DISPLAYED";
const SET_DISPLAY_METHOD = "SET_DISPLAY_METHOD";
const SET_ADDRESS = "SET_ADDRESS";
const UPDATE_DEVICE_MESSAGE = "UPDATE_DEVICE_MESSAGE";

interface Disconnect {
  type: typeof DISCONNECT;
}

interface CleanRunData {
  type: typeof CLEAN_RUN_DATA;
}

interface SetDevices {
  type: typeof SET_DEVICES;
  devices: Device[];
}

interface SetIsRunActive {
  type: typeof SET_IS_RUN_ACTIVE;
  isRunActive: boolean;
}

interface SetMessages {
  type: typeof SET_MESSAGES;
  messages: MessageSummary[];
}

interface SetDisplayed {
  type: typeof SET_DISPLAYED;
  deviceName: string;
  messageId: string;
}

interface SetDisplayMethod {
  type: typeof SET_DISPLAY_METHOD;
  message: Message;
  method: DisplayMethod;
}

interface SetAddress {
  type: typeof SET_ADDRESS;
  analysisHost: Url;
}

interface UpdateDeviceMessage {
  type: typeof UPDATE_DEVICE_MESSAGE;
  deviceName: string;
  message: Message;
  messageId: string;
}

type Action =
  | Disconnect
  | CleanRunData
  | SetDevices
  | SetIsRunActive
  | SetMessages
  | SetDisplayed
  | SetDisplayMethod
  | SetAddress
  | UpdateDeviceMessage;

const disconnect = (): Action => ({
  type: DISCONNECT,
});

const cleanRunData = (): Action => ({
  type: CLEAN_RUN_DATA,
});

const setDevices = (devices: Device[]): Action => ({
  type: SET_DEVICES,
  devices: devices,
});

const setIsRunActive = (isRunActive: boolean): Action => ({
  type: SET_IS_RUN_ACTIVE,
  isRunActive: isRunActive,
});

const setMessages = (messages: MessageSummary[]): Action => ({
  type: SET_MESSAGES,
  messages: messages,
});

const setDisplayed = (deviceName: string, messageId: string): Action => ({
  type: SET_DISPLAYED,
  deviceName: deviceName,
  messageId: messageId,
});

const setDisplayMethod = (message: Message, method: DisplayMethod): Action => ({
  type: SET_DISPLAY_METHOD,
  message: message,
  method: method,
});

const setAddress = (analysisHost: Url): Action => ({
  type: SET_ADDRESS,
  analysisHost: analysisHost
});

const updateDeviceMessage = (
  deviceName: string,
  message: Message,
  messageId: string
): Action => ({
  type: UPDATE_DEVICE_MESSAGE,
  deviceName: deviceName,
  message: message,
  messageId: messageId,
});

export default Action;
export {
  DISCONNECT,
  CLEAN_RUN_DATA,
  SET_DEVICES,
  SET_IS_RUN_ACTIVE,
  SET_MESSAGES,
  SET_DISPLAYED,
  SET_DISPLAY_METHOD,
  SET_ADDRESS,
  UPDATE_DEVICE_MESSAGE,
  disconnect,
  cleanRunData,
  setDevices,
  setIsRunActive,
  setMessages,
  setDisplayed,
  setDisplayMethod,
  setAddress,
  updateDeviceMessage,
};

import { Device, DisplayMethod, Message, Url } from 'store/state'

const DISCONNECT = 'DISCONNECT'
const SET_DEVICES = 'SET_DEVICES'
const SET_MESSAGES = 'SET_MESSAGES'
const SET_DISPLAYED = 'SET_DISPLAYED'
const SET_DISPLAY_METHOD = 'SET_DISPLAY_METHOD'
const SET_TOPOLOGY_DETAILS = 'SET_TOPOLOGY_DETAILS'

interface Disconnect {
  type: typeof DISCONNECT
}

interface SetDevices {
  type: typeof SET_DEVICES
  devices: Device[]
}

interface SetMessages {
  type: typeof SET_MESSAGES
  messages: Message[]
}

interface SetDisplayed {
  type: typeof SET_DISPLAYED
  message: Message
}

interface SetDisplayMethod {
  type: typeof SET_DISPLAY_METHOD
  message: Message
  method: DisplayMethod
}

interface SetTopologyDetails {
  type: typeof SET_TOPOLOGY_DETAILS
  analysisHost: Url
  devicesNames: string[]
}

type Action =
  Disconnect
  | SetDevices
  | SetMessages
  | SetDisplayed
  | SetDisplayMethod
  | SetTopologyDetails

const disconnect = (): Action => ({
  type: DISCONNECT
})

const setDevices = (devices: Device[]): Action => ({
  type: SET_DEVICES,
  devices: devices
})

const setMessages = (messages: Message[]): Action => ({
  type: SET_MESSAGES,
  messages: messages
})

const setDisplayed = (message: Message): Action => ({
  type: SET_DISPLAYED,
  message: message
})

const setDisplayMethod = (message: Message, method: DisplayMethod): Action => ({
  type: SET_DISPLAY_METHOD,
  message: message,
  method: method
})

const setTopologyDetails = (
  analysisHost: Url,
  devicesNames: string[]
): Action => ({
  type: SET_TOPOLOGY_DETAILS,
  analysisHost: analysisHost,
  devicesNames: devicesNames
})

export default Action
export {
  DISCONNECT,
  SET_DEVICES,
  SET_MESSAGES,
  SET_DISPLAYED,
  SET_DISPLAY_METHOD,
  SET_TOPOLOGY_DETAILS,
  disconnect,
  setDevices,
  setMessages,
  setDisplayed,
  setDisplayMethod,
  setTopologyDetails
}

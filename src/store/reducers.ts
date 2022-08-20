import Action, * as Actions from "store/actions";
import State, { Device, DisplayMethod, Message } from "store/state";

const initialState: State = {
  analysisHost: undefined,
  devices: [],
};

function reduce(state = initialState, action: Action): State {
  switch (action.type) {
    case Actions.DISCONNECT:
      return initialState;
    case Actions.SET_DEVICES:
      return { ...state, devices: action.devices };
    case Actions.SET_MESSAGES: {
      const messagesMap = mapToDevicesNames(action.messages);
      return {
        ...state,
        devices: state.devices.map(
          (device) =>
            ({
              ...device,
              messages: [
                ...device.messages.map((message) => ({
                  ...message,
                  isDisplayed: false,
                })),
                ...(messagesMap.get(device.name) || []),
              ],
            } as Device)
        ),
      };
    }
    case Actions.SET_DISPLAYED:
      return {
        ...state,
        devices: state.devices.map((device) => {
          if (device.name !== action.message.sender) {
            return device;
          }
          return {
            ...device,
            messages: device.messages.map((message) => ({
              ...message,
              isDisplayed: message === action.message,
            })),
          };
        }),
      };
    case Actions.SET_DISPLAY_METHOD:
      return {
        ...state,
        devices: state.devices.map((device) => {
          if (device.name !== action.message.sender) {
            return device;
          }
          return {
            ...device,
            messages: device.messages.map((message) => {
              if (message !== action.message) {
                return message;
              }
              return {
                ...message,
                payloadDisplay: action.method,
              };
            }),
          };
        }),
      };
    case Actions.SET_TOPOLOGY_DETAILS:
      return {
        ...state,
        analysisHost: action.analysisHost,
        devices: action.devicesNames.map(
          (name) =>
            ({
              isSelected: false,
              name: name,
              messages: [],
            } as Device)
        ),
      };
    default:
      return state;
  }
}

function mapToDevicesNames(messages: Message[]): Map<string, Message[]> {
  const result = new Map<string, Message[]>();
  const countersMap = new Map<string, number>();
  messages.forEach((message) => {
    const counter = countersMap.get(message.sender) || 0;
    countersMap.set(message.sender, counter + 1);
    const currentMessages = result.get(message.sender) || [];
    const timestamp = Date.now().toString() + "_" + counter.toString();
    result.set(message.sender, [
      ...currentMessages.map((currentMessage) => ({
        ...currentMessage,
        isDisplayed: false,
      })),
      {
        ...message,
        id: timestamp,
        isDisplayed: true,
        payloadDisplay: DisplayMethod.Default,
      } as Message,
    ]);
  });
  return result;
}

export default reduce;

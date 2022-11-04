import Action, * as Actions from "store/actions";
import State, {
  Device,
  DisplayMethod,
  Message,
  MessageMap,
  MessageSummary,
} from "store/state";

const initialState: State = {
  analysisHost: undefined,
  devices: [],
  lastMessageId: undefined,
};

function reduce(state = initialState, action: Action): State {
  switch (action.type) {
    case Actions.DISCONNECT:
      return initialState;
    case Actions.SET_DEVICES:
      return { ...state, devices: action.devices };
    case Actions.SET_MESSAGES: {
      if (action.messages.length > 0) {
        const messagesMap = mapToDevicesNames(action.messages);
        return {
          ...state,
          lastMessageId: action.messages.at(-1)?.id,
          devices: state.devices.map((device) => {
            const newMessages = messagesMap.get(device.name);
            return {
              ...device,
              ids: device.ids.concat(
                newMessages === undefined ? [] : newMessages
              ),
            } as Device;
          }),
        };
      } else return state;
    }
    case Actions.SET_TOPOLOGY_DETAILS:
      return {
        ...state,
        analysisHost: action.analysisHost,
        devices: action.devices.map(
          (device) =>
            ({
              ...device,
              isSelected: false,
              messages: {} as MessageMap,
              ids: [],
            } as Device)
        ),
      };
    case Actions.UPDATE_DEVICE_MESSAGE:
      return {
        ...state,
        devices: state.devices.map((device) => {
          if (device.name !== action.deviceName) {
            return device;
          } else {
            const updatedMessages = { ...device.messages } as MessageMap;
            updatedMessages[action.messageId] = action.message;
            return {
              ...device,
              displayedMessage: action.message,
              messages: updatedMessages,
            };
          }
        }),
      };
    default:
      return state;
  }
}

// returns mapping from device name to array of message ids
function mapToDevicesNames(messages: MessageSummary[]): Map<string, string[]> {
  const result = new Map<string, string[]>();
  messages.forEach((m) =>
    result.has(m.device)
      ? result.get(m.device)?.push(m.id)
      : result.set(m.device, [m.id])
  );
  return result;
}

export default reduce;

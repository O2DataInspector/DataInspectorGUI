import React from 'react'
import * as Redux from 'react-redux'

import BytesTable from 'components/BytesTable'
import DeviceIcon from 'icons/device.svg'
import { Device, DisplayMethod, Message } from 'store/state'

import 'components/message.css'
import { setDisplayMethod } from 'store/actions'

interface MessageHeaderProps {
  device: Device
}

const MessageHeader = ({ device }: MessageHeaderProps) => (
  <div id='device-header' className='flex-row'>
    <img src={DeviceIcon} alt="DeviceIcon"/>
    <span>{device.name}</span>
  </div>
)

interface MessageProps {
  message: Message
}

const MessageView = ({ message }: MessageProps) => (
  <div id='message-view'>
    {message.payload === undefined ? null : (
      <div id='display-selection'>
        <span>Display method:</span>
        <hr />
        <DisplaySelection message={message} />
      </div>)}
    <span>Header</span>
    <hr />
    <Header message={message} />
    <span>Payload</span>
    <hr />
    <Payload message={message} />
  </div >
)

const Header = ({ message }: MessageProps) => (
  <div id='header'>
    <table>
      <tr>
        <td>Origin: {message.origin}</td>
        <td>Payload parts: {message.payloadParts}</td>
      </tr>
      <tr>
        <td>Description: {message.description}</td>
        <td>Payload split index: {message.payloadSplitIndex}</td>
      </tr>
      <tr>
        <td>Sub-specification: {message.subSpecification}</td>
        <td>Start time: {message.startTime ? message.startTime : 'N/A'}</td>
      </tr>
      <tr>
        <td>Payload size: {message.payloadSize} B</td>
        <td>Duration: {message.duration ? message.duration : 'N/A'}</td>
      </tr>
      <tr>
        <td>Serialization: {message.payloadSerialization}</td>
        <td>
          Creation time: {message.creationTime ? message.creationTime : 'N/A'}
        </td>
      </tr>
      <tr>
        <td>FirstTForbit: {message.firstTForbit}</td>
        <td>Task's hash: {message.taskHash ? message.taskHash : 'N/A'}</td>
      </tr>
      <tr>
        <td>Run numer: {message.runNumber}</td>
        <td></td>
      </tr>
    </table>
  </div>
)

const DisplaySelection = ({ message }: MessageProps) => {
  const store = Redux.useStore()

  function onClick(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    const method =
      event.currentTarget.name === 'default'
        ? DisplayMethod.Default
        : DisplayMethod.Custom
    store.dispatch(setDisplayMethod(message, method))
  }

  return (
    <div>
      <label>
        <input
          type='checkbox'
          name='default'
          onClick={onClick}
          checked={message.payloadDisplay === DisplayMethod.Default}
        />
	  Default
	</label>
      <label>
        <input
          type='checkbox'
          name='custom'
          onClick={onClick}
          checked={message.payloadDisplay === DisplayMethod.Custom}
        />
        Custom ({message.payloadSerialization})
      </label>
    </div>
  )
}

const Payload = ({ message }: MessageProps) => (
  <div id='message-payload'>
    {message.payload
      ? message.payloadDisplay === DisplayMethod.Default
        ? <BytesTable bytes={message.payloadBytes} />
        : <span>{message.payload}</span>
      : <BytesTable bytes={message.payloadBytes} />}
  </div>
)

const SimpleMessageView = ({ message }: MessageProps) => (
  <div id='message-view'>
    <span>Header</span>
    <hr />
    <SimpleHeader message={message} />
    <span>Payload</span>
    <hr />
    <BytesTable bytes={message.payloadBytes} />
  </div >
)

const SimpleHeader = ({ message }: MessageProps) => (
  <div id='simple-header'>
    <span>Origin: {message.origin}</span>
    <br />
    <span>Description: {message.description}</span>
    <br />
    <span>Payload size: {message.payloadSize} B</span>
    <br />
    <span>Serialization: {message.payloadSerialization}</span>
  </div>
)

export { MessageHeader, MessageView, SimpleMessageView }

import React from 'react'
import * as Redux from 'react-redux'
import * as Router from 'react-router-dom'


import { MessageHeader, MessageView } from 'components/Message'
import NavigationBar, * as Buttons from 'components/NavigationBar'
import ExitIcon from 'icons/exit.svg'
import { setDisplayed } from 'store/actions'
import State, { Device, Message } from 'store/state'

import 'components/common.css'
import 'pages/overview.css'

interface OverviewProps {
  maybeDevice: Device | undefined
}

const Overview = ({ maybeDevice }: OverviewProps) => {
  const history = Router.useHistory()

  function onExit() {
    history.push('/dashboard')
  }

  return (
    <div id='overview' className='row2col2'>
      <NavigationBar>
        <Buttons.SelectDevices />
        <Buttons.Disconnect />
      </NavigationBar>
      {maybeDevice ? <NonEmptyDevice device={maybeDevice} /> : <EmptyDevice />}
      <div id='overview-exit'>
        <img onClick={onExit} src={ExitIcon} alt="ExitIcon"/>
      </div>
    </div>
  )
}

interface OverviewDeviceProps {
  device: Device
}

const NonEmptyDevice = ({ device }: OverviewDeviceProps) => {
  const store = Redux.useStore()

  const message = device.messages.find(message => message.isDisplayed)

  function onClick(message: Message) {
    store.dispatch(setDisplayed(message))
  }

  return (
    <div id='overview-device' className='row2'>
      <MessageHeader device={device} />
      <div id='overview-message' className='col2'>
        {message ? <MessageView message={message} /> : <EmptyMessage />}
        <div id='overview-messages'>
          <span>Choose message:</span>
          <br />
          {device.messages.map(message =>
            <SelectionOption
              key={message.id}
              message={message}
              onClick={onClick}
            />)}
        </div>
      </div>
    </div>
  )
}

interface SelectionOptionProps {
  message: Message
  onClick: (message: Message) => void
}

const SelectionOption = ({ message, onClick }: SelectionOptionProps) => (
  <label className='block'>
    <input
      type='checkbox'
      onChange={() => onClick(message)}
      checked={message.isDisplayed}
    />
    {message.id}
  </label>
)

const EmptyDevice = () => (
  <div id='overview-empty-device' className='row2'>
    <span>Device does not exist</span>
    <br />
    <span>Select a different device</span>
  </div>
)

const EmptyMessage = () => (
  <div id='overview-empty-message'>
  </div>
)

interface DeviceNameProps {
  name: string
}

const mapState = (
  state: State,
  { match }: Router.RouteComponentProps<DeviceNameProps>
) => ({
  maybeDevice: state.devices.find(device => device.name === match.params.name)
})


export default Redux.connect(mapState)(Overview)

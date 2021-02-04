import Axios from 'axios'
import React from 'react'
import * as Redux from 'react-redux'
import * as Router from 'react-router-dom'

import HomeIcon from 'icons/home.svg'
import { disconnect } from 'store/actions'
import { selectAddress } from 'store/selectors'

import './navigation-bar.css'
import 'components/common.css'

const NavigationBar: React.FC = props => (
  <div id='navigation-bar' className='inline-row'>
    <Logo />
    <div id='navigation-buttons'>
      {props.children}
    </div>
  </div>
)

const Logo = () => (
  <div id='navigation-logo' className='flex-row'>
    <img src={HomeIcon} />
    <span>Data Inspector</span>
  </div>
)

const Disconnect = () => {
  const store = Redux.useStore()
  const history = Router.useHistory()

  function onClick() {
    const address = selectAddress(store.getState())
    Axios.get(address + '/stop').catch(_ => { /* */ })
    store.dispatch(disconnect())
    history.push('/')
  }

  return (
    <button id='disconnect' onClick={onClick}>Disconnect</button>
  )
}

const SelectDevices = () => {
  const history = Router.useHistory()

  function onClick() {
    history.push('/selection')
  }

  return (
    <button id='select-devices' onClick={onClick}>Select Devices</button>
  )
}

export default NavigationBar
export { Disconnect, SelectDevices }

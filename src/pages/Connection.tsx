import Axios from 'axios'
import React from 'react'
import { TailSpin } from 'react-loader-spinner'
import * as Redux from 'react-redux'
import * as Router from 'react-router-dom'

import ConnectionForm from 'components/ConnectionForm'
import NavigationBar from 'components/NavigationBar'
import WebIcon from 'icons/web.svg'
import { setTopologyDetails } from 'store/actions'

import 'components/common.css'
import 'pages/connection.css'

const Connection = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const store = Redux.useStore()
  const history = Router.useHistory()

  function onSubmit(address: string) {
    setIsLoading(true)
    Axios.get(address + '/available-devices')
      .then(response => {
        const devices = response.data.split('\n')
        store.dispatch(setTopologyDetails(address, devices))
        setIsLoading(false)
        history.push('/dashboard')
      })
      .catch(_ => {
        alert('Failed to connect. Is the analysis task running?')
        setIsLoading(false)
      })
  }

  return (
    <div id='connection' className='row2'>
      <NavigationBar />
      <div className='row3col3'>
        <ConnectionHeader />
        <ConnectionForm onSubmit={onSubmit} />
        {isLoading ? <Spinner /> : <br />}
      </div>
    </div>
  )
}


const ConnectionHeader = () => (
  <div id='connection-header' className='flex-row'>
    <span>Connect to Data Inspector</span>
    <img src={WebIcon} alt="WebIcon"/>
  </div>
)

const Spinner = () => (
  <div id='loader'>
    <TailSpin color='#000000A0' height='40px' />
  </div>
)

export default Connection

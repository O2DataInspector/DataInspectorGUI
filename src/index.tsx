import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'

import Router from 'pages/Router'
import reportWebVitals from 'reportWebVitals'
import reduce from 'store/reducers'

import './index.css'

const store = createStore(reduce)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <Router />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

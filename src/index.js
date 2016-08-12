import React from 'react'
import { render } from 'react-dom'
import styles from 'styles/index.less'
import createHistory from 'history/lib/createHashHistory'
import configureStore from './store/configureStore'
import Root from './containers/root'
import { syncReduxAndRouter } from 'redux-simple-router'

const store = configureStore()
const history = createHistory({
  queryKey: false,
})

syncReduxAndRouter(history, store)

render(
  <Root store={ store } history={ history } />,
  document.getElementById('root')
)

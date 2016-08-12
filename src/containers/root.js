import React  from 'react'
import { Provider } from 'react-redux'
import Routers from 'routes'

export default class Root extends React.Component {
  static propTypes = {
    history : React.PropTypes.object.isRequired,
    store   : React.PropTypes.object.isRequired
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <Routers history={this.props.history}/>
      </Provider>
    )
  }
}

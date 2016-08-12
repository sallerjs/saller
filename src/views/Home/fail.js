import React from 'react'
import { connect } from 'react-redux'
import Confirm from '../../components/confirm'
import { changeTitle, closeErrorDialog } from 'actions'

@connect(
  {
    changeTitle,
    closeErrorDialog,
  }
)
export default class Fail extends React.Component {
  static PropTypes = {
    changeTitle: React.PropTypes.func.isRequired,
    closeErrorDialog: React.PropTypes.object.isRequired,
  }
  componentWillMount() {
    this.props.changeTitle('处理失败')
  }
  render() {
    const { closeErrorDialog } = this.props
    return (
      <div>
        <Confirm title='提示' content='该账户被锁定，请24小时后重试' toggle={() => {
            location.href = 'http://m..com/chaoshi/jiankangkazhuanqu.shtml'
          }}/>
      </div>
    )
  }
}

export default Fail

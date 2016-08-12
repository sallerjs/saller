import React from 'react'

export default class Pay extends React.Component {
  static propTypes = {
    password: React.PropTypes.array.isRequired
  }
  render() {
    const { password, cancel, confirm } = this.props
    const isOverflow = stack => {
        return stack[stack.length - 1] !== ''
    }
    return (
        <div className="dialog-containers">
          <div className="mask"></div>
          <div className="pay">
            <h3>请输入一账通交易密码</h3>
            <div className="pay-password">
              <ul>
                {password && password.map((item, index) => {
                  return (<li
                               key={index}
                               style={{  'fontSize': '30px'}}>
                             {item !== '' ? '●' : ''}
                           </li>)
                   })}
              </ul>
            </div>
            <div className="confirm-button twoColumn">
              <span onTouchEnd={cancel}>取消</span>
              <span
                    className={isOverflow(password) ? '' : 'disabled'}
                    onTouchEnd={() => {
                                  isOverflow(password) ? confirm() : false
                                }}>确定</span>
            </div>
          </div>
        </div>
        )
    }
  }

  export default Pay

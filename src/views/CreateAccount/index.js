import React from 'react'
import { connect } from 'react-redux'
import { changeTitle, initPassword, incrementPassword, decrementPassword, updateLoadingStatus, requestBindCards } from 'actions'
import KeyBoard from 'components/keyBoard'

@connect(
    state => ({
        password: state.password.password,
        confirmPassword: state.password.confirmPassword,
        orderInfo: state.order.advanceOrderInfo
    }),
    {
        changeTitle,
        requestBindCards,
        incrementPassword,
        decrementPassword,
        updateLoadingStatus
    }
)
export default class CreateAccount extends React.Component {
    static PropTypes = {
      changeTitle: React.PropTypes.func.isRequired,
      password: React.PropTypes.array.isRequired,
      confirmPassword: React.PropTypes.array.isRequired,
      incrementPassword: React.PropTypes.func.isRequired,
      decrementPassword: React.PropTypes.func.isRequired
    }

    componentWillMount() {
      this.props.changeTitle('设置交易密码')
      this.props.requestBindCards(this.props.orderInfo)
      this.props.updateLoadingStatus()
    }

    componentDidUpdate() {

    }
    render() {
        const {  initPassword, incrementPassword, decrementPassword, password, confirmPassword, history} = this.props

        return (
            <div>
                <div className="setpwd">
                    <h2>请输入交易密码，用于支付验证</h2>

                    <div className="setpwd-password">
                        <ul>
                          { password && password.map((item, index) => {
                              return <li key={index} style={{'fontSize': '30px'}}>{item !== '' ? "●" : ""}</li>
                            })}
                        </ul>
                        <p>该密码为购买金融旗舰店产品交易时的交易密码</p>

                        <div className={password[password.length - 1] === '' ? 'noClickBtn' : 'clickBtn'} onTouchEnd={() => {
                            if(password[password.length - 1] === ''){
                                return
                            }
                            history.pushState(null, '/createAccount/confirmPassword')
                        }}>下一步</div>
                    </div>
                </div>
                <KeyBoard increment={incrementPassword} decrement={decrementPassword} />
            </div>
        )
    }
}

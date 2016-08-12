import React from 'react'
import { connect } from 'react-redux'
import { changeTitle, initPassword, incrementConfirmPassword, decrementConfirmPassword, clearPassword } from 'actions'
import KeyBoard from 'components/keyBoard'
import Modal from 'components/modal'

@connect(
    state => ({
        password: state.password.password,
        confirmPassword: state.password.confirmPassword,
        advanceOrder: state.order.advanceOrder
    }),
    {
        changeTitle ,
        incrementConfirmPassword,
        decrementConfirmPassword,
        clearPassword
    }
)
export default class ConfirmPassword extends React.Component {
    
    state = {
        showErrorDialog: false,
        showKeyboard: true
    }

    static PropTypes = {
      changeTitle: React.PropTypes.func.isRequired,
      password: React.PropTypes.array.isRequired,
      clearPassword: React.PropTypes.func.isRequired,
      confirmPassword: React.PropTypes.array.isRequired,
      incrementConfirmPassword: React.PropTypes.func.isRequired,
      decrementConfirmPassword: React.PropTypes.func.isRequired
    }

    equalsPassword(){
        const { password, confirmPassword, history} = this.props
        if(password.join('') == confirmPassword.join('')){
            history.pushState(null, '/createAccount/addCard')
        }
        else{
            this.setState({
                showErrorDialog: true,
                errorMsg: '2次输入密码不一致,请重新输入',
                title: '设置交易密码失败',
                showKeyboard: false
            })

        }
    }

    againInput(){
        const { clearPassword, history } = this.props
        clearPassword()
        history.pushState(null, '/createAccount')
    }

    toggleErrorDialog(){
        this.setState({
            showErrorDialog: false,
            errorMsg: '',
            title: '',
            showKeyboard: true
        })
    }

    componentWillMount() {
      this.props.changeTitle('设置交易密码')
    }

    componentDidUpdate() {

    }
    render() {
        const {
            initPassword,
            incrementConfirmPassword,
            decrementConfirmPassword,
            password,
            confirmPassword,
            clearPassword,
            history
        } = this.props

        return (

            <div>
                <div className="setpwd">
                    <h2>请再次填写确认</h2>

                    <div className="setpwd-password">
                        <ul>
                          { confirmPassword && confirmPassword.map((item, index) => {
                              return <li key={index} style={{'fontSize': '30px'}}>{item !== '' ? "●" : ""}</li>
                            })}
                        </ul>
                        <p>该密码为购买金融旗舰店产品交易时的交易密码</p>
                        <div className={confirmPassword[confirmPassword.length -1] === '' ? 'noClickBtn' : 'clickBtn'} onTouchEnd={()=>{
                                if(confirmPassword[confirmPassword.length -1] === ''){
                                    return
                                }
                                this.equalsPassword()
                            }}>完成</div>
                    </div>
                </div>
                { !!this.state.showKeyboard && <KeyBoard increment={incrementConfirmPassword} decrement={decrementConfirmPassword} />}
                { !!this.state.showErrorDialog && <Modal title={this.state.title} content={this.state.errorMsg} toggle={this.toggleErrorDialog.bind(this)} again={this.againInput.bind(this)} />}
            </div>
        )
    }
}

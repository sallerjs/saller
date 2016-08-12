import React from 'react'
import { connect } from 'react-redux'
import { changeTitle, sendOtp, bingCard, stopSendOtpingTimer, closeVerifyErrorDialog, resetVerifyCard } from 'actions'
import { createChecker, required, bankCard, assignLength, mobile, integer } from 'utils/checker'
import Tips from 'components/tips'
import Confirm from 'components/confirm'

@connect(
    state => ({
        confirmPassword: state.password.confirmPassword,
        otpInfo: state.otp,
        cardNo: state.card.savedCard,
        advanceOrderInfo: state.order.advanceOrderInfo,
        accountRes: state.account,
        verifyCard: state.verifyCard,
        addCard: state.addCard
    }), {
        changeTitle ,
        sendOtp,
        bingCard,
        stopSendOtpingTimer,
        closeVerifyErrorDialog,
        resetVerifyCard
    }
)

export default class Verification extends React.Component {

    static PropTypes = {
        changeTitle: React.PropTypes.func.isRequired,
        sendOtp: React.PropTypes.func.isRequired,
        createAccount: React.PropTypes.func.isRequired,
        accountRes: React.PropTypes.object.isRequired,
        history: React.PropTypes.object.isRequired
    }

    state = {
        agreementChecked: true,
        otpSending: false,
        phonecode: '',
        phone: '',
        addCardChecker: createChecker({
            phone: [required('手机号不能为空'), mobile],
            phonecode: [required('验证码不能为空'), integer, assignLength(6)]
        }),
        error: '',
        showCheckedErrorDialog: false,
        checkedErrorMsg: '请阅读协议'
    }

    toggleCheckedDialog(){
        this.setState({
            showCheckedErrorDialog: !this.state.showCheckedErrorDialog
        })
    }

    changePhonecode(e) {
        this.setState({
            phonecode: e.target.value
        })
    }
    changePhone(e) {
        this.setState({
            phone: e.target.value
        })
    }

    changeAgreementChecked(e){
        this.setState({
            agreementChecked: e.target.checked
        })
    }

    componentWillMount() {
      const { changeTitle, history, resetVerifyCard } = this.props
      changeTitle('验证手机')
    }

    otpSending() {
        this.setState({
            otpSending: true,
            otpSendingTimer: 120
        })
        this.startTimer()
    }

    startTimer() {
        if(this.timer){
            return
        }
        this.timer = setInterval(this.tick.bind(this), 1000)
    }

    stopTimer(){
        clearInterval(this.timer)
        this.timer = null
        this.setState({
            otpSending: false
        })
    }

    tick(){
         if(!this.state.otpSendingTimer){
             this.stopTimer()
         }
         this.setState({
             otpSendingTimer: this.state.otpSendingTimer - 1
         })
    }

    readAgreement(){
        this.props.history.pushState(null, '/agreement')
    }

    componentDidUpdate() {
        const { accountRes, history, verifyCard, stopSendOtpingTimer, resetVerifyCard } = this.props

        if(accountRes.responseCode == '0'){
            history.pushState(null, '/cashier')
        }
        if(!!verifyCard.bindingSuccess){
            resetVerifyCard()
            history.pushState(null, '/cashier')
        }
    }

    componentWillUnmount() {
        this.stopTimer()
    }

    render() {
        const { sendOtp, advanceOrderInfo, otpInfo, confirmPassword, bingCard, cardNo, verifyCard, addCard, closeVerifyErrorDialog } = this.props
        return (
            <div>
                <ul className="list m_t15 whiteConBox">
                    <li>
                        <span>手机号</span>
                        <div className="list-info">
                            <input type="text" className="list-info-input" maxLength="11" onChange={this.changePhone.bind(this)}  placeholder="请输入银行预留的手机号"/>
                        </div>
                    </li>
                    <li className="pos_r">
                        <input type="text" className="list-info-inputSms" maxLength="6" onChange={this.changePhonecode.bind(this)} placeholder="请输入短信验证码"/>
                        <div className="getSMS" onTouchEnd={()=>{
                            if(!!this.state.otpSending){
                                return
                            }
                            let error = this.state.addCardChecker({'phone': this.state.phone})
                            this.setState({
                                error: !error ? '' : error.phone
                            })
                            if(Object.keys(error).length == 1){
                                this.otpSending()
                                sendOtp({
                                    mobile: this.state.phone,
                                    channel: 1982
                                })

                            }

                        }}>
                        { !!this.state.otpSending && this.state.otpSendingTimer }
                        { !this.state.otpSending && '获取验证码'}
                        </div>
                    </li>
                </ul>
                <Tips content={this.state.error} />
                <div className="protocol">
                    <div className="protocol-checkbox">
                        <input type="checkbox" id="chekboxInput" onChange={this.changeAgreementChecked.bind(this)} checked={this.state.agreementChecked}/>
                        <label htmlFor="chekboxInput"></label>
                    </div>
                    我已阅读并同意<a href="javascript:void(0)" onTouchEnd={()=>{
                        this.readAgreement()
                    }}>《个人授代付权协议》</a>
                </div>
                <div className="clickBtn" onTouchEnd={()=> {
                    if(!!verifyCard.bindingCard){
                        return
                    }
                    let error = this.state.addCardChecker({
                        'phonecode': this.state.phonecode,
                        'phone': this.state.phone
                    })

                    this.setState({
                        error: !error ? '' : !!error.phone ? error.phone : !!error.phonecode ? error.phonecode : error.checked
                    })

                    if(!!Object.keys(error).length){
                        return
                    }

                    if(!this.state.agreementChecked){
                        this.toggleCheckedDialog()
                        return
                    }
                    bingCard({
                        mobile: this.state.phone,
                        otpPhoneCode: this.state.phonecode,
                        cardNo: addCard.cardNo,
                        bankNo: addCard.bankNo,
                        bankName: addCard.bankName,
                        cardType: addCard.cardType,
                        accountName: advanceOrderInfo.custName,
                        channel: advanceOrderInfo.channel,
                        pamaAcct: advanceOrderInfo.pamaAcct,
                        idNo: advanceOrderInfo.idNumber,
                        channelDate: advanceOrderInfo.channelDate
                    })
                }}>
                { !verifyCard.bindingCard && '下一步'}
                { !! verifyCard.bindingCard &&
                    <div className='loadingBtn'>
                        <span></span>
                    </div>
                }
                </div>
                { !!this.state.showCheckedErrorDialog && <Confirm content={this.state.checkedErrorMsg} title='提示' toggle={this.toggleCheckedDialog.bind(this)} /> }
                { !!verifyCard.showErrorDialog && <Confirm content={verifyCard.failedMsg} title='提示' toggle={closeVerifyErrorDialog} /> }
            </div>
        )
    }
}

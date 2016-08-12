import React from 'react'
import { connect } from 'react-redux'
import { changeTitle, sendOtp, createAccount, stopSendOtpingTimer, closeVerifyErrorDialog, resetVerifyCard, updateAdvanceOrderPamaAcct } from 'actions'
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
        createAccount,
        stopSendOtpingTimer,
        closeVerifyErrorDialog,
        resetVerifyCard,
        updateAdvanceOrderPamaAcct
    }
)

export default class Verification extends React.Component {
    state = {
        agreementChecked: true,
        sendOtpingTimer: 120,
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

    static PropTypes = {
        changeTitle: React.PropTypes.func.isRequired,
        sendOtp: React.PropTypes.func.isRequired,
        createAccount: React.PropTypes.func.isRequired,
        accountRes: React.PropTypes.object.isRequired,
        history: React.PropTypes.object.isRequired,
    }

    componentWillMount() {
      const { changeTitle, history, resetVerifyCard } = this.props
      changeTitle('验证手机')
      history.listenBefore(function(){
          this.stopTimer()
          resetVerifyCard()
      }.bind(this))
    }

    tick(){
         let sendOtpingTimer = this.state.sendOtpingTimer
         this.setState({sendOtpingTimer: sendOtpingTimer - 1})
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
    }

    readAgreement(){
        this.props.history.pushState(null, '/agreement')
    }

    componentDidUpdate() {
        const { accountRes, history, verifyCard, stopSendOtpingTimer, resetVerifyCard, updateAdvanceOrderPamaAcct } = this.props

        if(accountRes.responseCode == '0'){
            history.pushState(null, '/cashier')
        }
        if(verifyCard.sendOtpingStart){
                this.startTimer()
        }
        if(this.state.sendOtpingTimer == 0){
            this.stopTimer()
            stopSendOtpingTimer()
            this.setState({
                sendOtpingTimer: 120
            })
        }
        if(!!verifyCard.createAccountSuccess){
            this.stopTimer()
            resetVerifyCard()
            updateAdvanceOrderPamaAcct(verifyCard.pamaAcct)
            history.pushState(null, '/cashier')
        }
    }

    render() {
        const { sendOtp, advanceOrderInfo, otpInfo, confirmPassword, createAccount, cardNo, verifyCard, addCard, closeVerifyErrorDialog } = this.props

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
                            if(!!verifyCard.sendOtpingStart){
                                return
                            }
                            let error = this.state.addCardChecker({'phone': this.state.phone})
                            this.setState({
                                error: !error ? '' : error.phone
                            })
                            if(Object.keys(error).length == 1){
                                sendOtp({
                                    mobile: this.state.phone,
                                    channel: 1982
                                })

                            }

                        }}>
                        { !!verifyCard.sendOtpingStart && this.state.sendOtpingTimer }
                        { !verifyCard.sendOtpingStart && '获取验证码'}
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
                    if(!!verifyCard.createAccountFetching){
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
                    createAccount({
                        mobile: this.state.phone,
                        phonecode: this.state.phonecode,
                        cardNo: addCard.cardNo,
                        bankNo: addCard.bankNo,
                        bankName: addCard.bankName,
                        cardType: addCard.cardType,
                        accountName: advanceOrderInfo.custName,
                        channel: advanceOrderInfo.channel,
                        pamaAcct: advanceOrderInfo.pamaAcct,
                        idNumber: advanceOrderInfo.idNumber,
                        pwd: confirmPassword,
                        oneAccount: advanceOrderInfo.oneAccount,
                        custName: advanceOrderInfo.custName,
                        channelDate: advanceOrderInfo.channelDate
                    })
                }}>
                { !verifyCard.createAccountFetching && '下一步'}
                { !! verifyCard.createAccountFetching &&
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

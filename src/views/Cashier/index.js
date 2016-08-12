import React from 'react'
import { connect } from 'react-redux'
import {
    changeTitle,
    requestBindCards,
    cancelCardPanel,
    selectCard,
    addCard,
    resetCardPanel,
    confirmPayOrder,
    incrementPayPassword,
    decrementPayPassword,
    cancelPayPassword,
    confirmPayPassword,
    confirmPay,
    closePayErrorDialog,
    updateLoadingStatus
}
from 'actions'
import BankCards from 'components/bankCards'
import Tips from 'components/tips'
import Checker from 'utils/checker'
import Pay from 'components/pay'
import KeyBoard from 'components/keyBoard'
import Confirm from 'components/confirm'
import Pending from 'components/pending'

@connect(
    state => ({
        orderInfo: state.order.advanceOrderInfo,
        cardList: state.card.list,
        cardSelected: state.card.selected,
        cardPanel: state.cardPanel,
        payOrder: state.payOrder,
    }), {
        changeTitle,
        requestBindCards,
        cancelCardPanel,
        addCard,
        resetCardPanel,
        confirmPayOrder,
        incrementPayPassword,
        decrementPayPassword,
        cancelPayPassword,
        confirmPayPassword,
        confirmPay,
        closePayErrorDialog,
        updateLoadingStatus
    }
)
export default class Cashier extends React.Component {

    static propTypes = {
      confirmPayOrder: React.PropTypes.func.isRequired,
      orderInfo: React.PropTypes.object.isRequired,
      cardList: React.PropTypes.array.isRequired,
      cardSelected: React.PropTypes.number.isRequired,
      cardPanel: React.PropTypes.object.isRequired,
      changeTitle: React.PropTypes.func.isRequired,
      cancelCardPanel: React.PropTypes.func.isRequired,
      resetCardPanel: React.PropTypes.func.isRequired,
      addCard: React.PropTypes.func.isRequired,
      requestBindCards: React.PropTypes.func.isRequired
    }

    state = {
        isChecked: false,
        checkedText: '请添加银行卡',
        showCardPanel: false,
        selectedCard: 0
    }

    componentWillMount() {
      this.props.changeTitle('收银台')
      this.props.requestBindCards(this.props.orderInfo)
      this.props.updateLoadingStatus()
    }

    componentDidUpdate() {
        const { payOrder, orderInfo, cardList, cardSelected, confirmPay } = this.props
        if(!!payOrder.canPay){
            confirmPay({
                channel: orderInfo.channel,
                pamaAcct: orderInfo.pamaAcct,
                channelDate: orderInfo.channelDate,
                channelBizNo: orderInfo.channelBizNo,
                amount: orderInfo.amount,
                orderType: orderInfo.orderType,
                cardNo: cardList[this.state.selectedCard].cardNo,
                payPassword: payOrder.payPassword,
                productName: orderInfo.productName,
                productCode: orderInfo.productCode
            })
        }
        if(!!payOrder.payResult){
            window.location.href = 'http://m..com/chaoshi/shenghuofuwu/jiankangka/paymentResult.do?payStatus=' + payOrder.payStatus
        }
    }

    toggleCardPanel(){
        this.setState({
            showCardPanel: !this.state.showCardPanel
        })
    }

    selectCard(index){
        this.setState({
            showCardPanel: false,
            selectedCard: index
        })
    }

    cancelCardPanel(){
        this.setState({
            showCardPanel: false
        })
    }

    render() {
        const { orderInfo, cardList, cardPanel, addCard, confirmPayOrder, payOrder, incrementPayPassword, decrementPayPassword, cancelPayPassword, confirmPayPassword, confirmPay, closePayErrorDialog } = this.props
        return (
            <div className="content">
                <ul className="list m_t15 whiteConBox">
                    <li>
                      <span>订单信息</span>
                      <div className="list-info">{orderInfo.productName}</div>
                    </li>
                    <li>
                        <span>付款方式</span>
                        <div className="list-info select-title" onTouchEnd={this.toggleCardPanel.bind(this)}>
                            {
                                !!cardList.length && ((card)=>{
                                    return (card.bankName + (card.cardType == 1 ? '借记卡':'信用卡') + '(尾号' + card.cardNo.slice(-4) + ')')
                                })(cardList[this.state.selectedCard])
                            }
                            {
                                !cardList.length && '请添加银行卡'
                            }
                        </div>
                    </li>
                    <li>
                        <span>需付款</span>
                        <div className="list-info"><span className="price">{orderInfo.amount}</span>元</div>
                    </li>
                </ul>
                { !!this.state.isChecked && <Tips content={this.state.checkedText} /> }
                <div className={!!orderInfo ? "clickBtn" : "noClickBtn"} onTouchEnd={ () => {
                        if(cardList.length == 0 ){
                            this.setState({
                                isChecked: true
                            })
                            return
                        }
                        resetCardPanel()
                        confirmPayOrder()

                    } }>确认付款</div>
            {!!payOrder.payModalVisible && <Pay password={payOrder.payPassword} cancel={cancelPayPassword} confirm={confirmPayPassword}/>}
            {!!payOrder.payKeboardVisible && <KeyBoard increment={incrementPayPassword} decrement={decrementPayPassword} />}
            {!!payOrder.showErrorDialog && <Confirm content={payOrder.failedMsg} title='提示' toggle={closePayErrorDialog}/>}
            {!!payOrder.isPaying && <Pending />}

            {!!this.state.showCardPanel &&
                <BankCards
                    cardList={cardList}
                    add={addCard}
                    toggle={this.toggleCardPanel.bind(this)}
                    cancel={this.cancelCardPanel.bind(this)}
                    select={this.selectCard.bind(this)}
                    selected={this.state.selectedCard}/>
            }
        </div>
        )
    }
}

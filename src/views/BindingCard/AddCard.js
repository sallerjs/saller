import React from 'react'
import { connect } from 'react-redux'
import { changeTitle, savedCard, fetchQueryCardAvaible, fetchBankSupport, closeErrorDialog, resetAddCard } from 'actions'
import { createChecker, required, bankCard } from 'utils/checker'
import Tips from 'components/tips'
import Confirm from 'components/confirm'
import BankCards from 'components/bankCards'

@connect(
    state => ({
        advanceOrderInfo: state.order.advanceOrderInfo,
        addCard: state.addCard,
        inactiveCards: state.card.inactiveList
    }), {
        savedCard,
        changeTitle,
        fetchQueryCardAvaible,
        fetchBankSupport,
        closeErrorDialog,
        resetAddCard
    }
)
export default class AddCard extends React.Component {

    state = {
        cardNo: '',
        addCardChecker: createChecker({
            cardNo: [required('银行卡号不能为空'), bankCard]
        }),
        showCardPanel: false,
        error: ''
    }

    changeCardNo(e) {
        this.setState({
            cardNo: e.target.value
        })
    }
    
    toggleCardPanel(){
      this.setState({
        showCardPanel: !this.state.showCardPanel
      })
    }
    
    selectCard(index){
      this.setState({
        showCardPanel: false,
        cardNo: this.props.inactiveCards[index].cardNo
      })
    }

    static PropTypes = {
      changeTitle: React.PropTypes.func.isRequired,
      savedCard: React.PropTypes.func.isRequired,
      advanceOrderInfo: React.PropTypes.object.isRequired,
      fetchQueryCardAvaible: React.PropTypes.func.isRequired,
      addCard: React.PropTypes.object.isRequired,
      closeErrorDialog: React.PropTypes.object.isRequired
    }

    componentWillMount() {
      this.props.changeTitle('添加银行卡')
      this.props.fetchBankSupport({channel: 1982})
    }

    componentDidUpdate(){
        const { addCard, history, resetAddCard } = this.props
        if(!!addCard.avaible){
            resetAddCard()
            history.pushState(null, '/binding/verification')
        }
    }

    render () {

        const { advanceOrderInfo, history, savedCard, fetchQueryCardAvaible, addCard, closeErrorDialog, inactiveCards } = this.props
  
        return (
            <div>
                <h2 className="gTitle">请绑定持卡人本人的银行卡</h2>
                <ul className="list whiteConBox">
                    <li>
                        <span>持卡人</span>
                        <div className="list-info">{advanceOrderInfo.custName}</div>
                    </li>
                    <li>
                        <span>卡号</span>
                        <div className="list-info">
                            <input type="text" className="list-info-input" maxLength="19" value={this.state.cardNo} onChange={this.changeCardNo.bind(this)} placeholder="请输入银行卡号"/>
                            { !! this.props.inactiveCards.length && 
                              <span className="select-title" onTouchEnd={this.toggleCardPanel.bind(this)}></span>
                            }
                        </div>
                    </li>
                </ul>
                <Tips content={this.state.error} />
                <div className="clickBtn"  onTouchEnd={() => {
                        let error = this.state.addCardChecker({'cardNo': this.state.cardNo})
                        this.setState({
                            error: !error ? '' : error.cardNo
                        })
                        if(!Object.keys(error).length){
                            fetchQueryCardAvaible({
                                channel: 1982,
                                cardNo: this.state.cardNo
                            })

                        }
                }}>

                { !addCard.submiting && '下一步'}
                { !!addCard.submiting &&
                    <div className='loadingBtn'>
                        <span></span>
                    </div>}
                </div>
                { !!addCard.showErrorDialog && <Confirm content={addCard.failedMsg} title='提示' toggle={closeErrorDialog}/> }
                { !!this.state.showCardPanel &&
                    <BankCards
                        cardList={inactiveCards}
                        toggle={this.toggleCardPanel.bind(this)}
                        cancel={this.toggleCardPanel.bind(this)}
                        select={this.selectCard.bind(this)}
                        selected={this.state.selectedCard}/>
                }
            </div>
        )
    }
}

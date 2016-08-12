import React from 'react'
import { Link } from 'react-router'

export class BankCards extends React.Component {
    static PropTypes = {
        cardList: React.PropTypes.array.isRequired,
        add: React.PropTypes.func.isRequired,
        cancel: React.PropTypes.func.isRequired,
        toggle: React.PropTypes.func.isRequired,
        select: React.PropTypes.func.isRequired,
        selected: React.PropTypes.number.isRequired
    }
    render() {
        const { cardList, cancel, toggle, select, selected } = this.props
        return (
            <div>
                <section className="bankCards actived">
                    <header className="bankCards-title">
                        <span className="bankCards-back" onTouchEnd={cancel}></span>选择银行卡
                    </header>
                    <div className="bankCards-box">
                    {
                        cardList.map((card, index) => {
                            return(
                                <div className="bankCards-item" onClick={()=> select(index)} key={index}>
                                    <span className="bankCards-icon"><img src={require('assets/images/bank/bank_' + card.bankCode+'.png')} /></span>
                                    { index == selected && <span className="bankCards-check"></span>}

                                    <h3 className="bankCards-summary">{card.bankName}{card.cardType == 1 ? '借记卡':'信用卡'}(尾号{card.cardNo.slice(-4)})</h3>

                      
                                </div>
                            )
                        })
                    }
                    <div className="bankCards-item" >
                        <Link to='/binding/addCard'>
                            <span className="bankCards-icon bankCards-addIcon"></span>

                            <h3 className="bankCards-addBtn">添加银行卡</h3>
                        </Link>
                    </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default BankCards

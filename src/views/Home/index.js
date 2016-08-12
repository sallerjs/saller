import React from 'react'
import { connect } from 'react-redux'
import Loading from 'components/loading'
import Confirm from 'components/confirm'
import { changeTitle, requestAdvanceOrder, receiveAdvanceOrder, failQueryAdvanceOrder, updateLoadingStatus } from 'actions'

@connect(
  state => ({
      advanceOrderInfo: state.order.advanceOrderInfo,
      fail: state.order.fail,
      failMsg: state.order.failMsg,
      loadinged: state.order.loadinged
    }),
    {
        changeTitle,
        requestAdvanceOrder,
        receiveAdvanceOrder,
        failQueryAdvanceOrder,
        updateLoadingStatus
    }
)
export default class Home extends React.Component {
    state = {
      goto: 'http://m..com/chaoshi/jiankangkazhuanqu.shtml',
      failMsg: '',
      fail: false,
      new: false
    }
    //init
    componentWillMount() {
      const { changeTitle, requestAdvanceOrder, location, receiveAdvanceOrder, failQueryAdvanceOrder,updateLoadingStatus, loadinged} = this.props
      changeTitle('处理中...')
      requestAdvanceOrder(Object.assign(location.query, {
         token: encodeURIComponent(location.search.split('token=')[1].split("&")[0])
      }))
    }

    static PropTypes = {
      history: React.PropTypes.object.isRequired,
      changeTitle: React.PropTypes.func.isRequired,
      requestAdvanceOrder: React.PropTypes.func.isRequired
    }

    goCreateAccount(){
      this.props.history.pushState(null, '/createAccount')
    }

    goProductList(){
      window.location.href = this.state.goto
    }


    componentDidUpdate() {
      let { advanceOrderInfo, history, fail, failMsg, location,loadinged} = this.props

      if(!advanceOrderInfo && !fail){
        return
      }

      if(!!loadinged){
        window.location.href = this.state.goto
      }

      if(!fail && !loadinged && advanceOrderInfo.existPamaAcct == "0") {
        this.setState({
          'new': true
        })
      }
      if(!fail && !loadinged && advanceOrderInfo.existPamaAcct == "1" && advanceOrderInfo.pamaAcctStatus == '00'){
        this.setState({
          'new': true
        })

      }

      if(!fail && !loadinged && advanceOrderInfo.existPamaAcct == "1" && advanceOrderInfo.pamaAcctStatus == '01'){
        history.pushState(null, '/cashier')
      }

      if(!fail && !loadinged && advanceOrderInfo.existPamaAcct == "1" && /(02|03|04)/.test(advanceOrderInfo.pamaAcctStatus)){
        history.pushState(null, '/fail')
      }

    }




    render() {
        return (
          <div>
            { !this.props.fail && !this.state.new && <Loading /> }
            { !!this.props.fail &&
              <Confirm content={this.props.failMsg}
                mutil='true'
                goto={this.goProductList.bind(this)}
                gotoText='返回产品列表'
                title='提示'/>
            }
            { !!this.state.new &&
              <Confirm content="你没有主账户,无法支付"
                mutil='true'
                goto={this.goCreateAccount.bind(this)}
                gotoText='创建主账户'
                title='提示'/>
            }
          </div>
        )
    }
}

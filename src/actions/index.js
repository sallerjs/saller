import * as RTS from 'RTS'
import * as types from 'constants/actionTypes'
import exceptionAdapter from 'utils/exceptionAdapter'

export function requestAdvanceOrder(params) {
  return dispatch => {
      return RTS.queryAdvanceOrder(params)
          .then(res => {
              res.responseCode == '0' ? dispatch(receiveAdvanceOrder(Object.assign(res, {
                  channel: params.channel,
                  channelDate: params.channelDate,
                  channelBizNo: params.channelBizNo
              }))) : dispatch(failQueryAdvanceOrder(exceptionAdapter(res.responseCode, res.responseMsg)))
          })
          .fail(() => dispatch(failQueryAdvanceOrder('请求失败')))
  }
}

function receiveAdvanceOrder(queryResult) {
  return {
    type: types.RECEIVE_ADVANCE_ORDER,
    advanceOrderInfo: queryResult
  }
}

function failQueryAdvanceOrder(msg) {
  return {
    type: types.REQUEST_ADVANCE_ORDER_FAIL,
    msg
  }
}

export function updateLoadingStatus(){
  return {
    type: types.UPDATE_ADVANCE_ORDER_LOADED
  }
}

export function requestBindCards(params) {
  return dispatch => {
    return RTS.queryBindCards(params)
      .then(res => {
        res.responseCode == '0' ? dispatch(receiveBindCards(res)) : dispatch(failBindCards(exceptionAdapter(res.responseCode, res.responseMsg)))
      })
      .fail(() => dispatch(failBindCards('请求失败')))
  }
}

export function requestCardBin(cardNo) {
  return {
    type: types.REQUEST_CARDBIN,
    cardNo
  }
}

export function receiveCardBin(res) {
  return {
    type: types.RECEIVE_CARDBIN,
    bankNo: res.bankNo,
    bankName: res.bankName,
    cardType: res.cardType
  }
}

export function failCardBin(msg) {
  return {
    type: types.FAIL_CARDBIN,
    msg
  }
}

export function requestBankSupport() {
  return {
    type: types.REQUEST_BANK_SUPPORT
  }
}

export function closeErrorDialog() {
  return {
    type: types.CLOSE_ERROR_DIALOG
  }
}

export function receiveBankSupport(supportBanks) {
  return {
    type: types.RECEIVE_BANK_SUPPORT,
    supportBanks
  }
}

export function failBankSupport(msg) {
  return {
    type: types.FAIL_BANK_SUPPORT,
    msg
  }
}



export function fetchBankSupport(params) {
  return dispatch => {
    dispatch(requestBankSupport())
    return RTS.queryBankSupport(params)
      .then(res => {
        res.responseCode == '0' ? dispatch(receiveBankSupport(res.supportBanks)) : dispatch(failBankSupport(exceptionAdapter(res.responseCode, res.responseMsg)))
      })
      .fail(() => dispatch(failBankSupport('请求失败')))
  }
}

export function fetchQueryCardAvaible(params) {
  return (dispatch, getState) => {
    dispatch(requestCardBin(params.cardNo))
    return RTS.queryCardBin(params)
      .then(res => {
        res.responseCode == '0' ? dispatch(receiveCardBin(res)) : dispatch(failCardBin(exceptionAdapter(res.responseCode, res.responseMsg)))
      })
      .fail(() => dispatch(failCardBin('请求失败')))
  }
}

export function requestBindingCard(obj) {
  return dispatch => {
    RTS.bindCard(res => {
      dispatch(receiveBindingCard(res))
    }, obj)
  }
}

export function createAccountStart() {
  return {
    type: types.CREATE_ACCOUNT_START
  }
}

export function createAccountSuccess(res) {
  return {
    type: types.CREATE_ACCOUNT_SUCCESS,
    res
  }
}

export function createAccountFail(msg) {
  return {
    type: types.CREATE_ACCOUNT_FAIL,
    msg
  }
}

export function createAccount(params) {
  return dispatch => {
    dispatch(createAccountStart())
    RTS.createAccount(params)
      .then(res => {
        res.responseCode == '0' ? dispatch(createAccountSuccess(res)) : dispatch(createAccountFail(exceptionAdapter(res.responseCode, res.responseMsg)))
      })
      .fail(() => dispatch(createAccountFail('请求失败')))
  }
}

export function receiveBindingCard(res) {
  return {
    type: types.RECEIVE_BINDING_CARD,
    res
  }
}

export function failBindingCard(msg) {
  return {
    type: types.REQUEST_BINDING_CARD_FAIL,
    msg
  }
}



export function bingCard(params) {
  return dispatch => {
    dispatch({
      type: types.REQUEST_BINDING_CARD
    })
    RTS.bindCard(params)
      .then(res => {
        res.responseCode == '0' ? dispatch({
          type: types.REQUEST_BINDING_CARD_SUCCESS,
          res
        }) : dispatch(failBindingCard(exceptionAdapter(res.responseCode, res.responseMsg)))
      })
      .fail(() => dispatch(failBindingCard('请求失败')))
  }
}

export function sendOtpSuccess() {
  return {
    type: types.SEND_OTP_SUCCESS
  }
}

export function sendOtpFail(msg) {
  return {
    type: types.SEND_OTP_FAIL,
    msg
  }
}

export function sendOtp(params) {
  return dispatch => {
    dispatch({
      type: types.SEND_OTP
    })
    RTS.sendOtp(params)
      .then(res => {
        res.responseCode == '0' ? dispatch(sendOtpSuccess()) : dispatch(sendOtpFail(exceptionAdapter(res.responseCode, res.responseMsg)))
      })
      .fail(() => dispatch(sendOtpFail('请求失败')))
  }
}

export function savedCard(cardNo) {
  return {
    type: types.SAVED_CARD,
    cardNo
  }
}

export function receiveCreateAccount(res) {
  return {
    type: types.RECEIVE_CREATE_ACCOUNT,
    res
  }
}

export function receiveOtp(params) {
  return {
    type: types.SEND_OTP_SUCCESS,
    params
  }
}

function receiveBindCards(cards) {
  return {
    type: types.RECEIVE_BIND_CARDS,
    cards
  }
}

function failBindCards(msg) {
  return {
    type: types.FAIL_BIND_CARDS,
    msg
  }
}

function changeRealTitle(title) {
  return {
    type: types.CHANGE_TITLE,
    title
  }
}

function receiveBankCard(queryResult) {
  return {
    type: types.BANK_CARDS,
    bankCards: queryResult
  }
}

export function changeTitle(title) {
  return dispatch => {
    dispatch(changeRealTitle(title))
  }
}

export function incrementUnsafePassword(value) {
  return {
    type: types.INCREMENT_PASSWORD,
    payload: value
  }
}

export function incrementPassword(value) {
  return {
    type: types.INCREMENT_PASSWORD,
    payload: value
  }
}

export function decrementPassword(value) {
  return {
    type: types.DECREMENT_PASSWORD,
    payload: value
  }
}

export function incrementConfirmPassword(value) {
  return {
    type: types.INCREMENT_CONFIRM_PASSWORD,
    payload: value
  }
}

export function decrementConfirmPassword(value) {
  return {
    type: types.DECREMENT_CONFIRM_PASSWORD,
    payload: value
  }
}

export function cancelCardPanel() {
  return {
    type: types.CANCEL_CARD_PANEL
  }
}

export function selectCard(selected) {
  return dispatch => {
    dispatch({
      type: types.UPDATE_BIND_CARDS,
      selected
    })
    dispatch({
      type: types.TOGGLE_CARD_PANEL
    })
  }
}

export function addCard() {
  return {
    type: types.ADD_CARD
  }
}

export function toggleCardPanel() {
  return {
    type: types.TOGGLE_CARD_PANEL
  }
}

export function resetCardPanel() {
  return {
    type: types.RESET_CARD_PANEL
  }
}

export function clearPassword() {
  return {
    type: types.CLEAR_PASSWORD
  }
}

export function confirmPayOrder() {
  return {
    type: types.OPEN_PAY_MODAL
  }
}

export function checkPayType(payload) {
  return {
    type: types.CHECK_PAY_TYPE,
    payload
  }
}

export function stopSendOtpingTimer() {
  return {
    type: types.STOP_SEND_TIMER
  }
}

export function closeVerifyErrorDialog() {
  return {
    type: types.CLOSE_VERIFY_ERROR_DIALOG
  }
}

export function resetAddCard() {
  return {
    type: types.RESET_ADD_CARD
  }
}

export function resetVerifyCard() {
  return {
    type: types.RESET_VERIFY_CARD
  }
}

export function updateAdvanceOrderPamaAcct(pamaAcct) {
  return {
    type: types.UPDATE_ADDVANCE_ORDER_PAMAACCT,
    pamaAcct
  }
}

export function incrementPayPassword(value) {
  return {
    type: types.INCREMENT_PAY_PASSWORD,
    value
  }
}

export function decrementPayPassword(value) {
  return {
    type: types.DECREMENT_PAY_PASSWORD,
    value
  }
}

export function cancelPayPassword() {
  return {
    type: types.CANCEL_PAY_PASSWORD
  }
}


export function confirmPayPassword() {
  return {
    type: types.CONFIRM_PAY_PASSWORD
  }
}

export function confirmPaySuccess(res) {
  return {
    type: types.CONFIRM_PAY_SUCCESS,
    res
  }
}

export function confirmPayFail(msg) {
  return {
    type: types.CONFIRM_PAY_FAIL,
    msg
  }
}

export function closePayErrorDialog() {
  return {
    type: types.CLOSE_PAY_ERROR_DIALOG
  }
}

export function confirmPay(params) {
  return dispatch => {
    dispatch({
      type: types.CONFIRM_PAY
    })
    return RTS.payOrder(params)
      .then(res => {
        res.responseCode == '0' ? dispatch(confirmPaySuccess(res)) : dispatch(confirmPayFail(exceptionAdapter(res.responseCode, res.responseMsg)))
      })
      .fail(() => dispatch(confirmPayFail('请求失败')))
  }
}

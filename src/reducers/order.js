import {
    RECEIVE_ADVANCE_ORDER,
    REQUEST_ADVANCE_ORDER_FAIL,
    UPDATE_ADDVANCE_ORDER_PAMAACCT,
    UPDATE_ADVANCE_ORDER_LOADED
}
from 'constants/actionTypes'

export default function order(state = {
  loadinged: false
}, action) {
    switch (action.type) {
        case RECEIVE_ADVANCE_ORDER:
            return Object.assign({}, state, {
              advanceOrderInfo: action.advanceOrderInfo
            })
        case REQUEST_ADVANCE_ORDER_FAIL:
            return Object.assign({}, state, {
                failMsg: action.msg,
                fail: true
            })
        case UPDATE_ADDVANCE_ORDER_PAMAACCT:
            return Object.assign({}, state, {
              advanceOrderInfo: {
                  ...state.advanceOrderInfo,
                      pamaAcct: action.pamaAcct
              }
            })
        case UPDATE_ADVANCE_ORDER_LOADED:
            return Object.assign({}, state, {
              loadinged: true
            })
        default:
            return state
    }
}

import {
  OPEN_PAY_MODAL,
  INCREMENT_PAY_PASSWORD,
  DECREMENT_PAY_PASSWORD,
  CANCEL_PAY_PASSWORD,
  CONFIRM_PAY_PASSWORD,
  CONFIRM_PAY,
  CONFIRM_PAY_SUCCESS,
  CONFIRM_PAY_FAIL,
  RESET_PAY_ORDER,
  CLOSE_PAY_ERROR_DIALOG
}
from 'constants/actionTypes'

const initialState = {
    payPassword: ['', '', '', '', '', '']
}
function isOverflow(stack) {
    return stack[stack.length - 1] !== ''
}

function isEmpty(stack) {
    return stack[0] === ''
}

function processIncrement(origin, increment) {
    return []
}

function processDecrement(origin) {
    return []
}

export default function payOrder(state = initialState, action) {
  switch (action.type) {
    case OPEN_PAY_MODAL:
        return Object.assign({}, state, {
            payModalVisible: true,
            payKeboardVisible: true
        })
    case INCREMENT_PAY_PASSWORD:
        return Object.assign({}, state, {
            payPassword: [...processIncrement(state.payPassword, action.value)]
        })
    case DECREMENT_PAY_PASSWORD:
        return Object.assign({}, state, {
            payPassword: [...processDecrement(state.payPassword)]
        })
    case CANCEL_PAY_PASSWORD:
        return Object.assign({}, state, {
            payModalVisible: false,
            payKeboardVisible: false,
            payPassword: ['', '', '', '', '', '']
        })
    case CONFIRM_PAY_PASSWORD:
        return Object.assign({}, state, {
            canPay: true
        })
    case CONFIRM_PAY:
        return Object.assign({}, state, {
            payModalVisible: false,
            payKeboardVisible: false,
            payPassword: ['', '', '', '', '', ''],
            isPaying: true,
            canPay: false
        })
    case CONFIRM_PAY_SUCCESS:
        return Object.assign({}, state, {
            payResult: true,
            isPaying: false,
            payStatus: action.res.orderStatus
        })
    case CONFIRM_PAY_FAIL:
        return Object.assign({}, state, {
            isPaying: false,
            showErrorDialog: true,
            failedMsg: action.msg
        })
    case CLOSE_PAY_ERROR_DIALOG:
        return Object.assign({}, state, {
            showErrorDialog: false
        })
    case RESET_PAY_ORDER:
        return initialState
    default:
      return state
  }
}

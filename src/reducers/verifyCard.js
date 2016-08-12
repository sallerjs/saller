import {
    SEND_OTP,
    SEND_OTP_SUCCESS,
    SEND_OTP_FAIL,
    REQUEST_BINDING_CARD,
    REQUEST_BINDING_CARD_SUCCESS,
    REQUEST_BINDING_CARD_FAIL,
    STOP_SEND_TIMER,
    CLOSE_VERIFY_ERROR_DIALOG,
    RESET_VERIFY_CARD,
    CREATE_ACCOUNT_START,
    CREATE_ACCOUNT_SUCCESS,
    CREATE_ACCOUNT_FAIL
}
from 'constants/actionTypes'

export default function verifyCard(state = {

}, action) {
    switch (action.type) {
        case SEND_OTP:
            return Object.assign({}, state, {
                sendOtping: true,
                sendOtpingStart: true
            })
        case SEND_OTP_SUCCESS:
            return Object.assign({}, state, {
                sendOtping: false,
                sendOtpSuccess: true
            })
        case SEND_OTP_FAIL:
            return Object.assign({}, state, {
                sendOtping: false,
                sendOtpSuccess: false,
                failedMsg: action.msg,
                showErrorDialog: true
            })
        case REQUEST_BINDING_CARD:
            return Object.assign({}, state, {
                bindingCard: true
            })
        case REQUEST_BINDING_CARD_SUCCESS:
            return Object.assign({}, state, {
                bindingCard: false,
                bindingSuccess: true
            })
        case REQUEST_BINDING_CARD_FAIL:
            return Object.assign({}, state, {
                bindingCard: false,
                bindingSuccess: false,
                failedMsg: action.msg,
                showErrorDialog: true
            })
        case STOP_SEND_TIMER:
            return Object.assign({}, state, {
                sendOtpingStart: false
            })
        case CLOSE_VERIFY_ERROR_DIALOG:
            return Object.assign({}, state, {
                showErrorDialog: false
            })
        case RESET_VERIFY_CARD:
            return Object.assign({}, state, {
                showErrorDialog: false,
                sendOtpingStart: false,
                bindingCard: false,
                sendOtping: false,
                bindingSuccess: false,
                createAccountFetching: false,
                createAccountSuccess: false
            })
        case CREATE_ACCOUNT_START:
            return Object.assign({}, state, {
                createAccountFetching: true
            })
        case CREATE_ACCOUNT_SUCCESS:
            return Object.assign({}, state, {
                createAccountFetching: false,
                createAccountSuccess: true,
                ...action.res
            })
        case CREATE_ACCOUNT_FAIL:
            return Object.assign({}, state, {
                createAccountFetching: false,
                createAccountSuccess: false,
                failedMsg: action.msg,
                showErrorDialog: true
            })
        default:
            return state
    }
}

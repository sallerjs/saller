import {
    REQUEST_CARDBIN,
    RECEIVE_CARDBIN,
    FAIL_CARDBIN,
    REQUEST_BANK_SUPPORT,
    RECEIVE_BANK_SUPPORT,
    FAIL_BANK_SUPPORT,
    CLOSE_ERROR_DIALOG,
    RESET_ADD_CARD
}
from 'constants/actionTypes'

function oneOf(banks, bankNo){
    return (banks.filter(bank => {
        return bank.bankNo == bankNo
    }).length !== 0)
}

export default function addCard(state = {
    isFetching: false,
    failed: false,
    isSupportBankFetching: false,
    supportBanks: [],
    submiting: false
}, action) {
    switch (action.type) {

        case REQUEST_CARDBIN:
            return Object.assign({}, state, {
                submiting: true,
                failed: false,
                isFetching: true,
                cardNo: action.cardNo
            })
        case RECEIVE_CARDBIN:
            return Object.assign({}, state, {
                submiting: false,
                isFetching: false,
                bankName: action.bankName,
                bankNo: action.bankNo,
                cardType: action.cardType,
                avaible: oneOf(state.supportBanks, action.bankNo),
                showErrorDialog: !oneOf(state.supportBanks, action.bankNo),
                failedMsg: oneOf(state.supportBanks, action.bankNo) ? '' : '不支持该银行'
            })
        case FAIL_CARDBIN:
            return Object.assign({}, state, {
                submiting: false,
                isFetching: false,
                failed: true,
                failedMsg: action.msg,
                showErrorDialog: true
            })
        case REQUEST_BANK_SUPPORT:
            return Object.assign({}, state, {
                isSupportBankFetching: true
            })
        case RECEIVE_BANK_SUPPORT:
            return Object.assign({}, state, {
                isSupportBankFetching: false,
                supportBanks: action.supportBanks
            })
        case CLOSE_ERROR_DIALOG:
            return Object.assign({}, state, {
                showErrorDialog: false
            })
        case FAIL_BANK_SUPPORT:
            return Object.assign({}, state, {
                submiting: false,
                isSupportBankFetching: false,
                failedMsg: action.msg,
                showErrorDialog: true
            })
        case RESET_ADD_CARD:
            return Object.assign({}, state, {
                avaible: false,
                failedMsg: '',
                showErrorDialog: false,
                submiting: false,
                failed: false
            })
        default:
            return state
    }
}

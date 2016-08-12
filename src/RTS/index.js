//import adapter from './adapter'
import request from 'reqwest'
import cookie from 'js-cookie'

export function queryAdvanceOrder(params) {

    cookie.set('randomField', params.randomField)
    cookie.set('oneAccount', params.oneAccount)
    cookie.set('expiredTime', params.expiredTime)
    cookie.set('channel', params.channel)
    cookie.set('token', params.token)

    return request({
        url: '/pama_mobile_adapter_intercept.queryPreOrder',
        method: 'GET',
        type: 'json',
        contentType: 'application/json;charset=utf-8',
        data: {
            'channel': params.channel,
            'preOrderNo': params.preOrderNo
        }
    })

}

export function queryBindCards(params) {
    return request({
        url: '/pama_mobile_adapter_intercept.acctCards',
        method: 'GET',
        type: 'json',
        contentType: 'application/json;charset=utf-8',
        data: {
            'channel': params.channel,
            'pamaAcct': params.pamaAcct,
            'channelDate': params.channelDate,
            'isAuthCard': 1
        }
    })

}

export function bindCard(params) {
    return request({
        url: '/pama_mobile_adapter_intercept.bindCard',
        method: 'POST',
        type: 'json',
        contentType: 'application/x-www-form-urlencoded;charset=utf-8',
        data: {
            'channel': params.channel,
            'pamaAcct': params.pamaAcct,
            'channelDate': params.channelDate,
            'bankNo': params.bankNo,
            'bankName': params.bankName,
            'cardType': params.cardType,
            'isNeedAuth': 1,
            'operationType': '00',
            'cardClassify': '00',
            'mobile': params.mobile,
            'otpFlag': 1,
            'cardNo': params.cardNo,
            'otpPhoneCode': params.otpPhoneCode,
            'accountName': params.accountName,
            'idType': 1,
            'idNo': params.idNo,
            'currency': 'CNY',
            'authType': '00',
            'templetId': 'KJ150529001'
        }
    })
}

export function sendOtp(params) {
    return request({
        url: '/pama_mobile_adapter_intercept.createOTP',
        method: 'GET',
        type: 'json',
        contentType: 'application/json;charset=utf-8',
        data: {
            'channel': params.channel,
            'mobile': params.mobile,
            'templetId': 'KJ150529001'
        }
    })
}

export function createAccount(params) {
    return request({
        url: '/pama_mobile_adapter_intercept.createAcct',
        method: 'POST',
        type: 'json',
        contentType: 'application/x-www-form-urlencoded;charset=utf-8',
        data: {
            'channel': params.channel,
            'pamaAcct': params.pamaAcct,
            'channelDate': params.channelDate,
            'mobile': params.mobile,
            'otpFlag': 1,
            'cardNo': params.cardNo,
            'idType': 1,
            'currency': 'CNY',
            'idNumber': params.idNumber,
            'pwd': RSA.encrypt(params.pwd.join('')),
            'operationType': '03',
            'identType': '00',
            'custName': params.custName,
            'oneAccount': params.oneAccount,
            'templetId': 'KJ150529001',
            'phonecode': params.phonecode,
            'bankName': params.bankName,
            'bankCode': params.bankNo,
            'cardClassify': '00'
        }
    })
}

export function payOrder(params) {
    return request({
        url: '/pama_mobile_adapter_intercept.orderPay',
        method: 'POST',
        type: 'json',
        contentType: 'application/x-www-form-urlencoded;charset=utf-8',
        data: {
            'channel': params.channel,
            //'pamaAcct': params.pamaAcct,
            'channelDate': params.channelDate,
            'amount': params.amount,
            'channelBizNo': params.channelBizNo,
            'orderType': params.orderType,
            'pamaAcct': params.pamaAcct,
            'payAcct': params.cardNo,
            'passWord': RSA.encrypt(params.payPassword.join('')),
            'otpType': 1,
            'productName': params.productName,
            'productCode': params.productCode
        }
    })
}

export function queryCardBin(params) {
    return request({
        url: '/pama_mobile_adapter_intercept.queryBankCardInfo',
        method: 'GET',
        type: 'json',
        contentType: 'application/json;charset=utf-8',
        data: {
            'channel': params.channel,
            'cardNo': params.cardNo
        }
    })
}

export function queryBankSupport(params) {
    return request({
        url: '/pama_mobile_adapter_intercept.authAndPaySupportBanks',
        method: 'GET',
        type: 'json',
        contentType: 'application/json;charset=utf-8',
        data: {
            'channel': params.channel
        }
    })
}

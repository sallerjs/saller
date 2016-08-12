export default function(code, msg) {
    const exceptionCodeMap = [{
        name: 'token',
        codeList: [
            660303, 660304, 660305
        ],
        basicMsg: '身份令牌校验失败,请重试'
    }, {
        name: 'otpVerify',
        codeList: [
            651202,
            6602066
        ],
        basicMsg: '短信验证码校验失败,请重新获取'
    }, {
        name: 'systemException',
        codeList: [
            660391,
            660399,
            6602001,
            6602002,
            6602003,
            6602004,
            6602005,
            6602006,
            6602007,
            6602008,
            6602011,
            6602013,
            6602014,
            6602015,
            6602016,
            6602017,
            6602018,
            6602019,
            6602020,
            660301,
            660302,
            610102,
            610100,
            610101,
            610109,
            610115,
            610119,
            630108,
            630109,
            630119,
            630223
        ],
        basicMsg: '系统异常,请稍后再试'
    }, {
        name: 'passwordErrorOverrun',
        codeList: [
            630219
        ],
        basicMsg: '您的密码已5次填写错误,系统将会锁定账户24小时'
    },{
        name: 'cardBinVerify',
        codeList: [
            900401
        ],
        basicMsg: '请输入正确的银行卡号'
    }]
    let excep = exceptionCodeMap.filter(excep => {
        return excep.codeList.indexOf(Number(code)) !== -1
    })[0]
    return !!excep ? excep.basicMsg : msg
}

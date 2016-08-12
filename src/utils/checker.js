const isEmpty = value => value === undefined || value === null || value === ''
const join = (rules) => (value, data) => rules.map(rule => rule(value, data)).filter(error => !!error)[0]

export function email(value) {
	if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
		return '无效邮件地址'
	}
}

export function required(temp) {
	return value => {
		if (isEmpty(value)) {
			return temp
		}
	}
}

export function arrayNotEmpty(arr) {
	if (arr.length == 0) {
		return '数组不能为空'
	}
}

export function bankCard(cardNo) {
	if (!/^\d{16}|\d{19}$/.test(cardNo)) {
		return '无效银行卡'
	}
}

export function mobile(phone) {
	if (!/^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/i.test(phone)) {
		return '请输入正确的手机号'
	}
}

export function minLength(min) {
	return value => {
		if (!isEmpty(value) && value.length < min) {
			return `Must be at least ${min} characters`
		}
	}
}

export function maxLength(max) {
	return value => {
		if (!isEmpty(value) && value.length > max) {
			return `Must be no more than ${max} characters`
		}
	}
}

export function assignLength(len) {
	return value => {
		if (!isEmpty(value) && value.length !== len) {
			return `验证码必须是 ${len} 位数字`
		}
	}
}

export function integer(value) {
	if (!Number.isInteger(Number(value))) {
		return '验证码必须是数字'
	}
}

export function oneOf(enumeration) {
	return value => {
		if (!~enumeration.indexOf(value)) {
			return `Must be one of: ${enumeration.join(', ')}`
		}
	}
}

export function match(field) {
	return (value, data) => {
		if (data) {
			if (value !== data[field]) {
				return '字段不匹配'
			}
		}
	}
}

export function createChecker(rules) {
	return (data = {}) => {
		const errors = {}
		Object.keys(rules).forEach((key) => {
			const rule = join([].concat(rules[key]))
			const error = rule(data[key], data)
			if (error) {
				errors[key] = error
			}
		})
		return errors
	}
}
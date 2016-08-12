import {
    INIT_PASSWORD,
    INCREMENT_PASSWORD,
    DECREMENT_PASSWORD,
    INCREMENT_CONFIRM_PASSWORD,
    DECREMENT_CONFIRM_PASSWORD,
    CLEAR_PASSWORD
}
from 'constants/actionTypes'

const initialState = {
    password: ['', '', '', '', '', ''],
    confirmPassword: ['', '', '', '', '', '']
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

export default function password(state = initialState, action) {
    switch (action.type) {
        case INIT_PASSWORD:
            return action.payload
        case INCREMENT_PASSWORD:
            return Object.assign({}, state, {
                password: [...processIncrement(state.password, action.payload)]
            })
        case DECREMENT_PASSWORD:
            return Object.assign({}, state, {
                password: [...processDecrement(state.password)]
            })
        case INCREMENT_CONFIRM_PASSWORD:
            return Object.assign({}, state, {
                confirmPassword: [...processIncrement(state.confirmPassword, action.payload)]
            })

        case DECREMENT_CONFIRM_PASSWORD:
            return Object.assign({}, state, {
                confirmPassword: [...processDecrement(state.confirmPassword)]
            })
        case CLEAR_PASSWORD:
            return Object.assign({}, state, {
                password: ['', '', '', '', '', ''],
                confirmPassword: ['', '', '', '', '', '']
            })
        default:
            return state
    }
}

import {
    POP_TRADPASSWORD_PANEL,
    PINCH_TRADPASSWORD_PANEl
}
from 'constants/actionTypes'
const initialState = {
    visible: false,
    init: true
}
export default function tradPasswordPanel(state = initialState, action) {
    switch (action.type) {
        case POP_TRADPASSWORD_PANEL:
            return Object.assign({}, state, {
                init: false,
                visible: true
            })
        case PINCH_TRADPASSWORD_PANEl:
            return Object.assign({}, state, {
                visible: !state.visible
            })
        default:
            return state
    }
}

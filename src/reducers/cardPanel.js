import {
    CANCEL_CARD_PANEL,
    TOGGLE_CARD_PANEL,
    RESET_CARD_PANEL
}
from 'constants/actionTypes'
const initialState = {
    visible: false,
    init: true
}
export default function cardPanel(state = initialState, action) {
    switch (action.type) {
        case CANCEL_CARD_PANEL:
            return Object.assign({}, state, {
                visible: false
            })
        case TOGGLE_CARD_PANEL:
            return Object.assign({}, state, {
                init: false,
                visible: !state.visible
            })
        case RESET_CARD_PANEL:
            return Object.assign({}, state, initialState)
        default:
            return state
    }
}

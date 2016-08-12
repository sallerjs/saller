import {
    RECEIVE_BIND_CARDS,
    UPDATE_BIND_CARDS,
    SAVED_CARD
}
from 'constants/actionTypes'

function filterAvailable(cards){
  return cards.filter(card => {
    return card.cardStatus == 1
  })
}

function filterInactive(cards){
  return cards.filter(card => {
    return card.cardStatus == 2
  })
}

export default function card(state = {
    list: [],
    inactiveList: [],
    selected: 0,
    savedCard: ''
}, action) {
    switch (action.type) {

        case RECEIVE_BIND_CARDS:
            return Object.assign({}, state, {
            	...action.cards,
            		list: [...filterAvailable(action.cards.list)],
            		inactiveList: [...filterInactive(action.cards.list)]
            })
        case UPDATE_BIND_CARDS:
            return Object.assign({}, state, {
                selected: action.selected
            })
        case SAVED_CARD:
            return Object.assign({}, state, {
                savedCard: action.cardNo
            })
        default:
            return state
    }
}

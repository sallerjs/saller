import {
  CHANGE_TITLE
}
from 'constants/actionTypes'

export default function helper(state = {}, action) {
  switch (action.type) {
    case CHANGE_TITLE:
      return {
        title: action.title
      }

    default:
      return state
  }
}

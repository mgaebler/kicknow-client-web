import * as types from './types'

let initialState = {
  status: null,
  items: []
}

export function items(state = initialState, action) {
  // console.log('reducer items was called with state', state, 'and action', action)
  switch (action.type) {
    case types.REQUEST_ITEMS:
      return {
        ...state,
        status: action.status
      }
    case types.RECEIVE_ITEMS:
      return {
        items: action.items,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

let initialItem = {
  id: '',
  index: ''
}

// export function selectedItem(state = initialItem, action) {
//   // console.log(action)
//   switch (action.type) {
//     case types.SELECT_ITEM:
//       return {
//         id: action.item._id,
//         index: action.item._index
//       }
//     default:
//       return state
//   }
// }

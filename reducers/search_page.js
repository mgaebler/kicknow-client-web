import {
  REQUEST_ITEMS,
  RECEIVE_ITEMS,
  SELECT_ITEM
} from '../actions/search_page';

var initialState = {
  status: null,
  items: []
};

export function items(state = initialState, action) {
  // console.log('reducer items was called with state', state, 'and action', action);
  switch (action.type) {
    case REQUEST_ITEMS:
      return Object.assign({}, state, {
        status: action.status,
      });
    case RECEIVE_ITEMS:
      return Object.assign({}, state, {
        items: action.items,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}


var initialItem = {
  id: "",
  index: ""
}

export function selectedItem(state = initialItem, action){
  // console.log(action)
  switch (action.type) {
    case SELECT_ITEM:
      return Object.assign({}, state, {
        id: action.item._id,
        index: action.item._index
      })
    default:
      return state
  }
}

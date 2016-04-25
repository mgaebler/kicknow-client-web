import {
  SEARCH_INPUT,
  SET_POSITION_STATE,
  SET_CURRENT_POSITION
} from '../actions/navigation';


export function searchInput(state = {text: ''}, action) {
  // console.log('reducer searchInput was called with state', state, 'and action', action);
  switch (action.type) {
    case SEARCH_INPUT:
      return {
        text: action.text
      };
    default:
      return state;
  }
}

export function position(state = {lat: 0, lon: 0, status: 'neutral'}, action){
  // console.log('position', action);
  switch (action.type) {
    case SET_CURRENT_POSITION:
      return Object.assign({}, state, {
        lat: action.geolocation.coords.latitude,
        lon: action.geolocation.coords.longitude,
      });
    case SET_POSITION_STATE:
      return Object.assign({}, state, {
        status: action.status
      });
    default:
      return state;
  }
}

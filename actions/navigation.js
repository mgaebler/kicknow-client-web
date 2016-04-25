import { fetchItems } from './search_page'

export const SEARCH_INPUT = 'SEARCH_INPUT';
export const SET_CURRENT_POSITION = 'SET_CURRENT_POSITION';
export const SET_POSITION_STATE = 'SET_POSITION_STATE';

export function searchInput(text){
  return {
    type: SEARCH_INPUT,
    text: text
  };
}

export function setPositionState(status, message=''){
  return {
    type: SET_POSITION_STATE,
    status,
    message
  };
}

export function setCurrentPosition(geolocation){
  return {
    type: SET_CURRENT_POSITION,
    geolocation
  };
}

export function getPosition() {
  return (dispatch) => {
    if (navigator.geolocation) {
      dispatch(setPositionState('fetch'));
      navigator.geolocation.getCurrentPosition((position)=> {
        dispatch(setCurrentPosition(position));
        dispatch(setPositionState('success'));
        dispatch(fetchItems())
      });
    } else {
      dispatch(setPositionState('error', 'Geolocation is not supported by this browser.'));
    }
  };
}

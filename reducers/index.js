import { combineReducers } from 'redux';

import { searchInput, position, positionState } from './navigation';
import { items, selectedItem } from './search_page';


const rootReducer = combineReducers({
  items,
  selectedItem,
  // navigation
  searchInput,
  position
});

export default rootReducer;

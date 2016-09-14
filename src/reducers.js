// reducers.js

import { fromJS } from 'immutable';

var initialState = fromJS({
  route: 'home'
});

export default function mainReducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_ROUTE':
      return state.set('route', action.route);
    default:
      return state;
  }
}

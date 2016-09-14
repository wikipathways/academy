// reducers.js

import { fromJS } from 'immutable';

var initialState = fromJS({
  route: 'home',
  expected: null,
  checkerStatus: 'Drag and drop GPML file into target above.'
});

export default function mainReducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_ROUTE':
      return state.set('route', action.route);
    case 'SET_CHECKER_STATUS':
      return state.set('checkerStatus', action.checkerStatus);
    case 'SET_EXPECTED':
      return state.set('expected', action.expected);
    default:
      return state;
  }
}

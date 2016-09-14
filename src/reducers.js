// reducers.js

import { fromJS } from 'immutable';

var initialState = fromJS({
  route: 'home',
  location: '',
  data: {},
  dates: [],
  temps: [],
  selected: {
    date: '',
    temp: null
  }
});

export default function mainReducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_ROUTE':
      return state.set('route', action.route);
    case 'CHANGE_LOCATION':
      return state.set('location', action.location);
    case 'SET_DATA':
      return state.set('data', fromJS(action.data));
    case 'SET_DATES':
      return state.set('dates', fromJS(action.dates));
    case 'SET_TEMPS':
      return state.set('temps', fromJS(action.temps));
    case 'SET_SELECTED_DATE':
      return state.setIn(['selected', 'date'], action.date);
    case 'SET_SELECTED_TEMP':
      return state.setIn(['selected', 'temp'], action.temp);
    default:
      return state;
  }
}

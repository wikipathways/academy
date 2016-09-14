// actions.js
import request from 'superagent';

export function changeRoute(route) {
    return {
        type: 'CHANGE_ROUTE',
        route: route
    };
}

export function setCheckerStatus(checkerStatus) {
    return {
        type: 'SET_CHECKER_STATUS',
        checkerStatus: checkerStatus
    };
}

export function setExpected(expected) {
    return {
        type: 'SET_EXPECTED',
        expected: expected
    };
}

export function fetchExpected(url) {
  return function thunk(dispatch) {
    request
      .get(url)
      .set('Accept', 'text/plain')
      .end(function(err, res){
        var expected = res.body;

        dispatch(setExpected(expected));
      });
  }
}

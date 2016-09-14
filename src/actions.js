// actions.js
import request from 'superagent';

export function changeRoute(route) {
    return {
        type: 'CHANGE_ROUTE',
        route: route
    };
}

export function changeLocation(location) {
    return {
        type: 'CHANGE_LOCATION',
        location: location
    };
}

export function setData(data) {
    return {
        type: 'SET_DATA',
        data: data
    };
}

export function setDates(dates) {
    return {
        type: 'SET_DATES',
        dates: dates
    };
}

export function setTemps(temps) {
    return {
        type: 'SET_TEMPS',
        temps: temps
    };
}

export function setSelectedDate(date) {
    return {
        type: 'SET_SELECTED_DATE',
        date: date
    };
}

export function setSelectedTemp(temp) {
    return {
        type: 'SET_SELECTED_TEMP',
        temp: temp
    };
}

export function fetchData(url) {
  return function thunk(dispatch) {
    request
      .get(url)
      .set('Accept', 'application/json')
      .end(function(err, res){
        var body = res.body;
        var list = body.list;
        var dates = [];
        var temps = [];
        for (var i = 0; i < list.length; i++) {
          dates.push(list[i].dt_txt);
          temps.push(list[i].main.temp);
        }

        dispatch(setData(body));
        dispatch(setDates(dates));
        dispatch(setTemps(temps));
        dispatch(setSelectedDate(''));
        dispatch(setSelectedTemp(null));
      });
  }
}

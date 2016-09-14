import React from 'react';
import './App.css';
import HeaderHome from './Header.home';
import ContentHome from './Content.home';
import DrawConversion from './stages/draw-conversion/DrawConversion';
import { connect } from 'react-redux';
import { weatherApiKey } from './weather-api-key';

import Plot from './Plot';
import {
  changeLocation,
  setSelectedDate,
  setSelectedTemp,
  fetchData,
  changeRoute
} from './actions';

class App extends React.Component {
  fetchData = (evt) => {
    evt.preventDefault();

    var location = encodeURIComponent(this.props.redux.get('location'));

    var urlPrefix = 'http://api.openweathermap.org/data/2.5/forecast?q=';
    var urlSuffix = '&APPID=' + weatherApiKey + '&units=metric';
    var url = urlPrefix + location + urlSuffix;

    this.props.dispatch(fetchData(url));
  };

  onPlotClick = (data) => {
    if (data.points) {
      var number = data.points[0].pointNumber;
      const nextDate = this.props.redux.getIn(['dates', number]);
      this.props.dispatch(setSelectedDate(nextDate));
      const nextTemp = this.props.redux.getIn(['temps', number]);
      this.props.dispatch(setSelectedTemp(nextTemp))
    }
  };

  onSkillTreeClick = (evt) => {
    this.props.dispatch(changeRoute(evt.target.id))
  };

  changeLocation = (evt) => {
    this.props.dispatch(changeLocation(evt.target.value));
  };

  render() {
    var currentTemp = 'not loaded yet';
    if (this.props.redux.getIn(['data', 'list'])) {
      currentTemp = this.props.redux.getIn(['data', 'list', '0', 'main', 'temp']);
    }

    var contentForCurrentRoute;
    if (this.props.redux.get('route') === 'home') {
      contentForCurrentRoute = (<ContentHome onClick={this.onSkillTreeClick}></ContentHome>);
    } else if (this.props.redux.get('route') === 'conversion') {
      //contentForCurrentRoute = (<p>conversion</p>);
      contentForCurrentRoute = (<DrawConversion></DrawConversion>);
    } else {
      contentForCurrentRoute = (<ContentHome></ContentHome>);
    }

    return (
      <div>
        <HeaderHome></HeaderHome>
        <h1>Weather</h1>
        <form onSubmit={this.fetchData}>
          <label>I want to know the weather for
            <input
              placeholder={"City, Country"}
              type="text"
              value={this.props.redux.get('location')}
              onChange={this.changeLocation}
            />
          </label>
        </form>
        {/*
          Render the current temperature and the forecast if we have data
          otherwise return null
        */}
        {(this.props.redux.getIn(['data', 'list'])) ? (
          <div className="wrapper">
            {/* Render the current temperature if no specific date is selected */}
            <p className="temp-wrapper">
              <span className="temp">
                { this.props.redux.getIn(['selected', 'temp']) ? this.props.redux.getIn(['selected', 'temp']) : currentTemp }
              </span>
              <span className="temp-symbol">°C</span>
              <span> on </span>
              <span className="temp-date">
                { this.props.redux.getIn(['selected', 'temp']) ? this.props.redux.getIn(['selected', 'date']) : ''}
              </span>
            </p>
            <h2>Forecast</h2>
            <Plot
              xData={this.props.redux.get('dates')}
              yData={this.props.redux.get('temps')}
              onPlotClick={this.onPlotClick}
              type="scatter"
            />
          </div>
        ) : null}

        {contentForCurrentRoute}

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
        redux: state
    };
}

export default connect(mapStateToProps)(App);

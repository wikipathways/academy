import React from 'react';
import './App.css';
import HeaderHome from './Header.home';
import ContentHome from './Content.home';
import DrawConversion from './stages/draw-conversion/DrawConversion';
import { connect } from 'react-redux';

import {
  changeRoute
} from './actions';

class App extends React.Component {
  onSkillTreeClick = (evt) => {
    this.props.dispatch(changeRoute(evt.target.id))
  };

  render() {
    var contentForCurrentRoute;
    if (this.props.redux.get('route') === 'home') {
      contentForCurrentRoute = (<ContentHome onClick={this.onSkillTreeClick}></ContentHome>);
    } else if (this.props.redux.get('route') === 'conversion') {
      contentForCurrentRoute = (<DrawConversion></DrawConversion>);
    } else {
      contentForCurrentRoute = (<ContentHome></ContentHome>);
    }

    return (
      <div>
        <HeaderHome></HeaderHome>
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

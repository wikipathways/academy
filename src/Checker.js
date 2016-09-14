// Checker.js
import React from 'react';
import { connect } from 'react-redux';

import validate from './validate';
const FileDragger = require('file-dragger')

import {
  fetchExpected,
  setCheckerStatus,
} from './actions';

class Checker extends React.Component {
  drawChecker = () => {
    var that = this;
    var holder = document.querySelector('#holder');
    var emitter = FileDragger(holder);
    emitter.on('file', function (file) {
      var reader = new FileReader();
      reader.onload = function(evt) {
        var actual = evt.srcElement.result;
        // TODO is this a string, or do we have to use toJS()?
        var expected = that.props.redux.get('expected');
        var passes = validate(expected, actual);
        var status = passes ? 'Congratulations! Your input is correct.' :
          'Oops, that does\'t look quite right. Please try again.';
        that.props.dispatch(setCheckerStatus(status));
        if (passes){
          window.submitSGLActivity('easy');
        }
      };
      reader.readAsText(file);
    });
  }

  fetchExpected = () => {
    var url = './src/stages/draw-conversion/glucose-solution.gpml';
    this.props.dispatch(fetchExpected(url));
  };

// TODO update only when relevant data has changed
//  shouldComponentUpdate(nextProps) {
//      const xDataChanged = !this.props.xData.equals(nextProps.xData);
//      const yDataChanged = !this.props.yData.equals(nextProps.yData);
//
//      return xDataChanged || yDataChanged;
//  }

  componentDidMount() {
    this.drawChecker();
    this.fetchExpected();
  }

  componentDidUpdate() {
    this.drawChecker();
  }

  render() {

    return (
      <div>
        <div id="holder" style={{border: '10px dashed #ccc',
          width: '300px',
          height: '300px',
          margin: '20px auto',
        }}>
        </div>
        <p id="status">{this.props.redux.get('checkerStatus')}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
        redux: state
    };
}

export default connect(mapStateToProps)(Checker);

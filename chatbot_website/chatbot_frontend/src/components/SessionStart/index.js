import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as actions from 'src/redux/session/actions';
import { connect } from 'react-redux';
import { wrap } from './style.scss';


class SessionStart extends Component {
  static propTypes = {
    startSession: PropTypes.func
  };
  render() {
    const { startSession } = this.props;
    return (
      <div className={wrap}>
        <span className='label on' onClick={() => startSession()}>
          Start Over
        </span>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => ({
  startSession: () => dispatch(actions.startSession())
});

export default connect(null, mapDispatch)(SessionStart);

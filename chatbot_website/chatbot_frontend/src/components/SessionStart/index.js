import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as actions from 'src/redux/session/actions';
import { connect } from 'react-redux';
import { wrap } from './style.scss';

const INACTIVITY_THRESHOLD = 3 * 60 * 1000;

class SessionStart extends Component {
  static propTypes = {
    startSession: PropTypes.func
  };
  componentDidMount() {
    this.lastActivity = Date.now();
    this.listenForActivity();
    this.setInactivityCheck();
  }
  componentWillUnmount() {
    window.removeEventListener('keypress', this.activityListener);
    window.clearInterval(this.inactivityInterval);
  }
  setInactivityCheck() {
    this.inactivityInterval = window.setInterval(() => this.checkInactivity(), 1000);
  }
  checkInactivity() {
    const { startSession } = this.props;
    if (Date.now() - this.lastActivity > INACTIVITY_THRESHOLD) {
      startSession();
    }
  }
  listenForActivity() {
    this.activityListener = window.addEventListener('keypress', () => {
      this.lastActivity = Date.now();
    });
  }
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

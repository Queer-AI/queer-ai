import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as actions from 'src/redux/translation/actions';
import { getTranslationLanguage } from 'src/redux';
import { connect } from 'react-redux';

import { slider, wrap } from './style.scss';

class LanguageSwitch extends Component {
  static propTypes = {
    language: PropTypes.string,
    offValue: PropTypes.string,
    onValue: PropTypes.string,
    setLanguage: PropTypes.func
  };
  render() {
    const { language, offValue, onValue, setLanguage } = this.props;
    return (
      <div className={wrap}>
        <span className='label on' onClick={() => setLanguage(onValue)}>
          {onValue}
        </span>
        <span className='label off' onClick={() => setLanguage(null)}>
          {offValue}
        </span>
        <div className={`${slider} ${language ? 'on' : 'off'}`} />
      </div>
    );
  }
}

const mapState = (state) => ({
  language: getTranslationLanguage(state)
});

const mapDispatch = (dispatch) => ({
  setLanguage: (language) => dispatch(actions.setLanguage(language))
});

export default connect(mapState, mapDispatch)(LanguageSwitch);

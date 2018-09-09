import React from 'react';
import PropTypes from 'prop-types';
import { Content } from '../Container';

import { chatMessage } from './style.scss';

const Message = ({ message, source }) => (
  <Content
    align={source === 'bot' ? 'left' : 'right'}
    className={chatMessage}
    inline
  >
    {message}
  </Content>
);

Message.propTypes = {
  message: PropTypes.string,
  source: PropTypes.string
};

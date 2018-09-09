import React from 'react';
import { Content } from '../Container';

import { chatMessage } from './style.scss';

export default ({ index, message, source }) => (
  <Content
    className={chatMessage}
    inline
    align={source === 'bot' ? 'left' : 'right'}
  >
    {message}
  </Content>
);

import { combineReducers } from 'redux';

import * as messageSelectors from './messages';
import messages from './messages';

export default combineReducers({
  messages
});

export const getMessages = (state) => messsageSelectors.getMessages(state.messages)

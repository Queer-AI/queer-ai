import { combineReducers } from 'redux';
import uuid from 'uuid/v4';
import * as types from './constants';

const messages = (state = [], { message, type }) => {
  switch (type) {
    case types.MESSAGE_RECEIVED:
      return [
        ...state,
        {
          message,
          source: 'bot',
          uuid: uuid()
        }
      ];
    case types.MESSAGE_SENT:
      return [
        ...state,
        {
          message,
          source: 'user',
          uuid: uuid()
        }
      ];
    default:
      return state;
  }
};

export default combineReducers({
  messages
});

export const getMessages = (state) => state.messages;

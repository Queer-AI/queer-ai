import { combineReducers } from 'redux';
import * as types from './constants';

const messages = (state = [], { message, type }) => {
  switch (type) {
    case types.MESSAGE_RECEIVED:
      return [
        ...state,
        {
          messsage,
          source: 'bot'
        }
      ];
    case types.MESSAGE_SENT:
      return [
        ...state,
        {
          message,
          source: 'user'
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

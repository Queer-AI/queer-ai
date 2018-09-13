import { combineReducers } from 'redux';
import uuid from 'uuid/v4';
import * as types from './constants';
import { SET_TRANSLATION_LANGUAGE } from '../translation/constants';

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
    case types.MESSAGE_SEND_SUCCESS:
      return [
        ...state,
        {
          message,
          source: 'user',
          uuid: uuid()
        }
      ];
    case SET_TRANSLATION_LANGUAGE:
      return [];
    default:
      return state;
  }
};

export default combineReducers({
  messages
});

export const getMessages = (state) => state.messages;

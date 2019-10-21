import { combineReducers } from 'redux';
import uuid from 'uuid/v4';
import * as types from './constants';

const currentSession = (state = uuid(), { type }) =>
  type === types.START_SESSION ? uuid() : state;

export default combineReducers({ currentSession });

export const getCurrentSession = (state) => state.currentSession;

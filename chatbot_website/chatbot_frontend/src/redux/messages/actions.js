import * as types from './constants';
import { fetchEn, fetchLocal } from '../translation/actions';
import { getLastBotMessage, getEn } from 'src/redux';
import Subscriber from 'src/api/messages/subscriber';

const sub = new Subscriber();

export const connect = () => (dispatch) => {
  dispatch({ type: types.MESSAGES_CONNECT_START });
  sub.subscribe();

  sub.setConnectHandler(() => dispatch({
    type: types.MESSAGES_CONNECT_SUCCESS
  }));

  sub.setDisconnectHandler(({ message }) => dispatch({
    message,
    type: types.MESSAGES_ERROR
  }));

  sub.setErrorHandler(({ message }) => dispatch({
    message,
    type: types.MESSAGES_ERROR
  }));

  sub.setMessageHandler(({ message }) => {
    dispatch({
      message,
      type: types.MESSAGE_RECEIVED
    });
    dispatch(fetchLocal(message));
  });
};

export const disconnect = () => () => {
  sub.unsubscribe();
};

export const send = (message) => (dispatch, getState) => {
  dispatch(fetchEn(message)).then(() => {
    const state = getState();
    const en = getEn(state, message);
    sub.send({ message: en, respondingTo: getLastBotMessage(state) });
    dispatch({
      message,
      type: types.MESSAGE_SEND_SUCCESS
    });
  });
};

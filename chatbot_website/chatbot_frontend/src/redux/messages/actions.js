import * as types from './constants';
import Subscriber from 'src/api/messages/subscriber';

const sub = new Subscriber();

export const connect = () => (dispatch) => {
  dispatch({ type: types.MESSAGES_CONNECT_START });

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

  sub.setMessageHandler(({ message }) => dispatch({
    message,
    type: types.MESSAGE_RECEIVED
  });
};

const disconnect = () => (dispatch) => {
  sub.unsubscribe();
});

const send = (message) => (dispatch) => {
  sub.send(message);
  dispatch({
    message,
    type: types.MESSAGE_SENT
  });
};

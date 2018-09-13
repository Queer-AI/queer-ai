import * as types from './constants';
import * as api from 'src/api/translate';
import { getTranslationLanguage } from 'src/redux';

export const translate = (phrase, from, to) => (dispatch) => {
  dispatch({ type: types.GET_TRANSLATION_START });
  return api.translate(phrase, from, to)
    .then((translation) => dispatch({
      from,
      phrase,
      to,
      translation,
      type: types.GET_TRANSLATION_SUCCESS
    })).catch((error) => dispatch({
      error,
      type: types.GET_TRANSLATION_ERROR
    }));
};

export const fetchLocal = (phrase) => (dispatch, getState) => {
  const language = getTranslationLanguage(getState());
  if (language) {
    return dispatch(translate(phrase, 'en', language));
  } else {
    return Promise.resolve();
  }
};

export const fetchEn = (phrase) => (dispatch, getState) => {
  const language = getTranslationLanguage(getState());
  if (language) {
    return dispatch(translate(phrase, language, 'en'));
  } else {
    return Promise.resolve();
  }
};

export const setLanguage = (language) => (dispatch, getState) => {
  if (getTranslationLanguage(getState()) !== language) {
    dispatch({
      language,
      type: types.SET_TRANSLATION_LANGUAGE
    });
  }
};

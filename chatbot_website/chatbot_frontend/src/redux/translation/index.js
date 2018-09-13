import { combineReducers } from 'redux';
import * as types from './constants';

const translationLanguage = (state = null, { language, type }) =>
  type === types.SET_TRANSLATION_LANGUAGE ? language : state;

const translationsByPhrase = (state = {}, { phrase, translation, type }) => {
  switch (type) {
    case types.GET_TRANSLATION_SUCCESS:
      return {
        ...state,
        [phrase]: translation
      };
    case types.SET_TRANSLATION_LANGUAGE:
      return {};
    default:
      return state;
  }
};

const translationError = (state = null, { error, type }) => {
  switch (type) {
    case types.GET_TRANSLATION_ERROR:
      return error;
    case types.GET_TRANSLATION_START:
    case types.GET_TRANSLATION_SUCCESS:
      return null;
    default:
      return state;
  }
};

const isTranslating = (state = false, { type }) => {
  switch (type) {
    case types.GET_TRANSLATION_START:
      return true;
    case types.GET_TRANSLATION_SUCCESS:
    case types.GET_TRANSLATION_ERROR:
      return false;
    default:
      return state;
  }
};


export default combineReducers({
  isTranslating,
  translationsByPhrase,
  translationError,
  translationLanguage
});

export const getIsTranslating = (state) => state.isTranslating;
export const getTranslationByPhrase = (state, phrase) => state.translationsByPhrase[phrase];
export const getTranslationError = (state) => state.translationError;
export const getTranslationLanguage = (state) => state.translationLanguage;
export const getLocal = (state, phrase) => state.translationLanguage ? getTranslationByPhrase(state, phrase) : phrase;
export const getEn = (state, phrase) => state.translationLanguage ? getTranslationByPhrase(state, phrase) : phrase;

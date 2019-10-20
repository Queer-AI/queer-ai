import { combineReducers } from 'redux';

import * as messageSelectors from './messages';
import * as translationSelectors from './translation';

import messages from './messages';
import translation from './translation';

export default combineReducers({
  messages,
  translation
});

export const getMessages = (state) =>
  messageSelectors.getMessages(state.messages);

export const getLastBotMessage = (state) =>
  messageSelectors.getLastBotMessage(state.messages);

export const getTranslationLanguage = (state) =>
  translationSelectors.getTranslationLanguage(state.translation);

export const getTranslationByPhrase = (state, phrase) =>
  translationSelectors.getTranslationByPhrase(state.translation, phrase);

export const getLocal = (state, phrase) =>
  translationSelectors.getLocal(state.translation, phrase);

export const getEn = (state, phrase) =>
  translationSelectors.getEn(state.translation, phrase);


export const getMessagesLocal = (state) =>
  getMessages(state).map((message) => ({
    ...message,
    local: getLocal(state, message.message)
  }));

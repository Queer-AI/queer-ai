
const URL = 'https://translation.googleapis.com/language/translate/v2';
const API_KEY = process.env.GCP_API_KEY;

export const translate = (phrase, from, to) =>
  fetch(`${URL}?key=${API_KEY}`, {
    body: JSON.stringify({
      q: phrase,
      source: from,
      target: to
    }),
    method: 'POST'
  }).then((response) => response.json())
    .then((body) => {
      if (body.error) {
        throw new Error(body.error.message);
      } else {
        return body.data.translations[0].translatedText;
      }
    });

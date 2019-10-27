import { METHODS } from "./consts";

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJSON = response => {
  return response.json();
};

const load = ({
  url,
  method = METHODS.GET,
  body = null,
  headers = new Headers(),
  endpoint,
  authorization
}) => {
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", authorization);
  return fetch(`${endpoint}/${url}`, { method, body, headers }).then(
    checkStatus
  );
};

export class API {
  constructor({ endPoint, authorization }) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  _load(url) {
    return load({
      url: url,
      endpoint: this._endPoint,
      authorization: this._authorization
    }).then(toJSON);
  }

  _send(url, body) {
    return load({
      url: url,
      endpoint: this._endPoint,
      authorization: this._authorization,
      method: METHODS.PUT,
      body: body
    }).then(toJSON);
  }

  async getFilms() {
    const films = await this._load(`movies`);

    const commentsPromises = films
      .map(f => f.id)
      .map(id => this._load(`comments/${id}`));

    const allFilmsComments = await Promise.all(commentsPromises);

    for (let i = 0; i < films.length; i++) {
      films[i].comments = allFilmsComments[i];
    }

    return films;
  }

  updateFilm({ id, data }) {
    return this._send(`movies/${id}`, JSON.stringify(data));
  }
}

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

export class API {
  constructor({ endPoint, authorization }) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getFilms() {
    return this._load({ url: `movies` }).then(toJSON);
  }
  getComments(id) {
    return this._load({ url: `comments/${id}` }).then(toJSON);
  }

  createComment({}) {}

  deleteComment({ id }) {}

  updateFilm({}) {}

  _load({ url, method = METHODS.GET, body = null, headers = new Headers() }) {
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", this._authorization);
    return fetch(`${this._endPoint}/${url}`, { method, body, headers })
      .then(checkStatus)
      .catch(err => {
        throw err;
      });
  }
}

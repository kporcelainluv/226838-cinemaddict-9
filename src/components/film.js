import { createElement } from "./utils";
class Film {
  constructor(data) {
    this._name = data.name;
    this._rating = data.rating;
    this._year = data.year;
    this._time = data.time;
    this._genre = data.genre;
    this._poster = data.poster;
    this._descriptionText = data.descriptionText;
    this._commentsAmount = data.comments;
    this._element = null;
    this._onClick = null;
  }

  getTemplate() {
    return `<article class="film-card">
          <h3 class="film-card__title">${this._name}</h3>
          <p class="film-card__rating">${this._rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${this._year}</span>
            <span class="film-card__duration">${this._time}</span>
            <span class="film-card__genre">${this._genre}</span>
          </p>
          <img src="images/posters/made-for-each-other.png" alt="" class="film-card__poster">
          <p class="film-card__description">${this._descriptionText}</p>
          <a class="film-card__comments">${this._commentsAmount} comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist film-card__controls-item--active">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched film-card__controls-item--active">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite film-card__controls-item--active">Mark as favorite</button>
          </form>
        </article>
        `;
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
}
export { Film };

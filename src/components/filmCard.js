import moment from "moment";

import { AbstractComponent } from "./abstractComponent";
import { render } from "./utils";

export class FilmCard extends AbstractComponent {
  constructor(data) {
    super();
    this._name = data.name;
    this._rating = data.rating;
    this._year = data.year;
    this._time = data.time;
    this._genre = data.genre;
    this._poster = data.poster;
    this._descriptionText = data.descriptionText;
    this._comments = data.comments.length;
    this._isWatchlist = data.isWatchlist;
    this._isWatched = data.isWatched;
    this._isFavorite = data.isFavorite;
  }

  getTemplate() {
    return `<article class="film-card">
          <h3 class="film-card__title">${this._name}</h3>
          <p class="film-card__rating">${this._rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${moment(this._year).format(
              "YYYY"
            )}</span>
            <span class="film-card__duration">${this._time}</span>
            <span class="film-card__genre">${this._genre}</span>
          </p>
          <img src="images/posters/made-for-each-other.png" alt="" class="film-card__poster">
          <p class="film-card__description">${this._descriptionText}</p>
          <a class="film-card__comments">${this._comments} comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${this._getActiveClass(
              this._isWatchlist
            )}">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${this._getActiveClass(
              this._isWatched
            )}">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${this._getActiveClass(
              this._isFavorite
            )}">Mark as favorite</button>
          </form>
        </article>
        `;
  }

  _getActiveClass(state) {
    return state ? `film-card__controls-item--active` : ``;
  }

  addCallbackOnClickCommentsBtn(callback) {
    const commentsBtn = this.getElement().querySelector(`.film-card__comments`);

    commentsBtn.addEventListener(`click`, callback);
  }

  addCallbackOnClickWatchlistBtn(callback) {
    this.getElement()
      .querySelector(".film-card__controls-item--add-to-watchlist")
      .addEventListener("click", callback);
  }

  addCallbackOnClickFavoriteBtn(callback) {
    this.getElement()
      .querySelector(".film-card__controls-item--mark-as-watched")
      .addEventListener("click", callback);
  }

  addCallbackOnClickHistoryBtn(callback) {
    this.getElement()
      .querySelector(".film-card__controls-item--favorite")
      .addEventListener("click", callback);
  }
}
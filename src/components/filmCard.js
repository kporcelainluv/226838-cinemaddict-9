import moment from "moment";

import { AbstractComponent } from "./abstractComponent";
import { countHoursAndMins } from "../utils";

export class FilmCard extends AbstractComponent {
  constructor(film) {
    super();
    this._title = film.film_info.title;
    this._alternativeTitle = film.film_info.alternative_title;
    this._rating = film.film_info.total_rating;
    this._poster = film.film_info.poster;
    this._ageRating = film.film_info.age_rating;

    this._director = film.film_info.director;
    this._writers = film.film_info.writers;
    this._actors = film.film_info.actors;
    this._releaseDate = film.film_info.release.date;
    this._releaseCountry = film.film_info.release.country;

    [this._hours, this._minutes] = countHoursAndMins(film.film_info.runtime);

    this._genre = film.film_info.genre;
    this._descriptionText = film.film_info.description;

    this._personalRating = film.user_details.personal_rating;
    this._isWatchlist = film.user_details.watchlist;
    this._isWatched = film.user_details.already_watched;
    this._isFavorite = film.user_details.favorite;
    this._watchingDate = film.user_details.watching_date;

    this._comments = film.comments.length;
  }

  getTemplate() {
    return `<article class="film-card">
          <h3 class="film-card__title">${this._title}</h3>
          <p class="film-card__rating">${this._rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${moment(this._releaseDate).format(
              "YYYY"
            )}</span>
            <span class="film-card__duration">${this._hours}h
                ${this._minutes}m</span>
            <span class="film-card__genre">${this._genre}</span>
          </p>
          <img src="${this._poster}" alt="" class="film-card__poster">
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
      .querySelector(".film-card__controls-item--favorite")
      .addEventListener("click", callback);
  }

  addCallbackOnClickHistoryBtn(callback) {
    this.getElement()
      .querySelector(".film-card__controls-item--mark-as-watched")
      .addEventListener("click", callback);
  }
}

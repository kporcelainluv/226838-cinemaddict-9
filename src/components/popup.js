import { AbstractComponent } from "./abstractComponent";
import { countHoursAndMins } from "../utils";
import moment from "moment";

class Popup extends AbstractComponent {
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
    this._releaseCountry = film.film_info.release.release_country;

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
    return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${this._poster}" alt="">

            <p class="film-details__age">${this._ageRating}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${this._title}</h3>
                <p class="film-details__title-original">Original: ${
                  this._alternativeTitle
                }</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${this._rating}</p>
              </div>
            </div>
            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${this._director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${this._writers}</tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${this._actors}</tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${moment(
                  this._releaseDate
                ).format("DD MMMM YYYY")}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${this._hours}h
                ${this._minutes}m</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${this._releaseCountry}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">${this._genre}</td>
              </tr>
            </table>

            <p class="film-details__film-description">
              ${this._descriptionText}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${
            this._isWatchlist ? `checked` : ``
          }>
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${
            this._isWatched ? `checked` : ``
          }>
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${
            this._isFavorite ? `checked` : ``
          }>
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>
      </div>
      <div class="form-details__middle-container ${
        this._isWatched ? `` : `visually-hidden`
      }">
      
      <section class="film-details__user-rating-wrap">
        <div class="film-details__user-rating-controls">
          <button class="film-details__watched-reset" type="button">Undo</button>
        </div>

        <div class="film-details__user-score">
          <div class="film-details__user-rating-poster">
            <img src="${
              this._poster
            }" alt="film-poster" class="film-details__user-rating-img">
          </div>

          <section class="film-details__user-rating-inner">
            <h3 class="film-details__user-rating-title">${this._title}</h3>

            <p class="film-details__user-rating-feelings">How you feel it?</p>
            <div class="film-details__user-rating-score">
      ${new Array(10)
        .fill()
        .map(
          (_, id) => `
                <input type="radio" name="score"
                  class="film-details__user-rating-input visually-hidden"
                  value="${id}"
    id="rating-${id}"
      ${Number(this._personalRating) === id ? `checked` : ``}
    >
    <label class="film-details__user-rating-label" for="rating-${id}">${id}</label>
    `
        )
        .join(` `)}</div>
          </section>
        </div>
        </section>
      </div>
        <div class="form-details__bottom-container">
      
    </div>
    </form>
  </section>`;
  }
  addCallBackOnClosingBtn(callback) {
    const closingBtn = this.getElement().querySelector(
      `.film-details__close-btn`
    );
    closingBtn.addEventListener("click", callback);
  }
  addCallbackOnClickWatchlistBtn(callback) {
    this.getElement()
      .querySelector(".film-details__control-label--watchlist")
      .addEventListener("click", callback);
  }

  addCallbackOnClickFavoriteBtn(callback) {
    this.getElement()
      .querySelector(".film-details__control-label--favorite")
      .addEventListener("click", callback);
  }

  addCallbackOnClickHistoryBtn(callback) {
    this.getElement()
      .querySelector(".film-details__control-label--watched")
      .addEventListener("click", callback);
  }

  toggleRatingSection() {
    this.getElement()
      .querySelector(`.form-details__middle-container`)
      .classList.toggle(`visually-hidden`);
  }

  getCommentsContainer() {
    return this.getElement().querySelector(".form-details__bottom-container");
  }

  getFormElement() {
    return this.getElement().querySelector(".film-details__inner");
  }
}
export { Popup };

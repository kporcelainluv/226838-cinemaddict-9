import { AbstractComponent } from "./abstractComponent";

class Popup extends AbstractComponent {
  constructor(card) {
    super();
    this._poster = card.poster;
    this._ageRating = card.ageRating;
    this._title = card.title;
    this._titleOriginal = card.titleOriginal;
    this._rating = card.rating;
    this._details = card.details;
    this._description = card.descriptionText;
    this._isWatchlist = true;
    this._isViewed = true;
    this._isFavorite = true;
    this._personalRating = card.personalRating;
  }
  getTemplate() {
    const {
      director,
      writers,
      actors,
      date,
      runtime,
      country,
      genres
    } = this._details;
    return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./${
              this._poster
            }" alt="">

            <p class="film-details__age">${this._ageRating}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${this._title}</h3>
                <p class="film-details__title-original">Original: ${
                  this._titleOriginal
                }</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${this._rating}</p>
              </div>
            </div>
            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">${this._details}</td>
                <td class="film-details__cell">${this._details}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${this._details}</td>
                <td class="film-details__cell">${this._details}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${this._details}</td>
                <td class="film-details__cell">${this._details}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${this._details}</td>
                <td class="film-details__cell">${this._details}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${this._details}</td>
                <td class="film-details__cell">${this._details}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${this._details}</td>
                <td class="film-details__cell">${this._details}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${this._details}</td>
                <td class="film-details__cell">${this._details}</td>
              </tr>
            </table>

            <p class="film-details__film-description">
              ${this._description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${
            this._isWatchlist ? `checked` : ``
          }>
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${
            this._isViewed ? `checked` : ``
          }>
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${
            this._isFavorite ? `checked` : ``
          }>
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>
      </div>
      <div class="form-details__middle-container ${
        this._isViewed ? `` : `visually-hidden`
      }">
      <section class="film-details__user-rating-wrap">
        <div class="film-details__user-rating-controls">
          <button class="film-details__watched-reset" type="button">Undo</button>
        </div>

        <div class="film-details__user-score">
          <div class="film-details__user-rating-poster">
            <img src="./${
              this._poster
            }" alt="film-poster" class="film-details__user-rating-img">
          </div>

          <section class="film-details__user-rating-inner">
            <h3 class="film-details__user-rating-title">${this._title}</h3>

            <p class="film-details__user-rating-feelings">How you feel it?</p>

            <div class="film-details__user-rating-score">
              
                <input type="radio" name="score"
                  class="film-details__user-rating-input visually-hidden"
                  value=""
                  // id="rating"
                  ${this._rating}
                >
                <label class="film-details__user-rating-label" for="rating-${
                  this._rating
                }</label>
              
                
            </div>
          </section>
        </div>
      </section>
    </div>

    <div class="form-details__bottom-container"></div>
    </form>
  </section>`;
  }
}
export { Popup };

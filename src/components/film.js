import { AbstractComponent } from "./abstractComponent";
class Film extends AbstractComponent {
  constructor(data) {
    super();
    this._name = data.name;
    this._rating = data.rating;
    this._year = data.year;
    this._time = data.time;
    this._genre = data.genre;
    this._poster = data.poster;
    this._descriptionText = data.descriptionText;
    this._commentsAmount = data.comments;
    this._isWatchlist = data.isWatchlist;
    this._isWatched = data.isWatched;
    this._isFavorite = data.isFavorite;
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
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${this._checkActiveState(
              this._isWatchlist
            )}">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${this._checkActiveState(
              this._isWatched
            )}">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${this._checkActiveState(
              this._isFavorite
            )}">Mark as favorite</button>
          </form>
        </article>
        `;
  }
  _checkActiveState(state) {
    return state ? `film-card__controls-item--active` : ``;
  }
}
export { Film };

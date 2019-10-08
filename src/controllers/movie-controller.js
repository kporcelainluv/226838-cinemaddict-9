import { Popup } from "../components/popup";
import { Position, render, unrender } from "../components/utils";
import { Film } from "../components/film";

class MovieController {
  constructor(container, film, onDataChange, onChangeView) {
    this._filmCard = new Film(film).getElement();
    this._popUpTemplate = new Popup(film).getElement();

    this._container = container;
    this._film = film;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;

    this._commentsButton = this._filmCard.querySelector(`.film-card__comments`);
    this._popUPCloseButton = this._popUpTemplate.querySelector(
      `.film-details__close-btn`
    );
    this._body = document.getElementsByTagName("body")[0];
    this._emojiLabel = this._popUpTemplate.querySelectorAll(
      `.film-details__emoji-item`
    );
  }

  init() {
    const onEscKeyDown = evt => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        unrender(this._popUpTemplate);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._commentsButton.addEventListener(`click`, () => {
      render(this._body, this._popUpTemplate, "beforeend");
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    this._popUPCloseButton.addEventListener("click", () => {
      unrender(this._popUpTemplate);
    });

    render(this._container, this._filmCard, Position.AFTERBEGIN);

    // check if in favorites, in watchlist, in watched
    this._filmCard
      .querySelector(".film-card__controls-item--add-to-watchlist")
      .addEventListener("click", evt => {
        evt.preventDefault();
        const updatedFilm = {
          ...this._film,
          isWatchlist: !this._film.isWatchlist
        };
        this._onDataChange(updatedFilm);
      });

    this._filmCard
      .querySelector(".film-card__controls-item--mark-as-watched")
      .addEventListener("click", evt => {
        evt.preventDefault();
        const updatedFilm = {
          ...this._film,
          isWatched: !this._film.isWatched
        };
        this._onDataChange(updatedFilm);
      });

    this._filmCard
      .querySelector(".film-card__controls-item--favorite")
      .addEventListener("click", evt => {
        evt.preventDefault();
        const updatedFilm = {
          ...this._film,
          isFavorite: !this._film.isFavorite
        };
        this._onDataChange(updatedFilm);
      });
    // popUp event listeners

    this._popUpTemplate
      .querySelector(".film-details__control-label--watched")
      .addEventListener("click", evt => {
        evt.preventDefault();
        console.log("watched");
        const updatedFilm = {
          ...this._film,
          isWatched: !this._film.isWatched
        };
        this._onDataChange(updatedFilm);
      });
    this._popUpTemplate
      .querySelector(".film-details__control-label--watchlist")
      .addEventListener("click", evt => {
        evt.preventDefault();
        console.log("watchlist");
        const updatedFilm = {
          ...this._film,
          isWatchlist: !this._film.isWatchlist
        };
        this._onDataChange(updatedFilm);
      });
    this._popUpTemplate
      .querySelector(".film-details__control-label--favorite")
      .addEventListener("click", evt => {
        evt.preventDefault();
        console.log("fav");
        this._film = {
          ...this._film,
          isFavorite: !this._film.isFavorite
        };
        this._onDataChange(this._film);

      });
    // adding emoji
    for (let emoji of this._emojiLabel) {
      emoji.addEventListener("click", evt => {
        evt.preventDefault();
        console.log(evt.target.id);
      });
    }
  }
}
export { MovieController };

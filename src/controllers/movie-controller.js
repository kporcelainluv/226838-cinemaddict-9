import { Popup } from "../components/popup";
import { Position, render, unrender } from "../components/utils";
import { Film } from "../components/film";

class MovieController {
  constructor(container, film, onDataChange, onChangeView) {
    this._film = film;
    this._filmCard = new Film(this._film);
    // TODO: remove popupTemplate
    this._popUpTemplate = new Popup(this._film);

    this._container = container;

    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;

    this._commentsButton = this._filmCard
      .getElement()
      .querySelector(`.film-card__comments`);
    this._popUPCloseButton = this._popUpTemplate
      .getElement()
      .querySelector(`.film-details__close-btn`);
    this._body = document.getElementsByTagName("body")[0];
    this._emojiLabel = this._popUpTemplate
      .getElement()
      .querySelectorAll(`.film-details__emoji-item`);

    this.setDefaultView = this.setDefaultView.bind(this);
  }
  getState() {
    return {
      isWatchlist: this._film.isWatchlist,
      isWatched: this._film.isWatched,
      isFavorite: this._film.isFavorite
    };
  }
  setDefaultView() {
    if (this._body.contains(this._popUpTemplate.getElement())) {
      unrender(this._popUpTemplate.getElement());
      this._popUpTemplate.removeElement();
    }
  }

  init() {
    const onEscKeyDown = evt => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        unrender(this._popUpTemplate.getElement());
        this._popUpTemplate.removeElement();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._commentsButton.addEventListener(`click`, () => {
      this._onChangeView();
      render(this._body, this._popUpTemplate.getElement(), "beforeend");
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    this._popUPCloseButton.addEventListener("click", () => {
      unrender(this._popUpTemplate.getElement());
    });

    render(this._container, this._filmCard.getElement(), Position.AFTERBEGIN);

    // check if in favorites, in watchlist, in watched
    this._filmCard
      .getElement()
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
      .getElement()
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
      .getElement()
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
      .getElement()
      .querySelector(".film-details__control-label--watched")
      .addEventListener("click", evt => {
        evt.preventDefault();
        console.log("watched", this._film.isWatched);
        const updatedFilm = {
          ...this._film,
          isWatched: !this._film.isWatched
        };
        this._onDataChange(updatedFilm);
        this._film = updatedFilm;
      });
    this._popUpTemplate
      .getElement()
      .querySelector(".film-details__control-label--watchlist")
      .addEventListener("click", evt => {
        evt.preventDefault();
        console.log("watchlist", this._film.isWatchlist);
        const updatedFilm = {
          ...this._film,
          isWatchlist: !this._film.isWatchlist
        };
        this._onDataChange(updatedFilm);
        this._film = updatedFilm;
      });
    this._popUpTemplate
      .getElement()
      .querySelector(".film-details__control-label--favorite")
      .addEventListener("click", evt => {
        evt.preventDefault();
        console.log("fav", this._film.isFavorite);
        this._film = {
          ...this._film,
          isFavorite: !this._film.isFavorite
        };
        this._onDataChange(this._film);
        this._film = updatedFilm;
      });
    // adding emoji
    for (let emoji of this._emojiLabel) {
      emoji.addEventListener("click", evt => {
        evt.preventDefault();
      });
    }
  }
}
export { MovieController };

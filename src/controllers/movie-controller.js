import { Popup } from "../components/popup";
import { Position, render, unrender } from "../components/utils";
import { Film } from "../components/film";
import { CommentsController } from "../controllers/comments-controller";

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
    this._ratingBlockContainer = this._popUpTemplate
      .getElement()
      .querySelector(`.form-details__middle-container `);

    this.setDefaultView = this.setDefaultView.bind(this);
    this._commentsController = new CommentsController(
      this._popUpTemplate,
      this._film,
      this._onDataChange.bind(this)
    );
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
      this._commentsController.init();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    this._popUPCloseButton.addEventListener("click", () => {
      unrender(this._popUpTemplate.getElement());
    });
    render(this._container, this._filmCard.getElement(), Position.AFTERBEGIN);

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
        const updatedFilm = {
          ...this._film,
          isWatched: !this._film.isWatched
        };
        this._onDataChange(updatedFilm);
        this._film = updatedFilm;
        this._popUpTemplate
          .getElement()
          .querySelector(`.form-details__middle-container`)
          .classList.toggle(`visually-hidden`);
      });
    this._popUpTemplate
      .getElement()
      .querySelector(".film-details__control-label--watchlist")
      .addEventListener("click", evt => {
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
        this._film = {
          ...this._film,
          isFavorite: !this._film.isFavorite
        };
        this._onDataChange(this._film);
        this._film = updatedFilm;
      });
  }
}
export { MovieController };

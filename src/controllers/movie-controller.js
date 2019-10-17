import { Popup } from "../components/popup";
import { Position, render, unrender } from "../components/utils";
import { FilmCard } from "../components/filmCard";
import { CommentsController } from "../controllers/comments-controller";

class MovieController {
  constructor(container, film, onDataChange, onChangeView) {
    this._film = film;
    this._filmCard = new FilmCard(this._film);
    // TODO: remove popupTemplate
    this._popUpTemplate = new Popup(this._film);
    this._container = container;

    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;

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

    this._filmCard.addCallbackOnClickCommentsBtn(() => {
      this._onChangeView();
      render(this._body, this._popUpTemplate.getElement(), "beforeend");
      this._commentsController.init();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    this._popUPCloseButton.addEventListener("click", () => {
      unrender(this._popUpTemplate.getElement());
    });
    render(this._container, this._filmCard.getElement(), Position.AFTERBEGIN);

    this._filmCard.addCallbackOnClickWatchlistBtn(evt => {
      evt.preventDefault();
      const updatedFilm = {
        ...this._film,
        isWatchlist: !this._film.isWatchlist
      };
      this._onDataChange(updatedFilm);
    });

    this._filmCard.addCallbackOnClickHistoryBtn(evt => {
      evt.preventDefault();
      const updatedFilm = {
        ...this._film,
        isWatched: !this._film.isWatched
      };
      this._onDataChange(updatedFilm);
    });

    this._filmCard.addCallbackOnClickFavoriteBtn(evt => {
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

import { Popup } from "../components/popup";
import { Position, render, unrender } from "../components/utils";
import { FilmCard } from "../components/filmCard";
import { CommentsController } from "../controllers/comments-controller";

const body = document.getElementsByTagName("body")[0];

export class MovieController {
  constructor(container, film, onDataChange, onTogglePopup) {
    this._film = film;
    this._container = container;

    this._onDataChange = onDataChange;
    this._onTogglePopup = onTogglePopup;

    this.closePopup = this.closePopup.bind(this);
    this.openPopup = this.openPopup.bind(this);
    this.onCommentsChange = this.onCommentsChange.bind(this);

    this._filmCard = new FilmCard(this._film);
    this._popup = new Popup(this._film);
    this._comments = new CommentsController(
      this._popup,
      this._film.comments,
      this.onCommentsChange
    );
  }

  closePopup() {
    if (body.contains(this._popup.getElement())) {
      unrender(this._popup.getElement());
      this._popup.removeElement();
    }
  }

  onCommentsChange(newComments) {
    this._film = {
      ...this._film,
      comments: newComments
    };
    this._onDataChange(this._film);
  }

  openPopup() {
    render(body, this._popup.getElement(), "beforeend");
  }

  init() {
    render(this._container, this._filmCard.getElement(), Position.AFTERBEGIN);

    const onEscKeyDown = evt => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this.closePopup();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._filmCard.addCallbackOnClickCommentsBtn(() => {
      this._onTogglePopup();
      this.openPopup();
      this._comments.init();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    this._popup.addCallBackOnClosingBtn(() => {
      unrender(this._popup.getElement());
    });

    this._filmCard.addCallbackOnClickWatchlistBtn(evt => {
      const updatedFilm = {
        ...this._film,
        isWatchlist: !this._film.isWatchlist
      };
      this._onDataChange(updatedFilm);
    });

    this._filmCard.addCallbackOnClickHistoryBtn(evt => {
      const updatedFilm = {
        ...this._film,
        isWatched: !this._film.isWatched
      };
      this._onDataChange(updatedFilm);
    });

    this._filmCard.addCallbackOnClickFavoriteBtn(evt => {
      const updatedFilm = {
        ...this._film,
        isFavorite: !this._film.isFavorite
      };
      this._onDataChange(updatedFilm);
    });

    this._popup.addCallbackOnClickHistoryBtn(evt => {
      const updatedFilm = {
        ...this._film,
        isWatched: !this._film.isWatched
      };
      this._onDataChange(updatedFilm);
      this._film = updatedFilm;

      this._popup.toggleRatingSection();
    });

    this._popup.addCallbackOnClickWatchlistBtn(evt => {
      const updatedFilm = {
        ...this._film,
        isWatchlist: !this._film.isWatchlist
      };
      this._onDataChange(updatedFilm);
      this._film = updatedFilm;
    });

    this._popup.addCallbackOnClickFavoriteBtn(evt => {
      const updatedFilm = {
        ...this._film,
        isFavorite: !this._film.isFavorite
      };
      this._onDataChange(updatedFilm);
      this._film = updatedFilm;
    });
  }
}

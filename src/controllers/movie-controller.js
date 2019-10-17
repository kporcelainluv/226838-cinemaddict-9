import { Popup } from "../components/popup";
import { Position, render, unrender } from "../components/utils";
import { FilmCard } from "../components/filmCard";
import { CommentsController } from "../controllers/comments-controller";

export class MovieController {
  constructor(container, film, onDataChange, onChangeView) {
    this._film = film;

    this._filmCard = new FilmCard(this._film);
    this._popup = new Popup(this._film);
    this._container = container;

    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;

    this._commentsController = new CommentsController(
      this._popup,
      this._film,
      this._onDataChange.bind(this)
    );

    this.setDefaultView = this.setDefaultView.bind(this);
  }

  setDefaultView() {
    const body = document.getElementsByTagName("body")[0];
    if (body.contains(this._popup.getElement())) {
      unrender(this._popup.getElement());
      this._popup.removeElement();
    }
  }

  init() {
    render(this._container, this._filmCard.getElement(), Position.AFTERBEGIN);

    const onEscKeyDown = evt => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        unrender(this._popup.getElement());
        this._popup.removeElement();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._filmCard.addCallbackOnClickCommentsBtn(() => {
      this._onChangeView();
      const body = document.getElementsByTagName("body")[0];
      render(body, this._popup.getElement(), "beforeend");
      this._commentsController.init();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    this._popup.addCallBackOnClosingBtn(() => {
      unrender(this._popup.getElement());
    });

    //filmcard event listeners
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

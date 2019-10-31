import { Popup } from "../components/popup";
import { render, unrender } from "../utils";
import { POSITION, UPDATE_TYPE } from "../consts";
import { FilmCard } from "../components/filmCard";
import { CommentsController } from "../controllers/comments-controller";

const body = document.getElementsByTagName("body")[0];

export class MovieController {
  constructor(container, film, onFilmChange, onTogglePopup) {
    this._film = film;
    this._container = container;

    this._onFilmChange = onFilmChange;
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

  onCommentsChange(newComments, updateType) {
    this._film = {
      ...this._film,
      comments: newComments
    };
    this._onFilmChange(this._film, updateType);
  }

  openPopup() {
    render(body, this._popup.getElement(), "beforeend");
  }

  init() {
    render(this._container, this._filmCard.getElement(), POSITION.BEFOREEND);

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

    this._filmCard.addCallbackOnClickPoster(() => {
      this._onTogglePopup();
      this.openPopup();
      this._comments.init();
      document.addEventListener(`keydown`, onEscKeyDown);
    });
    this._filmCard.addCallbackOnClickTitle(() => {
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
        user_details: {
          ...this._film.user_details,
          watchlist: !this._film.user_details.watchlist
        }
      };
      this._onFilmChange(updatedFilm, {
        updateType: UPDATE_TYPE.UPDATE_USER_INFO
      });
    });

    this._filmCard.addCallbackOnClickHistoryBtn(evt => {
      const updatedFilm = {
        ...this._film,
        user_details: {
          ...this._film.user_details,
          already_watched: !this._film.user_details.already_watched
        }
      };
      this._onFilmChange(updatedFilm, {
        updateType: UPDATE_TYPE.UPDATE_USER_INFO
      });
    });

    this._filmCard.addCallbackOnClickFavoriteBtn(evt => {
      const updatedFilm = {
        ...this._film,
        user_details: {
          ...this._film.user_details,
          favorite: !this._film.user_details.favorite
        }
      };
      this._onFilmChange(updatedFilm, {
        updateType: UPDATE_TYPE.UPDATE_USER_INFO
      });
    });

    this._popup.addCallbackOnClickHistoryBtn(evt => {
      const updatedFilm = {
        ...this._film,
        user_details: {
          ...this._film.user_details,
          already_watched: !this._film.user_details.already_watched
        }
      };
      this._onFilmChange(updatedFilm, {
        updateType: UPDATE_TYPE.UPDATE_USER_INFO
      });
      this._film = updatedFilm;

      this._popup.toggleRatingSection();
    });

    this._popup.addCallbackOnClickWatchlistBtn(evt => {
      const updatedFilm = {
        ...this._film,
        user_details: {
          ...this._film.user_details,
          watchlist: !this._film.user_details.watchlist
        }
      };
      this._onFilmChange(updatedFilm, {
        updateType: UPDATE_TYPE.UPDATE_USER_INFO
      });
      this._film = updatedFilm;
    });

    this._popup.addCallbackOnRatingUndo(() => {
      const updatedFilm = {
        ...this._film,
        user_details: {
          ...this._film.user_details,
          already_watched: !this._film.user_details.already_watched
        }
      };
      this._onFilmChange(updatedFilm, {
        updateType: UPDATE_TYPE.UPDATE_USER_INFO
      });
      this._film = updatedFilm;

      this._popup.toggleRatingSection();
      this._popup.getWatchedBtnUnchecked();
    });

    this._popup.addCallbackOnClickFavoriteBtn(evt => {
      const updatedFilm = {
        ...this._film,
        user_details: {
          ...this._film.user_details,
          favorite: !this._film.user_details.favorite
        }
      };
      this._onFilmChange(updatedFilm, {
        updateType: UPDATE_TYPE.UPDATE_USER_INFO
      });
      this._film = updatedFilm;
    });

    this._popup.toggleRatingButton(evt => {
      this._popup.disableForm();
      this._popup.removeErrorFromBtns();
      evt.target.checked = true;

      const personalRating = evt.target.value;
      console.log({ personalRating });
      const updatedFilm = {
        ...this._film,
        user_details: {
          ...this._film.user_details,
          personal_rating: Number(personalRating)
        }
      };
      this._onFilmChange(updatedFilm, {
        updateType: UPDATE_TYPE.UPDATE_USER_INFO,
        onSuccess: () => {
          this._popup.enableForm();
        },
        onError: () => {
          this._popup.shakePopup();
          this._popup.enableForm();
          this._popup.addRedBackgroundToBtn(evt.target);
        }
      });
      this._film = updatedFilm;
    });
  }
}

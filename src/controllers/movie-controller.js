import { Popup } from "../components/popup";
import { Position, render, unrender } from "../components/utils";
import { Film } from "../components/film";

class MovieController {
  constructor(container, films, onDataChange, onChangeView) {
    this._container = container;
    this._film = films;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;

    this._filmCard = new Film(this._film).getElement();
    this._popUpTemplate = new Popup(this._film).getElement();
    this._commentsButton = this._filmCard.querySelector(`.film-card__comments`);
    this._body = document.getElementsByTagName("body")[0];
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
    render(this._container, this._filmCard, Position.AFTERBEGIN);
  }
}
export { MovieController };

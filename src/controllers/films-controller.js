import { FilmCard } from "../components/filmCard";
import { Popup } from "../components/popup";
import { render, unrender, Position } from "../components/utils";

class FilmsController {
  constructor(container, data) {
    this._container = container;
    this._data = data;
    this._filmsListContainer = container.querySelector(
      `.films-list__container`
    );
    this._body = document.getElementsByTagName(`body`)[0];
  }
  init() {
    render(this._container, this._filmsListContainer, Position.AFTERBEGIN);
    this._renderFilm(this._data);
  }

  _renderFilm(data) {
    const filmCard = new FilmCard(data).getElement();
    const popUpTemplate = new Popup(data).getElement();

    const onEscKeyDown = evt => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        unrender(popUpTemplate);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const commentsButton = filmCard.querySelector(`.film-card__comments`);
    commentsButton.addEventListener(`click`, () => {
      render(this._body, popUpTemplate, `beforeend`);
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    const closeButton = popUpTemplate.querySelector(`.film-details__close-btn`);
    closeButton.addEventListener(`click`, () => {
      unrender(popUpTemplate);
    });
    render(this._filmsListContainer, filmCard, Position.AFTERBEGIN);
  }
}
export { FilmsController };

import { Film } from "../components/film";
import { Popup } from "../components/popup";
import { render, unrender, Position } from "../components/utils";
import { SortingController } from "../controllers/sort-controller";

class PageController {
  constructor(container, mainPageContainer, data) {
    this._container = container;
    this._mainPageContainer = mainPageContainer;
    this._data = data;
    this._filmsListContainer = container.querySelector(
      ".films-list__container"
    );
    this._body = document.getElementsByTagName("body")[0];
    this._sortingController = new SortingController(
      this._mainPageContainer,
      this._data,
      this._renderFilm.bind(this)
    );
  }
  init() {
    render(this._container, this._filmsListContainer, Position.AFTERBEGIN);
    for (let film of this._data) {
      this._renderFilm(film);
    }
    this._sortingController.init();
  }

  _renderFilm(film) {
    const filmCard = new Film(film).getElement();
    const popUpTemplate = new Popup(film).getElement();

    const onEscKeyDown = evt => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        unrender(popUpTemplate);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const commentsButton = filmCard.querySelector(".film-card__comments");
    commentsButton.addEventListener(`click`, () => {
      render(this._body, popUpTemplate, "beforeend");
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    const closeButton = popUpTemplate.querySelector(".film-details__close-btn");
    closeButton.addEventListener("click", () => {
      unrender(popUpTemplate);
    });
    render(this._filmsListContainer, filmCard, Position.AFTERBEGIN);
  }
}
export { PageController };

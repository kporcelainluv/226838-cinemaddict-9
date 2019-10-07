import { Film } from "../components/film";
import { Popup } from "../components/popup";
import { render, unrender, Position } from "../components/utils";
import { MainSorting } from "../components/mainSorting";

class PageController {
  constructor(container, mainPageContainer, data) {
    this._container = container;
    this._mainPageContainer = mainPageContainer;
    this._data = data;
    this._filmsListContainer = container.querySelector(
      ".films-list__container"
    );
    this._body = document.getElementsByTagName("body")[0];
    this._sort = new MainSorting();
  }
  init() {
    render(this._container, this._filmsListContainer, Position.AFTERBEGIN);
    for (let film of this._data) {
      this._renderFilm(film);
    }
    render(
      this._mainPageContainer,
      this._sort.getElement(),
      Position.AFTERBEGIN
    );
    this._sort
      .getElement()
      .addEventListener(`click`, evt => this._onSortLinkClick(evt));
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

  _sortedByDateFilms(films) {
    return films.sort((a, b) => {
      return parseInt(a.year, 10) - parseInt(b.year, 10);
    });
  }
  _sortedByRatingFilms(films) {
    return films.sort((a, b) => {
      return parseInt(a.rating, 10) - parseInt(b.rating, 10);
    });
  }
  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }
    this._filmsListContainer.innerHTML = "";

    switch (evt.target.dataset.sortType) {
      case `default`:
        const sortedByDefault = this._data;
        sortedByDefault.forEach(mock => this._renderFilm(mock));
        break;
      case `date`:
        const sortedByDate = this._sortedByDateFilms(this._data);
        sortedByDate.forEach(mock => this._renderFilm(mock));
        break;
      case `rating`:
        const sortedByRating = this._sortedByRatingFilms(this._data);
        sortedByRating.forEach(mock => this._renderFilm(mock));
        break;
    }
  }
}
export { PageController };

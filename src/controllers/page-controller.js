import { Film } from "../components/film";
import { Popup } from "../components/popup";
import { render, unrender, Position } from "../components/utils";
import { MainSorting } from "../components/mainSorting";
import { MovieController } from "../controllers/movie-controller";

class PageController {
  constructor(container, mainPageContainer, data) {
    this._container = container;
    this._mainPageContainer = mainPageContainer;
    this._data = data;
    this._filmsListContainer = this._container.querySelector(
      ".films-list__container"
    );
    this._sort = new MainSorting();
  }
  init() {
    for (let film of this._data) {
      this._renderFilm(this._filmsListContainer, film);
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

  _renderFilm(container, film) {
    const movieController = new MovieController(
      container,
      film,
      undefined,
      undefined
    );
    movieController.init();
  }
  _onDataChange(oldData, newData) {
    for (let i of this._data) {
      if (i === oldData) {
        this._data = this._data.splice(i, 1, newData);
      }
    }
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

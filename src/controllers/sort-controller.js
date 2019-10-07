import { MainSorting } from "../components/mainSorting";
import { render, Position } from "../components/utils";

class SortingController {
  constructor(container, data, renderFilm) {
    this._container = container;
    this._films = data;
    this._Sort = new MainSorting();
    this._renderFilms = renderFilm; //func that renders a film
    this._sortedFilms = this._films; // list of all sorted films
  }
  init() {
    render(this._container, this._Sort.getElement(), Position.AFTERBEGIN);
    this._Sort
      .getElement()
      .addEventListener(`click`, evt => this._onSortLinkClick(evt));
  }
  _renderSortedFilms(sortedFilms) {
    console.log("here");
    this._sortedFilms = [...sortedFilms];
    this._renderFilms(this._sortedFilms);
  }
  _sortedByDateFilms(films) {
    return films.sort((a, b) => {
      return parseInt(b.year, 10) - parseInt(a.year, 10);
    });
  }
  _sortedByRatingFilms(films) {
    return films.sort((a, b) => {
      return parseInt(b.rating, 10) - parseInt(a.rating, 10);
    });
  }
  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }
    this._container.querySelector(".films-list").innerHTML = "";

    switch (evt.target.dataset.sortType) {
      case `defaul`:
        this._sortedFilms = this._films;
        break;
      case `date`:
        this._sortedFilms = this._sortedByDateFilms(this._films);
        break;
      case `rating`:
        this._sortedFilms = this._sortedByRatingFilms(this._films);
        break;
    }
    this._renderSortedFilms(this._sortedFilms);
  }
}
export { SortingController };

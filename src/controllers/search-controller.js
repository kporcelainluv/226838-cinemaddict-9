import { FilmsList } from "../components/films-list";
import { Search } from "../components/search";
import { FilmContainer } from "../components/film-containter";
import { SearchResult } from "../components/searchResult";
import { EmptySearch } from "../components/emptySearch";
import { render, unrender } from "../components/utils";
import { ProfileRating } from "../components/profileRating";

class SearchController {
  constructor(header, films, search, onSearchChange) {
    this._header = header;
    this._search = search;
    this._emptySearch = new EmptySearch(); // if returns 0
    this._filmsListBlock = new FilmsList(); // film-list inside silf
    this._filmsListContainer = this._filmsListBlock
      .getElement()
      .querySelector(`.films-list__container`); // where films are rendered
    this._filmContainer = new FilmContainer(); // section films
    this._films = films;
    this._headerProfileRating = new ProfileRating().getElement();
    this._onSearchChange = onSearchChange;
    this._searchResult = new SearchResult(); //output of films in films list
  }
  init() {
    this._hide();
    // render(this._main, this._searchResult.getElement(), "beforeend");

    this._search
      .getElement()
      .querySelector(`input`)
      .addEventListener(`keyup`, evt => {
        this._onSearchChange(evt.target.value);
      });
  }

  _hide() {
    this._searchResult.getElement().classList.add(`visually-hidden`);
  }

  _show(films) {
    this._films = films;

    if (this._searchResult.getElement().classList.contains(`visually-hidden`)) {
      this._searchResult(``, this._films);
      this._searchResult.getElement().classList.remove(`visually-hidden`);
    }
  }
}
export { SearchController };

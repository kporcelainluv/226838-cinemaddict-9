import { render, unrender } from "../utils";
import { MovieController } from "./movie-controller";
import { DefaultFilmList } from "../components/default-film-list";
import { FilmsContainer } from "../components/film-containter";

export class FilmsController {
  constructor({ container, films, onFilmUpdate }) {
    this._container = container;
    this._subscriptions = [];
    this._films = films;

    this._filmsContainer = new FilmsContainer();
    this._defaultFilmList = new DefaultFilmList();

    this._onFilmUpdate = onFilmUpdate;

    this._onTogglePopup = this._onTogglePopup.bind(this);
  }

  init() {
    render(this._container, this._filmsContainer.getElement(), `beforeend`);

    render(
      this._filmsContainer.getElement(),
      this._defaultFilmList.getElement(),
      `beforeend`
    );

    this._films.forEach(film => {
      this._renderFilmCard(
        this._defaultFilmList.getElementToRenderFilmsTo(),
        film
      );
    });
  }

  renderFilms(films) {
    this._unrenderFilmList();

    render(
      this._filmsContainer.getElement(),
      this._defaultFilmList.getElement(),
      `afterbegin`
    );

    films.forEach(film => {
      this._renderFilmCard(
        this._defaultFilmList.getElementToRenderFilmsTo(),
        film
      );
    });
  }

  _onTogglePopup() {
    this._subscriptions.forEach(subscription => subscription());
  }

  _unrenderFilmList() {
    unrender(this._defaultFilmList.getElement());
    this._defaultFilmList.removeElement();
  }

  _renderFilmCard(container, film) {
    const movieController = new MovieController(
      container,
      film,
      this._onFilmUpdate,
      this._onTogglePopup
    );

    movieController.init();
    this._subscriptions.push(movieController.closePopup.bind(movieController));
  }
}

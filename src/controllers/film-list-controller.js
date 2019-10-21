import { MovieController } from "./movie-controller";

export class FilmListController {
  constructor({
    container,
    films,
    onFilmUpdate,
    onTogglePopup,
    onRenderFilmCard
  }) {
    this._container = container;
    this._films = films;

    this._onFilmUpdate = onFilmUpdate;
    this._onTogglePopup = onTogglePopup;
    this._onRenderFilmCard = onRenderFilmCard;
  }

  init() {
    this._films.forEach(film => {
      this._renderFilmCard(this._container, film);
    });
  }

  render(films) {
    this.unrender();

    films.forEach(film => {
      this._renderFilmCard(this._container, film);
    });
  }

  unrender() {
    this._container.innerHTML = "";
  }

  _renderFilmCard(container, film) {
    const movieController = new MovieController(
      container,
      film,
      this._onFilmUpdate,
      this._onTogglePopup
    );

    movieController.init();
    this._onRenderFilmCard(movieController.closePopup.bind(movieController));
  }
}

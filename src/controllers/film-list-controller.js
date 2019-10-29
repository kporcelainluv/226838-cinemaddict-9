import { MovieController } from "./movie-controller";
import { ShowMoreButton } from "../components/showMoreBtn";
import { render } from "../utils";

export class FilmListController {
  constructor({
    container,
    films,
    onFilmUpdate,
    onTogglePopup,
    onRenderFilmCard,
    onClickShowMore,
    filmsAmount,
    type
  }) {
    this._container = container;
    this._films = films;
    console.log(this._films);
    this._type = type;
    this._filmsAmount = filmsAmount;

    this._onFilmUpdate = onFilmUpdate;
    this._onTogglePopup = onTogglePopup;
    this._onClickShowMore = onClickShowMore;
    this._onRenderFilmCard = onRenderFilmCard;
    this._showMoreBtn = new ShowMoreButton();
  }

  init() {
    this._films.forEach(film => {
      this._renderFilmCard(this._container, film);
    });

    if (this._type === `default` && this._films.length < this._filmsAmount) {
      render(this._container, this._showMoreBtn.getElement(), "beforeend");
      this._showMoreBtn.onClickShowMore(this._onClickShowMore);
    }
  }

  render(films) {
    this.unrender();

    films.forEach(film => {
      this._renderFilmCard(this._container, film);
    });
    console.log(this._films.length, this._filmsAmount);
    if (this._type === `default` && this._films.length < this._filmsAmount) {
      render(this._container, this._showMoreBtn.getElement(), "beforeend");
      this._showMoreBtn.onClickShowMore(this._onClickShowMore);
    }
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

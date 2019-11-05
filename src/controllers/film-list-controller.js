import { MovieController } from "./movie-controller";
import { ShowMoreButton } from "../components/showMoreBtn";
import { render } from "../utils";
import { PER_PAGE, POSITION } from "../consts";

const FILMS_DISPLAYED_INITIALLY = 5;

export class FilmListController {
  constructor({
    container,
    films,
    onFilmUpdate,
    onTogglePopup,
    onRenderFilmCard,
    type
  }) {
    this._container = container;

    this._films = films;
    this._type = type;
    this._filmsDisplayed = (() => {
      if (type === "default") return FILMS_DISPLAYED_INITIALLY;
      if (type === "search") return Number.MAX_SAFE_INTEGER;
      return 2;
    })();

    this._onFilmUpdate = onFilmUpdate;
    this._onTogglePopup = onTogglePopup;
    this._onRenderFilmCard = onRenderFilmCard;
    this._showMoreBtn = new ShowMoreButton();
  }

  init() {
    this.render(this._films);
  }

  render(films) {
    this.unrender();
    console.log({
      x: this._filmsDisplayed
    });

    films.slice(0, this._filmsDisplayed).forEach(film => {
      this._renderFilmCard(this._container, film);
    });

    if (films.length > this._filmsDisplayed && this._type === "default") {
      render(this._container, this._showMoreBtn.getElement(), "beforeend");
      const callback = () => {
        this._filmsDisplayed += PER_PAGE;
        this.render(this._films);
        this._showMoreBtn.removeOnShowMoreCallback(callback);
      };
      this._showMoreBtn.onClickShowMore(callback);
    }
  }

  renderX(films) {
    this._filmsDisplayed = FILMS_DISPLAYED_INITIALLY;
    this.render(films);
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

import { MovieController } from "./movie-controller";
import { ShowMoreButton } from "../components/showMoreBtn";
import { render } from "../utils";
import { PER_PAGE } from "../consts";

export class FilmListController {
  constructor({
    container,
    films,
    onFilmUpdate,
    onTogglePopup,
    onRenderFilmCard,
  }) {
    this._container = container;
    this._films = films;
    this._filmsDisplayed = 5;

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

    films.slice(0, this._filmsDisplayed).forEach(film => {
      this._renderFilmCard(this._container, film);
    });

    if (films.length > this._filmsDisplayed) {
      render(this._container, this._showMoreBtn.getElement(), "beforeend");
      const callback = () => {
        this._filmsDisplayed += PER_PAGE;
        this.render(this._films);
        this._showMoreBtn.removeOnShowMoreCallback(callback);
      };
      this._showMoreBtn.onClickShowMore(callback);
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

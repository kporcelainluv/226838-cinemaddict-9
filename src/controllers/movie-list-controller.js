import { RENDER_POSITION } from "../consts";
import { MovieController } from "./movie-controller";
import { render, unrender } from "../utils";
import { FilmsContainer } from "../components/film-containter";

import { AdditionalFilmList } from "../components/additionalFilmBlocks";
import { DefaultFilmList } from "../components/default-film-list";

const renderInside = (container, innerContainer) => {
  render(container, innerContainer.getElement(), `afterbegin`);
};

export class MovieListController {
  constructor({
    parent,
    onDataChange,
    renderPosition = RENDER_POSITION.DEFAULT
  }) {
    this._onDataChangeMain = onDataChange;
    this._renderPosition = renderPosition;

    this._films = [];
    this._subscriptions = [];

    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);

    const section = (() => {
      if (renderPosition === RENDER_POSITION.DEFAULT) {
        return new DefaultFilmList();
      }
      if (renderPosition === RENDER_POSITION.TOP_RATED) {
        return new AdditionalFilmList(`Top Rated`);
      }
      if (renderPosition === RENDER_POSITION.MOST_COMMENTED) {
        return new AdditionalFilmList(`Most Commented`);
      }
      return undefined;
    })();
    renderInside(parent, section);

    this._container = section.querySelector(".films-list__container");
  }

  renderFilms(films) {
    films.forEach(film => {
      this._renderFilmCard(this._container, film);
    });
  }

  unrenderFilms() {
    unrender(this._container);
  }

  showMoreFilms(films) {
    return films;
  }

  _renderFilmCard(container, film) {
    const movieController = new MovieController(
      container,
      film,
      this.onDataChange,
      this.onChangeView
    );

    movieController.init();
    this._subscriptions.push(movieController.closePopup.bind(movieController));
  }

  _onChangeView() {}

  _onDataChange() {}
}

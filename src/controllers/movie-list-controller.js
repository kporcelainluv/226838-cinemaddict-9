import { RENDER_POSITION } from "../consts";
import { MovieController } from "./movie-controller";
import { render, unrender } from "../utils";
import { FilmsContainer } from "../components/film-containter";

import { AdditionalFilmList } from "../components/additionalFilmBlocks";
import { DefaultFilmList } from "../components/default-film-list";
import { SearchResultHeading } from "../components/searchResultHeading";
import { EmptySearch } from "../components/emptySearch";

// const renderInside = (container, innerContainer) => {
//   render(container, innerContainer.getElement(), `afterbegin`);
// };

export class MovieListController {
  constructor(parent, onDataChange, renderPosition = RENDER_POSITION.DEFAULT) {
    this._onDataChangeMain = onDataChange;
    this._renderPosition = renderPosition;

    this._films = [];
    this._subscriptions = [];
    this._filmsContainer = parent;
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);

    // const section = (() => {
    //   if (renderPosition === RENDER_POSITION.DEFAULT) {
    //     return new DefaultFilmList();
    //   }
    //   if (renderPosition === RENDER_POSITION.TOP_RATED) {
    //     return new AdditionalFilmList(`Top Rated`);
    //   }
    //   if (renderPosition === RENDER_POSITION.MOST_COMMENTED) {
    //     return new AdditionalFilmList(`Most Commented`);
    //   }
    //   return undefined;
    // })();
    // renderInside(parent, section);

    // this._container = this._parent.querySelector(".films-list__container");

    this._searchResultHeading = new SearchResultHeading(this._films.length);
    this._emptySearch = new EmptySearch();
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

  removeSearchResultHeading() {
    if (this._filmsContainer.contains(this._searchResultHeading.getElement())) {
      unrender(this._searchResultHeading.getElement());
      this._searchResultHeading.removeElement();
    }

    if (this._filmsContainer.contains(this._emptySearch.getElement())) {
      unrender(this._emptySearch.getElement());
      this._emptySearch.removeElement();
    }
  }

  addSearchResultHeading(films) {
    this.removeSearchResultHeading();
    if (films.length > 0) {
      this._searchResultHeading = new SearchResultHeading(films.length);
      render(
        this._filmsContainer,
        this._searchResultHeading.getElement(),
        "afterbegin"
      );
    } else {
      render(
        this._filmsContainer,
        this._emptySearch.getElement(),
        "afterbegin"
      );
    }
  }
}

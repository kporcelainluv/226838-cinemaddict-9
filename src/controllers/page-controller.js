import { render, unrender } from "../components/utils";
import { MovieController } from "../controllers/movie-controller";
import { DefaultFilmList } from "../components/default-film-list";
import { FilmContainer } from "../components/film-containter";
import { ProfileRating } from "../components/profileRating";
import { SearchController } from "./search-controller";
import { SortController } from "./sort-controller";

const filterFilms = (films, query) => {
  // TODO: remove symbols with regexp
  const formattedQuery = query.toLowerCase();
  return films.filter(film => film.name.toLowerCase().includes(formattedQuery));
};

const sortByDefault = films => {
  return films.sort((a, b) => {
    return b.id - a.id;
  });
};

const sortByDate = films => {
  return films.sort((a, b) => {
    return parseInt(a.year, 10) - parseInt(b.year, 10);
  });
};

const sortByRating = films => {
  return films.sort((a, b) => {
    return parseInt(a.rating, 10) - parseInt(b.rating, 10);
  });
};

class PageController {
  constructor(headerContainer, container, films) {
    // TODO: remove header
    this._headerContainer = headerContainer;
    this._container = container;

    this._subscriptions = [];
    this._initialFilms = films;
    this._films = films;

    //
    this._filmsListBlock = new DefaultFilmList();

    this._filmsListContainer = this._filmsListBlock
      .getElement()
      .querySelector(`.films-list__container`);
    this._filmContainer = new FilmContainer();
    //

    this.onFilmUpdate = this.onFilmUpdate.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onTogglePopup = this.onTogglePopup.bind(this);

    this._profile = new ProfileRating();
    this._sort = new SortController(
      this._container,
      this._onSortTypeChange.bind(this)
    );
    this._search = new SearchController(
      this._headerContainer,
      this.onSearchChange
    );
  }

  init() {
    this._search.init();
    this._renderHeader();
    this._sort.init();

    render(this._container, this._filmContainer.getElement(), `beforeend`);

    render(
      this._filmContainer.getElement(),
      this._filmsListBlock.getElement(),
      `beforeend`
    );

    this._films.forEach(film => {
      this._renderFilmCard(this._filmsListContainer, film);
    });
  }

  _renderFilmCard(container, film) {
    const movieController = new MovieController(
      container,
      film,
      this.onFilmUpdate,
      this.onTogglePopup
    );

    movieController.init();
    this._subscriptions.push(movieController.closePopup.bind(movieController));
  }

  _unrenderFilmList() {
    unrender(this._filmsListBlock.getElement());
    this._filmsListBlock.removeElement();
  }

  onTogglePopup() {
    this._subscriptions.forEach(subscription => subscription());
  }

  onFilmUpdate(updatedFilm) {
    this._films = this._films.reduce((films, film) => {
      if (film.id === updatedFilm.id) {
        return [...films, updatedFilm];
      }
      return [...films, film];
    }, []);
    this._renderFilmsList(this._films);
  }

  onSearchChange(query) {
    if (query.length > 3) {
      this._films = filterFilms(this._films, query);
      this._renderFilmsList(this._films);
    } else if (query.length === 0) {
      this._films = this._initialFilms;
      this._renderFilmsList(this._films);
    }
  }

  _renderFilmsList(films) {
    this._unrenderFilmList();
    render(
      this._filmContainer.getElement(),
      this._filmsListBlock.getElement(),
      `afterbegin`
    );
    this._filmsListContainer = this._filmsListBlock
      .getElement()
      .querySelector(`.films-list__container`);
    films.forEach(film => {
      this._renderFilmCard(this._filmsListContainer, film);
    });
  }

  _onSortTypeChange(sortType) {
    if (sortType === `default`) {
      this._films = sortByDefault(this._films);
      this._renderFilmsList(this._films);
    } else if (sortType === `date`) {
      this._films = sortByDate(this._films);
      this._renderFilmsList(this._films);
    } else if (sortType === "rating") {
      this._films = sortByRating(this._films);
      this._renderFilmsList(this._films);
    }
  }

  _renderHeader() {
    const headerSearchHeading = document.createElement(`h1`);
    headerSearchHeading.className = `header__logo logo`;
    headerSearchHeading.innerHTML = `Cinemaddict`;
    render(this._headerContainer, headerSearchHeading, `afterbegin`);
    render(this._headerContainer, this._profile.getElement(), `beforeend`);
  }
}
export { PageController };

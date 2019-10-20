import { SortController } from "./sort-controller";
import { HeaderController } from "./header-controller";
import { FilmsController } from "./films-controller";

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

const updateFilms = (films, updatedFilm) => {
  return films.reduce((newFilms, film) => {
    if (film.id === updatedFilm.id) {
      return [...newFilms, updatedFilm];
    }
    return [...newFilms, film];
  }, []);
};

export class PageController {
  constructor(headerContainer, container, films) {
    this._container = container;

    this._films = films;
    this._initialFilms = films;

    this._sortController = new SortController(
      this._container,
      this._onSortTypeChange.bind(this)
    );
    this._headerController = new HeaderController({
      films,
      onSearchChange: this._onSearchChange.bind(this)
    });
    this._filmsController = new FilmsController({
      container: this._container,
      films,
      onFilmUpdate: this._onFilmUpdate.bind(this)
    });
  }

  init() {
    this._headerController.init();
    this._sortController.init();
    this._filmsController.init();
  }

  _onSearchChange(query) {
    if (query.length > 3) {
      this._films = filterFilms(this._films, query);
      this._filmsController.renderFilms(this._films);
    } else if (query.length === 0) {
      this._films = this._initialFilms;
      this._filmsController.renderFilms(this._films);
    }
  }

  _onSortTypeChange(sortType) {
    if (sortType === `default`) {
      this._films = sortByDefault(this._films);
      this._filmsController.renderFilms(this._films);
    } else if (sortType === `date`) {
      this._films = sortByDate(this._films);
      this._filmsController.renderFilms(this._films);
    } else if (sortType === `rating`) {
      this._films = sortByRating(this._films);
      this._filmsController.renderFilms(this._films);
    }
  }

  _onFilmUpdate(updatedFilm) {
    this._films = updateFilms(this._films, updatedFilm);
    this._filmsController.renderFilms(this._films);
  }
}

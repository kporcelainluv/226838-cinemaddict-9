import { SortController } from "./sort-controller";
import { HeaderController } from "./header-controller";
import { FilmsController } from "./films-controller";
import {
  NavigationController,
  getFavorite,
  getWatched,
  getWatchlist
} from "./navigation-controller";
import { NAV_TAB, SORT_TYPE } from "../consts";
import { SearchResultContoller } from "./search-result";
import { StatsController } from "../controllers/stats-controller";

const filterFilms = (films, query) => {
  // TODO: remove symbols with regexp
  const formattedQuery = query.toLowerCase();
  return films.filter(film => film.name.toLowerCase().includes(formattedQuery));
};

const sortByDefault = films => {
  return films.sort((a, b) => {
    if (a.id > b.id) {
      return 1;
    } else if (a.id < b.id) {
      return -1;
    }
    return 0;
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
    this._allFilms = films;
    this._currentTab = NAV_TAB.ALL;

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
    this._navigationController = new NavigationController(
      this._container,
      this._films,
      this.onNavigationChange.bind(this)
    );

    this._searchResultContoller = new SearchResultContoller({
      container: this._container,
      films: this._films,
      onFilmUpdate: this._onFilmUpdateSearchResult.bind(this)
    });

    this._stats = new StatsController(this._container, this._films);
  }

  init() {
    this._headerController.init();
    this._sortController.init();
    this._navigationController.init();
    this._filmsController.init();
    this._searchResultContoller.init();
    this._stats.init();
  }

  _onSearchChange(query) {
    if (query.length > 3) {
      this._films = filterFilms(this._films, query);
      this._filmsController.hide();
      this._sortController.hide();
      this._navigationController.hide();
      this._searchResultContoller.render(this._films);
    } else if (query.length === 0) {
      this._films = this._allFilms;
      this._sortController.show();
      this._navigationController.show();
      this._searchResultContoller.unrender();
      this._filmsController.show();
      this._filmsController.render(this._films);
    }
  }

  onNavigationChange(navTab) {
    this._currentTab = navTab;

    if (navTab === NAV_TAB.ALL) {
      this._films = this._allFilms;
      this._stats.unrender();
      this._sortController.show();
      this._filmsController.show();
      this._filmsController.render(this._films);
    } else if (navTab === NAV_TAB.WATCHLIST) {
      this._stats.unrender();
      this._sortController.show();
      this._filmsController.show();
      this._films = getWatchlist(this._allFilms);
      this._filmsController.render(this._films);
    } else if (navTab === NAV_TAB.HISTORY) {
      this._stats.unrender();
      this._sortController.show();
      this._filmsController.show();
      this._films = getWatched(this._allFilms);
      this._filmsController.render(this._films);
    } else if (navTab === NAV_TAB.FAVOTITES) {
      this._stats.unrender();
      this._sortController.show();
      this._filmsController.show();
      this._films = getFavorite(this._allFilms);
      this._filmsController.render(this._films);
    } else if (navTab === NAV_TAB.STATS) {
      this._filmsController.hide();
      this._sortController.hide();
      this._stats.render();
    }
  }

  _onSortTypeChange(sortType) {
    if (sortType === SORT_TYPE.DEFAULT) {
      this._films = sortByDefault(this._films);
      this._filmsController.render(this._films);
    } else if (sortType === SORT_TYPE.DATE) {
      this._films = sortByDate(this._films);
      this._filmsController.render(this._films);
    } else if (sortType === SORT_TYPE.RATING) {
      this._films = sortByRating(this._films);
      this._filmsController.render(this._films);
    }
  }

  _onFilmUpdateSearchResult(updatedFilm) {
    this._films = updateFilms(this._films, updatedFilm);
    this._allFilms = updateFilms(this._allFilms, updatedFilm);

    this._searchResultContoller.render(this._films);
  }

  _onFilmUpdate(updatedFilm) {
    this._films = updateFilms(this._films, updatedFilm);
    this._allFilms = updateFilms(this._allFilms, updatedFilm);
    this._filmsController.render(this._films);
    this._navigationController.render(this._allFilms, this._currentTab);
  }
}

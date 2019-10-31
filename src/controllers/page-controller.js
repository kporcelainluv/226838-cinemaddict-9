import { difference } from "ramda";

import { SortController } from "./sort-controller";
import { HeaderController } from "./header-controller";
import { FilmsController } from "./films-controller";
import { FooterController } from "./footer-controller";
import {
  NavigationController,
  getFavorite,
  getWatched,
  getWatchlist
} from "./navigation-controller";
import { NAV_TAB, SORT_TYPE, UPDATE_TYPE } from "../consts";
import { SearchResultContoller } from "./search-result";
import { StatsController } from "../controllers/stats-controller";

const filterFilms = (films, query) => {
  const formattedQuery = query.toLowerCase().replace(/[^A-Z0-9]+/gi, ``);
  return films.filter(film =>
    film.film_info.title.toLowerCase().includes(formattedQuery)
  );
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
    return (
      parseInt(a.film_info.release.date, 10) -
      parseInt(b.film_info.release.date, 10)
    );
  });
};

const sortByRating = films => {
  return films.sort((a, b) => {
    return (
      parseInt(a.film_info.total_rating, 10) -
      parseInt(b.film_info.total_rating, 10)
    );
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
  constructor(headerContainer, container, films, api) {
    this._container = container;
    this._api = api;
    this._perPage = 5;

    this._films = sortByDefault(films).slice(0, this._perPage);
    this._allFilms = sortByDefault(films);
    this._currentTab = NAV_TAB.ALL;

    this._sortController = new SortController(
      this._container,
      this._onSortTypeChange.bind(this)
    );
    this._headerController = new HeaderController({
      films: this._allFilms,
      onSearchChange: this._onSearchChange.bind(this)
    });
    this._filmsController = new FilmsController({
      container: this._container,
      onFilmUpdate: this._onFilmUpdate.bind(this),
      onClickShowMore: this._onClickShowMore.bind(this)
    });
    this._navigationController = new NavigationController(
      this._container,
      this._allFilms,
      this.onNavigationChange.bind(this)
    );

    this._searchResultContoller = new SearchResultContoller({
      container: this._container,
      films: this._allFilms,
      onFilmUpdate: this._onFilmUpdateSearchResult.bind(this)
    });

    this._stats = new StatsController(this._container, this._allFilms);
    this._footer = new FooterController(this._allFilms);
  }

  init() {
    this._headerController.init();
    this._filmsController.init();
    this._sortController.init();
    this._navigationController.init();
  }

  initWithFilms(films) {
    this._films = sortByDefault(films).slice(0, this._perPage);
    this._allFilms = sortByDefault(films);

    this._filmsController.initWithFilms(this._films, this._allFilms);
    this._headerController.initProfileStats(this._allFilms);
    this._navigationController.initWithFilms(this._allFilms);
    this._searchResultContoller.init(this._allFilms);
    this._stats.init(this._allFilms);
    this._footer.init(this._allFilms);
  }
  renderEmptyFilmList() {
    this._filmsController.renderEmptyFilms();
  }

  _onSearchChange(query) {
    if (query.length > 3) {
      this._films = filterFilms(this._allFilms, query);
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
      this._films = this._allFilms.slice(0, this._perPage);
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

  _onFilmUpdate(updatedFilm, meta) {
    const { updateType, onSuccess, onError } = meta;

    const rerender = newFilm => {
      this._films = updateFilms(this._films, newFilm);
      this._allFilms = updateFilms(this._allFilms, newFilm);

      this._filmsController.render(this._films);
      this._navigationController.render(this._allFilms, this._currentTab);
    };

    if (updateType === UPDATE_TYPE.DELETE_COMMENT) {
      const deletedComment = difference(
        this._films.find(f => f.id === updatedFilm.id).comments,
        updatedFilm.comments
      )[0];
      return this._api
        .deleteComment({ comment: deletedComment })
        .then(() => rerender(updatedFilm))
        .then(() => onSuccess())
        .catch(() => onError());
    } else if (updateType === UPDATE_TYPE.UPDATE_USER_INFO) {
      return this._api
        .updateFilm({ film: updatedFilm })
        .then(() => rerender(updatedFilm));
    } else if (updateType === UPDATE_TYPE.CREATE_COMMENT) {
      const createdComment = difference(
        updatedFilm.comments,
        this._films.find(f => f.id === updatedFilm.id).comments
      )[0];
      return this._api
        .createComment({
          film: updatedFilm,
          comment: createdComment
        })
        .then(({ comments }) => {
          updatedFilm.comments = comments;
          onSuccess(comments);
          rerender(updatedFilm);
        })
        .catch(() => onError());
    }
  }

  _onClickShowMore() {
    this._perPage += 5;
    this._films = this._allFilms.slice(0, this._perPage);
    this._filmsController.render(this._films);
  }
}

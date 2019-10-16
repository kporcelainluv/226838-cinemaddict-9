import { render, unrender } from "../components/utils";
import { MainSorting } from "../components/mainSorting";
import { MovieController } from "../controllers/movie-controller";
import { DefaultFilmList } from "../components/default-film-list";
import { FilmContainer } from "../components/film-containter";
import { AdditionalFilmList } from "../components/additionalFilmBlocks";
import { ShowMoreButton } from "../components/showMoreBtn";
import { MainNav } from "../components/mainFilter";
import { Search } from "../components/search";
import { SearchResult } from "../components/searchResult";
import { ProfileRating } from "../components/profileRating";
import { SearchController } from "./search-controller";
import { Statistics } from "../components/statistics";
import { MovieListController } from "./movie-list-controller";
import { RENDER_POSITION } from "../consts";

const filterFilms = (films, query) => {
  // TODO: remove symbols with regexp
  const formattedQuery = query.toLowerCase();
  return films.filter(film => film.name.toLowerCase().includes(formattedQuery));
};

class PageController {
  constructor(headerContainer, container, films) {
    this._headerContainer = headerContainer;
    this._container = container;
    this._subscriptions = [];
    this._initialFilms = films;
    this._films = films;
    this._filmsListBlock = new DefaultFilmList();
    this._filmsListContainer = this._filmsListBlock
      .getElement()
      .querySelector(`.films-list__container`);
    // this._filmContainer = new FilmContainer();
    this._sort = new MainSorting();
    this.onDataChange = this.onDataChange.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onChangeView = this.onChangeView.bind(this);
    this._topRatedBlock = new AdditionalFilmList(`Top Rated`);
    this._showMoreBtn = new ShowMoreButton();
    this._mostCommentedBlock = new AdditionalFilmList(`Most Commented`);
    this._search = new Search(); //search input
    this._headerProfileRating = new ProfileRating();
    this._SearchController = new SearchController(
      this._headerContainer,
      this._films,
      this._search,
      this.onSearchChange
    );
    this._movies = new MovieListController(
      this._filmsListContainer,
      this.onDataChange,
      RENDER_POSITION.DEFAULT
    );
    this._SearchController.init();
  }

  init() {
    this._renderHeader();
    render(this._container, this._sort.getElement(), `afterbegin`);

    render(this._container, this._filmContainer.getElement(), `beforeend`);
    render(
      this._filmContainer.getElement(),
      this._filmsListBlock.getElement(),
      `beforeend`
    );

    this._films.forEach(film => {
      this._renderFilmCard(this._filmsListContainer, film);
    });
    render(
      this._filmContainer.getElement(),
      this._showMoreBtn.getElement(),
      `beforeend`
    );

    this._sort
      .getElement()
      .addEventListener(`click`, evt => this._onSortLinkClick(evt));
  }

  _renderFilmCard(container, film) {
    const movieController = new MovieController(
      container,
      film,
      this.onDataChange,
      this.onChangeView
    );

    movieController.init();
    this._subscriptions.push(
      movieController.setDefaultView.bind(movieController)
    );
  }

  _unrenderFilmList() {
    unrender(this._filmsListBlock.getElement());
    this._filmsListBlock.removeElement();
  }

  onChangeView() {
    this._subscriptions.forEach(subscription => subscription());
  }
  onDataChange(updatedFilm) {
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
  _sortedByDefault(films) {
    return films.sort((a, b) => {
      return b.id - a.id;
    });
  }
  _sortedByDateFilms(films) {
    return films.sort((a, b) => {
      return parseInt(a.year, 10) - parseInt(b.year, 10);
    });
  }
  _sortedByRatingFilms(films) {
    return films.sort((a, b) => {
      return parseInt(a.rating, 10) - parseInt(b.rating, 10);
    });
  }
  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }
    switch (evt.target.dataset.sortType) {
      case `default`:
        this._films = this._sortedByDefault(this._films);
        this._renderFilmsList(this._films);
        break;
      case `date`:
        this._films = this._sortedByDateFilms(this._films);
        this._renderFilmsList(this._films);
        break;

      case `rating`:
        this._films = this._sortedByRatingFilms(this._films);
        this._renderFilmsList(this._films);
        break;
    }
  }
  hide() {
    this._filmContainer.getElement().classList.add(`visually-hidden`);
    this._sort.getElement().classList.add(`visually-hidden`);
  }

  show() {
    this._filmContainer.getElement().classList.remove(`visually-hidden`);
    this._sort.getElement().classList.remove(`visually-hidden`);
  }
  _renderHeader() {
    const headerSearchHeading = document.createElement(`h1`);
    headerSearchHeading.className = `header__logo logo`;
    headerSearchHeading.innerHTML = `Cinemaddict`;
    render(this._headerContainer, headerSearchHeading, `afterbegin`);
    render(this._headerContainer, this._search.getElement(), `beforeend`);
    render(
      this._headerContainer,
      this._headerProfileRating.getElement(),
      `beforeend`
    );
  }
}
export { PageController };

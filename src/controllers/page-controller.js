import { render, unrender } from "../components/utils";
import { MainSorting } from "../components/mainSorting";
import { MovieController } from "../controllers/movie-controller";
import { FilmsList } from "../components/films-list";
import { FilmContainer } from "../components/film-containter";
import { AdditionalFilmBlock } from "../components/additionalFilmBlocks";
import { ShowMoreButton } from "../components/showMoreBtn";
import { MainNav } from "../components/mainFilter";

class PageController {
  constructor(container, films) {
    this._container = container;
    this._subscriptions = [];
    this._films = films;
    this._filmsListBlock = new FilmsList();
    this._filmsListContainer = this._filmsListBlock
      .getElement()
      .querySelector(`.films-list__container`);
    this._filmContainer = new FilmContainer();
    this._sort = new MainSorting();
    this._mainNav = new MainNav();
    this.onDataChange = this.onDataChange.bind(this);
    this.onChangeView = this.onChangeView.bind(this);
    this._topRatedBlock = new AdditionalFilmBlock(`Top Rated`);
    this._showMoreBtn = new ShowMoreButton();
    this._mostCommentedBlock = new AdditionalFilmBlock(`Most Commented`);
  }
  init() {
    render(this._container, this._sort.getElement(), `afterbegin`);
    render(this._container, this._mainNav.getElement(), `afterbegin`);

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
    render(
      this._filmContainer.getElement(),
      this._topRatedBlock.getElement(),
      `beforeend`
    );
    render(
      this._filmContainer.getElement(),
      this._mostCommentedBlock.getElement(),
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
    // TODO: move to method
    this._renderFilmsList();
  }
  _renderFilmsList() {
    this._unrenderFilmList();
    render(
      this._filmContainer.getElement(),
      this._filmsListBlock.getElement(),
      `afterbegin`
    );
    this._filmsListContainer = this._filmsListBlock
      .getElement()
      .querySelector(`.films-list__container`);
    this._films.forEach(film => {
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
        this._renderFilmsList();
        break;
      case `date`:
        this._films = this._sortedByDateFilms(this._films);
        this._renderFilmsList();
        break;

      case `rating`:
        this._films = this._sortedByRatingFilms(this._films);
        this._renderFilmsList();
        break;
    }
  }
}
export { PageController };

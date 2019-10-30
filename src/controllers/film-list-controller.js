import { MovieController } from "./movie-controller";
import { ShowMoreButton } from "../components/showMoreBtn";
import { render } from "../utils";

const getTopRatedFilms = films => {
  if (films.every(film => film.film_info.total_rating === 0)) {
    return false;
  }
  return films
    .sort((a, b) => {
      if (a.film_info.total_rating > b.film_info.total_rating) {
        return -1;
      }
      if (a.film_info.total_rating < b.film_info.total_rating) {
        return 1;
      }
      return 0;
    })
    .slice(0, 2);
};

const getMostCommentedFilms = films => {
  if (films.every(film => film.comments.length === 0)) {
    return false;
  }
  return films
    .sort((a, b) => {
      if (a.comments > b.comments) {
        return -1;
      }
      if (a.comments < b.comments) {
        return 1;
      }
      return 0;
    })
    .slice(0, 2);
};

export class FilmListController {
  constructor({
    container,
    films,
    onFilmUpdate,
    onTogglePopup,
    onRenderFilmCard,
    onClickShowMore,
    filmsAmount,
    type
  }) {
    this._container = container;
    this._films = films;
    this._type = type;
    this._filmsAmount = filmsAmount || 0;

    this._onFilmUpdate = onFilmUpdate;
    this._onTogglePopup = onTogglePopup;
    this._onClickShowMore = onClickShowMore;
    this._onRenderFilmCard = onRenderFilmCard;
    this._showMoreBtn = new ShowMoreButton();
  }

  init() {
    if (this._type === `rated`) {
      this._films = getTopRatedFilms(this._films);

      if (this._films) {
        this._films.forEach(film => {
          this._renderFilmCard(this._container, film);
        });
      }
    }

    if (this._type === `commented`) {
      this._films = getMostCommentedFilms(this._films);
      if (this._films) {
        this._films.forEach(film => {
          this._renderFilmCard(this._container, film);
        });
      }
    }

    if (this._type === `default`) {
      console.log("def", this._films);
      this._films.forEach(film => {
        this._renderFilmCard(this._container, film);
      });
      if (this._films.length < this._filmsAmount) {
        render(this._container, this._showMoreBtn.getElement(), "beforeend");
        this._showMoreBtn.onClickShowMore(this._onClickShowMore);
      }
    }
  }

  render(films) {
    this.unrender();
    if (this._type === `rated`) {
      this._films = getTopRatedFilms(films);
      if (this._films) {
        this._films.forEach(film => {
          this._renderFilmCard(this._container, film);
        });
      }
    }

    if (this._type === `commented`) {
      this._films = getMostCommentedFilms(films);
      if (this._films) {
        this._films.forEach(film => {
          this._renderFilmCard(this._container, film);
        });
      }
    }

    if (this._type === `default`) {
      films.forEach(film => {
        this._renderFilmCard(this._container, film);
      });
      if (films.length < this._filmsAmount) {
        render(this._container, this._showMoreBtn.getElement(), "beforeend");
        this._showMoreBtn.onClickShowMore(this._onClickShowMore);
      }
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

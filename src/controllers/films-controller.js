import { render } from "../utils";
import { DefaultFilmList } from "../components/default-film-list";
import { FilmsContainer } from "../components/film-containter";
import { FilmListController } from "./film-list-controller";
import { AdditionalFilmList } from "../components/additionalFilmBlocks";

export class FilmsController {
  constructor({
    container,
    films,
    onFilmUpdate,
    onClickShowMore,
    filmsAmount
  }) {
    this._container = container;
    this._subscriptions = [];
    this._filmsContainer = new FilmsContainer();
    this._defaultFilmList = new DefaultFilmList();

    this._topRatedList = new AdditionalFilmList(`Top Rated`);
    this._mostCommentedList = new AdditionalFilmList(`Most Commented`);

    this._onTogglePopup = this._onTogglePopup.bind(this);
    this._onRenderFilmCard = this._onRenderFilmCard.bind(this);

    this._defaultFilmListController = new FilmListController({
      container: this._defaultFilmList.getElementToRenderFilmsTo(),
      films,
      onFilmUpdate,
      onTogglePopup: this._onTogglePopup,
      onRenderFilmCard: this._onRenderFilmCard,
      onClickShowMore,
      filmsAmount,
      type: `default`
    });

    this._ratedFilmListController = new FilmListController({
      container: this._topRatedList.getElementToRenderFilmsTo(),
      films,
      onFilmUpdate,
      onTogglePopup: this._onTogglePopup,
      onRenderFilmCard: this._onRenderFilmCard,
      onClickShowMore,
      type: `rated`
    });

    this._commentedFilmListController = new FilmListController({
      container: this._mostCommentedList.getElementToRenderFilmsTo(),
      films,
      onFilmUpdate,
      onTogglePopup: this._onTogglePopup,
      onRenderFilmCard: this._onRenderFilmCard,
      onClickShowMore,
      type: `commented`
    });
  }

  init() {
    render(this._container, this._filmsContainer.getElement(), `beforeend`);

    render(
      this._filmsContainer.getElement(),
      this._defaultFilmList.getElement(),
      `beforeend`
    );
    render(
      this._filmsContainer.getElement(),
      this._topRatedList.getElement(),
      `beforeend`
    );
    render(
      this._filmsContainer.getElement(),
      this._mostCommentedList.getElement(),
      `beforeend`
    );

    this._defaultFilmListController.init();
    this._ratedFilmListController.init();
    this._commentedFilmListController.init();
  }

  render(films) {
    this._unrenderFilmList();

    this._defaultFilmListController.render(films);
    this._ratedFilmListController.render(films);
    this._commentedFilmListController.render(films);
  }

  _onTogglePopup() {
    this._subscriptions.forEach(subscription => subscription());
  }

  _onRenderFilmCard(closePopup) {
    this._subscriptions.push(closePopup);
  }

  _unrenderFilmList() {
    this._defaultFilmListController.unrender();
  }
  hide() {
    this._filmsContainer.hide();
  }
  show() {
    this._filmsContainer.show();
  }
}

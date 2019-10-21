import { render } from "../utils";
import { DefaultFilmList } from "../components/default-film-list";
import { FilmsContainer } from "../components/film-containter";
import { FilmListController } from "./film-list-controller";

export class FilmsController {
  constructor({ container, films, onFilmUpdate }) {
    this._container = container;
    this._subscriptions = [];

    this._filmsContainer = new FilmsContainer();
    this._defaultFilmList = new DefaultFilmList();

    this._onTogglePopup = this._onTogglePopup.bind(this);
    this._onRenderFilmCard = this._onRenderFilmCard.bind(this);

    this._defaultFilmListController = new FilmListController({
      container: this._defaultFilmList.getElementToRenderFilmsTo(),
      films,
      onFilmUpdate,
      onTogglePopup: this._onTogglePopup,
      onRenderFilmCard: this._onRenderFilmCard
    });
  }

  init() {
    render(this._container, this._filmsContainer.getElement(), `beforeend`);

    render(
      this._filmsContainer.getElement(),
      this._defaultFilmList.getElement(),
      `beforeend`
    );

    this._defaultFilmListController.init();
  }

  render(films) {
    this._unrenderFilmList();

    this._defaultFilmListController.render(films);
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
}

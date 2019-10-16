import { RENDER_POSITION } from "../consts";

export class MovieListController {
  constructor({
    container,
    onDataChange,
    renderPosition = RENDER_POSITION.DEFAULT
  }) {
    this._container = container;
    this._onDataChangeMain = onDataChange;
    this._renderPosition = renderPosition;

    this._films = [];
    this._subscriptions = [];

    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  renderFilms() {}

  showMoreFilms() {}

  _renderFilmCard() {}

  _onChangeView() {}

  _onDataChange() {}
}

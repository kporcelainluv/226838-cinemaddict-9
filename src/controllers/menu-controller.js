import { MainNav } from "../components/mainFilter";
import { render, Position } from "../components/utils";

class MenuController {
  constructor(container, redneredFilms) {
    this._container = container;
    this._data = null;
    this._mainNav = new MainNav();
    this._renderedFilmsContainer = redneredFilms; //film-list
  }
  init() {
    render(this._container, this._mainNav.getElement(), Position.AFTERBEGIN);
    this._mainNav
      .getElement()
      .addEventListener(`click`, evt => this._onSortLinkClick(evt));
  }
  _onSortLinkClick(evt) {
    evt.preventDefault();
    if (evt.target.tagName !== `A`) {
      return;
    }
  }
}
export { MenuController };

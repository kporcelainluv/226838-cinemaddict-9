import { render, unrender } from "../utils";
import { Navigation } from "../components/navigation";

export const getWatched = films =>
  films.filter(element => element.user_details.already_watched);
export const getWatchlist = films =>
  films.filter(element => element.user_details.watchlist);
export const getFavorite = films =>
  films.filter(element => element.user_details.favorite);

export class NavigationController {
  constructor(container, films, onNavigationChange) {
    this._onNavigationChange = onNavigationChange;
    this._container = container;
    this._films = films;

    this._navigation = new Navigation(
      getWatched(this._films).length,
      getWatchlist(this._films).length,
      getFavorite(this._films).length
    );
  }

  init() {
    render(this._container, this._navigation.getElement(), "afterbegin");
    this._navigation.addCallbackOnNavigationItem(hash => {
      this._navigation.makeBtnActive(hash);
      this._onNavigationChange(hash);
    });
  }
  render(films, tab) {
    unrender(this._navigation.getElement());
    this._navigation.removeElement();

    this._navigation = new Navigation(
      getWatched(films).length,
      getWatchlist(films).length,
      getFavorite(films).length
    );
    this.init();
    this._navigation.makeBtnActive(tab);
  }
  hide() {
    this._navigation.hide();
  }
  show() {
    this._navigation.show();
  }
}

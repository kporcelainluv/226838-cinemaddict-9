import { render } from "../utils";
import { Navigation } from "../components/navigation";

export const getWatched = films => films.filter(element => element.isWatched);
export const getWatchlist = films => films.filter(element => element.isWatchlist);
export const getFavorite = films => films.filter(element => element.isFavorite);

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
}

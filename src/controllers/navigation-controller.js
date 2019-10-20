import { render } from "../utils";
import { Navigation } from "../components/navigation";

const countTabAmount = films => {
  let historyAmount = [];
  let watchlistAmount = [];
  let favoriteAmount = [];

  films.forEach(element => {
    if (element.isWatched === true) {
      historyAmount = [...historyAmount, element];
    }
    if (element.isWatchlist === true) {
      watchlistAmount = [...watchlistAmount, element];
    }
    if (element.isFavorite === true) {
      favoriteAmount = [...favoriteAmount, element];
    }
  });

  return [historyAmount, watchlistAmount, favoriteAmount];
};

export class NavigationController {
  constructor(container, films) {
    // this._onNavigationChange = onNavigationChange;
    this._container = container;
    this._films = films;
    [
      this._historyAmount,
      this._watchlistAmount,
      this._favoriteAmount
    ] = countTabAmount(this._films);

    this._navigation = new Navigation(
      this._historyAmount.length,
      this._watchlistAmount.length,
      this._favoriteAmount.length
    );
  }

  init() {
    render(this._container, this._navigation.getElement(), "afterbegin");
    this._navigation.addCallbackOnNavigationItem(hash => {
      this._navigation.makeBtnActive(hash);
    });
  }
}

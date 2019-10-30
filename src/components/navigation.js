import { AbstractComponent } from "./abstractComponent";
import { NAV_TAB } from "../consts";

export class Navigation extends AbstractComponent {
  constructor(historyAmount, watchlistAmount, favoritesAmount) {
    super();
    this._watchlistAmount = watchlistAmount;
    this._historyAmount = historyAmount;
    this._favoritesAmount = favoritesAmount;
  }
  getTemplate() {
    return `<nav class="main-navigation">
    <a href="${NAV_TAB.ALL}" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="${NAV_TAB.WATCHLIST}" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${this._watchlistAmount}</span></a>
    <a href="${NAV_TAB.HISTORY}" class="main-navigation__item">History <span class="main-navigation__item-count">${this._historyAmount}</span></a>
    <a href="${NAV_TAB.FAVOTITES}" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${this._favoritesAmount}</span></a>
    <a href="${NAV_TAB.STATS}" class="main-navigation__item main-navigation__item--additional">Stats</a>
  </nav>`;
  }
  addCallbackOnNavigationItem(callback) {
    const navItems = this.getElement().querySelectorAll(
      `.main-navigation__item`
    );
    navItems.forEach(element => {
      element.addEventListener("click", event =>
        callback(event.target.getAttribute("href"))
      );
    });
  }
  makeBtnActive(hash) {
    this.getElement()
      .querySelector(`.main-navigation__item--active`)
      .classList.remove(`main-navigation__item--active`);

    const navTabs = this.getElement().querySelectorAll(
      `.main-navigation__item`
    );
    const node = Array.from(navTabs).filter(
      element => element.getAttribute("href") === hash
    )[0];
    console.log(hash);
    node.classList.add(`main-navigation__item--active`);
  }
  hide() {
    this.getElement().classList.add(`visually-hidden`);
  }
  show() {
    this.getElement().classList.remove(`visually-hidden`);
  }
}

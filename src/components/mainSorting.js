import { createElement } from "./utils";

class MainSorting {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return `<ul class="sort"><li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`;
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }
}

export { MainSorting };
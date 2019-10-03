import { createElement } from "./utils";

class FilmContainer {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return `<section class="films"></section>`;
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }
}

export { FilmContainer };

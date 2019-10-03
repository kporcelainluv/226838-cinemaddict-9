import { createElement } from "./utils";

class FilmsList {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container">
      </div>
      </section>
  `;
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }
}

export { FilmsList };

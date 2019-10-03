import { createElement } from "./utils";
class additionalFilmBlock {
  constructor(blockName) {
    this._element = null;
    this._blockName = blockName;
  }

  getTemplate() {
    return `<section class="films-list--extra">
      <h2 class="films-list__title">${this._blockName}</h2>
      <div class="films-list__container"></div>
        </section>`;
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
}
export { additionalFilmBlock };

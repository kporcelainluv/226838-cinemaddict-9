import { AbstractComponent } from "./abstractComponent";
class AdditionalFilmBlock extends AbstractComponent {
  constructor(blockName) {
    super();
    this._blockName = blockName;
  }
  getTemplate() {
    return `<section class="films-list--extra">
      <h2 class="films-list__title">${this._blockName}</h2>
      <div class="films-list__container"></div>
        </section>`;
  }
}
export { AdditionalFilmBlock };

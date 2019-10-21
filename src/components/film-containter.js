import { AbstractComponent } from "./abstractComponent";

export class FilmsContainer extends AbstractComponent {
  constructor() {
    super();
  }
  getTemplate() {
    return `<section class="films"></section>`;
  }
  getFilmContainer() {
    this.getElement().querySelector(`.films`);
  }
}

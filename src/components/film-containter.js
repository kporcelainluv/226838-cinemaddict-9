import { AbstractComponent } from "./abstractComponent";

class FilmContainer extends AbstractComponent {
  constructor() {
    super();
  }
  getTemplate() {
    return `<section class="films"></section>`;
  }
}

export { FilmContainer };

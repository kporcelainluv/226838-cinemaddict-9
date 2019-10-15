import { AbstractComponent } from "./abstractComponent";
class EmptySearch extends AbstractComponent {
  constructor(result) {
    super();
    this._result = result;
  }
  getTemplate() {
    // <section class="films-list">
    return `<div class="no-result">
        There are no movies per your request.
      </div>`;
  }
}
export { EmptySearch };

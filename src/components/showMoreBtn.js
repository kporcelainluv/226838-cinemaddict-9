import { AbstractComponent } from "./abstractComponent";
class ShowMoreButton extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<button class="films-list__show-more">Show more</button>`;
  }
  onClickShowMore(callback) {
    this.getElement().addEventListener("click", callback);
  }
}
export { ShowMoreButton };

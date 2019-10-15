import { AbstractComponent } from "./abstractComponent";
class SearchResult extends AbstractComponent {
  constructor(result) {
    super();
    this._result = result;
  }
  getTemplate() {
    return `<div class="result">
    <p class="result__text">Result <span class="result__count">${this._result}</span></p>
  </div>`;
    //section films
  }
}
export { SearchResult };

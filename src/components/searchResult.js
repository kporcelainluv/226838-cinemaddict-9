import { AbstractComponent } from "./abstractComponent";

export class SearchResult extends AbstractComponent {
  constructor(count) {
    super();
    this._result = count;
  }
  getTemplate() {
    return `<div class="result">
    <p class="result__text">Result <span class="result__count">${this._result}</span></p>
  </div>`;
  }
}

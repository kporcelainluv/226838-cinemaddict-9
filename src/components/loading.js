import { AbstractComponent } from "./abstractComponent";
export class Loading extends AbstractComponent {
  constructor() {
    super();
  }
  getTemplate() {
    return `<h1 class="loading">Loading...</h1>`;
  }
}

import { Search } from "../components/search";
import { render } from "../utils";

export class SearchController {
  constructor(container, onSearchChange) {
    this._search = new Search();
    this._onSearchChange = onSearchChange;
    this._container = container;
  }

  init() {
    render(this._container, this._search.getElement(), "beforeend");

    this._search.addCallbackOnInputChange(evt => {
      this._onSearchChange(evt.target.value);
    });
  }
}

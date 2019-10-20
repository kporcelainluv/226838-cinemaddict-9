import { render } from "../utils";
import { Sort } from "../components/sort";

export class SortController {
  constructor(container, onSortChange) {
    this._sort = new Sort();
    this._onSortChange = onSortChange;
    this._container = container;
  }

  init() {
    render(this._container, this._sort.getElement(), "afterbegin");
    this._sort.addCallbackOnSortBtnClick(evt => {
      evt.preventDefault();
      const type = evt.target.dataset.sortType;
      this._sort.makeBtnActiveByType(type);
      this._onSortChange(type);
    });
  }
}

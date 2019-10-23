import { render, unrender } from "../utils";
import { StatsList } from "../components/statsList";

export class StatsListController {
  constructor(container) {
    this._container = container;
    this._statsList = new StatsList();
  }
  render() {
    render(
      this._container.getElement(),
      this._statsList.getElement(),
      "beforeend"
    );
  }

  unrender() {
    if (this._container.getElement().contains(this._statsList.getElement())) {
      unrender(this._statsList.getElement());
      this._statsList.removeElement();
    }
  }
}

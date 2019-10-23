import { StatsFilters } from "../components/statsFilters";
import { render, unrender } from "../utils";

export class StatsFiltersController {
  constructor(container, onTabChange) {
    this._container = container;
    this._statsFilters = new StatsFilters();
    this.onTabChange = onTabChange;
  }
  render() {
    render(
      this._container.getElement(),
      this._statsFilters.getElement(),
      "beforeend"
    );
    this.getActiveTab();
  }
  getActiveTab() {
    this._statsFilters.onAddListenersOnFilters(evt => {
      this.onTabChange(evt.target.value);
    });
  }
  unrender() {
    if (
      this._container.getElement().contains(this._statsFilters.getElement())
    ) {
      unrender(this._statsFilters.getElement());
      this._statsFilters.removeElement();
    }
  }
}

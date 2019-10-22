import { StatsFilters } from "../components/statsFilters";
import { render, unrender } from "../utils";

export class StatsFiltersController {
  constructor(container) {
    this._container = container;
    this._statsFilters = new StatsFilters();
  }
  render() {
    render(
      this._container.getElement(),
      this._statsFilters.getElement(),
      "beforeend"
    );
    this.getPressedTabName();
  }
  getPressedTabName() {
    this._statsFilters.onAddListenersOnFilters(evt => {
      console.log(evt.target.value);
      const activeStatsTab = evt.target.value;
      return activeStatsTab;
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

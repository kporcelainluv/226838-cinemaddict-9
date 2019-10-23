import { render, unrender } from "../utils";
import { StatsSummary } from "../components/statsSummary";

export class StatsSummaryController {
  constructor(container) {
    this._container = container;
    this._statsList = new StatsSummary({});
  }

  render(summaryData) {
    this.unrender();

    this._statsList = new StatsSummary(summaryData);
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

import { render, unrender } from "../utils";
import { StatsSummary } from "../components/statsSummary";

export class StatsSummaryController {
  constructor(container, summaryData) {
    this._container = container;
    this._summaryData = summaryData;
    this._statsList = new StatsSummary(this._summaryData);
  }

  updateSummaryData(summaryData) {
    this._summaryData = summaryData;
  }

  render() {
    this.unrender();
    this._statsList = new StatsSummary(this._summaryData);
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

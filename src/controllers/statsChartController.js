import { StatsChart } from "../components/statsChart";
import { render, unrender } from "../utils";

export class StatsChartController {
  constructor(container) {
    this._container = container;
    this._chart = new StatsChart();
  }

  render(summaryData) {
    this.unrender();

    this._chart = new StatsChart();
    this._chart.createChart(summaryData);
    render(this._container.getElement(), this._chart.getElement(), "beforeend");
  }
  unrender() {
    unrender(this._chart.getElement());
    this._chart.removeElement();
  }
}

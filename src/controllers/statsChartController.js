import { StatsChart } from "../components/statsChart";
import { render, unrender } from "../utils";

export class StatsChartController {
  constructor(container) {
    this._container = container;
    this._chart = new StatsChart();
  }

  render() {
    render(this._container.getElement(), this._chart.getElement(), "beforeend");
  }
  unrender() {
    unrender(this._chart.getElement());
    this._chart.removeElement();
  }
  renderChart(summaryData) {
    this.unrenderChart();
    this._chart = new StatsChart();
    this._chart.createChart(summaryData);
    this.render();
  }
  unrenderChart() {
    unrender(this._chart.getElement());
    this._chart.removeElement();
  }
}

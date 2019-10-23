import { StatsChart } from "../components/statsChart";
import { render } from "../utils";

export class StatsChartController {
  constructor(container) {
    this._container = container;
    this._chart = new StatsChart();
  }

  render() {
    render(this._container.getElement(), this._chart.getElement(), "beforeend");
  }
  renderChart(summaryData) {
    this._chart.createChart(summaryData);
  }
}

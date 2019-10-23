import { StatisticsSection } from "../components/statisticsSection";
import { UserRankController } from "./userRankController";
import { StatsFiltersController } from "./statsFiltersController";
import { StatsSummaryController } from "./statsSummaryController";
import { StatsChartController } from "./statsChartController";

import { getDataForSummary, getFilmsByFilter } from "../statsControllerHelpers";
import { render } from "../utils";
import { STATS_FILTER_TYPE } from "../consts";

export class StatsController {
  constructor(container, films) {
    this._container = container;
    this._films = films;
    this._activeTab = STATS_FILTER_TYPE.ALL;
    this._summaryData = "";

    this._statisticsSection = new StatisticsSection();
    this._rankController = new UserRankController(
      this._statisticsSection,
      films
    );

    this._filters = new StatsFiltersController(
      this._statisticsSection,
      this.onTabChange.bind(this)
    );

    this._statsSummary = new StatsSummaryController(
      this._statisticsSection,
      {}
    );
    this._chart = new StatsChartController(this._statisticsSection);
  }

  init() {
    render(this._container, this._statisticsSection.getElement(), "beforeend");
    this.onTabChange(this._activeTab);
  }

  onTabChange(activeTab) {
    this._activeTab = activeTab;
    const summaryData = getDataForSummary(
      getFilmsByFilter(this._films, this._activeTab)
    );
    this._summaryData = summaryData;
    this._statsSummary.updateSummaryData(summaryData);
    this._statsSummary.render();
  }

  render() {
    this._rankController.render();
    this._filters.render();
    this._statsSummary.render();
    this._chart.render();
    this._chart.renderChart(this._summaryData);
  }
  unrender() {
    this._rankController.unrender();
    this._filters.unrender();
    this._statsSummary.unrender();
  }
}

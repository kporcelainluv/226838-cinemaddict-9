import { render, unrender } from "../utils";
import { StatisticsSection } from "../components/statisticsSection";
import { UserRankController } from "./userRankController";
import { StatsFiltersController } from "./statsFiltersController";

export class StatsController {
  constructor(container, films) {
    this._container = container;
    this._films = films;

    this._statisticsSection = new StatisticsSection();
    this._rankController = new UserRankController(
      this._statisticsSection,
      films
    );

    this._filters = new StatsFiltersController(this._statisticsSection);
  }

  init() {
    render(this._container, this._statisticsSection.getElement(), "beforeend");
  }

  render() {
    this._rankController.render();
    this._filters.render();
  }
  unrender() {
    this._rankController.unrender();
    this._filters.unrender();
  }
}

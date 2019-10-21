import { render, unrender } from "../utils";
import { Statistics } from "../components/statistics";
import { UserRankController } from "./userRankController";

export class StatsController {
  constructor(container, films) {
    this._container = container;
    this._films = films;

    this._statisticsSection = new Statistics();
    this._rankController = new UserRankController(
      this._statisticsSection,
      films
    );
  }
  init() {
    render(this._container, this._statisticsSection.getElement(), "beforeend");
  }

  render() {
    this._rankController.renderRank();
  }
  unrender() {
    this._rankController.unrender();
  }
}

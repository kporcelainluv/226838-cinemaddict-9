import { render } from "../utils";
import { StatisticsSection } from "../components/statisticsSection";
import { UserRankController } from "./userRankController";
import { StatsFiltersController } from "./statsFiltersController";
import { StatsListController } from "../controllers/statsListController";
import { FILTER_SORT_TYPE } from "../consts";

const moment = require("moment");

const getFilterType = filter => {
  const week = moment().subtract(7, "days")._d;
  const month = moment().subtract(1, "month")._d;
  const year = moment().subtract(1, "year")._d;

  if (filter === FILTER_SORT_TYPE.ALL) {
    return new Date(null);
  }
  if (filter === FILTER_SORT_TYPE.WEEK) {
    return week;
  }
  if (filter === FILTER_SORT_TYPE.MONTH) {
    return month;
  }
  if (filter === FILTER_SORT_TYPE.YEAR) {
    return year;
  }
};

const getFilmsByFilter = (films, filter) => {
  const today = new Date();
  const filterDate = getFilterType(filter);
  return films.filter(film => {
    const watchDate = film.user_details.watching_date;
    return moment(new Date(watchDate)).isBetween(filterDate, today);
  });
};

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

    this._statsList = new StatsListController(this._statisticsSection);
  }

  init() {
    render(this._container, this._statisticsSection.getElement(), "beforeend");
    const filteredFilms = getFilmsByFilter(this._films, FILTER_SORT_TYPE.TODAY);
    console.log(filteredFilms);
  }

  render() {
    this._rankController.render();
    this._filters.render();
    this._statsList.render();
  }
  unrender() {
    this._rankController.unrender();
    this._filters.unrender();
    this._statsList.unrender();
  }
}

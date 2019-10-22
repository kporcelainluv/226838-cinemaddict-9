import { isAfter, isBefore, addYears, addMonths, addWeeks, startOfToday } from "date-fns";

import { render } from "../utils";
import { StatisticsSection } from "../components/statisticsSection";
import { UserRankController } from "./userRankController";
import { StatsFiltersController } from "./statsFiltersController";
import { StatsListController } from "../controllers/statsListController";
import { STATS_FILTER_TYPE } from "../consts";

const moment = require("moment");

const x = [
  today,
  addWeeks(today, -1),
  addMonths(today, -1),
  addYears(today, -1)
];

const getDateByFilterType = filterType => {
  const weekAgo = moment().subtract(7, "days")._d;
  const monthAgo = moment().subtract(1, "month")._d;
  const yearAgo = moment().subtract(1, "year")._d;

  if (filterType === STATS_FILTER_TYPE.ALL) {
    return new Date(null);
  }
  if (filterType === STATS_FILTER_TYPE.WEEK) {
    return weekAgo;
  }
  if (filterType === STATS_FILTER_TYPE.MONTH) {
    return monthAgo;
  }
  if (filterType === STATS_FILTER_TYPE.YEAR) {
    return yearAgo;
  }
};

const getDateByFilterType = filterType => {
  const today = new Date();

  if (filterType === STATS_FILTER_TYPE.ALL) {
    return addYears(today, -100);
  } else if (filterType === STATS_FILTER_TYPE.YEAR) {
    return addYears(today, -1);
  } else if (filterType === STATS_FILTER_TYPE.MONTH) {
    return addMonths(today, -1);
  } else if (filterType === STATS_FILTER_TYPE.WEEK) {
    return addWeeks(today, -1);
  } else if (filterType === STATS_FILTER_TYPE.TODAY) {
    return startOfToday();
  }
};

const getFilmsByFilter = (films, filter) => {
  const date = getDateByFilterType(filter);
  return films.filter(film => {
    const watchDate = film.user_details.watching_date;
    return isAfter(watchDate, date);
  });
};

// TODO: check between func
const getFilmsByFilter = (films, filter) => {
  const today = new Date();
  const filterDate = getDateByFilterType(filter);
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
    const filteredFilms = getFilmsByFilter(
      this._films,
      STATS_FILTER_TYPE.TODAY
    );
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

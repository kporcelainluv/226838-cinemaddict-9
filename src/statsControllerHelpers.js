import {STATS_FILTER_TYPE} from "./consts";
import {addMonths, addWeeks, addYears, isAfter, startOfToday} from "date-fns";
import {countHoursAndMins} from "./utils";

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
  return false;
};
export const getFilmsByFilter = (films, filterType) => {
  const date = getDateByFilterType(filterType);
  return films.filter(film => {
    const watchDate = film.user_details.watching_date;
    return isAfter(watchDate, date);
  });
};
export const getDataForSummary = films => {
  if (films.length === 0) {
    return { watched: 0, hours: 0, minutes: 0, genres: 0, topGenre: 0 };
  }
  const watched = films.length;
  const duration = films.reduce((acc, elm) => {
    return (acc += elm.film_info.runtime);
  }, 0);
  const [hours, minutes] = countHoursAndMins(duration);

  const genres = films.reduce((acc, elm) => {
    const genresList = elm.film_info.genre;
    genresList.forEach(genre => {
      if (genre in acc) {
        acc[genre] += 1;
      } else {
        acc[genre] = 1;
      }
    });

    return acc;
  }, {});
  const topGenre = Object.entries(genres).sort((a, b) => {
    if (a[1] > b[1]) {
      return -1;
    } else if (a[1] < b[1]) {
      return 1;
    }
    return 0;
  })[0][0];

  return { watched, hours, minutes, genres, topGenre };
};

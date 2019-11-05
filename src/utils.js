import { POSITION, STATS_FILTER_TYPE } from "./consts";
import { addMonths, addWeeks, addYears, isAfter, startOfToday } from "date-fns";

export const createElement = template => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const render = (container, element, place) => {
  switch (place) {
    case POSITION.AFTERBEGIN:
      container.prepend(element);
      break;
    case POSITION.BEFOREEND:
      container.append(element);
      break;
  }
};

export const unrender = element => {
  if (element) {
    element.remove();
  }
};

export const countHoursAndMins = mins => {
  const hours = Math.floor(mins / 60);
  const minutes = mins - hours * 60;
  return [hours, minutes];
};

export const getDateByFilterType = filterType => {
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

export const getWatchedFilms = films => {
  return films.length;
};

export const getHoursAndMins = films => {
  const duration = films.reduce((acc, elm) => {
    return acc + elm.film_info.runtime;
  }, 0);
  const [hours, minutes] = countHoursAndMins(duration);
  return [hours, minutes];
};

const getSortedGenres = films => {
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

  return Object.entries(genres).sort((a, b) => {
    if (a[1] > b[1]) {
      return -1;
    } else if (a[1] < b[1]) {
      return 1;
    }
    return 0;
  });
};

export const getGenresByKeysVals = films => {
  const genres = getSortedGenres(films);

  const keys = genres.map(elm => elm[0]);
  const vals = genres.map(elm => elm[1]);
  return [keys, vals];
};

export const getTopGenre = films => {
  const genres = getSortedGenres(films);
  return genres[0][0];
};

export const getTopRatedFilms = films => {
  if (films.every(film => film.film_info.total_rating === 0)) {
    return false;
  }
  return films
    .sort((a, b) => {
      if (a.film_info.total_rating > b.film_info.total_rating) {
        return -1;
      }
      if (a.film_info.total_rating < b.film_info.total_rating) {
        return 1;
      }
      return 0;
    })
    .slice(0, 2);
};

export const getMostCommentedFilms = films => {
  if (films.every(film => film.comments.length === 0)) {
    return false;
  }
  return films
    .sort((a, b) => {
      if (a.comments > b.comments) {
        return -1;
      }
      if (a.comments < b.comments) {
        return 1;
      }
      return 0;
    })
    .slice(0, 2);
};

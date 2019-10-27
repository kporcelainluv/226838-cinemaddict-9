import { render } from "../utils";
import { ProfileRating } from "../components/profileRating";
import { SearchController } from "./search-controller";

const headerElement = document.querySelector(`.header`);

const countWatchedFilms = films => {
  return films.filter(film => film.user_details.already_watched === true)
    .length;
};
const getStatsRank = watchedAmount => {
  let rank = ``;
  if (watchedAmount < 10) {
    rank = `novice`;
  } else if (watchedAmount < 20) {
    rank = `fan`;
  } else if (watchedAmount >= 20) {
    rank = `movie buff`;
  }
  return rank;
};

const createHeading = () => {
  const heading = document.createElement(`h1`);
  heading.className = `header__logo logo`;
  heading.innerHTML = `Cinemaddict`;

  return heading;
};

export class HeaderController {
  constructor({ films, onSearchChange }) {
    this._profileStats = getStatsRank(countWatchedFilms(films));
    this._profile = new ProfileRating(this._profileStats);
    this._search = new SearchController(headerElement, onSearchChange);
  }

  init() {
    const heading = createHeading();
    this._search.init();
    render(headerElement, heading, `afterbegin`);
    render(headerElement, this._profile.getElement(), `beforeend`);
  }
}

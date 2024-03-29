import { Search } from "./components/search";
import { ProfileRating } from "./components/profileRating";
import { ShowMoreButton } from "./components/showMoreBtn";
import { FilmsList } from "./components/films-list";
import { AdditionalFilmBlock } from "./components/additionalFilmBlocks";
import { render } from "./components/utils";
import { FilmContainer } from "./components/film-containter";
import { PageController } from "./controllers/page-controller";
import { Statistics } from "./components/statistics";
import { MainNav } from "./components/mainFilter";

const headerSearchContainer = document.querySelector(`.header`);
const mainPageContainer = document.querySelector(`.main`);
const footerContainer = document.querySelector(`.footer`);
const bodyContainer = document.getElementsByTagName(`body`)[0];

const addHeaderLogo = container => {
  const headerSearchHeading = document.createElement(`h1`);
  headerSearchHeading.className = `header__logo logo`;
  headerSearchHeading.innerHTML = `Cinemaddict`;
  render(container, headerSearchHeading, `afterbegin`);
};

const renderHeader = () => {
  const headerSearchBar = new Search().getElement();
  const headerProfileRating = new ProfileRating().getElement();
  addHeaderLogo(headerSearchContainer);
  render(headerSearchContainer, headerSearchBar, `beforeend`);
  render(headerSearchContainer, headerProfileRating, `beforeend`);
};

const films = [
  {
    id: 0,
    name: `The Great Gatsby`,
    rating: `10`,
    genre: `drama`,
    year: `2013`,
    time: `1h 16m`,
    // poster: "made-for-each-other",
    descriptionText: `Hello world!`,
    ageRating: `18+`,
    titleOriginal: `The Great Gatsby by S.Fitzgerald`,
    details: `Hello`,
    personalRating: `10`,
    director: `ksusha`,
    writers: `yanis`,
    actors: `polina`,
    date: `04.05.1996`,
    runtime: `2h`,
    country: `usa`,
    isWatchlist: false,
    isWatched: false,
    isFavorite: false,
    comments: [
      { id: 0, text: "Absurd", name: "Alison Cruze", date: "19/10/2019 17:20" },
      {
        id: 1,
        text: "Boring",
        name: "Michelle Obama",
        date: "19/12/2018 12:10"
      },
      {
        id: 2,
        text: "Amusing",
        name: "Sarrah Fergusson",
        date: "29/02/2019 01:12"
      }
    ]
  },
  {
    id: 1,
    name: `Inception`,
    rating: `8`,
    genre: `action`,
    year: `2011`,
    time: `3h 16m`,
    // poster: "popeye-meets-sinbad",
    descriptionText: `OMG!!!`,
    ageRating: `4+`,
    titleOriginal: `Inception into the brain`,
    details: `Wonderful`,
    personalRating: `8`,
    director: `ksusha`,
    writers: `yanis`,
    actors: `polina`,
    date: `04.05.1996`,
    runtime: `2h`,
    country: `usa`,
    isWatchlist: false,
    isWatched: false,
    isFavorite: false,
    comments: [
      { id: 0, text: "Absurd", name: "Alison Cruze", date: "19/10/2019 17:20" },
      {
        id: 1,
        text: "Boring",
        name: "Michelle Obama",
        date: "19/12/2018 12:10"
      },
      {
        id: 2,
        text: "Amusing",
        name: "Sarrah Fergusson",
        date: "29/02/2019 01:12"
      }
    ]
  },
  {
    id: 2,
    name: `Joker`,
    genre: `thriller`,
    year: `2019`,
    time: `2h 10m`,
    rating: `7`,
    // poster: "popeye-meets-sinbad",
    descriptionText: `YES!!!`,
    ageRating: `18+`,
    titleOriginal: `Crazy motherf*cker`,
    details: `Scary`,
    personalRating: `7`,
    director: `ksusha`,
    writers: `yanis`,
    actors: `polina`,
    date: `04.05.1996`,
    runtime: `2h`,
    country: `usa`,
    isWatchlist: false,
    isWatched: false,
    isFavorite: false,
    comments: [
      { id: 0, text: "Absurd", name: "Alison Cruze", date: "19/10/2019 17:20" },
      {
        id: 1,
        text: "Boring",
        name: "Michelle Obama",
        date: "19/12/2018 12:10"
      },
      {
        id: 2,
        text: "Amusing",
        name: "Sarrah Fergusson",
        date: "29/02/2019 01:12"
      }
    ]
  }
];

(() => {
  const statistics = new Statistics();
  const mainNav = new MainNav();

  statistics.getElement().classList.add(`visually-hidden`);

  renderHeader();
  const filmCardController = new PageController(mainPageContainer, films);
  filmCardController.init();

  render(mainPageContainer, statistics.getElement(), `beforeend`);
  render(mainPageContainer, mainNav.getElement(), `afterbegin`);

  mainNav.getElement().addEventListener(`click`, evt => {
    evt.preventDefault();
    if (!evt.target.classList.contains(`main-navigation__item`)) {
      return;
    }
    switch (evt.target.hash) {
      case `#all`:
        statistics.getElement().classList.add(`visually-hidden`);
        filmCardController.show();
        break;
      case `#watchlist`:
        statistics.getElement().classList.add(`visually-hidden`);
        break;
      case `#history`:
        statistics.getElement().classList.add(`visually-hidden`);
        // filmCardController.show();
        break;
      case `#favorites`:
        statistics.getElement().classList.add(`visually-hidden`);
        // filmCardController.show();
        break;
      case `#stats`:
        filmCardController.hide();
        statistics.getElement().classList.remove(`visually-hidden`);
        break;
    }
  });
})();

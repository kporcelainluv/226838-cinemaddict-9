import { Search } from "./components/search";
import { ProfileRating } from "./components/profileRating";
import { ShowMoreButton } from "./components/showMoreBtn";
import { FilmsList } from "./components/films-list";
import { additionalFilmBlock } from "./components/additionalFilmBlocks";
import { render } from "./components/utils";
import { FilmContainer } from "./components/film-conainter";
import { PageController } from "./controllers/page-controller";

const headerSearchContainer = document.querySelector(`.header`);
const mainPageContainer = document.querySelector(`.main`);
const footerContainer = document.querySelector(`.footer`);
const bodyContainer = document.getElementsByTagName("body")[0];

const addHeaderLogo = container => {
  const headerSearchHeading = document.createElement("h1");
  headerSearchHeading.className = "header__logo logo";
  headerSearchHeading.innerHTML = "Cinemaddict";
  render(container, headerSearchHeading, "afterbegin");
};

const renderHeader = () => {
  const headerSearchBar = new Search().getElement();
  const headerProfileRating = new ProfileRating().getElement();
  addHeaderLogo(headerSearchContainer);
  render(headerSearchContainer, headerSearchBar, "beforeend");
  render(headerSearchContainer, headerProfileRating, "beforeend");
};

const renderMain = mainPageContainer => {
  const filmContainer = new FilmContainer().getElement();
  render(mainPageContainer, filmContainer, "beforeend"); // class films

  return [filmContainer];
};

const renderFilmsBlock = container => {
  const filmsListBlock = new FilmsList().getElement(); //films-list
  const topRatedBlock = new additionalFilmBlock("Top Rated").getElement(); // --extra
  const showMoreBtn = new ShowMoreButton().getElement();
  const mostCommentedBlock = new additionalFilmBlock(
    "Most Commented"
  ).getElement(); // --extra
  render(container, showMoreBtn, "afterbegin"); // show more
  render(container, filmsListBlock, "afterbegin");
  render(container, topRatedBlock, "beforeend");
  render(container, mostCommentedBlock, "beforeend");

  return [filmsListBlock, topRatedBlock, mostCommentedBlock, showMoreBtn];
};

const data = [
  {
    id: 0,
    name: "The Great Gatsby",
    rating: "10",
    genre: "drama",
    year: "2013",
    time: "1h 16m",
    // poster: "made-for-each-other",
    comments: "9",
    descriptionText: "Hello world!",
    ageRating: "18+",
    titleOriginal: "The Great Gatsby by S.Fitzgerald",
    details: "Hello",
    personalRating: "10",
    director: "ksusha",
    writers: "yanis",
    actors: "polina",
    date: "04.05.1996",
    runtime: "2h",
    country: "usa",
    isWatchlist: false,
    isWatched: false,
    isFavorite: false
  },
  {
    id: 1,
    name: "Inception",
    rating: "8",
    genre: "action",
    year: "2011",
    time: "3h 16m",
    // poster: "popeye-meets-sinbad",
    comments: "3",
    descriptionText: "OMG!!!",
    ageRating: "4+",
    titleOriginal: "Inception into the brain",
    details: "Wonderful",
    personalRating: "8",
    director: "ksusha",
    writers: "yanis",
    actors: "polina",
    date: "04.05.1996",
    runtime: "2h",
    country: "usa",
    isWatchlist: false,
    isWatched: false,
    isFavorite: false
  },
  {
    id: 2,
    name: "Joker",
    rating: "7",
    genre: "thriller",
    year: "2019",
    time: "2h 10m",
    // poster: "popeye-meets-sinbad",
    comments: "5",
    descriptionText: "YES!!!",
    ageRating: "18+",
    titleOriginal: "Crazy motherf*cker",
    details: "Scary",
    personalRating: "7",
    director: "ksusha",
    writers: "yanis",
    actors: "polina",
    date: "04.05.1996",
    runtime: "2h",
    country: "usa",
    isWatchlist: false,
    isWatched: false,
    isFavorite: false
  }
];

const renderPage = (bodyContainer, renderHeader, renderFilmsBlock, data) => {
  renderHeader();
  const filmContainer = renderMain(mainPageContainer)[0];
  const filmsListBlock = renderFilmsBlock(filmContainer)[0];
  const filmCardController = new PageController(
    filmsListBlock,
    mainPageContainer,
    data
  );
  filmCardController.init();
};
renderPage(bodyContainer, renderHeader, renderFilmsBlock, data);

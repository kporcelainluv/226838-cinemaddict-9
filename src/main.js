import { Search } from "./components/search";
import { ProfileRating } from "./components/profileRating";
import { MainNav } from "./components/mainFilter";
import { ShowMoreButton } from "./components/showMoreBtn";
import { MainSorting } from "./components/mainSorting";
import { FilmsList } from "./components/films-list";
import { additionalFilmBlock } from "./components/additionalFilmBlocks";
import { Film } from "./components/film";
import { render, unrender } from "./components/utils";
import { Popup } from "./components/popup";
import { FilmContainer } from "./components/film-conainter";
import { FilmsController } from "./controllers/films-controller";
import { SortController } from "./controllers/sort-controller";

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
  const mainSorting = new MainSorting().getElement();
  const mainSortingController = new SortController(mainPageContainer);
  mainSortingController.init();
  render(mainPageContainer, mainSorting, "beforeend"); // ul sorting
  render(mainPageContainer, filmContainer, "beforeend"); // class films

  return [filmContainer, mainSorting];
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

const data = {
  name: "The Great Gatsby",
  rating: "9.8",
  genre: "drama",
  year: "2018",
  time: "1h 16m",
  poster: "made-for-each-other",
  comments: "9",
  descriptionText: "Hello world!",
  ageRating: "18+",
  titleOriginal: "The Great Gatsby by S.Fitzgerald",
  details: "Hello",
  personalRating: "5"
};

const renderPage = (bodyContainer, renderHeader, renderFilmsBlock) => {
  renderHeader();
  const [filmContainer, mainSorting, mainNav] = renderMain(mainPageContainer);
  const [
    filmsListBlock,
    topRatedBlock,
    mostCommentedBlock,
    showMoreBtn
  ] = renderFilmsBlock(filmContainer);
  const filmCardController = new FilmsController(filmsListBlock, data);
  filmCardController.init();
};
renderPage(bodyContainer, renderHeader, renderFilmsBlock, data);

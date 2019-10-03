import { Search } from "./components/search";
import { ProfileRating } from "./components/profileRating";
import { MainNav } from "./components/mainFilter";
import { ShowMoreButton } from "./components/showMoreBtn";
import { MainSorting } from "./components/mainSorting";
import { FilmsList } from "./components/films-list";
import { additionalFilmBlock } from "./components/additionalFilmBlocks";
import { Film } from "./components/film";
import { render1 } from "./components/utils";
import { Popup } from "./components/popup";
import { FilmContainer } from "./components/film-conainter";
import { film } from "./components/mockData";

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};
// delete soon
const headerSearchContainer = document.querySelector(`.header`);
const mainPageContainer = document.querySelector(`.main`);
const footerContainer = document.querySelector(`.footer`);

// compiling header
// adding h1
const addHeaderLogo = container => {
  const headerSearchHeading = document.createElement("h1");
  headerSearchHeading.className = "header__logo logo";
  headerSearchHeading.innerHTML = "Cinemaddict";
  render1(container, headerSearchHeading, "afterbegin");
};

const renderHeader = () => {
  const headerSearchBar = new Search().getElement();
  const headerProfileRating = new ProfileRating().getElement();
  //header logo
  addHeaderLogo(headerSearchContainer);
  // header seach
  render1(headerSearchContainer, headerSearchBar, "beforeend");
  // header rating
  render1(headerSearchContainer, headerProfileRating, "beforeend");
};
// created header

// creating main

const renderMain = mainPageContainer => {
  const filmContainer = new FilmContainer().getElement();
  const mainSorting = new MainSorting().getElement();
  const mainNav = new MainNav().getElement();

  render1(mainPageContainer, filmContainer, "afterbegin"); // class films
  render1(mainPageContainer, mainSorting, "afterbegin"); // ul sorting
  render1(mainPageContainer, mainNav, "afterbegin"); // main nav

  return [filmContainer, mainSorting, mainNav];
};
// created main

// create film container

const renderFilmsBlock = container => {
  const filmsListBlock = new FilmsList().getElement(); //films-list
  const topRatedBlock = new additionalFilmBlock("Top Rated").getElement(); // --extra
  const showMoreBtn = new ShowMoreButton().getElement();
  const mostCommentedBlock = new additionalFilmBlock(
    "Most Commented"
  ).getElement(); // --extra
  render1(container, showMoreBtn, "afterbegin"); // show more
  render1(container, filmsListBlock, "afterbegin");
  render1(container, topRatedBlock, "beforeend");
  render1(container, mostCommentedBlock, "beforeend");

  return [filmsListBlock, topRatedBlock, mostCommentedBlock, showMoreBtn];
};

const renderFilmCard = (container, data) => {
  const filmsListContainer = container.querySelector(".films-list__container");
  console.log(filmsListContainer);
  const filmCard = new Film(data).getElement();
  console.log(filmCard);
  render1(filmsListContainer, filmCard, "afterbegin");
};
const renderPopUp = (container, data) => {
  const popUpTemplate = new Popup(data).getElement();
  render1(container, popUpTemplate, "afterbegin");
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
renderHeader();
const [filmContainer, mainSorting, mainNav] = renderMain(mainPageContainer);
const [
  filmsListBlock,
  topRatedBlock,
  mostCommentedBlock,
  showMoreBtn
] = renderFilmsBlock(filmContainer);
renderFilmCard(filmsListBlock, data);

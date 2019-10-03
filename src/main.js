import { Search } from "./components/search";
import { ProfileRating } from "./components/profileRating";
import { mainFilterStats } from "./components/mainFilter";
import { showMore } from "./components/showMoreBtn";
import { filmsContainer } from "./components/filmsContainer";
import { additionalFilmBlock } from "./components/additionalFilmBlocks";
import { Film } from "./components/film";
import { render1 } from "./components/utils";
import { Popup } from "./components/popup";

const headerSearchContainer = document.querySelector(`.header`);
const mainPageContainer = document.querySelector(`.main`);

const addHeaderLogo = container => {
  const headerSearchHeading = document.createElement("h1");
  headerSearchHeading.className = "header__logo logo";
  headerSearchHeading.innerHTML = "Cinemaddict";
  render1(container, headerSearchHeading, "afterbegin");
};

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(mainPageContainer, mainFilterStats(), "afterbegin");
render(mainPageContainer, filmsContainer(), "beforeend");

const renderHeader = () => {
  const headerSearchBar = new Search().getElement();
  const headerProfileRating = new ProfileRating().getElement();

  render1(headerSearchContainer, headerSearchBar, "beforeend");
  render1(headerSearchContainer, headerProfileRating, "beforeend");
  addHeaderLogo(headerSearchContainer);
};
const filmsListContainer = document.querySelector(`.films-list__container`);

const films = document.querySelector(`.films`);
render(films, additionalFilmBlock(), "beforeend");
render(films, additionalFilmBlock(), "beforeend");
const topLikedFilmContainer = document.querySelectorAll(
  `.films-list--extra .films-list__container`
)[0];
const mostCommentedFilmContainer = document.querySelectorAll(
  `.films-list--extra .films-list__container`
)[1];

render(filmsListContainer, showMore(), "beforeend");

const renderFilmsContainer = data => {
  const filmCard = new Film(data).getElement();
  const popUpTemplate = new Popup(data).getElement();

  render1(filmsListContainer, filmCard, "afterbegin");
  // render1(filmsListContainer, popUpTemplate, "afterbegin");
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
renderFilmsContainer(data);
renderHeader();

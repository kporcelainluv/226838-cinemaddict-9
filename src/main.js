import { searchBar } from "./components/search";
import { mainFilterStats } from "./components/mainFilter";
import { showMore } from "./components/showMoreBtn";
import { popupTemplate } from "./components/popup";
import { filmsContainer } from "./components/filmsContainer";
import { additionalFilmBlock } from "./components/additionalFilmBlocks";
import { Film } from "./components/film";
import { render1 } from "./components/utils";

const headerSearchBar = document.querySelector(`.header`);
const mainPageContainer = document.querySelector(`.main`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(headerSearchBar, searchBar(), "beforeend");
render(mainPageContainer, mainFilterStats(), "afterbegin");
render(mainPageContainer, filmsContainer(), "beforeend");

const filmsListContainer = document.querySelector(`.films-list__container`);
//
// for (let i = 0; i < 5; i++) {
//   render(filmsListContainer, filmOutsideCard(), "afterbegin");
//   // render(films, popupTemplate(), "beforeend");
// }
const films = document.querySelector(`.films`);
render(films, additionalFilmBlock(), "beforeend");
render(films, additionalFilmBlock(), "beforeend");
const topLikedFilmContainer = document.querySelectorAll(
  `.films-list--extra .films-list__container`
)[0];
const mostCommentedFilmContainer = document.querySelectorAll(
  `.films-list--extra .films-list__container`
)[1];

// for (let i = 0; i < 2; i++) {
//   render(topLikedFilmContainer, filmOutsideCard(), "beforeend");
//   render(mostCommentedFilmContainer, filmOutsideCard(), "beforeend");
// }

render(filmsListContainer, showMore(), "beforeend");

const renderTask = data => {
  const filmCard = new Film(data);

  render1(filmsListContainer, filmCard.getTemplate(), "afterbegin");
};
const data = {
  name: "The Great Gatsby",
  rating: "9.8",
  genre: "drama",
  year: "2018",
  time: "1h 16m",
  poster: "made-for-each-other",
  comments: "9",
  descriptionText: "Hello world!"
};
renderTask(data);

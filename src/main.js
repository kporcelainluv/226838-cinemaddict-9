import { searchBar } from "./components/search";
import { mainFilterStats } from "./components/mainFilter";
import { filmOutsideCard } from "./components/film";
import { showMore } from "./components/showMoreBtn";
import { popupTemplate } from "./components/popup";
import { filmsContainer } from "./components/filmsContainer";
import { additionalFilmBlock } from "./components/additionalFilmBlocks";

const headerSearchBar = document.querySelector(`.header`);
const mainPageContainer = document.querySelector(`.main`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(headerSearchBar, searchBar(), "beforeend");
render(mainPageContainer, mainFilterStats(), "afterbegin");
render(mainPageContainer, filmsContainer(), "beforeend");

const filmsListContainer = document.querySelector(`.films-list__container`);

for (let i = 0; i < 5; i++) {
  render(filmsListContainer, filmOutsideCard(), "afterbegin");
  render(filmsListContainer, popupTemplate(), "beforeend");
}
const films = document.querySelector(`.films`);
render(films, additionalFilmBlock(), "beforeend");
render(films, additionalFilmBlock(), "beforeend");
const topLikedFilmContainer = document.querySelectorAll(
  `.films-list--extra .films-list__container`
)[0];
const mostCommentedFilmContainer = document.querySelectorAll(
  `.films-list--extra .films-list__container`
)[1];

for (let i = 0; i < 2; i++) {
  render(topLikedFilmContainer, filmOutsideCard(), "beforeend");
  render(mostCommentedFilmContainer, filmOutsideCard(), "beforeend");
}
render(filmsListContainer, showMore(), "beforeend");

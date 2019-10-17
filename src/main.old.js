import { render } from "./components/utils";
import { PageController } from "./controllers/page-controller";
import { Statistics } from "./components/statistics";
import { Navigation } from "./components/navigation";
import { mockFilms } from "./mockData";

const headerSearchContainer = document.querySelector(`.header`);
const mainPageContainer = document.querySelector(`.main`);

(() => {
  const statistics = new Statistics();
  const mainNav = new Navigation();

  statistics.getElement().classList.add(`visually-hidden`);

  const filmCardController = new PageController(
    headerSearchContainer,
    mainPageContainer,
    mockFilms
  );
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

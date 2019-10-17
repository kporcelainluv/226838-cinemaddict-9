import { PageController } from "./controllers/page-controller";
import { mockFilms } from "./mockData";

const headerSearchContainer = document.querySelector(`.header`);
const mainPageContainer = document.querySelector(`.main`);

(() => {
  const page = new PageController(
    headerSearchContainer,
    mainPageContainer,
    mockFilms
  );
  page.init();
})();

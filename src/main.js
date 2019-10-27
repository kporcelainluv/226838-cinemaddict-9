import { PageController } from "./controllers/page-controller";
import { API } from "./api";

const headerSearchContainer = document.querySelector(`.header`);
const mainPageContainer = document.querySelector(`.main`);

const AUTHORIZATION = `Basic eo0w590ik29889a=${Math.random()}`;
const END_POINT = `https://htmlacademy-es-9.appspot.com/cinemaddict`;

const api = new API({ endPoint: END_POINT, authorization: AUTHORIZATION });

api.getFilms().then(movies => {
  const page = new PageController(
    headerSearchContainer,
    mainPageContainer,
    movies
  );
  page.init();
});

const onDataChange = (actionType, update) => {
  switch (actionType) {
    case `update`:
      api
        .updateFilm({
          id: update.id,
          data: update
        })
        .then(updatedFilm => PageController._onFilmUpdate(updatedFilm));
      break;
    case `delete`:
      api
        .updateFilm({
          id: update.id
        })
        .then(() => api.getTasks())
        .then(updatedFilm => PageController._onFilmUpdate(updatedFilm));
      break;
  }
};

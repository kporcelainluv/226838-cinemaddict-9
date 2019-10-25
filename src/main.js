import { PageController } from "./controllers/page-controller";
import { API } from "./api";

const headerSearchContainer = document.querySelector(`.header`);
const mainPageContainer = document.querySelector(`.main`);

const AUTHORIZATION = `Basic eo0w590ik29889a=${Math.random()}`;
const END_POINT = `https://htmlacademy-es-9.appspot.com/cinemaddict`;

const api = new API({ endPoint: END_POINT, authorization: AUTHORIZATION });

const onDataChange = () => {
  switch (actionType) {
    case `delete`:
      api
        .deleteTask({
          id: update.id
        })
        .then(() => api.getTasks())
        .then(tasks => boardController.show(tasks));
      break;
  }
};

api.getFilms().then(movies => {
  const page = new PageController(
    headerSearchContainer,
    mainPageContainer,
    movies
  );
  page.init();
});

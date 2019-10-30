import { PageController } from "./controllers/page-controller";
import { API } from "./api";

const headerSearchContainer = document.querySelector(`.header`);
const mainPageContainer = document.querySelector(`.main`);

const AUTHORIZATION = `Basic eo0w590ik29889a=${Math.random()}`;
const END_POINT = `https://htmlacademy-es-9.appspot.com/cinemaddict`;

const api = new API({ endPoint: END_POINT, authorization: AUTHORIZATION });

const page = new PageController(
  headerSearchContainer,
  mainPageContainer,
  api
);
page.init();
api.getFilms().then(films => page.initWithFilms(films));

import { render } from "../utils";
import { ProfileRating } from "../components/profileRating";
import { SearchController } from "./search-controller";

const headerElement = document.querySelector(`.header`);

const createHeading = () => {
  const heading = document.createElement(`h1`);
  heading.className = `header__logo logo`;
  heading.innerHTML = `Cinemaddict`;

  return heading;
};

export class HeaderController {
  constructor({ films, onSearchChange }) {
    this._profile = new ProfileRating({ films });
    this._search = new SearchController(headerElement, onSearchChange);
  }

  init() {
    const heading = createHeading();
    this._search.init();
    render(headerElement, heading, `afterbegin`);
    render(headerElement, this._profile.getElement(), `beforeend`);
  }
}

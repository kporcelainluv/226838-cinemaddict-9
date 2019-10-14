import { Popupcomments } from "../components/commentsComponent";
import { render } from "../components/utils";

class CommentsController {
  constructor(popUp, film, onDataChange) {
    this._popUpTemplate = popUp;
    this._film = film;
    this._onDataChange = onDataChange;
    this._popupComments = new Popupcomments(this._film);
  }
  init() {
    const commentNodesList = this._popupComments
      .getElement()
      .querySelectorAll(`.film-details__comment-delete`);
    for (let idx = 0; idx < commentNodesList.length; idx++) {
      let comment = commentNodesList[idx];
      comment.addEventListener("click", evt => {
        evt.preventDefault();

        const updatedFilm = {
          ...this._film,
          comments: [
            ...this._film.comments.slice(0, idx),
            ...this._film.comments.slice(idx + 1)
          ]
        };
        this._onDataChange(updatedFilm);
        this._film = updatedFilm;
      });
    }
    const popupBottomContainer = this._popUpTemplate
      .getElement()
      .querySelector(".form-details__bottom-container");
    render(popupBottomContainer, this._popupComments.getElement(), "beforeend");
  }
}
export { CommentsController };

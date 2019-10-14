import { Popupcomments } from "../components/commentsComponent";
import { render, unrender } from "../components/utils";

class CommentsController {
  constructor(popUp, film, onDataChange) {
    this._popUpTemplate = popUp;
    this._film = film;
    this._onDataChange = onDataChange;
    this._popupComments = new Popupcomments(this._film);
    this.init = this.init.bind(this);
  }
  init() {
    const commentNodesList = this._popupComments
      .getElement()
      .querySelectorAll(`.film-details__comment-delete`);

    Array.from(commentNodesList).forEach((comment, idx) => {
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
        this._unrenderCommentsSection();
        this._popupComments = new Popupcomments(this._film);
        this.init();
      });
    });

    const popupBottomContainer = this._popUpTemplate
      .getElement()
      .querySelector(".form-details__bottom-container");

    render(popupBottomContainer, this._popupComments.getElement(), "beforeend");
  }
  _unrenderCommentsSection() {
    unrender(this._popupComments.getElement());
    this._popupComments.removeElement();
  }
}
export { CommentsController };

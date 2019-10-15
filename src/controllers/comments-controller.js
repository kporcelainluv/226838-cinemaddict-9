import { Popupcomments } from "../components/commentsComponent";
import { render, unrender } from "../components/utils";

class CommentsController {
  constructor(popUp, film, onDataChange) {
    this._popUpTemplate = popUp;
    this._film = film;
    this._onDataChange = onDataChange;
    this._popupComments = new Popupcomments(this._film);
    this.init = this.init.bind(this);
    this._emojiLabel = this._popupComments
      .getElement()
      .querySelectorAll(`.film-details__emoji-item`);
    this._form = this._popUpTemplate
      .getElement()
      .querySelector(".film-details__inner");
    this._currentEmoji = undefined;
  }
  init() {
    const Emojis = {
      "emoji-smile": "smile",
      "emoji-sleeping": "sleeping",
      "emoji-gpuke": "puke",
      "emoji-angry": "angry"
    };
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
    // adding emoji
    for (let emoji of this._emojiLabel) {
      emoji.addEventListener("click", evt => {
        this._currentEmoji = Emojis[evt.target.id];
        evt.preventDefault();
        this._popUpTemplate
          .getElement()
          .querySelector(
            ".film-details__add-emoji-label img"
          ).src = `./images/emoji/${Emojis[evt.target.id]}.png`;
      });
    }

    const onAddComment = evt => {
      if (
        (evt.ctrlKey && evt.keyCode === 13) ||
        (evt.keyCode === 13 && evt.metaKey)
      ) {
        const formData = new FormData(
          this._popUpTemplate.getElement().querySelector(".film-details__inner")
        );
        const newComment = {
          emoji: this._currentEmoji ? this._currentEmoji : `angry`,
          text: formData.get(`comment`),
          name: "You",
          date: new Date().toISOString().slice(0, 10)
        };
        const updatedFilm = {
          ...this._film,
          comments: [...this._film.comments, newComment]
        };
        this._onDataChange(updatedFilm);
        this._film = updatedFilm;
        this._unrenderCommentsSection();
        this._renderCommentsSection();
      }
    };
    this._popupComments
      .getElement()
      .querySelector(`.film-details__comment-input`)
      .addEventListener(`focus`, evt => {
        evt.preventDefault();
        document.addEventListener(`keydown`, onAddComment);
      });
  }
  _unrenderCommentsSection() {
    unrender(this._popupComments.getElement());
    this._popupComments.removeElement();
  }
  _renderCommentsSection() {
    this._popupComments = new Popupcomments(this._film);
    this.init();
  }
}
export { CommentsController };

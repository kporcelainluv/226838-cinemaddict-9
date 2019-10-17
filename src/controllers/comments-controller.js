import { Comments } from "../components/commentsComponent";
import { render, unrender } from "../components/utils";

const Emojis = {
  "emoji-smile": "smile",
  "emoji-sleeping": "sleeping",
  "emoji-gpuke": "puke",
  "emoji-angry": "angry"
};

const getEmojiUrl = id => `./images/emoji/${Emojis[id]}.png`;

export class CommentsController {
  constructor(popup, film, onDataChange) {
    this._popup = popup;
    this._film = film;
    this._onDataChange = onDataChange;
    this._comments = new Comments(film.comments);

    this._emojiLabel = this._comments
      .getElement()
      .querySelectorAll(`.film-details__emoji-item`);
    this._currentEmoji = undefined;

    this.init = this.init.bind(this);
  }

  _unrenderCommentsSection() {
    unrender(this._comments.getElement());
    this._comments.removeElement();
  }

  init() {
    const commentNodesList = this._comments
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
        this._comments = new Comments(this._film);
        this._emojiLabel = this._comments
          .getElement()
          .querySelectorAll(`.film-details__emoji-item`);
        this.init();
      });
    });

    const popupBottomContainer = this._popup
      .getElement()
      .querySelector(".form-details__bottom-container");

    render(popupBottomContainer, this._comments.getElement(), "beforeend");

    this._comments.addCallbackForEachEmojiOption(evt => {
      evt.preventDefault();

      const emojiId = evt.target.id;
      this._currentEmoji = Emojis[emojiId];

      this._popup
        .getElement()
        .querySelector(".film-details__add-emoji-label img").src = getEmojiUrl(
        emojiId
      );
    });

    const onAddComment = evt => {
      if (
        (evt.ctrlKey && evt.keyCode === 13) ||
        (evt.keyCode === 13 && evt.metaKey)
      ) {
        const formData = new FormData(
          this._popup.getElement().querySelector(".film-details__inner")
        );
        const newComment = {
          emoji: this._currentEmoji || `angry`,
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
        document.removeEventListener(`keydown`, onAddComment);
        this._comments = new Comments(this._film);
        this._emojiLabel = this._comments
          .getElement()
          .querySelectorAll(`.film-details__emoji-item`);
        this.init();
      }
    };

    this._comments.addCallbackOnTextInputFocus(evt => {
      evt.preventDefault();
      document.addEventListener(`keydown`, onAddComment);
    });
  }
}

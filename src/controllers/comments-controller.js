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
  constructor(popup, comments, onCommentsChange) {
    this._popup = popup;
    this._onCommentsChange = onCommentsChange;

    this._comments = new Comments(comments);
    this._currentEmoji = undefined;

    this.init = this.init.bind(this);
  }

  _renderComments() {
    render(
      this._popup.getCommentsContainer(),
      this._comments.getElement(),
      "beforeend"
    );
  }

  _unrenderComments() {
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

        this._comments = [
          ...this.comments.slice(0, idx),
          ...this.comments.slice(idx + 1)
        ];
        this._onCommentsChange(this._comments);
        this._unrenderComments();
        this._comments = new Comments(this._comments);
        this.init();
      });
    });

    this._renderComments();

    this._comments.addCallbackForEachEmojiOption(evt => {
      evt.preventDefault();
      const emojiId = evt.target.id;

      this._currentEmoji = Emojis[emojiId];
      this._comments.updateSelectedEmojiUrl(getEmojiUrl(emojiId));
    });

    const onAddComment = evt => {
      if (
        (evt.ctrlKey && evt.keyCode === 13) ||
        (evt.keyCode === 13 && evt.metaKey)
      ) {
        const formData = new FormData(this._popup.getFormElement());

        const newComment = {
          emoji: this._currentEmoji || `angry`,
          text: formData.get(`comment`),
          name: "You",
          date: new Date().toISOString().slice(0, 10)
        };

        this._comments = [...this.comments, newComment];
        this._onCommentsChange(this._comments);

        this._unrenderComments();
        document.removeEventListener(`keydown`, onAddComment);
        this._comments = new Comments(this._comments);
        this.init();
      }
    };

    this._comments.addCallbackOnTextInputFocus(evt => {
      evt.preventDefault();
      document.addEventListener(`keydown`, onAddComment);
    });
  }
}

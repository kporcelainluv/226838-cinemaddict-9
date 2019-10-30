import { CommentsSection } from "../components/commentsComponent";
import { render, unrender } from "../utils";
import { UPDATE_TYPE } from "../consts";

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
    this._comments = comments;

    this._commentsSection = new CommentsSection(comments);
    this._currentEmoji = undefined;

    this.init = this.init.bind(this);
    this._rerenderComments = this._rerenderComments.bind(this);
    this._unrenderComments = this._unrenderComments.bind(this);
    this._renderComments = this._renderComments.bind(this);
  }

  _renderComments() {
    render(
      this._popup.getCommentsContainer(),
      this._commentsSection.getElement(),
      "beforeend"
    );
  }

  _unrenderComments() {
    unrender(this._commentsSection.getElement());
    this._commentsSection.removeElement();
  }

  _rerenderComments(comments) {
    this._unrenderComments();
    this._commentsSection = new CommentsSection(comments);
    this.init();
  }

  init() {
    this._commentsSection.addCallbackOnEachDeleteBtnClick(idx => {
      // change btn title
      // disable btn
      this._comments = [
        ...this._comments.slice(0, idx),
        ...this._comments.slice(idx + 1)
      ];
      this._onCommentsChange(this._comments, {
        updateType: UPDATE_TYPE.DELETE_COMMENT,
        onSuccess: () => {
          this._rerenderComments(this._comments);
          // enable btn
          // change btn title
        }
      });
    });

    this._renderComments();

    this._commentsSection.addCallbackForEachEmojiOption(evt => {
      evt.preventDefault();
      const emojiId = evt.target.id;

      this._currentEmoji = Emojis[emojiId];
      this._commentsSection.updateSelectedEmojiUrl(getEmojiUrl(emojiId));
    });

    const onAddComment = evt => {
      if (
        (evt.ctrlKey && evt.keyCode === 13) ||
        (evt.keyCode === 13 && evt.metaKey)
      ) {
        const formData = new FormData(this._popup.getFormElement());

        const newComment = {
          emotion: this._currentEmoji || `angry`,
          comment: formData.get(`comment`),
          author: "",
          date: new Date().toISOString().slice(0, 10)
        };

        this._comments = [...this._comments, newComment];
        this._onCommentsChange(this._comments, {
          updateType: UPDATE_TYPE.CREATE_COMMENT,
          onSuccess: comments => {
            document.removeEventListener(`keydown`, onAddComment);
            this._rerenderComments(comments);
          }
        });
      }
    };

    this._commentsSection.addCallbackOnTextInputFocus(evt => {
      evt.preventDefault();
      document.addEventListener(`keydown`, onAddComment);
    });
  }
}

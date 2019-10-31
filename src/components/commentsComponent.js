import moment from "moment";
import { AbstractComponent } from "./abstractComponent";

export class CommentsSection extends AbstractComponent {
  constructor(comments) {
    super();
    this._comments = comments;
    this._commentsLen = comments.length;
  }

  getTemplate() {
    return `<section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${
          this._commentsLen
        }</span></h3>
        <ul class="film-details__comments-list">
        
        ${this._comments.reduce((acc, comment) => {
          acc += `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${
                comment.emotion
              }.png" width="55" height="55" alt="emoji">
            </span>
            <div>
              <p class="film-details__comment-text">${comment.comment}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${
                  comment.author
                }</span>
                <span class="film-details__comment-day">${moment(
                  comment.date
                ).format(`YY/MM/DD HH:MM`)}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`;
          return acc;
        }, ``)}
        </ul>

        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label">
                    <img src="images/emoji/angry.png" width="55" height="55" alt="emoji"></div>

          <label class="film-details__comment-label">

            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="neutral-face">
            <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="grinning">
            <label class="film-details__emoji-label" for="emoji-gpuke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="grinning">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
  `;
  }

  addCallbackOnTextInputFocus(callback) {
    this.getElement()
      .querySelector(`.film-details__comment-input`)
      .addEventListener(`focus`, callback);
  }

  addCallbackForEachEmojiOption(callback) {
    const emojiOptions = this.getElement().querySelectorAll(
      `.film-details__emoji-item`
    );

    Array.from(emojiOptions).forEach(emoji => {
      emoji.addEventListener(`click`, callback);
    });
  }

  updateSelectedEmojiUrl(newUrl) {
    this.getElement().querySelector(
      `.film-details__add-emoji-label img`
    ).src = newUrl;
  }

  addCallbackOnEachDeleteBtnClick(callback) {
    const commentList = this.getElement().querySelectorAll(
      `.film-details__comment-delete`
    );

    Array.from(commentList).forEach((comment, idx) => {
      comment.addEventListener(`click`, evt => {
        evt.preventDefault();
        callback(idx);
      });
    });
  }
  changeHeadingOnBtnClick(state, idx) {
    if (state === `deleting`) {
      const button = this.getElement().querySelectorAll(
        `.film-details__comment-delete`
      )[idx];
      button.innerHTML = `Deleting...`;
      button.disabled = true;
    } else {
      const button = this.getElement().querySelectorAll(
        `.film-details__comment-delete`
      )[idx];
      button.innerHTML = `Delete`;
      button.disabled = false;
    }
  }
}

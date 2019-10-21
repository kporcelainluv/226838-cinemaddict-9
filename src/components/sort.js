import { AbstractComponent } from "./abstractComponent";

export class Sort extends AbstractComponent {
  constructor() {
    super();
  }
  getTemplate() {
    return `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type="default">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type="date">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type="rating">Sort by rating</a></li>
    </ul>`;
  }

  addCallbackOnSortBtnClick(callback) {
    const sortBtns = this.getElement().querySelectorAll(".sort__button");

    Array.from(sortBtns).forEach(btn =>
      btn.addEventListener("click", callback)
    );
  }
  makeBtnActiveByType(type) {
    this.getElement()
      .querySelector(`.sort__button--active`)
      .classList.remove(`sort__button--active`);

    const sortBtns = this.getElement().querySelectorAll(".sort__button");
    const index = Array.from(sortBtns).findIndex(
      btn => btn.dataset.sortType === type
    );
    sortBtns[index].classList.add(`sort__button--active`);
  }
  hide() {
    this.getElement().classList.add(`visually-hidden`);
  }
  show() {
    this.getElement().classList.remove(`visually-hidden`);
  }
}

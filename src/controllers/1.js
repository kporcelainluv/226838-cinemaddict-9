// data.js
const getTask = () => ({
  description: [
    `Prepare for the pitch`,
    `Find money for travel`,
    `Eat something`
  ][Math.floor(Math.random() * 3)],
  dueDate: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
  tags: new Set([`cinema`, `entertainment`, `myself`, `cinema`]),
  repeatingDays: {
    mo: false,
    tu: false,
    we: Boolean(Math.round(Math.random())),
    th: false,
    fr: false,
    sa: false,
    su: false
  },
  color: [`black`, `yellow`, `blue`, `green`, `pink`][
    Math.floor(Math.random() * 5)
  ]
});

// utils.js
const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const Key = {
  ESCAPE_IE: `Escape`,
  ESCAPE: `Esc`
};

const createElement = template => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

// Рендер и анрендер для компонент
const render = (container, element, place) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
  }
};

const unrender = element => {
  if (element) {
    element.remove();
  }
};

// components/absctract-component.js
class AbstractComponent {
  constructor() {
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    throw Error(`Abstract method not implemented`);
  }
}

// component/board.js
class Board extends AbstractComponent {
  getTemplate() {
    return `<section class="board container"></section>`;
  }
}

// components/sort.js
class Sort extends AbstractComponent {
  getTemplate() {
    return `<div class="board__filter-list">
          <a href="#" data-sort-type="default" class="board__filter">SORT BY DEFAULT</a>
          <a href="#" data-sort-type="date-up" class="board__filter">SORT BY DATE up</a>
          <a href="#" data-sort-type="date-down" class="board__filter">SORT BY DATE down</a>
      </div>`;
  }
}

// components/task-list.js
class TaskList extends AbstractComponent {
  getTemplate() {
    return `<div class="board__tasks"></div>`;
  }
}

// components/task.js
class Task extends AbstractComponent {
  constructor({ description, dueDate, tags, color, repeatingDays }) {
    super();
    this._description = description;
    this._dueDate = new Date(dueDate);
    this._tags = tags;
    this._color = color;
    this._repeatingDays = repeatingDays;
  }

  // Метод getElement нам больше не нужен, т.к.
  // он не требует уточнения и реализован в
  // абстрактном классе.

  getTemplate() {
    return `<article class="card card--${this._color} ${
      Object.values(this._repeatingDays).some(it => it) ? `card--repeat` : ``
    }">
        <div class="card__form">
          <div class="card__inner">
            <div class="card__control">
              <button type="button" class="card__btn card__btn--edit">
                edit
              </button>
              <button type="button" class="card__btn card__btn--archive">
                archive
              </button>
              <button
                type="button"
                class="card__btn card__btn--favorites card__btn--disabled"
              >
                favorites
              </button>
            </div>
      
            <div class="card__color-bar">
              <svg class="card__color-bar-wave" width="100%" height="10">
                <use xlink:href="#wave"></use>
              </svg>
            </div>
      
            <div class="card__textarea-wrap">
              <p class="card__text">${this._description}</p>
            </div>
      
            <div class="card__settings">
              <div class="card__details">
                <div class="card__dates">
                  <div class="card__date-deadline">
                    <p class="card__input-deadline-wrap">
                      <span class="card__date">${new Date(
                        this._dueDate
                      ).toDateString()}</span>
                    </p>
                  </div>
                </div>
      
                <div class="card__hashtag">
                  <div class="card__hashtag-list">
                    ${Array.from(this._tags)
                      .map(
                        tag => `<span class="card__hashtag-inner">
                      <span class="card__hashtag-name">
                        #${tag}
                      </span>
                    </span>`
                      )
                      .join(``)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>`;
  }
}

// components/task-edit.js
class TaskEdit extends AbstractComponent {
  constructor({ description, dueDate, tags, color, repeatingDays }) {
    super();
    this._description = description;
    this._dueDate = new Date(dueDate);
    this._tags = tags;
    this._color = color;
    this._repeatingDays = repeatingDays;

    this._subscribeOnEvents();
  }

  getTemplate() {
    return `<article class="card card--edit card--${this._color} ${
      Object.values(this._repeatingDays).some(it => it) ? `card--repeat` : ``
    }">
          <form class="card__form" method="get">
            <div class="card__inner">
              <div class="card__control">
                <button type="button" class="card__btn card__btn--archive">
                  archive
                </button>
                <button
                  type="button"
                  class="card__btn card__btn--favorites card__btn--disabled"
                >
                  favorites
                </button>
              </div>
  
              <div class="card__color-bar">
                <svg class="card__color-bar-wave" width="100%" height="10">
                  <use xlink:href="#wave"></use>
                </svg>
              </div>
  
              <div class="card__textarea-wrap">
                <label>
                  <textarea
                    class="card__text"
                    placeholder="Start typing your text here..."
                    name="text"
                  >${this._description}</textarea>
                </label>
              </div>
  
              <div class="card__settings">
                <div class="card__details">
                  <div class="card__dates">
                    <button class="card__date-deadline-toggle" type="button">
                      date: <span class="card__date-status">yes</span>
                    </button>
  
                    <fieldset class="card__date-deadline">
                      <label class="card__input-deadline-wrap">
                        <input
                          class="card__date"
                          type="text"
                          placeholder=""
                          name="date"
                          value="${this._dueDate.toDateString()}"
                        />
                      </label>
                    </fieldset>
  
                    <button class="card__repeat-toggle" type="button">
                      repeat:<span class="card__repeat-status">yes</span>
                    </button>
  
                    <fieldset class="card__repeat-days">
                      <div class="card__repeat-days-inner">
                        ${Object.keys(this._repeatingDays)
                          .map(
                            day => `
                          <input
                            class="visually-hidden card__repeat-day-input"
                            type="checkbox"
                            id="repeat-${day}-4"
                            name="repeat"
                            value="${day}"
                            ${this._repeatingDays[day] ? `checked` : ``}
                          />
                          <label class="card__repeat-day" for="repeat-${day}-4"
                            >${day}</label
                          >
                        `
                          )
                          .join(``)}
                      </div>
                    </fieldset>
                  </div>
  
                  <div class="card__hashtag">
                    <div class="card__hashtag-list">
                      
                      ${Array.from(this._tags)
                        .map(tag =>
                          `
                        <span class="card__hashtag-inner">
                          <input
                            type="hidden"
                            name="hashtag"
                            value="${tag}"
                            class="card__hashtag-hidden-input" 
                          />
                          <p class="card__hashtag-name">
                           #${tag}
                          </p>
                        <button type="button" class="card__hashtag-name">#${tag}</button>
                        <button type="button" class="card__hashtag-delete">
                          delete
                        </button>
                      </span>`.trim()
                        )
                        .join("")}
                    </div>
  
                    <label>
                      <input
                        type="text"
                        class="card__hashtag-input"
                        name="hashtag-input"
                        placeholder="Type new hashtag here"
                      />
                    </label>
                  </div>
                </div>
  
                <div class="card__colors-inner">
                  <h3 class="card__colors-title">Color</h3>
                  <div class="card__colors-wrap">
                    <input
                      type="radio"
                      id="color-black-4"
                      class="card__color-input card__color-input--black visually-hidden"
                      name="color"
                      value="black"
                    />
                    <label
                      for="color-black-4"
                      class="card__color card__color--black"
                      >black</label
                    >
                    <input
                      type="radio"
                      id="color-yellow-4"
                      class="card__color-input card__color-input--yellow visually-hidden"
                      name="color"
                      value="yellow"
                      checked
                    />
                    <label
                      for="color-yellow-4"
                      class="card__color card__color--yellow"
                      >yellow</label
                    >
                    <input
                      type="radio"
                      id="color-blue-4"
                      class="card__color-input card__color-input--blue visually-hidden"
                      name="color"
                      value="blue"
                    />
                    <label
                      for="color-blue-4"
                      class="card__color card__color--blue"
                      >blue</label
                    >
                    <input
                      type="radio"
                      id="color-green-4"
                      class="card__color-input card__color-input--green visually-hidden"
                      name="color"
                      value="green"
                    />
                    <label
                      for="color-green-4"
                      class="card__color card__color--green"
                      >green</label
                    >
                    <input
                      type="radio"
                      id="color-pink-4"
                      class="card__color-input card__color-input--pink visually-hidden"
                      name="color"
                      value="pink"
                    />
                    <label
                      for="color-pink-4"
                      class="card__color card__color--pink"
                      >pink</label
                    >
                  </div>
                </div>
              </div>
  
              <div class="card__status-btns">
                <button class="card__save" type="submit">save</button>
                <button class="card__delete" type="button">delete</button>
              </div>
            </div>
          </form>
        </article>`;
  }

  _subscribeOnEvents() {
    this.getElement()
      .querySelector(`.card__hashtag-input`)
      .addEventListener(`keydown`, evt => {
        if (evt.key === `Enter`) {
          evt.preventDefault();
          this.getElement()
            .querySelector(`.card__hashtag-list`)
            .insertAdjacentHTML(
              `beforeend`,
              `<span class="card__hashtag-inner">
            <input
              type="hidden"
              name="hashtag"
              value="${evt.target.value}"
              class="card__hashtag-hidden-input"
            />
            <p class="card__hashtag-name">
              #${evt.target.value}
            </p>
            <button type="button" class="card__hashtag-delete">
              delete
            </button>
          </span>`
            );
          evt.target.value = ``;
        }
      });
  }
}

// controllers/task.js
class TaskController {
  constructor(container, data) {
    this._container = container;
    this._data = data;
    this._taskView = new Task(data);
    this._taskEdit = new TaskEdit(data);
  }
}

// controllers/board.js
class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._board = new Board();
    this._sort = new Sort();
    this._taskList = new TaskList();
  }

  init() {
    render(this._container, this._board.getElement(), Position.BEFOREEND);
    render(
      this._board.getElement(),
      this._sort.getElement(),
      Position.AFTERBEGIN
    );
    render(
      this._board.getElement(),
      this._taskList.getElement(),
      Position.BEFOREEND
    );

    this._tasks.forEach(taskMock => this._renderTask(taskMock));

    this._sort
      .getElement()
      .addEventListener(`click`, evt => this._onSortLinkClick(evt));
  }

  _renderTask(task) {
    new TaskController(this._taskList, task);
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    this._taskList.getElement().innerHTML = ``;

    switch (evt.target.dataset.sortType) {
      case `date-up`:
        const sortedByDateUpTasks = this._tasks
          .slice()
          .sort((a, b) => a.dueDate - b.dueDate);
        sortedByDateUpTasks.forEach(taskMock => this._renderTask(taskMock));
        break;
      case `date-down`:
        const sortedByDateDownTasks = this._tasks
          .slice()
          .sort((a, b) => b.dueDate - a.dueDate);
        sortedByDateDownTasks.forEach(taskMock => this._renderTask(taskMock));
        break;
      case `default`:
        this._tasks.forEach(taskMock => this._renderTask(taskMock));
        break;
    }
  }
}

// main.js
const TASK_COUNT = 3;
const taskMocks = new Array(TASK_COUNT).fill(``).map(getTask);

const tasksContainer = document.querySelector(`.board__tasks`);
const boardController = new BoardController(tasksContainer, taskMocks);
boardController.init();

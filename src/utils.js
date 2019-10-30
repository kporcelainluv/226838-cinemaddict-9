import { POSITION } from "./consts";

const createElement = template => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

const render = (container, element, place) => {
  switch (place) {
    case POSITION.AFTERBEGIN:
      container.prepend(element);
      break;
    case POSITION.BEFOREEND:
      container.append(element);
      break;
  }
};

const unrender = element => {
  if (element) {
    element.remove();
  }
};

const countHoursAndMins = mins => {
  const hours = Math.floor(mins / 60);
  const minutes = mins - hours * 60;
  return [hours, minutes];
};
export { createElement, render, unrender, countHoursAndMins };


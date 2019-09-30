const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const createElement = template => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement;
};

const render1 = (container, element, place) => {
  // switch (place) {
  //   case Position.AFTERBEGIN:
  //     container.prepend(element);
  //     break;
  //   case Position.BEFOREEND:
  //     container.append(element);
  //     break;
  // }
  container.insertAdjacentHTML(place, element);
};

const unrender = element => {
  if (element) {
    element.remove();
  }
};
export { createElement, render1, unrender };

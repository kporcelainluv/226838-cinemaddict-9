const mainElement = document.getElementById(`main`);
mainElement.querySelector(`.start__button`).onclick = evt => {
  evt.preventDefault();
  const greeting = document.createElement(`p`);
  greeting.innerHTML = `Время приключений!\n` + `Поехали!`;
  mainElement.appendChild(greeting);
};

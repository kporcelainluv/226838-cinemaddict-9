import { AbstractComponent } from "./abstractComponent";

export class StatsList extends AbstractComponent {
  constructor() {
    super();
    this._filmsAmount = 10;
  }

  getTemplate() {
    return `<ul class="statistic__text-list">
  <li class="statistic__text-item">
    <h4 class="statistic__item-title">You watched</h4>
    <p class="statistic__item-text">
      ${this._filmsAmount} <span class="statistic__item-description">movies</span>
    </p>
  </li>
  <li class="statistic__text-item">
    <h4 class="statistic__item-title">Total duration</h4>
    <p class="statistic__item-text">
      130 <span class="statistic__item-description">h</span> 22
      <span class="statistic__item-description">m</span>
    </p>
  </li>
  <li class="statistic__text-item">
    <h4 class="statistic__item-title">Top genre</h4>
    <p class="statistic__item-text">Sci-Fi</p>
  </li>
</ul>;`;
  }
}

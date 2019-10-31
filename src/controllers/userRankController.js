import { StatsRank } from "../components/statsRank";
import { render, unrender, getWatchedFilms } from "../utils";

export class UserRankController {
  constructor(container) {
    this._container = container;
    this._statsRank = new StatsRank(null);
  }

  getStatsRank(watchedAmount) {
    let rank = ``;
    if (watchedAmount < 10) {
      rank = `novice`;
    } else if (watchedAmount < 20) {
      rank = `fan`;
    } else if (watchedAmount >= 20) {
      rank = `movie buff`;
    }
    return rank;
  }

  render(films) {
    const watched = getWatchedFilms(films);
    this.unrender();

    this._statsRank = new StatsRank(this.getStatsRank(watched));
    render(
      this._container.getElement(),
      this._statsRank.getElement(),
      `afterbegin`
    );
  }
  unrender() {
    if (this._container.getElement().contains(this._statsRank.getElement())) {
      unrender(this._statsRank.getElement());
      this._statsRank.removeElement();
    }
  }
}

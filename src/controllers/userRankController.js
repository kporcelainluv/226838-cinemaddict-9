import { StatsRank } from "../components/statsRank";
import { render, unrender } from "../utils";

export class UserRankController {
  constructor(container, films) {
    this._container = container;
    this._films = films;
    this._rank = undefined;

    this._statsRank = new StatsRank(null);
  }

  getStatsRank(films) {
    let rank = ``;
    if (films.length === 0) {
      rank = null;
    } else if (films.length < 10) {
      rank = `novice`;
    } else if (films.length < 20) {
      rank = `fan`;
    } else if (films.length >= 20) {
      rank = `movie buff`;
    }
    return rank;
  }

  renderRank() {
    this.unrender();
    this._rank = this.getStatsRank(this._films);

    if (this._rank !== null) {
      this._statsRank = new StatsRank(this._rank);
      render(
        this._container.getElement(),
        this._statsRank.getElement(),
        "afterbegin"
      );
    }
  }
  unrender() {
    unrender(this._statsRank.getElement());
    this._statsRank.removeElement();
  }
}

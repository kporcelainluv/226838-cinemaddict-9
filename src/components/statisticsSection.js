import { AbstractComponent } from "./abstractComponent";

export class StatisticsSection extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<section class="statistic"></section>`;
  }
}

// `<section class="statistic">
//
//
//
//
//
//     <div class="statistic__chart-wrap">
//       <canvas class="statistic__chart" width="1000"></canvas>
//     </div>
//
//   </section>`;

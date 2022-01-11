import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { calcDuration } from '../utils/date.js';
import { calcMoneyValuesForChart, calcTypeValuesForChart, calcTimeValuesForChart } from '../utils/stats.js';

import { SmartView } from './smart-view.js';

const BAR_HEIGHT = 55;

/**
 * Отрисовка графика Money
 */
const renderMoneyChart = (moneyCtx, points) => {
  const prices = calcMoneyValuesForChart(points);
  const names = [];
  const values = [];
  for (let i = 0; i < prices.length; i++) {
    names[i] = prices[i].name;
    values[i] = prices[i].value;
  }
  moneyCtx.height = prices.length * BAR_HEIGHT;
  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: names,
      datasets: [
        {
          data: values,
          backgroundColor: '#ffffff',
          hoverBackgroundColor: '#ffffff',
          anchor: 'start',
          barThickness: 44,
          minBarLength: 50,
        },
      ],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `€ ${val}`,
        },
      },
      title: {
        display: true,
        text: 'MONEY',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: '#000000',
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          },
        ],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

/**
 * Отрисовка графика Type
 */
const renderTypeChart = (typeCtx, points) => {
  const types = calcTypeValuesForChart(points);
  const names = [];
  const counts = [];
  for (let i = 0; i < types.length; i++) {
    names[i] = types[i].name;
    counts[i] = types[i].count;
  }
  typeCtx.height = types.length * BAR_HEIGHT;
  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: names,
      datasets: [
        {
          data: counts,
          backgroundColor: '#ffffff',
          hoverBackgroundColor: '#ffffff',
          anchor: 'start',
          barThickness: 44,
          minBarLength: 50,
        },
      ],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${val}x`,
        },
      },
      title: {
        display: true,
        text: 'TYPE',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: '#000000',
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          },
        ],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

/**
 * Отрисовка графика Time
 */
const renderTimeChart = (timeCtx, points) => {
  const times = calcTimeValuesForChart(points);
  const names = [];
  const values = [];
  for (let i = 0; i < times.length; i++) {
    names[i] = times[i].name;
    values[i] = times[i].value;
  }
  timeCtx.height = times.length * BAR_HEIGHT;
  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: names,
      datasets: [
        {
          data: values,
          backgroundColor: '#ffffff',
          hoverBackgroundColor: '#ffffff',
          anchor: 'start',
          barThickness: 44,
          minBarLength: 50,
        },
      ],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${calcDuration(val)}`,
        },
      },
      title: {
        display: true,
        text: 'TIME',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: '#000000',
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          },
        ],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

/**
 * Разметка статистики
 */
const createStatisticsTemplate = () => `<section class="statistics">
          <h2 class="visually-hidden">Trip statistics</h2>

          <div class="statistics__item">
            <canvas class="statistics__chart" id="money" width="900"></canvas>
          </div>

          <div class="statistics__item">
            <canvas class="statistics__chart" id="type" width="900"></canvas>
          </div>

          <div class="statistics__item">
            <canvas class="statistics__chart" id="time" width="900"></canvas>
          </div>
        </section>`;

/**
 * Статистика
 */
class StatsView extends SmartView {
  #moneyChart = null;
  #typeChart = null;
  #timeChart = null;

  constructor(points) {
    super();

    this._data = points;
    this.#setCharts();
  }

  get template() {
    return createStatisticsTemplate(this._data);
  }

  removeElement = () => {
    super.removeElement();
    if (this.#moneyChart) {
      this.#moneyChart.destroy();
      this.#moneyChart = null;
    }

    if (this.#typeChart) {
      this.#typeChart.destroy();
      this.#typeChart = null;
    }

    if (this.#timeChart) {
      this.#timeChart.destroy();
      this.#timeChart = null;
    }
  };

  restoreHandlers = () => {
    this.#setCharts();
  };

  #setCharts = () => {

    const moneyCtx = this.element.querySelector('#money');
    const typeCtx = this.element.querySelector('#type');
    const timeCtx = this.element.querySelector('#time');

    this.#moneyChart = renderMoneyChart(moneyCtx, this._data);
    this.#typeChart = renderTypeChart(typeCtx, this._data);
    this.#timeChart = renderTimeChart(timeCtx, this._data);
  };
}

export { StatsView };

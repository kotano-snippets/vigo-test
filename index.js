const HOST = 'http://127.0.0.1:3000';

const form = document.forms['chart-form'];
const categoryEl = form.category;
const categoryValueEl = form.categoryValue;

let chartData;

function loadChart() {
  if (!chartData) {
    document.getElementById('chart-container').innerText = 'Configure chart options and press on Draw button';
    return;
  }
  const series = Object.entries(chartData.data).map(([key, val]) => ({ name: key, data: [val] }));
  // eslint-disable-next-line no-undef
  Highcharts.chart('chart-container', {
    chart: {
      type: 'column',
    },
    title: {
      text: `${chartData.category} X ${chartData.value}`,
    },
    xAxis: {
    },
    yAxis: {
      title: {
        text: `Total ${chartData.value}`,
      },
    },
    series,
  });
}

async function init() {
  const response = await fetch(HOST);
  const responseData = await response.json();
  const schema = Object.entries(responseData[0]);
  const keys = [];
  const numKeys = [];
  schema.forEach(([key, val]) => {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = key;
    if (typeof val === 'number') {
      numKeys.push(option);
    }
    keys.push(option);
  });

  categoryEl.replaceChildren(...keys);
  categoryValueEl.replaceChildren(...numKeys);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const cat = categoryEl.value;
    const val = categoryValueEl.value;
    const data = {};
    responseData.forEach((item) => {
      const name = item[cat];
      const value = item[val];
      if (data[name]) {
        data[name] += value;
      } else {
        data[name] = value;
      }
    });
    chartData = {};
    chartData.data = data;
    chartData.category = cat;
    chartData.value = val;
    loadChart();
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  await init();
  loadChart();
});

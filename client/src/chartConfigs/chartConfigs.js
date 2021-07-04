/* eslint-disable */
export const formatData = (coin, time) => {
  const xValues = [];
  const yValues = [];
  let yMax = Number.NEGATIVE_INFINITY;

  time.map((ele) => {
    xValues.push(ele[0]);
    yValues.push(ele[1]);
    if (ele[1] > yMax) yMax = ele[1];
  });

  return {
    labels: xValues,
    datasets: [
      {
        label: `${coin}`,
        data: yValues,
        borderColor: 'rgb(65, 182, 104)',
        backgroundColor: 'rgb(65, 182, 104)',
        borderWidth: 1,
        pointRadius: 0,
      },
    ],
    yMax,
  };
};

const selectTimeFormat = (selected) => {
  if (selected === 'day') {
    return {
      unit: 'hour',
    };
  } else if (selected === 'week') {
    return {
      unit: 'day',
    };
  } else if (selected === 'month') {
    return {
      unit: 'day',
    };
  } else if (selected === 'year') {
    return {
      unit: 'month',
    };
  } else if (selected === 'threeYears') {
    return {
      unit: 'month',
    };
  }
};

const numberWithCommas = (x) => {
  if (x <= 1) {
    return x;
  }
  let y = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return y;
};

export const historyOptions = (selected, yMax) => {
  const magnitude = -Math.floor(Math.log(yMax) / Math.log(10) + 1) + 3; //number of zeros
  const roundFactor = Math.pow(10, magnitude);

  const timeFormat = selectTimeFormat(selected);

  return {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        intersect: false,
        mode: 'nearest',
      },
    },
    lineHeightAnnotation: {
      always: true,
      hover: false,
      lineWeight: 1.5,
    },

    animation: {
      duration: 2000,
    },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        type: 'time',
        distribution: 'linear',
        time: timeFormat,
        ticks: {
          callback: function (val, index) {
            return index % 2 === 0 ? val : '';
          },
        },
      },
      y: {
        ticks: {
          callback: function (val, index) {
            return (
              '$' +
              numberWithCommas(Math.round(val * roundFactor) / roundFactor)
            );
          },
        },
      },
    },
  };
};

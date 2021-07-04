/* eslint-disable */
import React, { useRef, useEffect } from 'react';
import { Line, defaults } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { historyOptions, formatData } from '../chartConfigs/chartConfigs';
export function HistoryChart({ coin, data, selected }) {
  const chartData = formatData(coin, data);
  const yMax = chartData.yMax;

  return (
    <div className="chart">
      {chartData && (
        <Line data={chartData} options={historyOptions(selected, yMax)} />
      )}
    </div>
  );
}

export const MemoizedHistoryChart = React.memo(HistoryChart);

import React from 'react';
import { Scatter } from 'react-chartjs-2';
import 'chart.js/auto';

const MatrixChart = ({ data, options }) => {
  const scatterData = {
    datasets: [
      {
        label: 'Matrix Data',
        data: data,
        backgroundColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };

  return <Scatter data={scatterData} options={options} />;
};

export default MatrixChart;

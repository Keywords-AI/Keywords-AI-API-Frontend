import React from 'react'; 
import './HeatChart.css';

const cellSize = 100;
const cellWidth = 150;
const cellHeight = 50;
const cellPadding = 2;
const fontSize = 14;
const colors = ['#f0f9e8', '#bae4bc', '#7bccc4', '#2b8cbe'];
const Heatmap = ({ xLabels, yLabels, data }) => {
 
  const getColor = (value) => {
    const index = Math.min(colors.length - 1, Math.floor(value * colors.length));
    return colors[index];
  };

  
  const getTextFillColor = (value) => {
    
    return value > 0.5 ? 'white' : 'black';
  };

  
  const cells = data.flatMap((row, y) =>
    row.map((value, x) => [
      <rect
        key={`cell-${x}-${y}`}
        className='heatmap-cell'
        x={150 + x * (cellWidth + cellPadding)}
        y={150 + y * (cellHeight + cellPadding)}
        width={cellWidth}
        height={cellHeight}
        fill={getColor(value)}
      />,
      <text
        key={`text-${x}-${y}`}
        x={150 + x * (cellWidth + cellPadding) + cellWidth / 2}
        y={150 + y * (cellHeight + cellPadding) + cellHeight / 2 + fontSize / 3} 
        textAnchor="middle"
        fill={getTextFillColor(value)}
        style={{ fontSize, pointerEvents: 'none' }}
      >
        {value.toFixed(2)} {}
      </text>
    ])
  );

  
  const xLabelsComponent = xLabels.map((label, index) => (
    <text
      key={index}
      x={150 + index * (cellWidth + cellPadding) + cellWidth / 2}
      y={150 - 0.5 * cellHeight - cellPadding * 2}
      textAnchor="middle"
      fill="white"
      style={{ fontSize }}
    >
      {label}
    </text>
  ));

  
  const yLabelsComponent = yLabels.map((label, index) => (
    <text
      key={index}
      x={150 - 0.5 * cellWidth - cellPadding * 2}
      y={150 + index * (cellHeight + cellPadding) + cellHeight / 2 + fontSize / 3} 
      textAnchor="middle"
      fill="white"
      style={{ fontSize }}
    >
      {label}
    </text>
  ));

  return (
    <svg
      width={(cellWidth + cellPadding) * xLabels.length + 2 * cellPadding + 400}
      height={(cellHeight + cellPadding) * yLabels.length + 2 * cellPadding + 400}
    >
      <g transform={`translate(${cellPadding * 3}, ${cellPadding * 2 + fontSize})`}>
        {cells.flat()}
        {xLabelsComponent}
        {yLabelsComponent}
      </g>
    </svg>
  );
};

const EvaluationPage = () => {
  const xLabels = ['Context Precision', 'Faithfulness', 'Answer Relevance', 'Flesch–Kincaid Readability', 'Sentiment'];
  const yLabels = ['gpt-4', 'gpt-3.5-turbo', 'claude-3-haiku'];
  const data = [
    [0.78, 0.6, 0.3, 0.4, 0.8],
    [0.5, 0.4, 0.2, 0.7, 0.8],
    [0.9, 0.7, 0.6, 0.7, 0.7]
  ];
  const transformedData = data.flatMap((row, i) => 
  row.map((value, j) => ({
    x: xLabels[j],
    y: yLabels[i],
    value
  }))
);

  return (
    <div>
      <Heatmap xLabels={xLabels} yLabels={yLabels} data={data} />
    </div>
  );
};

export default EvaluationPage;
import React, { Dispatch, FC, useState } from 'react';
import { PieChartData } from './App';
import '../styles/PieChart.css';

interface CircleData extends PieChartData {
  offset: number;
  persentDisplay: number;
  color: string;
  persent: number;
}
interface Props {
  setPieChartData: Dispatch<React.SetStateAction<PieChartData[]>>;
  pieChartData: Array<PieChartData>;
}
const icon = (color: string): JSX.Element => {
  return (
    <div
      style={{
        backgroundColor: color,
        display: 'inline-block',
        width: '20px',
        height: '20px',
      }}></div>
  );
};
export const PieChart: FC<Props> = ({ pieChartData }) => {
  const [show, setShow] = useState({ show: false, index: 0 });
  const total: number = pieChartData.reduce(
    (acc, item) => item.amount + acc,
    0,
  );
  const appdatedPieData: CircleData[] = pieChartData.reduce(
    (arr, item, index) => {
      const persentDisplay: number = (2 * 25 * Math.PI * item.amount) / total;
      const offset: number =
        index === 0
          ? 0
          : -arr[index - 1].persentDisplay + arr[index - 1].offset;
      const persent: number = +((item.amount * 100) / total).toFixed(2);
      return [
        ...arr,
        {
          ...item,
          persentDisplay,
          offset,
          persent,
        },
      ];
    },
    [] as Array<CircleData>,
  );

  const pieChart = (array: CircleData[]): JSX.Element => {
    return (
      <div className="pie-chart">
        <ul className="prompt-items">
          {array.map((item, index) => {
            return (
              <li key={index}>
                {icon(item.color)} {item.position}
              </li>
            );
          })}
        </ul>
        <svg viewBox={`0 10 100 100`}>
          {array.map((item, index) => (
            <g
              key={index}
              onMouseMove={() => {
                setShow({ show: true, index });
              }}
              onMouseOut={() => {
                setShow({ show: false, index });
              }}
              className="pie-block">
              <circle
                r={25}
                cx={50}
                cy={50}
                id="pie"
                stroke={item.color}
                strokeWidth={50}
                strokeDasharray={`${item.persentDisplay} ${2 * 25 * Math.PI}`}
                strokeDashoffset={`${item.offset}`}
              />
              {show.show && show.index === index && (
                <text
                  x="50%"
                  y={115}
                  textAnchor="middle"
                  style={{ fontSize: '8px' }}>
                  {item.position !== '' ? item.position : 'Unknow'} -{' '}
                  {item.persent}%
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  };

  return <div>{pieChart(appdatedPieData)}</div>;
};

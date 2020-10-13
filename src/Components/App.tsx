import React, { FC, useState } from 'react';
import { Route, Switch } from 'react-router';

import '../styles/App.css';
import { PieForm } from './PieForm';
import { Nav } from './Nav';
import { PieChart } from './PieChart';

export type PieChartData = {
  position: string;
  amount: number;
  color: string;
};
export const App: FC = () => {
  const [pieChartData, setPieChartData] = useState<Array<PieChartData>>([
    { position: 'Apple', amount: 45, color: 'green' },
    { position: 'Cheery', amount: 17, color: 'red' },
    { position: 'Orange', amount: 30, color: 'orange' },
  ]);
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <PieChart
              pieChartData={pieChartData}
              setPieChartData={setPieChartData}
            />
          )}
        />
        <Route
          exact
          path="/form"
          render={() => (
            <PieForm
              pieChartData={pieChartData}
              setPieChartData={setPieChartData}
            />
          )}
        />
      </Switch>
    </div>
  );
};

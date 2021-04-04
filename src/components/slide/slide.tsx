import React, { ReactElement, useState } from 'react';
import Chart from 'react-google-charts';
import { Button } from 'rsuite';

import './slide.scss';

const d = [
  ['Point', 'Sol'],
  [1, 6.39],
  [2, 6.3],
  [3, 7.2],
  [4, 6.9],
  [5, 7.3],
  [6, 8.1],
  [7, 8.2],
  [8, 8.5],
  [9, 8.2],
  [10, 8.4],
  [11, 8.3],
  [12, 8.6],
  [13, 8.9],
  [14, 9.1],
  [15, 9.0],
  [16, 9.4],
  [17, 9.8],
  [18, 9.6],
  [19, 9.1],
  [20, 9.6],
  [21, 9.2],
  [22, 9.2],
  [23, 9.3],
  [24, 9.1],
  [25, 9.2],
  [26, 8.9],
  [27, 8.6],
  [28, 8.9],
];

export const Slide = (props): ReactElement => {
  return (
    <div className="slide" style={{ backgroundImage: props.data.background }}>
      <div className="container slide-inner">
        <div className="left">
          <div className="antext">{props.data.antext}</div>
          <div className="title">{props.data.title}</div>
          <div className="cta">
            <Button appearance="default">Stake now</Button>
          </div>
        </div>
        <div className="right">
          {props.k == 5 && (
            <Chart
              width={'600px'}
              height={'400px'}
              chartType="LineChart"
              loader={<div>Loading Chart</div>}
              data={d}
              options={{
                theme: 'maximized',
                backgroundColor: 'transparent',
                baselineColor: 'none',
                legend: 'none',
                curveType: 'function',
                pointSize: 4,
                animation: {
                  startup: true,
                  easing: 'out',
                  duration: 1000,
                },
                vAxis: {
                  textPosition: 'none',
                  gridlines: {
                    color: 'none',
                  },
                },
                hAxis: {
                  textPosition: 'none',
                  gridlines: {
                    color: 'none',
                  },
                },
                enableInteractivity: false,
              }}
              chartEvents={[
                {
                  eventName: 'animationfinish',
                  callback: () => {
                    console.log('Animation Finished');
                  },
                },
              ]}
              rootProps={{ 'data-testid': '2' }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

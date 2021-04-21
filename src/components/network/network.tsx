import React, { ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';
import { Area, AreaChart, ResponsiveContainer, YAxis } from 'recharts';
import { selectNetwork } from '../../redux/app';
import { INetwork } from '../../redux/types';

import './network.scss';

interface IProps {
  network: INetwork;
  classes: string;
  onClick: any;
}

export const Network = ({ network, classes, onClick }: IProps): ReactElement => {
  const selectedNetwork: INetwork = useSelector(selectNetwork);
  const [chartIndex, setChartIndex] = useState(1);

  return (
    <div className="network">
      <div
        className={`inner rs-btn-subtle ${classes} ${selectedNetwork && 'network-selected'}`}
        onClick={onClick}
        onMouseEnter={() => setChartIndex(chartIndex + 1)}
        role="button"
      >
        <span className="rs-ripple reveal-ripple"></span>
        <div className="top-part">
          <div className="logo">
            <img src={network.icon} alt={network.name} />
          </div>
          <div className="name">{network.name}</div>
          <div className="status">
            {network.mainnet &&
              (network.live ? <div className="led-green" /> : <div className="led-yellow" />)}
            {network.mainnet ? (
              network.live ? (
                <div className="status-text">Network is live</div>
              ) : (
                <div className="status-text">Coming soon</div>
              )
            ) : (
              <div className="status-text testnet">Testnet</div>
            )}
          </div>
        </div>
        {false && (
          <div className="chart" style={{ flex: '1', height: 'auto', width: '100%' }}>
            {network.history && (
              <ResponsiveContainer>
                <AreaChart
                  key={chartIndex}
                  // width={600}
                  // height={500}
                  data={network.history}
                  margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="networkGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#003885" stopOpacity={0.4} />
                      <stop offset="75%" stopColor="#003885" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#003885" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <YAxis width={0} domain={['auto', 'auto']} />
                  <Area
                    animationDuration={1000}
                    type="monotone"
                    dataKey="val"
                    stroke="none"
                    fill="url(#networkGrad)"
                    offset={20}
                    yAxisId={0}
                    animationEasing="ease"
                    dot={{
                      r: 0,
                    }}
                    activeDot={{
                      r: 0,
                    }}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        )}
        <div className="bottom-part">
          {network.mainnet ? (
            network.live ? (
              <div className="status-text">Delegate</div>
            ) : (
              <div className="status-text">More info</div>
            )
          ) : (
            <div className="status-text testnet">Testnet</div>
          )}
        </div>
      </div>
    </div>
  );
};

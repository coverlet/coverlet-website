import React, { PureComponent, ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Button from 'rsuite/lib/Button';
import { getNetworkData } from '../../redux/app';
import { Slide } from '../slide/slide';

import './carousel.scss';

const slides = [
  {
    subtitle: '0% commision until the end of March',
    title: 'Solana',
  },
  {
    subtitle: '230k million usd staked',
    title: 'Trusted and secure validator',
  },
  {
    subtitle: 'Latest technology',
    title: 'AMD Epyc 7538',
  },
];

export const Carousel = (): ReactElement => {
  const [browser, setBrowser] = useState(false);
  const [tooltip, showTooltip] = useState(false);

  const solanaData = useSelector(getNetworkData('Solana'));

  useEffect(() => {
    setTimeout(() => {
      setBrowser(true);
    }, 100);
  }, []);

  return (
    <div className="carousel-fix full-container">
      <div className="carousel full-container">
        <div className="slide-top">
          <div className="title">{slides[0].title}</div>
          <div className="subtitle">{slides[0].subtitle}</div>
        </div>
        <div className="content" style={{ flex: '1', height: 'auto', width: '100%' }}>
          {browser && (
            <ResponsiveContainer>
              <AreaChart
                // width={600}
                // height={500}
                data={solanaData.history}
                margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffffff" stopOpacity={0.8} />
                    <stop offset="75%" stopColor="#FFFFFF" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <YAxis width={0} domain={['auto', 'auto']} />
                <Tooltip
                  cursor={false}
                  animationDuration={100}
                  content={(props) => {
                    if (!tooltip || !props.payload[0]?.payload?.date || !props.active) {
                      return null;
                    }
                    return (
                      <div
                        style={{
                          fontSize: '12px',
                          backgroundColor: '#00000033',
                          padding: '2px 4px',
                        }}
                      >
                        ${props.payload[0]?.payload?.val}
                      </div>
                    );
                  }}
                />
                <Area
                  animationDuration={2000}
                  type="monotone"
                  dataKey="val"
                  stroke="none"
                  fill="url(#colorUv)"
                  offset={20}
                  yAxisId={0}
                  animationEasing="ease"
                  dot={{
                    r: 2,
                  }}
                  activeDot={{
                    r: 4,
                    onMouseOver: () => {
                      showTooltip(true);
                    },
                    onMouseLeave: () => {
                      showTooltip(false);
                    },
                  }}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  label={(props) => {
                    const { x, y, stroke, value, index } = props;
                    if (index < solanaData.history.length - 1) {
                      return (
                        <g>
                          <text
                            x={x}
                            y={y}
                            dy={-12}
                            fill="#fff"
                            fontWeight="bold"
                            fontSize={12}
                            textAnchor="middle"
                          >
                            ${value}
                          </text>
                        </g>
                      );
                    }
                    return (
                      <g>
                        <rect x={x - 54} y={y - 28} width="48" height="22" fill="#fdd03b" />
                        <text
                          x={x - 30}
                          y={y}
                          dy={-12}
                          fill="#000"
                          fontWeight="bold"
                          fontSize={16}
                          textAnchor="middle"
                        >
                          ${value}
                        </text>
                      </g>
                    );
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="slide-bottom">
          <Button appearance="ghost" className="stake-with-us">
            STAKE WITH US
          </Button>
        </div>
      </div>
    </div>
  );
};

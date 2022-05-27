import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Area, AreaChart, ResponsiveContainer, Tooltip, YAxis } from 'recharts';
import { Button } from '../../../library/button/button';
import { getNetworkData, setNetwork } from '../../../redux/app';
import './slide-network.scss';

export const SlideNetwork = ({ data, active }): ReactElement => {
  const [browser, setBrowser] = useState(false);
  const [tooltip, showTooltip] = useState(false);
  const [key, setKey] = useState(0);
  const dispatch = useDispatch();

  // const solanaData = useSelector(getNetworkData(data.network));
  const networkData = useSelector(getNetworkData(data.network));

  useEffect(() => {
    setTimeout(() => {
      setBrowser(true);
    }, 100);
  }, []);

  useEffect(() => {
    if (active) {
      setKey(key + 1);
    }
  }, [active]);

  return (
    <div className={`slide slide-network ${active && 'active'}`}>
      <div className="slide-top">
        <div className="big-title fade-in">
          {data.img && <img src={data.img} alt={data.network} />}
          {!data.img && data.bigTitle}
        </div>
        <div className="title fade-in">
          {data.title.map((t, i) => {
            return (
              <span key={i}>
                {t}
                <br />
              </span>
            );
          })}
        </div>
        <div
          className="subtitle more-info slide-down anim-wait-200"
          dangerouslySetInnerHTML={{ __html: data.subtitle }}
        ></div>
      </div>
      <div
        className="content fade-in"
        style={{ height: '40vh', width: '100%', marginTop: '-12rem' }}
      >
        {browser && (
          <ResponsiveContainer>
            <AreaChart
              key={key}
              // width={600}
              // height={500}
              data={networkData.history}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
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
                animationDuration={400}
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
                  if (index < networkData.history.length - 1) {
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
        <Button
          appearance="ghost"
          color="yellow"
          className="large  slide-down anim-wait-400"
          onClick={() => {
            const url = location.href;
            location.href = '#networks';
            history.replaceState(null, null, url);
            dispatch(setNetwork(networkData));
          }}
        >
          {data.cta}
        </Button>
      </div>
    </div>
  );
};

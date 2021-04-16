import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectNetwork } from '../../redux/app';
import './network-info.scss';
import { INetwork } from '../../redux/types';
import Button from 'rsuite/lib/Button';
import { formatNumber } from '../../utils/format-number';
import { HowToStake } from './how-to-stake/how-to-stake';
import { Area, AreaChart, ResponsiveContainer, YAxis } from 'recharts';

export const NetworkInfo = ({ onHide, networksRef }): ReactElement => {
  const [height, setHeight] = useState(10);
  const elem = useRef(null);
  const [showChart, setShowChart] = useState(false);
  const [showBack, setShowBack] = useState(false);
  const network: INetwork = useSelector(selectNetwork);

  useEffect(() => {
    const dimNetworks = networksRef?.current?.getBoundingClientRect();
    const dim = elem?.current?.getBoundingClientRect();

    if (dim) {
      setHeight(dim.height > dimNetworks ? dim.height : dimNetworks.height);
    }

    if (network) {
      setTimeout(() => {
        setShowChart(true);
        setShowBack(true);
      }, 500);
    } else {
      setShowChart(false);
      setShowBack(false);
    }
  }, [network, networksRef]);

  return (
    <div
      className={`network-info ${!showBack && 'no-overflow'}`}
      style={{ height: `${height + 48}px` }}
    >
      <div ref={elem} className={`info-content ${network && 'show'}`}>
        <div
          className="back"
          onClick={() => {
            setShowBack(false);
            onHide();
          }}
          role="button"
        >
          <div className="back-inner">
            <svg version="1.1" x="0px" y="0px" viewBox="0 0 477.175 477.175">
              <g>
                <path
                  d="M345.441,248.292L151.154,442.573c-12.359,12.365-32.397,12.365-44.75,0c-12.354-12.354-12.354-32.391,0-44.744
		L278.318,225.92L106.409,54.017c-12.354-12.359-12.354-32.394,0-44.748c12.354-12.359,32.391-12.359,44.75,0l194.287,194.284
		c6.177,6.18,9.262,14.271,9.262,22.366C354.708,234.018,351.617,242.115,345.441,248.292z"
                />
              </g>
            </svg>
          </div>
        </div>
        <div className="right-half-container" style={{ minHeight: `${height}px` }}>
          <div className="content">
            <div className="left">
              <div className="top-section">
                <div className="logo">
                  <img src={network?.icon} alt={network?.name} />
                </div>
                <div className="name">{network?.name}</div>
              </div>
              <div className="numbers">
                <div className="number">
                  <div className="info">Commision rate</div>
                  <div className="value">{network?.commission} %</div>
                </div>
                <div className="number">
                  <div className="info">Total stake</div>
                  <div className="value">
                    {formatNumber(network?.totalStake)} {network?.symbol}
                  </div>
                  {network?.price && (
                    <div className="info">
                      {formatNumber(network?.totalStake * network?.price, { currency: 'USD' })}
                    </div>
                  )}
                </div>
                <div className="number">
                  <div className="info">Delegators</div>
                  <div className="value">{network?.delegators}</div>
                </div>
              </div>

              <div className="delegation">
                <div className="info-title">Delegation address</div>
                <div className="delegation-bottom">
                  <div className="address-box">{network?.address}</div>
                  <div className="delegation-button">
                    <Button
                      appearance="primary"
                      color="blue"
                      onClick={() => {
                        navigator.clipboard.writeText(network?.address);
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                </div>
              </div>

              <div className="facts">
                {showChart && network?.history && (
                  <div className="chart" style={{ flex: '1', height: '100%', width: '100%' }}>
                    <ResponsiveContainer>
                      <AreaChart
                        // width={600}
                        // height={500}
                        data={network.history}
                        margin={{ top: 5, right: 4, left: 4, bottom: 5 }}
                      >
                        <defs>
                          <linearGradient id="networkGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0aa518" stopOpacity={0.2} />
                            <stop offset="75%" stopColor="#0aa518" stopOpacity={0.05} />
                            <stop offset="95%" stopColor="#0aa518" stopOpacity={0} />
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
                            r: 2,
                          }}
                          activeDot={{
                            r: 0,
                          }}
                          label={(props) => {
                            const { x, y, stroke, value, index } = props;
                            const width = 12 * (value.toString().length || 3);
                            const delta = y > 100 ? -32 : 12;
                            if (index < network.history.length - 1) {
                              return null;
                            }
                            return (
                              <g>
                                <rect
                                  x={x - width + 4}
                                  y={y + delta}
                                  width={width}
                                  height="22"
                                  fill="#0b7f1666"
                                />
                                <circle cx={x} cy={y} r="2" stroke="none" fill="#0b7f1666" />
                                <text
                                  x={x - width / 2 + 4}
                                  y={y + 28 + delta}
                                  dy={-12}
                                  fill="#fff"
                                  fontWeight="bold"
                                  fontSize={16}
                                  textAnchor="middle"
                                >
                                  ${value}
                                </text>
                              </g>
                            );
                          }}

                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}

                <div className="info-title">Key facts</div>
                <div className="numbers">
                  {network?.marketcap && (
                    <div className="number">
                      <div className="info">Market cap</div>
                      <div className="value">{formatNumber(network?.marketcap)}</div>
                      {network?.price && (
                        <div className="info">
                          {formatNumber(network.marketcap * network?.price, {
                            currency: 'USD',
                          })}
                        </div>
                      )}
                    </div>
                  )}
                  <div className="number">
                    <div className="info">Token price</div>
                    <div className="value">
                      {network?.price ? formatNumber(network?.price, { currency: 'USD' }) : '-'}
                    </div>
                  </div>
                  {network?.website && (
                    <div className="number">
                      <a href={network?.website} target="_blank" rel="noreferrer">
                        <div className="info">Official Website</div>
                        <div className="value">
                          <div className="logo">
                            <img src={network?.icon} alt={network?.name} /> {network?.name}
                          </div>
                        </div>
                        <div className="info">{network?.websiteFriendly || network?.website}</div>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="right">
              <div className="more-info">
                <div className="info-title">How to stake</div>
                <div className="more-info-text">
                  <HowToStake networkName={network?.name} />
                </div>
              </div>
              <div className="stake-button">
                {network?.stakeLink && (
                  <Button
                    appearance="primary"
                    color="blue"
                    className="button-large"
                    onClick={() => {
                      window.location.href = network?.stakeLink;
                    }}
                  >
                    STAKE {network?.name}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

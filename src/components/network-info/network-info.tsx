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
                  <div className="number">
                    <div className="info">Staking Ratio</div>
                    <div className="value">{network?.delegators}%</div>
                  </div>
                </div>
                <div className="numbers">
                <div className="number">
                  {network?.website && (
                      <a href={network?.website} target="_blank" rel="noreferrer">
                        <div className="logo">
                          <img src={network?.icon} alt={network?.name} />
                          {/* {network?.name} */}
                        </div>
                        {/* <div className="info">{network?.websiteFriendly || network?.website}</div> */}
                        <div className="info">Official Website</div>
                      </a>
                  )}
                    </div>
                    <div className="number">
                          <div className="logo guide">
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 40 40">
                            <g>
                              <path d="M15,0C6.7,0,0,6.7,0,15c0,8.3,6.7,15,15,15s15-6.7,15-15C30,6.7,23.3,0,15,0z M15,27.3C8.2,27.3,2.7,21.8,2.7,15
                                S8.2,2.7,15,2.7S27.3,8.2,27.3,15C27.3,21.8,21.8,27.3,15,27.3z"/>
                                <path d="M15,11.8c-0.8,0-1.4,0.6-1.4,1.4v9.1c0,0.8,0.6,1.4,1.4,1.4s1.4-0.6,1.4-1.4v-9.1C16.4,12.4,15.8,11.8,15,11.8z"/>
                                <path d="M15,6.4c-0.4,0-0.7,0.1-1,0.4c-0.3,0.3-0.4,0.6-0.4,1c0,0.4,0.1,0.7,0.4,1c0.3,0.3,0.6,0.4,1,0.4s0.7-0.1,1-0.4
                                  c0.3-0.3,0.4-0.6,0.4-1c0-0.4-0.1-0.7-0.4-1C15.7,6.5,15.4,6.4,15,6.4z"/>
                                </g>
                              </svg>
                          </div>
                    <div className="info">Staking Guide</div>
                  </div>
                  {network?.website && (
                    <div className="number">
                      <a href={network?.website} target="_blank" rel="noreferrer">
                          <div className="logo">
                            <svg xmlns="http://www.w3.org/2000/svg" width="37" height="38" viewBox="0 0 40 40">
                            <path d="M12.7,6.9H6.4C5.8,6.9,5.4,7.4,5.4,8S5.8,9,6.4,9h6.3c0.6,0,1.1-0.5,1.1-1.1S13.3,6.9,12.7,6.9z"/>
                            <path d="M12.7,11.2H6.4c-0.6,0-1.1,0.5-1.1,1.1s0.5,1.1,1.1,1.1h6.3c0.6,0,1.1-0.5,1.1-1.1S13.3,11.2,12.7,11.2z"/>
                            <path d="M12.7,15.4H6.4c-0.6,0-1.1,0.5-1.1,1.1s0.5,1.1,1.1,1.1h6.3c0.6,0,1.1-0.5,1.1-1.1S13.3,15.4,12.7,15.4z"/>
                            <path d="M12.7,19.6H6.4c-0.6,0-1.1,0.5-1.1,1.1s0.5,1.1,1.1,1.1h6.3c0.6,0,1.1-0.5,1.1-1.1S13.3,19.6,12.7,19.6z"/>
                            <path d="M12.7,23.9H6.4c-0.6,0-1.1,0.5-1.1,1.1c0,0.6,0.5,1.1,1.1,1.1h6.3c0.6,0,1.1-0.5,1.1-1.1C13.8,24.4,13.3,23.9,12.7,23.9z"/>
                            <path d="M16.3,9h6.3c0.6,0,1.1-0.5,1.1-1.1s-0.5-1.1-1.1-1.1h-6.3c-0.6,0-1.1,0.5-1.1,1.1S15.7,9,16.3,9z"/>
                            <path d="M16.3,13.3h6.3c0.6,0,1.1-0.5,1.1-1.1s-0.5-1.1-1.1-1.1h-6.3c-0.6,0-1.1,0.5-1.1,1.1S15.7,13.3,16.3,13.3z"/>
                            <path d="M20.3,16.4c0-0.6-0.5-1.1-1.1-1.1h-3c-0.6,0-1.1,0.5-1.1,1.1s0.5,1.1,1.1,1.1h3C19.9,17.5,20.3,17,20.3,16.4z"/>
                            <path d="M30.3,24.3c-0.5-0.4-1.1-0.3-1.5,0.2l-2.7,3.4l-1.7-1.2c-0.5-0.3-1.1-0.2-1.5,0.2c-0.3,0.5-0.2,1.1,0.2,1.5l2.5,1.8
                              c0.2,0.1,0.4,0.2,0.6,0.2c0.3,0,0.6-0.1,0.8-0.4l3.3-4.2C30.9,25.4,30.8,24.7,30.3,24.3z"/>
                              <path d="M33,21.1c-1.4-1.4-3.1-2.3-5.1-2.5V4.2C27.9,1.9,26,0,23.7,0H5.3C2.9,0,1,1.9,1,4.2v24.4c0,2.3,1.9,4.2,4.2,4.2h14.8
                                c1.7,2,4.1,3.1,6.7,3.1c4.8,0,8.8-3.9,8.8-8.8C35.5,24.9,34.6,22.7,33,21.1z M3.1,28.7V4.2c0-1.2,1-2.1,2.1-2.1h18.4
                                c1.2,0,2.1,1,2.1,2.1v14.3C21.4,19,18,22.7,18,27.2c0,1.3,0.3,2.5,0.8,3.6H5.3C4.1,30.8,3.1,29.9,3.1,28.7z M26.8,33.9
                                c-2.1,0-4-1-5.3-2.7c-0.9-1.2-1.3-2.5-1.3-4c0-3.7,3-6.7,6.7-6.7c0,0,0.1,0,0.1,0l0,0c1.8,0,3.4,0.7,4.6,2c1.2,1.3,1.9,2.9,1.9,4.7
                                C33.4,30.9,30.4,33.9,26.8,33.9z"/>
                              </svg>
                          </div>
                        <div className="info">Terms of Service</div>
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

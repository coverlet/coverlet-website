import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectNetwork } from '../../redux/app';
import './network-info.scss';
import { INetwork } from '../../redux/types';
import { Button } from '../../library/button/button';
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
                    <div className="info bottom-info">
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
                  <div className="number">
                    <div className="info">Market cap</div>
                    <div className="value">
                      {network?.marketcap ? formatNumber(network.marketcap) : '-'}
                    </div>
                    {network?.price && (
                      <div className="info bottom-info">
                        {formatNumber(network.marketcap * network?.price, {
                          currency: 'USD',
                        })}
                      </div>
                    )}
                  </div>
                  <div className="number">
                    <div className="info">Token price</div>
                    <div className="value">
                      {network?.price ? formatNumber(network?.price, { currency: 'USD' }) : '-'}
                    </div>
                  </div>
                  <div className="number">
                    <div className="info">Staking Ratio</div>
                    <div className="value">
                      {network?.stakingRatio ? network.stakingRatio + '%' : '-'}
                    </div>
                  </div>
                </div>
                <div className="numbers horizontal">
                  <div className="number">
                    <div
                      className="number-info"
                      onClick={() => {
                        if (!network?.website) {
                          return;
                        }
                        window.location.href = network?.website;
                      }}
                      role="button"
                    >
                      <div className="logo">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          height="24px"
                          width="24px"
                          viewBox="0 0 24 24"
                        >
                          <path d="M11.877 15.9787C11.8146 16.8242 11.4524 17.6196 10.8555 18.2217L9.94675 19.1305C9.27191 19.7958 8.36141 20.1672 7.41381 20.1638C6.46621 20.1604 5.5584 19.7825 4.88834 19.1124C4.21828 18.4423 3.84034 17.5345 3.83695 16.5868C3.83355 15.6392 4.20497 14.7287 4.87021 14.0538L5.779 13.145C6.38116 12.5483 7.1765 12.186 8.02192 12.1235L9.67229 10.4731C8.76285 10.2319 7.80611 10.2331 6.89728 10.4766C5.98845 10.72 5.15923 11.1973 4.49215 11.8608L3.58335 12.7697C2.56946 13.7837 1.99991 15.159 2 16.5929C2.00009 18.0269 2.5698 19.4021 3.5838 20.416C4.59781 21.43 5.97305 21.9995 7.40698 21.9994C8.84092 21.9994 10.2161 21.4296 11.23 20.4156L12.1388 19.5068C12.802 18.8395 13.279 18.0102 13.5225 17.1014C13.7659 16.1926 13.7673 15.236 13.5265 14.3265L11.877 15.9787Z"></path>
                          <path d="M15.9793 11.8768C16.8248 11.8144 17.6202 11.4522 18.2222 10.8553L19.131 9.9465C19.7963 9.27163 20.1677 8.3611 20.1643 7.41348C20.1609 6.46585 19.783 5.55801 19.1129 4.88793C18.4429 4.21786 17.535 3.83991 16.5874 3.83651C15.6398 3.83312 14.7293 4.20455 14.0545 4.8698L13.1457 5.77863C12.549 6.3808 12.1868 7.17616 12.1242 8.02161L10.4738 9.67203C10.2327 8.76256 10.2339 7.80579 10.4773 6.89693C10.7208 5.98807 11.198 5.15883 11.8616 4.49173L12.7704 3.58291C13.7844 2.56899 15.1596 1.99943 16.5935 1.99951C18.0275 1.9996 19.4027 2.56932 20.4165 3.58336C21.4304 4.5974 22 5.97267 21.9999 7.40665C21.9998 8.84063 21.4301 10.2158 20.4161 11.2298L19.5073 12.1386C18.84 12.8018 18.0108 13.2789 17.102 13.5223C16.1932 13.7658 15.2366 13.7672 14.3271 13.5264L15.9793 11.8768Z"></path>
                          <path d="M8.36434 16.5441C8.18462 16.5441 8.00895 16.4907 7.85954 16.3909C7.71012 16.291 7.59367 16.1491 7.5249 15.983C7.45613 15.817 7.43814 15.6343 7.47319 15.458C7.50824 15.2817 7.59476 15.1198 7.72182 14.9927L14.9922 7.72213C15.1636 7.55658 15.3932 7.46498 15.6315 7.46705C15.8697 7.46912 16.0977 7.5647 16.2662 7.7332C16.4347 7.9017 16.5302 8.12965 16.5323 8.36794C16.5344 8.60623 16.4428 8.8358 16.2772 9.00721L9.00686 16.2778C8.83646 16.4483 8.60535 16.544 8.36434 16.5441Z"></path>
                        </svg>
                      </div>
                      <div className="info">{network?.websiteFriendly || network?.website}</div>
                    </div>
                  </div>
                  <div className="number">
                    <div
                      className={`number-info ${network?.stakingGuide ? '' : 'empty'}`}
                      onClick={() => {
                        if (!network?.stakingGuide) {
                          return;
                        }
                        window.location.href = network?.stakingGuide;
                      }}
                      role="button"
                    >
                      <div className="logo">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24px"
                          height="24px"
                          viewBox="0 0 32 32"
                        >
                          <g>
                            <path
                              d="M15,0C6.7,0,0,6.7,0,15c0,8.3,6.7,15,15,15s15-6.7,15-15C30,6.7,23.3,0,15,0z M15,27.3C8.2,27.3,2.7,21.8,2.7,15
                                S8.2,2.7,15,2.7S27.3,8.2,27.3,15C27.3,21.8,21.8,27.3,15,27.3z"
                            />
                            <path d="M15,11.8c-0.8,0-1.4,0.6-1.4,1.4v9.1c0,0.8,0.6,1.4,1.4,1.4s1.4-0.6,1.4-1.4v-9.1C16.4,12.4,15.8,11.8,15,11.8z" />
                            <path
                              d="M15,6.4c-0.4,0-0.7,0.1-1,0.4c-0.3,0.3-0.4,0.6-0.4,1c0,0.4,0.1,0.7,0.4,1c0.3,0.3,0.6,0.4,1,0.4s0.7-0.1,1-0.4
                                  c0.3-0.3,0.4-0.6,0.4-1c0-0.4-0.1-0.7-0.4-1C15.7,6.5,15.4,6.4,15,6.4z"
                            />
                          </g>
                        </svg>
                      </div>
                      <div className="info">staking guide</div>
                    </div>
                  </div>
                  <div className="number">
                    <div
                      className={`number-info ${network?.tos ? '' : 'empty'}`}
                      onClick={() => {
                        if (!network?.tos) {
                          return;
                        }
                        window.location.href = network?.tos;
                      }}
                      role="button"
                    >
                      <div className="logo">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24px"
                          height="24px"
                          viewBox="0 0 38 38"
                        >
                          <path d="M12.7,6.9H6.4C5.8,6.9,5.4,7.4,5.4,8S5.8,9,6.4,9h6.3c0.6,0,1.1-0.5,1.1-1.1S13.3,6.9,12.7,6.9z" />
                          <path d="M12.7,11.2H6.4c-0.6,0-1.1,0.5-1.1,1.1s0.5,1.1,1.1,1.1h6.3c0.6,0,1.1-0.5,1.1-1.1S13.3,11.2,12.7,11.2z" />
                          <path d="M12.7,15.4H6.4c-0.6,0-1.1,0.5-1.1,1.1s0.5,1.1,1.1,1.1h6.3c0.6,0,1.1-0.5,1.1-1.1S13.3,15.4,12.7,15.4z" />
                          <path d="M12.7,19.6H6.4c-0.6,0-1.1,0.5-1.1,1.1s0.5,1.1,1.1,1.1h6.3c0.6,0,1.1-0.5,1.1-1.1S13.3,19.6,12.7,19.6z" />
                          <path d="M12.7,23.9H6.4c-0.6,0-1.1,0.5-1.1,1.1c0,0.6,0.5,1.1,1.1,1.1h6.3c0.6,0,1.1-0.5,1.1-1.1C13.8,24.4,13.3,23.9,12.7,23.9z" />
                          <path d="M16.3,9h6.3c0.6,0,1.1-0.5,1.1-1.1s-0.5-1.1-1.1-1.1h-6.3c-0.6,0-1.1,0.5-1.1,1.1S15.7,9,16.3,9z" />
                          <path d="M16.3,13.3h6.3c0.6,0,1.1-0.5,1.1-1.1s-0.5-1.1-1.1-1.1h-6.3c-0.6,0-1.1,0.5-1.1,1.1S15.7,13.3,16.3,13.3z" />
                          <path d="M20.3,16.4c0-0.6-0.5-1.1-1.1-1.1h-3c-0.6,0-1.1,0.5-1.1,1.1s0.5,1.1,1.1,1.1h3C19.9,17.5,20.3,17,20.3,16.4z" />
                          <path
                            d="M30.3,24.3c-0.5-0.4-1.1-0.3-1.5,0.2l-2.7,3.4l-1.7-1.2c-0.5-0.3-1.1-0.2-1.5,0.2c-0.3,0.5-0.2,1.1,0.2,1.5l2.5,1.8
                              c0.2,0.1,0.4,0.2,0.6,0.2c0.3,0,0.6-0.1,0.8-0.4l3.3-4.2C30.9,25.4,30.8,24.7,30.3,24.3z"
                          />
                          <path
                            d="M33,21.1c-1.4-1.4-3.1-2.3-5.1-2.5V4.2C27.9,1.9,26,0,23.7,0H5.3C2.9,0,1,1.9,1,4.2v24.4c0,2.3,1.9,4.2,4.2,4.2h14.8
                                c1.7,2,4.1,3.1,6.7,3.1c4.8,0,8.8-3.9,8.8-8.8C35.5,24.9,34.6,22.7,33,21.1z M3.1,28.7V4.2c0-1.2,1-2.1,2.1-2.1h18.4
                                c1.2,0,2.1,1,2.1,2.1v14.3C21.4,19,18,22.7,18,27.2c0,1.3,0.3,2.5,0.8,3.6H5.3C4.1,30.8,3.1,29.9,3.1,28.7z M26.8,33.9
                                c-2.1,0-4-1-5.3-2.7c-0.9-1.2-1.3-2.5-1.3-4c0-3.7,3-6.7,6.7-6.7c0,0,0.1,0,0.1,0l0,0c1.8,0,3.4,0.7,4.6,2c1.2,1.3,1.9,2.9,1.9,4.7
                                C33.4,30.9,30.4,33.9,26.8,33.9z"
                          />
                        </svg>
                      </div>
                      <div className="info">terms of service</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="right">
              <div className="more-info">
                <div className="info-title">How to stake</div>
                <div className="more-info-text">
                  <HowToStake
                    networkName={network?.name}
                    symbol={network?.symbol}
                    valoper={network?.address}
                  />
                </div>
              </div>
              <div className="stake-button">
                {network?.stakeLink && (
                  <Button
                    size="large"
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

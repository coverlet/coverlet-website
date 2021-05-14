import React, { ReactElement, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '../../../library/button/button';
import { getNetworkData, setNetwork } from '../../../redux/app';
import './slide-launch.scss';

export const SlideLaunch = ({ data, active }): ReactElement => {
  const dispatch = useDispatch();
  const networkData = useSelector(getNetworkData(data.network));
  return (
    <div className={`slide slide-launch ${active && 'active'}`}>
      <div className="slide-top fade-in">
        <img src={data.img} alt="Regen" />
      </div>
      <div className="content" style={{ flex: '1', height: 'auto', width: '100%' }}>
        <div className="top-text enter-from-right">
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
          className="more-info slide-down anim-wait-200"
          dangerouslySetInnerHTML={{ __html: data.subtitle }}
        ></div>
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

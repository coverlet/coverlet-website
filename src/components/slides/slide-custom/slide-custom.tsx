import React, { ReactElement, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '../../../library/button/button';
import { getNetworkData, setNetwork } from '../../../redux/app';
import './slide-custom.scss';

const drawElements = (elements, dispatch, networkData) => {
  return elements.map((e, i) => {
    switch (e.type) {
      case 'text':
        return e.html === true ? (
          <div
            key={i}
            className={`${e?.textType} ${e?.wrapperClass}`}
            dangerouslySetInnerHTML={{ __html: e.data }}
          />
        ) : (
          <div key={i} className={`${e?.textType} ${e?.wrapperClass}`}>
            {e.data}
          </div>
        );
      case 'img':
        return (
          <div key={i} className={`${e?.wrapperClass}`}>
            <img src={e?.src} alt={e?.alt} className={`${e?.class}`} />
          </div>
        );
      case 'button':
        return (
          <div key={i} className={`${e?.textType} ${e?.wrapperClass}`}>
            <Button
              appearance="ghost"
              color="yellow"
              className="large"
              onClick={() => {
                const url = location.href;
                location.href = '#networks';
                history.replaceState(null, null, url);
                dispatch(setNetwork(networkData));
              }}
            >
              {e.text}
            </Button>
          </div>
        );
    }
  });
};

export const SlideCustom = ({ data, active }): ReactElement => {
  const dispatch = useDispatch();
  const networkData = useSelector(getNetworkData(data.network));
  return (
    <div className={`slide slide-custom ${active && 'active'}`}>
      {/* <div className="slide-top fade-in">
        <img src={data.img} alt={data.bigTitle} />
      </div> */}
      <div className="content" style={{ flex: '1', height: 'auto', width: '100%' }}>
        <div className="content-top">
          {drawElements(
            data.content.filter((e) => e?.position !== 'bottom'),
            dispatch,
            networkData
          )}
        </div>
        <div className="content-bottom">
          {drawElements(
            data.content.filter((e) => e?.position === 'bottom'),
            dispatch,
            networkData
          )}
        </div>
        {/* <div
          className="more-info slide-down anim-wait-200"
          dangerouslySetInnerHTML={{ __html: data.subtitle }}
        ></div> */}
      </div>
      {/* <div className="slide-bottom">
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
      </div> */}
    </div>
  );
};

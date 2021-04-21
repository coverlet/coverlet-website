import { ReactElement, useRef, useEffect, useState } from 'react';
import { Network } from '../network/network';
import { NetworkInfo } from '../network-info/network-info';
import { useDispatch, useSelector } from 'react-redux';
import { selectNetworks, setNetwork } from '../../redux/app';

import './networks.scss';
import { INetwork } from '../../redux/types';

const getClasses = (i: number) => {
  let classes = '';
  if (Math.floor(i / 2) % 2 === 1) {
    classes += ' odd2';
  }
  if (Math.floor(i / 4) % 2 === 1) {
    classes += ' odd4';
  }

  return classes;
};

const scrollIntoView = (networksRef) => {
  const top = networksRef?.current?.getBoundingClientRect()?.top || 0;

  if (top < 0) {
    window.scrollTo(0, window.pageYOffset + top - 20);
  }
};

export const Networks = (): ReactElement => {
  const networksRef = useRef(null);
  const dispatch = useDispatch();

  const networks: INetwork[] = useSelector(selectNetworks);

  return (
    <div className="full-container networks">
      <div></div>
      <div className="networks-wrapper">
        <div className="half-container" style={{ position: 'relative' }}>
          <NetworkInfo onHide={() => dispatch(setNetwork(false))} networksRef={networksRef} />
        </div>
        <div className="container " id="networks">
          <div className="networks-list-helper">
            <div className="networks-list" ref={networksRef}>
              {networks.map((network, i) => {
                return (
                  <Network
                    key={i}
                    classes={getClasses(i)}
                    network={network}
                    onClick={() => {
                      if (network.mainnet) {
                        scrollIntoView(networksRef);
                        dispatch(setNetwork(network));
                      }
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

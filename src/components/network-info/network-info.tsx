import { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectNetwork } from '../../redux/app';
import './network-info.scss';
import { INetwork } from '../../redux/types';

export const NetworkInfo = ({ onHide, networksRef }): ReactElement => {
  const [height, setHeight] = useState(10);
  const network: INetwork = useSelector(selectNetwork);

  useEffect(() => {
    const dim = networksRef?.current?.getBoundingClientRect();

    if (dim) {
      setHeight(dim.height);
    }
  }, [network, networksRef]);

  return (
    <div className="network-info" style={{ height: `${height + 48}px` }}>
      <div
        className={`info-content ${network && 'show'}`}
        onClick={onHide}
        role="button"
        style={{ height: `${height}px` }}
      >
        {network?.name}
      </div>
    </div>
  );
};

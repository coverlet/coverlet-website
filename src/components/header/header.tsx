import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, Dropdown, Button } from 'rsuite';

import './header.scss';

export const Header = (): ReactElement => {
  return (
    <div className="coverlet-header full-container">
      <div className="container">
        <div className="logo">Coverlet</div>
        <div className="nav">
          <Button appearance="subtle">Networks</Button>
          <Button appearance="subtle">Projects</Button>
          <Button appearance="subtle">About us</Button>
        </div>
        <div>
          <Button appearance="primary">Stake with us</Button>
        </div>
      </div>
    </div>
  );
};

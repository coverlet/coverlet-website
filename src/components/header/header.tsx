import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, Dropdown } from 'rsuite';

import './header.scss';

export const Header = (): ReactElement => {
  return (
    <div className="coverlet-header full-container">
      <div className="container">
        <div className="logo">Coverlet</div>
        <div className="nav">
          <Nav>
            <Nav.Item>About us</Nav.Item>
            <Nav.Item>Networks</Nav.Item>
            <Nav.Item>Projects</Nav.Item>
            <Nav.Item>Stake now</Nav.Item>
          </Nav>
        </div>
      </div>
    </div>
  );
};

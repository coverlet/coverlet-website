import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, Dropdown, Button } from 'rsuite';
import Link from 'next/link';

import './header.scss';

export const Header = (): ReactElement => {
  return (
    <div className="coverlet-header full-container">
      <div className="logo">
        <img src="coverlet-logo.svg" alt="Coverlet" />
      </div>
      <div className="nav">
        <Link href="#networks">Networks</Link>
        <Link href="#under">Projects</Link>
        <Link href="#under">About us</Link>
      </div>
      <div className="stake-container">
        <Button
          appearance="primary"
          className="button-large"
          onClick={() => {
            const url = location.href;
            location.href = '#networks';
            history.replaceState(null, null, url);
          }}
        >
          STAKE WITH US 
        </Button>
      </div>
    </div>
  );
};

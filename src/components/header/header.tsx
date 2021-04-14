import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, Dropdown, Button } from 'rsuite';

import './header.scss';

export const Header = (): ReactElement => {
  return (
    <div className="coverlet-header full-container">
      <div className="logo">
        <img src="logo.png" alt="Coverlet" />
      </div>
      <div className="nav">
        <Button
          appearance="subtle"
          onClick={() => {
            const url = location.href;
            location.href = '#networks';
            history.replaceState(null, null, url);
          }}
        >
          Networks
        </Button>
        <Button
          appearance="subtle"
          onClick={() => {
            const url = location.href;
            location.href = '#under';
            history.replaceState(null, null, url);
          }}
        >
          Projects
        </Button>
        <Button
          appearance="subtle"
          onClick={() => {
            const url = location.href;
            location.href = '#under';
            history.replaceState(null, null, url);
          }}
        >
          About us
        </Button>
      </div>
      <div className="stake-container">
        <Button
          appearance="primary"
          className="stake-with-us"
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

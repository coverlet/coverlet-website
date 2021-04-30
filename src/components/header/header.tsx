import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../library/button/button';
import { selectMenuOpen, setMenuOpen } from '../../redux/app';
import Link from 'next/link';

import './header.scss';

export const Header = (): ReactElement => {
  const menuOpen: boolean = useSelector(selectMenuOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('has-menu');
    } else {
      document.body.classList.remove('has-menu');
    }
  }, [menuOpen]);

  return (
    <div className="coverlet-header full-container">
      <div className="logo">
        <img src="coverlet-logo.svg" alt="Coverlet" />
      </div>
      <div className="nav nav--panel">
        <a
          href="#networks"
          onClick={() => {
            dispatch(setMenuOpen(!menuOpen));
          }}
        >
          Networks
        </a>
        <a
          href="#under"
          onClick={() => {
            dispatch(setMenuOpen(!menuOpen));
          }}
        >
          Projects
        </a>
        <a
          href="#under"
          onClick={() => {
            dispatch(setMenuOpen(!menuOpen));
          }}
        >
          About us
        </a>
      </div>
      <div className="stake-container">
        <Button
          color="yellow"
          size="large"
          onClick={() => {
            const url = location.href;
            location.href = '#networks';
            history.replaceState(null, null, url);
          }}
        >
          STAKE WITH US
        </Button>
      </div>
      <div className="menu-burger">
        <Button
          onClick={() => {
            dispatch(setMenuOpen(!menuOpen));
          }}
        >
          <div></div>
          <div></div>
          <div></div>
        </Button>
      </div>
    </div>
  );
};

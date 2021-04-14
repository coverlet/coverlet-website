import React, { ReactElement } from 'react';
import './footer.scss';

export const Footer = (): ReactElement => {
  return (
    <div className="footer">
      <div className="container">
        lucian@coverlet.cc <br />
        <br />
        &copy; 2021
      </div>
    </div>
  );
};

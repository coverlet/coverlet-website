import React, { ReactElement } from 'react';
import './footer.scss';

export const Footer = (): ReactElement => {
  return (
    <div className="footer">
      <div className="container">
        <br />
        <br />
        <p style={{ color: '#666' }}>reach out at</p>
        lucian@coverlet.io <br />
        <br />
        <br />
        {/* 2021 */}
      </div>
    </div>
  );
};

import { ReactElement } from 'react';
import './pie-timer.scss';

export const PieTimer = ({ active, onClick }): ReactElement => {
  return (
    <div className="pie-timer-container" onClick={onClick} role="button">
      <div className={`pie-timer ${active && 'active'}`}>
        <div className="pie spinner"></div>
        <div className="pie filler"></div>
        <div className="mask"></div>
      </div>
    </div>
  );
};

import React, { ReactElement } from 'react';
import styles from './footer.module.scss';

export const Footer = (): ReactElement => {
  return <div className={styles['footer']}>&copy; 2021</div>;
};

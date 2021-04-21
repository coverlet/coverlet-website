import { ReactElement } from 'react';
import './button.scss';

interface IProps {
  appearance?: 'default' | 'ghost';
  size?: 'default' | 'large';
  color?: 'default' | 'yellow';
  className?: string;
  onClick?: any;
  children?: any;
}

export const Button = (props: IProps): ReactElement => {
  return (
    <button
      className={`button ${props.appearance ? props.appearance : 'default'} ${
        props.className && props.className
      } ${props.color && props.color}
      ${props.size && props.size}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

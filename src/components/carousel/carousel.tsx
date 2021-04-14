import React, { PureComponent, ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Button from 'rsuite/lib/Button';
import { getNetworkData } from '../../redux/app';
import { Slide } from '../slide/slide';
import { SlideLaunch } from '../slides/slide-launch/slide-launch';
import { SlideNetwork } from '../slides/slide-network/slide-network';

import './carousel.scss';

const slides = [
  {
    subtitle: '0% commision until the end of March',
    title: 'Solana',
  },
  {
    subtitle: '230k million usd staked',
    title: 'Trusted and secure validator',
  },
  {
    subtitle: 'Latest technology',
    title: 'AMD Epyc 7538',
  },
];

export const Carousel = (): ReactElement => {
  return (
    <div className="carousel-fix full-container">
      <div className="carousel full-container">
        <SlideLaunch />
      </div>
    </div>
  );
};

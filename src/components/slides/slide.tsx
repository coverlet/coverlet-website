import React, { ReactElement, useEffect, useState } from 'react';
import { SlideLaunch } from './slide-launch/slide-launch';
import { SlideNetwork } from './slide-network/slide-network';

export const Slide = ({ data, active }): ReactElement => {
  switch (data.type) {
    case 'launch':
      return <SlideLaunch data={data} active={active} />;
    case 'network':
      return <SlideNetwork data={data} active={active} />;
    default:
      return null;
  }
};

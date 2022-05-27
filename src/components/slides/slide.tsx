import React, { ReactElement, useEffect, useState } from 'react';
import { SlideCustom } from './slide-custom/slide-custom';
import { SlideNetwork } from './slide-network/slide-network';

export const Slide = ({ data, active }): ReactElement => {
  switch (data.type) {
    case 'custom':
      return <SlideCustom data={data} active={active} />;
    case 'network':
      return <SlideNetwork data={data} active={active} />;
    default:
      return null;
  }
};

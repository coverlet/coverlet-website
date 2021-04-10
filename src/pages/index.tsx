import React, { ReactElement } from 'react';
import { Services } from '../components/services/services';
import { Carousel } from '../components/carousel/carousel';
import { Networks } from '../components/networks/networks';

import './index.module.scss';
import { PassingText } from '../components/passing-text/passing-text';

const HomePage = (): ReactElement => {
  return (
    <div>
      <Carousel />
      <PassingText />
      <Networks />
      <Services />

      <div className="container ">
        Lorem Ipsum is simply dummy text of the printing and
        <br />
        <br />
        typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever
        <br />
        <br />
        since the 1500s, when an unknown printer took a galley of type and scrambled it to make
        <br />
        <br />a type specimen book. It has survived not only five centuries, but also the leap into
        electronic
        <br />
        <br /> typesetting, remaining essentially unchanged. It was popularised in the 1960s with
        <br />
        <br />
        the release of Letraset sheets containing Lorem Ipsum passages, and more recently with
        desktop
        <br />
        <br /> publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem
        Ipsum is simply dummy text of the printing and
        <br />
        <br />
        typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever
        <br />
        <br />
        since the 1500s, when an unknown printer took a galley of type and scrambled it to make
        <br />
        <br />a type specimen book. It has survived not only five centuries, but also the leap into
        electronic
        <br />
        <br /> typesetting, remaining essentially unchanged. It was popularised in the 1960s with
        <br />
        <br />
        the release of Letraset sheets containing Lorem Ipsum passages, and more recently with
        desktop
        <br />
        <br /> publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </div>
    </div>
  );
};

export default HomePage;

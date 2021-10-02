import React, { ReactElement, useEffect, useRef } from 'react';
import { Services } from '../components/services/services';
import { Carousel } from '../components/carousel/carousel';
import { Networks } from '../components/networks/networks';
import { PassingText } from '../components/passing-text/passing-text';
import { getPrices } from '../client/crypto-compare';
import { getData } from '../core/populate-data';
import { useDispatch } from 'react-redux';
import { setNetworks } from '../redux/app';

import './index.module.scss';
import { About } from '../components/about/about';

const HomePage = ({ networks }): ReactElement => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setNetworks(networks));
  }, []);

  return (
    <div>
      <Carousel />
      <PassingText />
      <Networks />
      <Services />
      <About />
      <div
        id="under"
        style={{ fontSize: '1.4em', fontWeight: 'bold', textAlign: 'center', marginTop: '10rem' }}
      >
        More info coming soon
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const data = await getData();

  return {
    props: {
      ...data,
    },

    revalidate: 3600,
  };
}

export default HomePage;

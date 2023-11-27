import React, { ReactElement, useRef } from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { AppProps } from 'next/app';
import { DefaultLayout } from '../layouts/default';
import { SmoothScrollProvider } from '../utils/scroll-context';
// import { LocomotiveScrollProvider } from 'react-locomotive-scroll';

import '../style/main.scss';

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  // const containerRef = useRef(null);
  const Layout = pageProps.Layout ? pageProps.Layout : DefaultLayout;

  return (
    <Provider store={store}>
      <SmoothScrollProvider
        options={{
          lerp: 0.12,
          smooth: true,
          smartphone: {
            lerp: 0.12,
            smooth: true,
          },
          tablet: {
            lerp: 0.4,
            smooth: true,
          },
        }}
      >
        <Layout>
          {/* @ts-ignore */}
          <Component {...pageProps} />
        </Layout>
      </SmoothScrollProvider>
    </Provider>
  );
}

export default MyApp;

import React, { ReactElement, useRef } from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { AppProps } from 'next/app';
import { DefaultLayout } from '../layouts/default';
import { SmoothScrollProvider } from '../utils/scroll-context';
// import { LocomotiveScrollProvider } from 'react-locomotive-scroll';

import '../style/main.scss';
import '../style/custom-theme.less';

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  // const containerRef = useRef(null);
  const Layout = pageProps.Layout ? pageProps.Layout : DefaultLayout;

  return (
    <Provider store={store}>
      <SmoothScrollProvider options={{ smooth: true }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SmoothScrollProvider>
    </Provider>
  );
}

export default MyApp;

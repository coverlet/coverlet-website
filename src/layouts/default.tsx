import React, { ReactElement } from 'react';
import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';
import Head from 'next/head';

import './default.module.scss';

interface IDefaultLayoutProps {
  children: ReactElement;
  title?: string;
}

export const DefaultLayout = ({
  children,
  title = 'Coverlet',
}: IDefaultLayoutProps): ReactElement => {
  return (
    <div data-scroll-container>
      <Head>
        <title>{title}</title>
        {/* <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700&display=swap"
          rel="stylesheet"
        /> */}
        <link rel="preload" href="/fonts/eina01-bold.woff2" as="font" crossOrigin="" />
        <link rel="preload" href="/fonts/eina01-bold.woff" as="font" crossOrigin="" />
        <link rel="preload" href="/fonts/eina01-regular.woff2" as="font" crossOrigin="" />
        <link rel="preload" href="/fonts/eina01-regular.woff" as="font" crossOrigin="" />
      </Head>
      <div className="main-container">
        <Header />
        <div>{children}</div>
        <Footer />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-QRZ7P1NTS3"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-QRZ7P1NTS3');`,
          }}
        />
      </div>
    </div>
  );
};

import React, { ReactElement } from 'react';
import { Container, Content } from 'rsuite';
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
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.6.1/gsap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.6.1/ScrollTrigger.min.js"></script> */}
      </Head>
      <Container className="main-container">
        <Header />
        <Content>{children}</Content>
        <Footer />
      </Container>
    </div>
  );
};

import { ReactElement } from 'react';
import './projects.scss';

export const Projects = (): ReactElement => {
  return (
    <div className="projects container">
      <div className="text">
        Our team of skilled programmers has been involved in the development of diverse tools and
        applications for the blockchain ecosystem. Our portfolio includes dapps, monitoring tools
        and smart contract development.
      </div>
      <div className="project">
        <div className="description">
          A simple slot game built on Solana blockchain using Anchor framework and React. See it in
          action at <a href="https://solslot.coverlet.io/">https://solslot.coverlet.io/</a>
        </div>
        <div className="photo">
          <img src="img/solslot.png" alt="Solana Slot" />
        </div>
      </div>
      <div className="project">
        <div className="description">In the works</div>
        <div className="photo">
          <img src="img/tcg.png" alt="Trading Card Game" />
        </div>
      </div>
    </div>
  );
};

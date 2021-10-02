import { ReactElement } from 'react';
import './about.scss';

export const About = (): ReactElement => {
  return (
    <div className="about container">
      <div className="text">
        Working with us means having the stability of your earnings when the crypto market is
        stable, and growth of your earnings when it&apos;s growing. We are a team of Web 3.0
        enthusiasts who see the industry&apos;s potential, and value its top standards. Our years of
        experience in developing and software engineering in top companies (FTSE 100 IT companies),
        allow us to create and operate with cutting edge technologies.
      </div>
      <div className="person">
        <div className="photo">
          <img src="img/lucian-marica.jpeg" alt="Lucian Marica" />
        </div>
        <div className="right">
          <div className="name">Lucian Marica</div>
          <div className="description">
            <div className="title">Founder, Software Engineer, Devops</div>
            <div className="icons">
              <a href="https://www.linkedin.com/in/lucian-marica-945456ba/">
                <img src="linkedin.svg" alt="linkedin" width="32" height="32" />
              </a>
              <a href="https://twitter.com/maricalucian/">
                <img src="twitter.svg" alt="twitter" width="32" height="32" />
              </a>
            </div>
            <div className="tag-line">
              Doer, problem solver, passionate about coding, eager to build stuff for blockchain.
            </div>
            More than 12 years’ experience as Software Engineer. Skilled in React, ReactNative,
            NodeJS, Rust, Java, PHP.
          </div>
        </div>
      </div>
      <div className="person">
        <div className="photo">
          <img src="img/dorin-zoicas.jpeg" alt="Lucian Marica" />
        </div>
        <div className="right">
          <div className="name">Dorin Zoicas</div>
          <div className="description">
            <div className="title">Creative, Designer</div>
            <div className="icons">
              <a href="https://www.linkedin.com/in/dorin-zoicas-b020b030/">
                <img src="linkedin.svg" alt="linkedin" width="32" height="32" />
              </a>
            </div>
            <div className="tag-line"></div>
            Experienced Art Director with a demonstrated history of working in the information
            technology and services industry.
          </div>
        </div>
      </div>
    </div>
  );
};

import { ReactElement } from 'react';
import './about.scss';

export const About = (): ReactElement => {
  return (
    <div className="about container" id="about">
      <div className="section-title">The team</div>
      <div className="text">
        We are a team of Web 3.0 enthusiasts who see the industry&apos;s potential, and value its
        top standards. Our years of experience in developing and software engineering in top
        companies (FTSE 100 IT companies), allow us to create and operate with cutting edge
        technologies.
      </div>
      <div className="person">
        <div className="photo">
          <img src="img/leon-photo.png" alt="Leon" />
        </div>
        <div className="right">
          <div className="name">Leon</div>
          <div className="description">
            <div className="title">Founder, Software Engineer, Devops</div>
            <div className="icons">
              <a href="https://twitter.com/leongameon/">
                <img src="twitter.svg" alt="twitter" width="32" height="32" />
              </a>
            </div>
            <div className="tag-line">
              Doer, problem solver, passionate about coding, who can't keep away from tinkering with
              blockchain.
            </div>
            More than 12 years’ experience as Software Engineer. Skilled in React, ReactNative,
            NodeJS, Rust, Java, PHP.
          </div>
        </div>
      </div>
      <div className="person">
        <div className="photo">
          <img src="img/andrei-photo.jpeg" alt="Andrei" />
        </div>
        <div className="right">
          <div className="name">Andrei</div>
          <div className="description">
            <div className="title">Software Engineer</div>
            <div className="icons"></div>
            <div className="tag-line">
              Tech Aficionado, with a flair for dissecting complex problems.
            </div>
            Skilled in JavaScript, PHP, React
          </div>
        </div>
      </div>
    </div>
  );
};

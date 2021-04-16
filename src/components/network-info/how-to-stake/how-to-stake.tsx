/* eslint-disable jsx-a11y/accessible-emoji */
import { ReactElement } from 'react';
import './how-to-stake.scss';

const getHowToStake = (networkName): ReactElement => {
  switch (networkName) {
    case 'Regen':
      return (
        <div>
          <div className="hts-title">Using Keplr Wallet</div>
          <div className="hts-text">
            Assuming you already have your REGEN token in the Keplr Wallet:
            <ol>
              <li>
                Go to{' '}
                <a href="https://wallet.keplr.app/#/dashboard">
                  https://wallet.keplr.app/#/dashboard
                </a>{' '}
                or use “STAKE REGEN” button above
              </li>
              <li>From the menu on the left, select “Regen” and click “Stake”</li>
              <li>
                In the list that opened, search for “Ozone <span role="img">🌤️🌱</span>” and click
                “Manage”
              </li>
              <li>
                Select “Delegate”, then fill out the amount of REGEN that you’d like to delegate,
                then click “Delegate” button
              </li>
              <li>
                The Keplr extension will open. Check that all the details of the transaction are
                correct and choose “Approve” when ready
              </li>
            </ol>
            All done!
          </div>
          <div className="hts-title">Using command line</div>
          If you prefer to use the command line cli, delegate using the following commmand:
          <div className="hts-text">
            <div className="console">
              regen tx staking delegate regenvaloper1273zsxhxd5dlgcr2zjf5x25275hjcp3uupmg2z
              &lt;amount&gt; <br />
              --from &lt;keyName&gt; --gas auto --gas-prices 0.01uregen --chain-id regen-1
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div>
          Like our website? We like it also. Unfortunately, having a design so fresh comes with the
          downside that some data is yet to pe populated. Like this section. See you very soon with
          info on how to stake {networkName}
        </div>
      );
  }
};

export const HowToStake = ({ networkName }): ReactElement => {
  return <div className="how-to-stake">{getHowToStake(networkName)}</div>;
};

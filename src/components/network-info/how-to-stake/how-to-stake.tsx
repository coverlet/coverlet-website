/* eslint-disable jsx-a11y/accessible-emoji */
import { ReactElement } from 'react';
import './how-to-stake.scss';

const getHowToStake = (networkName, symbol, valoper): ReactElement => {
  switch (networkName) {
    case 'Regen':
    case 'Osmos':
    case 'Evmos':
      return (
        <div>
          <div className="hts-title">Using Keplr Wallet</div>
          <div className="hts-text">
            Assuming you already have your {symbol} token in the Keplr Wallet:
            <br />
            <br />
            <ol>
              <li>
                1. Use the “STAKE {symbol}” button below <br /> OR <br />
                Go to{' '}
                <a href="https://wallet.keplr.app/#/dashboard">
                  https://wallet.keplr.app/#/dashboard
                </a>{' '}
              </li>
              <li>From the menu on the left, select “{networkName}” and click “Stake”</li>
              <li>
                In the list that opened, search for “Coverlet”, click “Manage” and then select
                “Delegate”
              </li>
              <li>
                2. Fill out the amount of {symbol} that you’d like to delegate, then click
                “Delegate” button
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
              {networkName.toLowerCase()}d tx staking delegate {valoper} &lt;amount&gt; <br />
              --from &lt;keyName&gt; --gas auto
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

export const HowToStake = ({ networkName, symbol, valoper }): ReactElement => {
  return <div className="how-to-stake">{getHowToStake(networkName, symbol, valoper)}</div>;
};

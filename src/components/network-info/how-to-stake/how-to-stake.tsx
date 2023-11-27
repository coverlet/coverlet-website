/* eslint-disable jsx-a11y/accessible-emoji */
import { ReactElement } from 'react';
import './how-to-stake.scss';

const getHowToStake = (networkName, symbol, valoper): ReactElement => {
  switch (networkName) {
    case 'Regen':
    case 'Osmosis':
    case 'Chihuahua':
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
    case 'Solana':
      return (
        <div>
          <div className="hts-title">Using a wallet</div>
          <div className="hts-text">
            <ol>
              <li style={{ marginTop: '4px' }}>1. Create or Open a Solana Wallet</li>
              <li style={{ fontSize: '0.95em', marginLeft: '16px' }}>
                Use wallets like Phantom or Solflare
              </li>
            </ol>
            <ol>
              <li style={{ marginTop: '4px' }}>2. Add SOL to Your Wallet</li>
              <li style={{ fontSize: '0.95em', marginLeft: '16px' }}>
                Purchase SOL from an exchange and transfer it to your wallet.
              </li>
            </ol>
            <ol>
              <li style={{ marginTop: '4px' }}>3. Delegate Your Stake</li>
              <li style={{ fontSize: '0.95em', marginLeft: '16px' }}>
                Go to the 'Stake' option in your wallet, select 'Delegate' or 'Add Stake,' and enter
                your validator address. Decide the amount of SOL to stake.
              </li>
            </ol>
            <ol>
              <li style={{ marginTop: '4px' }}>4. Confirm the Transaction</li>
              <li style={{ fontSize: '0.95em', marginLeft: '16px' }}>
                Check the details and confirm. Note there might be a small fee.
              </li>
            </ol>
          </div>
          <div className="hts-title">Using command line</div>
          Follow <a href="https://docs.solana.com/cli/delegate-stake">this guide</a> from Solana's
          docs.
        </div>
      );
    case 'Fetch.AI':
      return (
        <div>
          Follow <a href="https://fetch.ai/docs/guides/fetch-network/how-to-stake">this guide</a>{' '}
          from Fetch.ai docs.
        </div>
      );
    case 'Aleph Zero':
      return (
        <div>
          Follow{' '}
          <a href="https://alephzero.org/blog/how-to-stake-azero-on-the-aleph-zero-mainnet/">
            this guide
          </a>{' '}
          from Aleph Zero docs.
        </div>
      );
    default:
      return <div></div>;
  }
};

export const HowToStake = ({ networkName, symbol, valoper }): ReactElement => {
  return <div className="how-to-stake">{getHowToStake(networkName, symbol, valoper)}</div>;
};

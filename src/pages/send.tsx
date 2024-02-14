import React, { ReactElement, useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';

import './index.module.scss';
import { Button } from '../library/button/button';

class NamadaExtension {
  private static instance: NamadaExtension;
  private extension: any;

  private constructor() {}

  public static getInstance(): NamadaExtension {
    if (!NamadaExtension.instance) {
      NamadaExtension.instance = new NamadaExtension();
    }
    return NamadaExtension.instance;
  }

  public init() {
    this.extension = (window as any)?.namada;
    console.log(this.extension);
  }

  public detect(): boolean {
    this.init();
    return !!this.extension;
  }

  public async connect(): Promise<void> {
    await this.extension?.connect('shielded-expedition.88f17d1d14');
  }

  public async disconnect(): Promise<void> {
    await this.extension?.disconnect();
  }

  public async accounts(): Promise<any> {
    const signer = this.extension?.getSigner();
    return await signer?.accounts('shielded-expedition.88f17d1d14');
  }

  public async balances(owner: string): Promise<any> {
    console.log(owner);
    return this.extension?.balances({
      owner,
      tokens: ['tnam1qxvg64psvhwumv3mwrrjfcz0h3t3274hwggyzcee'],
    });
  }

  public async defaultAccount(): Promise<any> {
    const signer = this.extension?.getSigner();
    return await signer?.defaultAccount('shielded-expedition.88f17d1d14');
  }

  public transfer(val: string, account: any): Promise<any> {
    const signer = this.extension?.getSigner();

    return signer
      .submitTransfer(
        {
          source: account.address,
          target: 'tnam1qqsrhr894nnupdyu2fqrg290pyxd50pq5vrj8xtf',
          token: 'tnam1qxvg64psvhwumv3mwrrjfcz0h3t3274hwggyzcee',
          amount: new BigNumber(val),
          nativeToken: 'tnam1qxvg64psvhwumv3mwrrjfcz0h3t3274hwggyzcee',
        },
        {
          token: 'tnam1qxvg64psvhwumv3mwrrjfcz0h3t3274hwggyzcee',
          feeAmount: new BigNumber(0),
          gasLimit: new BigNumber(20_000),
          chainId: 'shielded-expedition.88f17d1d14',
          publicKey: account.publicKey,
          memo: 'hello',
        },
        account.type
      )
      .then((data) => console.log(data));
  }
}

const namada = NamadaExtension.getInstance();

const SendPage = (): ReactElement => {
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState({} as any);
  const [balance, setBalance] = useState(new BigNumber(0));
  const [val, setVal] = useState('');
  useEffect(() => {
    setTimeout(() => {
      console.log('connecting');
      setConnected(namada.detect());
    }, 500);
  }, []);
  useEffect(() => {
    if (connected) {
      namada.defaultAccount().then((account) => {
        setAccount(account);
        console.log(account);

        if (account) {
          namada.balances(account.address).then((data) => {
            data.forEach((bal) => {
              if (bal.token === 'tnam1qxvg64psvhwumv3mwrrjfcz0h3t3274hwggyzcee') {
                setBalance(new BigNumber(bal.amount));
              }
            });
          });
        }
      });
    }
  }, [connected]);

  return (
    <div style={{ height: '100vh', backgroundColor: 'black', color: '#fff', padding: '10vh' }}>
      <div style={{ height: '40vh' }}></div>
      {!connected && (
        <div>
          <Button
            color="yellow"
            size="default"
            onClick={() => {
              namada.connect();
            }}
          >
            CONNECT
          </Button>
          <br />
          <br />
        </div>
      )}
      {connected && (
        <div>
          {account?.alias}
          <br />
          {account?.address}
          <br />
          {balance.toFormat(2)} NAAN
          <br />
        </div>
      )}
      <div style={{ display: 'flex' }}>
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          style={{
            outline: 'none',
            backgroundColor: '#444',
            color: '#fff',
            border: '1px solid #bbb',
            fontSize: '40px',
            borderRadius: '4px',
          }}
        ></input>
        <Button
          color="yellow"
          size="default"
          onClick={() => {
            const res = namada.transfer(val, account);
            console.log(res);
            res.then((data) => {
              console.log('XXxXXxXX');
              console.log(data);
            });
          }}
        >
          SEND
        </Button>
      </div>
    </div>
  );
};

export default SendPage;

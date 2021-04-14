import { getPrices } from '../client/crypto-compare';
import { networks } from './networks';
import { extraData } from './extra-data';
import moment from 'moment';

const temp = [
  {
    time: 1616976000,
    high: 19.01,
    low: 17.67,
    open: 18.08,
    volumefrom: 905815.07,
    volumeto: 16701335.37,
    close: 18.92,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1617062400,
    high: 20.86,
    low: 18.9,
    open: 18.92,
    volumefrom: 968151.1,
    volumeto: 19211419.73,
    close: 19.1,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1617148800,
    high: 19.81,
    low: 18.06,
    open: 19.1,
    volumefrom: 791646.45,
    volumeto: 15131085.75,
    close: 19.42,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1617235200,
    high: 20.76,
    low: 18.77,
    open: 19.42,
    volumefrom: 900981.65,
    volumeto: 17593640.31,
    close: 19.04,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1617321600,
    high: 19.81,
    low: 18.55,
    open: 19.04,
    volumefrom: 581004.87,
    volumeto: 11138607.45,
    close: 19.77,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1617408000,
    high: 23.8,
    low: 19.74,
    open: 19.77,
    volumefrom: 2369795.47,
    volumeto: 51615008.06,
    close: 22.44,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1617494400,
    high: 25.53,
    low: 22.04,
    open: 22.44,
    volumefrom: 1419407.39,
    volumeto: 33954665.69,
    close: 23.81,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1617580800,
    high: 24.76,
    low: 22.77,
    open: 23.81,
    volumefrom: 1149970.78,
    volumeto: 27230532.4,
    close: 22.99,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1617667200,
    high: 25.3,
    low: 21.86,
    open: 22.99,
    volumefrom: 1246621.91,
    volumeto: 29200559.83,
    close: 25.09,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1617753600,
    high: 27.56,
    low: 22.97,
    open: 25.09,
    volumefrom: 2453668.76,
    volumeto: 62941535.1,
    close: 26.54,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1617840000,
    high: 27.94,
    low: 25.65,
    open: 26.54,
    volumefrom: 1255045.05,
    volumeto: 33561712.5,
    close: 26.99,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1617926400,
    high: 28.98,
    low: 26.83,
    open: 26.99,
    volumefrom: 942740.98,
    volumeto: 26523027.61,
    close: 27.67,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1618012800,
    high: 28.24,
    low: 25.95,
    open: 27.67,
    volumefrom: 1004785.46,
    volumeto: 27356959.52,
    close: 26.78,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1618099200,
    high: 28.61,
    low: 25.54,
    open: 26.78,
    volumefrom: 598627.16,
    volumeto: 16214588.58,
    close: 27.88,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1618185600,
    high: 29.86,
    low: 26.81,
    open: 27.88,
    volumefrom: 1053778.68,
    volumeto: 29827427.91,
    close: 28.5,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1618272000,
    high: 28.72,
    low: 26.39,
    open: 28.5,
    volumefrom: 896048.34,
    volumeto: 24537833.11,
    close: 27.77,
    conversionType: 'direct',
    conversionSymbol: '',
  },
];

const processCryptoData = (data) => {
  return data.map((d) => {
    return {
      date: moment.unix(d.time).format('YYYY-MM-DD'),
      val: d.close,
    };
  });
};

export const getData = async () => {
  for (let i = 0; i < networks.length; i++) {
    if (networks[i].hasPrice && networks[i].symbol) {
      const data = await getPrices(networks[i].symbol);
      // const data = { Data: { Data: temp } };
      networks[i].history = processCryptoData(data.Data.Data);
      networks[i].price = networks[i].history[networks[i].history.length - 1].val;
      // console.log(networks[i].history);
    }

    if (extraData[networks[i].name]) {
      networks[i] = { ...networks[i], ...extraData[networks[i].name] };
    }
  }

  return { networks };
};

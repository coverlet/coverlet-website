import { getPrices } from '../client/crypto-compare';
import { networks } from './networks';
import { extraData } from './extra-data';
import moment from 'moment';

const processCryptoData = (data) => {
  if (!data || !data?.[0]) {
    return {};
  }
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
      networks[i].price = networks[i].history?.[networks[i].history.length - 1]?.val || 0;
      // console.log(networks[i].history);
    }

    if (extraData[networks[i].name]) {
      networks[i] = { ...networks[i], ...extraData[networks[i].name] };
    }
  }

  return { networks };
};

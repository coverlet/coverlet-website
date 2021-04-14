import { HttpClient } from '../utils/http-client';

const ccClient = new HttpClient('https://min-api.cryptocompare.com/', {
  headers: {
    authorization: `Apikey ${process.env.CC_TOKEN}`,
  },
});

export const getPrices = (symbol: string) => {
  return ccClient.get(`data/v2/histoday?fsym=${symbol}&tsym=USD&limit=15`).then((data) => {
    return data;
  });
};

import { HttpClient } from '../utils/http-client';

const fbClient = new HttpClient('https://us-central1-coverlet-io.cloudfunctions.net/', {});

export const subscribeEmail = (email: string) => {
  return fbClient
    .get(`subscribeToTcg?email=${email}`)
    .then((data) => {
      return data;
    })
    .catch((e) => {
      return {
        Data: {
          Data: [],
        },
      };
    });
};

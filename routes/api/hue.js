import * as queryString from 'https://deno.land/x/querystring@v1.0.2/mod.js';
import { getRandomInt } from '../../util.js';

const isInternal = () =>
  JSON.stringify(Deno.env.get('SG_NETWORK')) === JSON.stringify('internal');

export const handler = {
  async POST(request) {
    const rotation = (await request.json()).hue;

    if (isInternal()) {
      console.log('at home... send fetch', { rotation });
      fetch(
        'https://192.168.86.30/api/MQdR757RjJg7Q6xgFtFSEN0jhi-XTQKLbwKKsD4G/lights/1/state',
        {
          method: 'PUT',
          body: JSON.stringify({
            on: true,
            sat: 254,
            bri: 254,
            hue: getRandomInt(0, 96920)
          })
        }
      );
    } else {
      console.log('intruder alert!');
    }

    return new Response();
  }
};

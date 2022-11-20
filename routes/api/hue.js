import * as queryString from 'https://deno.land/x/querystring@v1.0.2/mod.js';
import { getRandomInt } from '../../util.js';

export const handler = {
  async GET (req) {
    const rotation = queryString.parse(req.url.split('?')[1]).rotation;

    console.log('send', rotation / 10);

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

    return new Response();
  },
};

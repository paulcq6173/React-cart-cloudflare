import { IOrderData } from '@/utils/types';

const baseUrl = '/api/orders';

const create = async (newObject: IOrderData) => {
  const response = await fetch(baseUrl, {
    body: JSON.stringify(newObject),
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    mode: 'cors', // no-cors, cors, *same-origin
    referrer: 'no-referrer', // *client, no-referrer
  });

  return response.json();
};

export default { create };

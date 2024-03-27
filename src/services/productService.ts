const baseUrl = '/api/products';

const getSearchResult = async (url: string) => {
  const response = await fetch(url);

  return response.json();
};

const getProductById = async (reqId: string) => {
  const response = await fetch(`${baseUrl}/${reqId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    mode: 'cors', // no-cors, cors, *same-origin
    referrer: 'no-referrer', // *client, no-referrer
  });

  return response.json();
};

export default { getSearchResult, getProductById };

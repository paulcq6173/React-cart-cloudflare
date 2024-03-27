const baseUrl = '/api/users';

const getUser = async () => {
  const response = await fetch(baseUrl, {
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

export default { getUser };

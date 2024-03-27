interface IRegisterParams {
  username: string | undefined;
  email: string | undefined;
  password: string | undefined;
}

interface ILoginParams {
  account: string | undefined;
  password: string | undefined;
}

const baseUrl: string = '/api/auth';

const register = async (data: IRegisterParams) => {
  const respone = await fetch(`${baseUrl}/register`, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    mode: 'cors', // no-cors, cors, *same-origin
    referrer: 'no-referrer', // *client, no-referrer
  });

  return respone.json();
};

const login = async (data: ILoginParams) => {
  const respone = await fetch(`${baseUrl}/login`, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    mode: 'cors', // no-cors, cors, *same-origin
    referrer: 'no-referrer', // *client, no-referrer
  });

  return respone.json();
};

export default { register, login };

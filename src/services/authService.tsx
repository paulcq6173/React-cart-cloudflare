import { ErrorHandler } from '@/utils/errorHelper';

interface IRegisterParams {
  username: string | undefined;
  email: string | undefined;
  password: string | undefined;
}

interface ILoginParams {
  account: string | undefined;
  password: string | undefined;
}

const baseUrl: string = '/api';

const verifyToken = async (token: FormDataEntryValue) => {
  let result;

  try {
    // Turnstile verify process
    const verifyRes = await fetch(`${baseUrl}/verify`, {
      method: 'POST',
      body: JSON.stringify({ token }),
      headers: {
        'content-type': 'application/json',
      },
    });

    result = await verifyRes.json();
  } catch (error: unknown) {
    ErrorHandler(error);
  }

  if (!result.success) {
    return null;
  }

  return result;
};

const register = async (data: IRegisterParams) => {
  let response;

  try {
    response = await fetch(`${baseUrl}/auth/register`, {
      body: JSON.stringify(data), // must match 'Content-Type' header
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors', // no-cors, cors, *same-origin
      referrer: 'no-referrer', // *client, no-referrer
    });
  } catch (error: unknown) {
    ErrorHandler(error);
  }

  if (!response) {
    return { message: 'Failed to register a new user', status: 400 };
  }

  return response.json();
};

const login = async (data: ILoginParams) => {
  const respone = await fetch(`${baseUrl}/auth/login`, {
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

export default { verifyToken, register, login };

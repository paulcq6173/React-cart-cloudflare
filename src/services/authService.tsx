import { TUser } from '@/reducers/loginSlice';
import { ErrorHandler } from '@/utils/errorHelper';

interface IBaseParams {
  password?: string | undefined;
}

interface IRegisterParams extends IBaseParams {
  username?: string | undefined;
  email?: string | undefined;
}

interface ILoginParams extends IBaseParams {
  account?: string | undefined;
}

interface IVerifyResult {
  token?: string | undefined;
  success: boolean;
}

interface IMesResult {
  message: string;
  status: number;
}

const baseUrl: string = '/api';

const verifyToken = async (
  token: FormDataEntryValue
): Promise<IVerifyResult | null> => {
  let result: IVerifyResult = { success: true };

  try {
    // Turnstile verify process
    const verifyRes: Response = await fetch(`${baseUrl}/verify`, {
      method: 'POST',
      body: JSON.stringify({ token }),
      headers: {
        'content-type': 'application/json',
      },
    });

    result = await verifyRes.json();
  } catch (error: unknown) {
    console.log('login failed');
    ErrorHandler(error);
  }

  if (!result.success) {
    return null;
  }

  return result;
};

const register = async (data: IRegisterParams): Promise<IMesResult> => {
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

const login = async (data: ILoginParams): Promise<TUser | IMesResult> => {
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

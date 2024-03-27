import { useState } from 'react';

/**
 * Custom hook for login form.
 *
 */
const useLogin = () => {
  const initState = {
    // Let user can use either username or email to log in
    account: '',
    password: '',
  };

  // React does not recognize the `loginData` prop on a DOM element.
  // So you need spell it as lowercase `logindata` instead.
  const [logindata, setLogindata] = useState(initState);

  const onChange = (e: { target: HTMLInputElement }) => {
    setLogindata((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const onReset = () => setLogindata(initState);

  return {
    logindata,
    onChange,
    onReset,
  };
};

export default useLogin;

import { useState } from 'react';

const initState = {
  username: undefined,
  email: undefined,
  password: undefined,
};

const useRegister = () => {
  // React does not recognize the `registerData` prop on a DOM element.
  // You need spell it as lowercase `registerdata` instead.
  const [registerdata, setRegisterdata] = useState(initState);

  const onChange = (e: { target: HTMLInputElement }) => {
    // e.target.id -> useState.property
    // e.target.value -> useState.property.value
    setRegisterdata((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const onReset = () => setRegisterdata(initState);

  return {
    registerdata,
    onChange,
    onReset,
  };
};

export default useRegister;

import { useState } from 'react';

/**
 * Custom hook fuction to handle form behavior
 *
 * @param {*} type
 * @returns
 */
const useField = (type: string) => {
  const [value, setValue] = useState('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onReset = () => setValue('');

  return {
    type,
    value,
    onChange,
    onReset,
  };
};

export default useField;

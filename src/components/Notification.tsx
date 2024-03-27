import { useAppSelector } from '@/reducers/reduxHooks';

const Notification = () => {
  // If process success, the value of success will be undefined.
  // So you can't use !success as condition.
  const { message, success } = useAppSelector((state) => state.notification);

  if (message === '') {
    return null;
  }

  return (
    <div className={success === false ? 'text-red-500' : 'text-green-500'}>
      {message}
    </div>
  );
};

export default Notification;

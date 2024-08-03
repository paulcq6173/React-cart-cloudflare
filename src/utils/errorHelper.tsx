import { resetMessage, setMessage } from '@/reducers/notifySlice';
import { useAppDispatch } from '@/reducers/reduxHooks';

export const ErrorHandler = (error: unknown) => {
  const dispatch = useAppDispatch();

  if (error instanceof Error) {
    dispatch(setMessage({ message: error.message }));
    setTimeout(() => {
      dispatch(resetMessage());
    }, 5000);
  } else {
    dispatch(setMessage({ message: 'Unexpected Error occured' }));
    setTimeout(() => {
      dispatch(resetMessage());
    }, 5000);
  }

  /*if (axios.isAxiosError(error))  {
        const { request, response } = error;
        if (response) {
            const { message } = response.data;
            const status = response.status;           
            return { message, status };
        } else if (request) {
            //request sent but no response received
            return {
              message: "server time out",
              status: 503,
            };
        } else {
            // Something happened in setting up the request that triggered an Error
            return { message: "Oops! something went wrong while setting up request" };
        }        
    } else { // Just a stock error
        return { message: "Error occurs when handle error." };
    }*/
};

export default ErrorHandler;

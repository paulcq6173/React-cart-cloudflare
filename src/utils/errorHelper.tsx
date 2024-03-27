export const errorHandler = (error: unknown) => {
  if (error instanceof Error) {
    return { message: 'Error occurs when process running', status: 400 };
  }
  return { message: 'Unexpected Error occurs', status: 500 };
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

export default errorHandler;

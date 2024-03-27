import productService from '@/services/productService';
import { IData } from '@/utils/types';
import { useEffect, useState } from 'react';

interface IParams {
  data: IData[];
  loading: boolean;
  error: string;
}

/**
 * Use component to handle app.get process.
 *
 * @param url
 * @returns data loading error
 * @see ../components/Content
 */
const useFetch = (url: string): IParams => {
  const [data, setData] = useState<Array<IData>>([]); // data temp storage
  const [loading, setLoading] = useState<boolean>(false); // loading status
  const [error, setError] = useState(''); // error status

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await productService.getSearchResult(url);

        setData(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          console.log('Unexpected Error occurs when useFetch proceed', err);
        }
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);
  return { data, loading, error };
};

export default useFetch;

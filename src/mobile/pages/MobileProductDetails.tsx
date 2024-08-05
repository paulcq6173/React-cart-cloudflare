import TopNavBar from '@/mobile/components/MobileTopNav';
import MobileProductLayout from '@/mobile/components/layout/MobileProductLayout';
import productService from '@/services/productService';
import { IData } from '@/utils/types';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ProductDetails = () => {
  const [data, setData] = useState<IData | null>();
  const productUrl = useLocation();
  // pathname = "/mobile/products/id" ; index[3]=4rd string=id
  const productID = productUrl.pathname.split('/')[3];

  useEffect(() => {
    async function fetchData() {
      const result = await productService.getProductById(productID);
      setData(result);
    }

    fetchData();
  }, [productID]);

  return (
    <div className="w-screen flex flex-col justify-center">
      <TopNavBar />
      {data ? <MobileProductLayout props={data} /> : <div>Page loading...</div>}
    </div>
  );
};

export default ProductDetails;

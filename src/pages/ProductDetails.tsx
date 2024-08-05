import Footer from '@/components/Footer';
import TopNaviBar from '@/components/TopNaviBar';
import ProductLayout from '@/components/layout/ProductLayout';
import productService from '@/services/productService';
import { IData } from '@/utils/types';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ProductDetails = () => {
  const [data, setData] = useState<IData | null>();
  const productUrl = useLocation();
  // pathname = "/products/id" ; index[2]=3rd string=id
  const productID = productUrl.pathname.split('/')[2];

  useEffect(() => {
    async function fetchData() {
      const result = await productService.getProductById(productID);
      setData(result);
    }

    fetchData();
  }, [productID]);

  return (
    <div className="w-screen flex flex-col justify-center">
      <TopNaviBar />
      {data ? (
        <ProductLayout props={data} />
      ) : (
        <div className="h-600px">Page loading...</div>
      )}
      <Footer />
    </div>
  );
};

export default ProductDetails;

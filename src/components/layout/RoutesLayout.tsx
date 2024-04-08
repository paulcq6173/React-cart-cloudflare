import MobileCart from '@/mobile/pages/MobileCart';
import MobileHome from '@/mobile/pages/MobileHome';
import MobileLogin from '@/mobile/pages/MobileLogin';
import MobileProductDetails from '@/mobile/pages/MobileProductDetails';
import MobileRegister from '@/mobile/pages/MobileRegister';
import Cart from '@/pages/Cart';
import Event from '@/pages/Event';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import ProductDetails from '@/pages/ProductDetails';
import Register from '@/pages/Register';
import SearchResult from '@/pages/SearchResult';
import { useMediaQuery } from 'react-responsive';
import { Route, Routes, redirect } from 'react-router-dom';

const RoutesLayout = () => {
  const ResponsiveHome = () => {
    const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });

    if (isTabletOrMobile) {
      redirect('/mobile');
      return <MobileHome />;
    }

    return <Home />;
  };

  return (
    <Routes>
      <Route path="/" element={<ResponsiveHome />} />
      <Route path="/products/search" element={<SearchResult />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/event" element={<Event />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/mobile" element={<MobileHome />} />
      <Route path="/mobile/products/search" element={<SearchResult />} />
      <Route path="/mobile/products/:id" element={<MobileProductDetails />} />
      <Route path="/mobile/login" element={<MobileLogin />} />
      <Route path="/mobile/register" element={<MobileRegister />} />
      <Route path="/mobile/cart" element={<MobileCart />} />
    </Routes>
  );
};

export default RoutesLayout;

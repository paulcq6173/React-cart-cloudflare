import MobileHome from '@/mobile/pages/MobileHome';
import Cart from '@/pages/Cart';
import Event from '@/pages/Event';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import ProductDetails from '@/pages/ProductDetails';
import Register from '@/pages/Register';
import SearchResult from '@/pages/SearchResult';
import { Route, Routes } from 'react-router-dom';

const RoutesLayout = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/search" element={<SearchResult />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/event" element={<Event />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/mobile" element={<MobileHome />} />
    </Routes>
  );
};

export default RoutesLayout;

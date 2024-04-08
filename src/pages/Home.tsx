import Footer from '@/components/Footer';
import Header from '../components/Header';
import TopNaviBar from '../components/TopNaviBar';
import HomeLayout from '../components/layout/HomeLayout';

const Home = () => {
  return (
    <div className="w-screen flex flex-col justify-center">
      <TopNaviBar />
      <Header />
      <HomeLayout />
      <Footer />
    </div>
  );
};

export default Home;

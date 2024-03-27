import Header from '../components/Header';
import HomeLayout from '../components/layout/HomeLayout';
import TopNaviBar from '../components/TopNaviBar';

const Home = () => {
  return (
    <div className="w-screen flex flex-col justify-center">
      <TopNaviBar />
      <Header />
      <HomeLayout />
    </div>
  );
};

export default Home;

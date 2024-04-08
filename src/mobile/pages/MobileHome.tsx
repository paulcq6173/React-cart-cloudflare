import Footer from '@/components/Footer';
import TopNavBar from '@/mobile/components/MobileTopNav';
import HomeLayout from '@/mobile/components/layout/MobileHomeLayout';

const Home = () => {
  return (
    <div className="w-screen sm:max-w-[640px] flex flex-col justify-center">
      <TopNavBar />
      <div className="w-screen bg-pink-400 flex justify-center">
        <img src="images/eventSpringBanner.png" className="h-auto" />
      </div>
      <div className="w-full bg-teal-800">
        <HomeLayout />
      </div>
      <Footer />
    </div>
  );
};

export default Home;

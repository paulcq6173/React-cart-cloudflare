import TopNavBar from '@/mobile/components/MobileTopNav';

const Home = () => {
  return (
    <div className="w-screen max-w-[360px] sm:max-w-[640px] flex flex-col justify-center">
      <TopNavBar />
      <div className="bg-teal-800">
        <p>Mobile RWD Test</p>
      </div>
    </div>
  );
};

export default Home;

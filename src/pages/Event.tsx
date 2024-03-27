import TopNaviBar from '../components/TopNaviBar';

const Event = () => {
  return (
    <div>
      <TopNaviBar />
      <div>
        <div>
          <div className="w-96 h-1/2 m-auto">
            <img
              src="https://img.freepik.com/free-photo/old-books-shelf-background-with-never-stop-dreaming-quote_53876-132278.jpg"
              alt=""
            />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold">Event detail</h2>
            <hr />
            <p>This event has ended.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;

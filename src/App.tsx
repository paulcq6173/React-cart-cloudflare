import Footer from './components/Footer';
import RoutesLayout from './components/layout/RoutesLayout';
import './index.css';

function App() {
  return (
    <div className="w-full max-w-7xl flex flex-col space-y-4 justify-center">
      <RoutesLayout />
      <Footer />
    </div>
  );
}

export default App;

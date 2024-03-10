import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.js';
import Buy from './pages/Buy.js';
import Charging from './pages/Charging.js';
import ScrollToTop from './functions/ScrollToTop.js';

function App() {
  return (
      <div>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route index element={<LandingPage />} />
            <Route path="/Homepage" element={<LandingPage />} />
            <Route path="/FindCars" element={<Buy />} />
            <Route path="/stations" element={<Charging />} />
            {/* Other routes */}
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
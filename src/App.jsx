import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Hero from './components/Hero.jsx';
import GemsSection from './components/GemsSection.jsx';
import ContactSection from './components/ContactSection.jsx';
import Footer from './components/Footer.jsx';
import AlgoTradingPage from './pages/AlgoTradingPage.jsx';

function HomePage() {
  return (
    <>
      <Hero />
      <div className="page-break" />
      <GemsSection />
      <ContactSection />
    </>
  );
}

function App() {
  return (
    <>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/algo-trading" element={<AlgoTradingPage />} />
        </Routes>
        <div className="page-break" />
        <Footer />
      </div>
    </>
  );
}

export default App;

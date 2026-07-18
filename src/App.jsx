import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Hero from './components/Hero.jsx';
import GemsSection from './components/GemsSection.jsx';
import ContactSection from './components/ContactSection.jsx';
import Footer from './components/Footer.jsx';
import AlgoPage from './pages/AlgoPage.jsx';

function HomePage() {
  return (
    <>
      <Hero />
      <div className="page-break" />
      <GemsSection />
      <div className="page-break" />
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
          <Route path="/algo" element={<AlgoPage />} />
        </Routes>
        <div className="page-break" />
        <Footer />
      </div>
    </>
  );
}

export default App;

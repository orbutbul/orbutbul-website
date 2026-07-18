import NavBar from './components/NavBar.jsx';
import Hero from './components/Hero.jsx';
import GemsSection from './components/GemsSection.jsx';
import ContactSection from './components/ContactSection.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <>
      <NavBar />
      <div className="container">
        <Hero />
        <div className="page-break" />
        <GemsSection />
        <ContactSection />
        <div className="page-break" />
        <Footer />
      </div>
    </>
  );
}

export default App;

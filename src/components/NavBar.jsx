export default function NavBar() {
  return (
    <nav className="nav-bar">
      <div className="nav-bar-links">
        <a href="/#home" className="nav-link">Home</a>
        <a href="/#gems-page" className="nav-link">Projects</a>
        <a href="/#contact" className="nav-link">Contact</a>
        <a href="/algo" className="nav-link">Algo</a>
      </div>
      <div className="nav-bar-icon">
        <svg id="DiamondLeft" width="13" height="6" viewBox="0 0 13 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.712 3L7.97482 0.276441L12.5141 3L7.97482 5.72356L0.712 3Z" stroke="black" strokeWidth=".75" />
        </svg>
        <svg id="Mainline" width="100%" height="2" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="0%" y1="0" x2="100%" y2="0" stroke="black" strokeWidth="1.5" />
        </svg>
        <svg id="DiamondRight" width="13" height="6" viewBox="0 0 13 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.288 3L5.02518 5.72356L0.485913 3L5.02518 0.276441L12.288 3Z" stroke="black" strokeWidth=".75" />
        </svg>
      </div>
    </nav>
  );
}

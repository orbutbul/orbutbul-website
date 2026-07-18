import Socials from './Socials.jsx';

export default function Hero() {
  return (
    <section className="page home" id="home">
      <div className="panel intro">
        <h1 className="hello">Hello,</h1>
        <h1 className="myName-mobile">I'm Or</h1>
        <img src="/Imgs/me.jpeg" className="me" alt="Or Butbul" />
        <Socials />
      </div>
      <div className="panel abtme">
        <h1 className="myName">I'm Or</h1>
        <p className="descript">
          I'm a Computer Science student interested in Artificial Intelligence, Graphics,
          Data Science and anything programming/Software Engineering related!
        </p>
      </div>
    </section>
  );
}

import Socials from './Socials.jsx';

export default function ContactSection() {
  return (
    <>
      <h2 className="letstalk">Let's talk!</h2>
      <section className="page contact" id="contact">
        <div className="panel">
          <form
            className="contact-form"
            action="https://formsubmit.co/contact@orbutbul.dev"
            method="POST"
            autoComplete="on"
          >
            <input type="hidden" name="_captcha" value="false" />
            <input type="text" name="_honey" style={{ display: 'none' }} />
            <input type="text" name="name" placeholder="Name" id="contact-Name" required />
            <input type="text" name="email" placeholder="E-mail" id="contact-Email" required />
            <textarea name="message" placeholder="Message" id="contact-Message" required />
            <button name="submit" type="submit">Send</button>
          </form>
        </div>
        <div className="panel" style={{ height: '30vh' }}>
          <Socials className="socials-square" />
        </div>
      </section>
    </>
  );
}

import Socials from './Socials.jsx';

export default function ContactSection() {
  return (
    <>
      <section className="page contact" id="contact">
        <div className="panel contact-intro">
          <div>
            <h2 className="letstalk">Get in touch</h2>
            <p className="letstalk-sub">Let's chat!</p>
          </div>
        </div>
        <div className="panel contact-panel">
          <form
            id="contact-form"
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
          </form>
        </div>
      </section>
      <div className="contact-actions-row">
        <div className="contact-actions-spacer" />
        <div className="contact-actions">
          <button form="contact-form" name="submit" type="submit">Send</button>
          <Socials className="socials-contact" />
        </div>
      </div>
    </>
  );
}

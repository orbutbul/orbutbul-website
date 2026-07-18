import { useState } from 'react';
import Socials from './Socials.jsx';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '', honey: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errorMessage, setErrorMessage] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch('/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(form),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      setStatus('sent');
      setForm({ name: '', email: '', message: '', honey: '' });
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message);
    }
  }

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
          <form id="contact-form" className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="honey"
              value={form.honey}
              onChange={handleChange}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              id="contact-Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              id="contact-Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Message"
              id="contact-Message"
              value={form.message}
              onChange={handleChange}
              required
            />
            {status === 'sent' && <p className="form-status form-status-ok">Message sent — thanks!</p>}
            {status === 'error' && <p className="form-status form-status-error">{errorMessage}</p>}
          </form>
        </div>
      </section>
      <div className="contact-actions-row">
        <div className="contact-actions-spacer" />
        <div className="contact-actions">
          <button form="contact-form" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send'}
          </button>
          <Socials className="socials-contact" />
        </div>
      </div>
    </>
  );
}

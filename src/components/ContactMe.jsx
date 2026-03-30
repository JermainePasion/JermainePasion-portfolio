import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./css/ContactMe.css";

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Initialize EmailJS with the public key once at module level
emailjs.init(PUBLIC_KEY);

const ContactMe = () => {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [focused, setFocused] = useState(null);
  const [empty, setEmpty] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields are not empty
    const form = formRef.current;
    const name = form.from_name.value.trim();
    const email = form.user_email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      setStatus("validation");
      setEmpty([
        !name    && "name",
        !email   && "email",
        !message && "message",
      ].filter(Boolean));
      return;
    }
    setEmpty([]);

    // Guard: warn loudly if env vars are missing (not loaded by Vite)
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error(
        "EmailJS env vars are undefined. " +
        "Make sure your .env file exists at the project root, " +
        "all keys are prefixed with VITE_, and you restarted the dev server."
      );
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      const result = await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current);
      console.log("EmailJS success:", result);
      setStatus("success");
      formRef.current.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  const isBusy = status === "sending";

  return (
    <section className="contact-section">
      <div className="contact-inner">

        {/* Left — heading block */}
        <div className="contact-heading-block">
          <p className="contact-eyebrow">Get in touch</p>
          <h2 className="contact-heading">
            Let's work<br />together.
          </h2>
          <p className="contact-subtext">
            Have a project in mind or just want to say hello?
            Drop me a message and I'll get back to you.
          </p>
        </div>

        {/* Right — form */}
        <form
          ref={formRef}
          className="contact-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className={`contact-field ${focused === "name" ? "focused" : ""} ${empty.includes("name") ? "empty" : ""}`}>
            <label htmlFor="contact-name">Name</label>
            <input
              id="contact-name"
              type="text"
              name="from_name"
              placeholder="Your name"
              required
              onFocus={() => setFocused("name")}
              onBlur={() => setFocused(null)}
            />
          </div>

          <div className={`contact-field ${focused === "email" ? "focused" : ""} ${empty.includes("email") ? "empty" : ""}`}>
            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              type="email"
              name="user_email"
              placeholder="your@email.com"
              required
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused(null)}
            />
          </div>

          <div className={`contact-field ${focused === "message" ? "focused" : ""} ${empty.includes("message") ? "empty" : ""}`}>
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              placeholder="Tell me about your project..."
              rows={5}
              required
              onFocus={() => setFocused("message")}
              onBlur={() => setFocused(null)}
            />
          </div>

          <div className="contact-footer">
            <button
              type="submit"
              className={`contact-btn ${isBusy ? "sending" : ""}`}
              disabled={isBusy}
            >
              {isBusy ? (
                <span className="contact-btn-inner">
                  <span className="contact-spinner" />
                  Sending…
                </span>
              ) : (
                <span className="contact-btn-inner">
                  Send message
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 10h12M11 5l5 5-5 5" />
                  </svg>
                </span>
              )}
            </button>

            {status === "validation" && (
              <p className="contact-feedback error">
                Please fill in all fields before sending.
              </p>
            )}
            {status === "success" && (
              <p className="contact-feedback success">
                ✓ Message sent — I'll be in touch soon.
              </p>
            )}
            {status === "error" && (
              <p className="contact-feedback error">
                Something went wrong. Please try again.
              </p>
            )}
          </div>
        </form>

      </div>
    </section>
  );
};

export default ContactMe;
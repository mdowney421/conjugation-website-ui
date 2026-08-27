"use client";

import { useState, type FormEvent } from "react";

const TYPE_OPTIONS = [
  { value: "comment", label: "Comment or thank you" },
  { value: "bug", label: "Report an issue" },
  { value: "feature", label: "Request a feature" },
];

type Status = "idle" | "submitting" | "success" | "error";

const FeedbackWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("comment");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const openModal = () => {
    setType("comment");
    setMessage("");
    setEmail("");
    setCompany("");
    setStatus("idle");
    setErrorMessage("");
    setIsOpen(true);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!message.trim() || status === "submitting") return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, message, email, company }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    }
  };

  return (
    <>
      <button
        type="button"
        className="feedback-fab"
        onClick={openModal}
        aria-label="Feedback"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </button>

      {isOpen && (
        <div className="feedback-overlay" onClick={() => setIsOpen(false)}>
          <div
            className="feedback-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="feedback-heading"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="feedback-close"
              aria-label="Close"
              onClick={() => setIsOpen(false)}
            >
              &times;
            </button>

            {status === "success" ? (
              <div className="feedback-success">
                <h3>Thanks!</h3>
                <p>Your message has been sent.</p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="feedback-form">
                <h3 id="feedback-heading">Feedback</h3>
                <p className="feedback-subtitle">
                  Found a bug, want a feature, or just want to say hi? Let us
                  know.
                </p>

                <label className="feedback-label">
                  Type
                  <select
                    value={type}
                    onChange={(event) => setType(event.target.value)}
                    className="feedback-select"
                  >
                    {TYPE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="feedback-label">
                  Message
                  <textarea
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    required
                    rows={5}
                    className="feedback-textarea"
                    placeholder="Tell us what's on your mind..."
                  />
                </label>

                <label className="feedback-label">
                  Email{" "}
                  <span className="feedback-optional">
                    (optional, if you&apos;d like a reply)
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="feedback-input"
                    placeholder="you@example.com"
                  />
                </label>

                <input
                  type="text"
                  name="company"
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                  className="feedback-honeypot"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                {status === "error" && (
                  <p className="feedback-error">{errorMessage}</p>
                )}

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? "Sending…" : "Send"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackWidget;

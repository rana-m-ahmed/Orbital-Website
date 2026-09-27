"use client";
import { useActionState } from "react";
import Link from "next/link";
import { submitLead } from "@/app/start-project/actions";
import type { LeadState } from "@/lib/lead-schema";
const initial: LeadState = { success: false, message: "" };
export default function ProjectForm() {
  const [state, action, pending] = useActionState(submitLead, initial);
  if (state.success)
    return (
      <div className="project-form form-success" role="status">
        <span className="node" />
        <h2>Request received.</h2>
        <p>{state.message}</p>
        <Link href="/" className="text-link">
          Back to ORBITAL ↗
        </Link>
      </div>
    );
  return (
    <form action={action} className="project-form">
      <div aria-live="polite">
        {state.message && (
          <p className="form-message" role="alert">
            {state.message}
          </p>
        )}
      </div>
      <div className="honey" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="form-grid">
        {[
          ["name", "Your name", "text", "name", 100],
          ["email", "Email address", "email", "email", 254],
          ["company", "Company", "text", "organization", 150],
        ].map(([name, label, type, auto, max]) => (
          <div className="field" key={name}>
            <label htmlFor={String(name)}>{label} *</label>
            <input
              id={String(name)}
              name={String(name)}
              type={String(type)}
              autoComplete={String(auto)}
              maxLength={Number(max)}
              required
              minLength={name === "email" ? undefined : 2}
              aria-invalid={!!state.errors?.[name]}
              aria-describedby={
                state.errors?.[name] ? name + "-error" : undefined
              }
            />
            {state.errors?.[name] && (
              <small id={name + "-error"}>{state.errors[name][0]}</small>
            )}
          </div>
        ))}
        <div className="field">
          <label htmlFor="service">What are you exploring? *</label>
          <select id="service" name="service" required>
            <option>Not sure yet</option>
            <option>AI Receptionist</option>
            <option>AI Calling Agents</option>
            <option>Workflow Automation</option>
            <option value="Custom Software">Software, websites or apps</option>
          </select>
        </div>
        <div className="field full">
          <label htmlFor="message">What slows your business down? *</label>
          <textarea
            id="message"
            name="message"
            placeholder="Tell us what happens today and what you’d like to improve."
            minLength={20}
            maxLength={5000}
            required
            aria-invalid={!!state.errors?.message}
            aria-describedby="message-hint message-error"
          />
          <span id="message-hint" className="field-hint">
            Please don’t include passwords or sensitive customer information.
          </span>
          <small id="message-error">{state.errors?.message?.[0]}</small>
        </div>
      </div>
      <label className="consent">
        <input type="checkbox" name="consent" required />
        <span>
          I agree that ORBITAL may use these details to respond to this request,
          as described in the <Link href="/privacy">privacy notice</Link>. *
        </span>
      </label>
      {state.errors?.consent && (
        <p className="form-message">{state.errors.consent[0]}</p>
      )}
      <button className="button" type="submit" disabled={pending}>
        {pending ? "Saving your request…" : "Send project request"}{" "}
        <span>↗</span>
      </button>
    </form>
  );
}

'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { signGuestbook, type FormState } from '@/lib/db/actions';

const initialState: FormState = { ok: false };

export function SignForm() {
  const [state, formAction] = useActionState(signGuestbook, initialState);

  return (
    <form action={formAction} className="guestbook-form">
      <div className="form-row">
        <label htmlFor="name" className="form-label">
          ★ your name:
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={64}
          className="form-input"
          placeholder="enter your name"
          defaultValue=""
        />
        {state.fieldErrors?.name && (
          <div className="form-error">{state.fieldErrors.name}</div>
        )}
      </div>

      <div className="form-row">
        <label htmlFor="message" className="form-label">
          ♥ your message:
        </label>
        <textarea
          id="message"
          name="message"
          required
          maxLength={500}
          rows={4}
          className="form-input form-textarea"
          placeholder="say something nice ✿"
          defaultValue=""
        />
        {state.fieldErrors?.message && (
          <div className="form-error">{state.fieldErrors.message}</div>
        )}
      </div>

      {/* honeypot — hidden from humans, irresistible to bots */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="form-honeypot"
        aria-hidden="true"
      />

      <SubmitButton />

      {state.ok && (
        <div className="form-success">
          ✿ signed! thank you for visiting ✿
        </div>
      )}
      {state.error && !state.fieldErrors && (
        <div className="form-error form-error-global">{state.error}</div>
      )}
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className="form-submit">
      {pending ? 'signing...' : '✿ sign the guestbook ✿'}
    </button>
  );
}
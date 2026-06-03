'use server';

import { db } from './index';
import { guestbookEntries } from './schema';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const entrySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'name is required')
    .max(64, 'name must be 64 characters or less'),
  message: z
    .string()
    .trim()
    .min(1, 'message is required')
    .max(500, 'message must be 500 characters or less'),
  // Honeypot field — bots fill it in, humans don't
  website: z.string().max(0, 'spam detected').optional(),
});

export type FormState = {
  ok: boolean;
  error?: string;
  fieldErrors?: {
    name?: string;
    message?: string;
  };
};

export async function signGuestbook(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const raw = {
    name: formData.get('name')?.toString() ?? '',
    message: formData.get('message')?.toString() ?? '',
    website: formData.get('website')?.toString() ?? '',
  };

  const parsed = entrySchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: FormState['fieldErrors'] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof typeof fieldErrors;
      if (field === 'name' || field === 'message') {
        fieldErrors[field] = issue.message;
      }
    }
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? 'invalid input',
      fieldErrors,
    };
  }

  // Silent reject for spam — bots get a fake success so they don't retry
  if (parsed.data.website && parsed.data.website.length > 0) {
    return { ok: true };
  }

  try {
    await db.insert(guestbookEntries).values({
      name: parsed.data.name,
      message: parsed.data.message,
    });

    // Tell Next.js to refresh the cached guestbook page so the new entry appears
    revalidatePath('/guestbook');

    return { ok: true };
  } catch (err) {
    console.error('Failed to insert guestbook entry:', err);
    return { ok: false, error: 'something broke. please try again.' };
  }
}
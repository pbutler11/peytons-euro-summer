import Link from 'next/link';
import { db } from '@/lib/db';
import { guestbookEntries } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';
import { SignForm } from '@/components/guestbook/SignForm';

export const metadata = {
  title: "guestbook — peyton's euro summer ✿",
  description: 'sign the guestbook!',
};

// Don't cache this page — always fetch fresh entries
export const dynamic = 'force-dynamic';

export default async function GuestbookPage() {
  const entries = await db
    .select()
    .from(guestbookEntries)
    .orderBy(desc(guestbookEntries.createdAt))
    .limit(100);

  return (
    <div className="guestbook-page">
      <div className="breadcrumb">
        <Link href="/">← back to home</Link>
      </div>

      <header className="guestbook-header">
        <h1 className="guestbook-title">★彡 sign the guestbook 彡★</h1>
        <p className="guestbook-subtitle">
          ~ it's like a virtual post card ~
        </p>
      </header>

      {/* form will go here in the next step */}
      <SignForm />

      <div className="guestbook-entries">
        <h2 className="guestbook-entries-title">
          ✿ {entries.length} {entries.length === 1 ? 'visitor has' : 'visitors have'} signed ✿
        </h2>

        {entries.length === 0 ? (
          <div className="empty-state bevel-inset">
            <p>be the first to sign the guestbook... ✦</p>
          </div>
        ) : (
          <ul className="guestbook-list">
            {entries.map((entry) => (
              <li key={entry.id} className="guestbook-entry">
                <div className="guestbook-entry-header">
                  <strong className="guestbook-entry-name">{entry.name}</strong>
                  <span className="guestbook-entry-date">
                    {formatDate(entry.createdAt)}
                  </span>
                </div>
                <p className="guestbook-entry-message">{entry.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}
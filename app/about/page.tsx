import Link from 'next/link';

export const metadata = {
  title: "about — peyton's euro summer ✿",
  description: 'about the person behind this travel blog',
};

export default function AboutPage() {
  return (
    <div className="about-page">
      <div className="breadcrumb">
        <Link href="/">← back to home</Link>
      </div>

      <header className="about-header">
        <h1 className="about-title">✿ about me ✿</h1>
        <p className="about-subtitle">
          ~ hi, i'm peyton ~
        </p>
      </header>

      <section className="about-block">
        <h2 className="about-block-title">★ the short version</h2>
        <p>
          frontend engineer, currently somewhere in europe with my fiancé jesse
          for three months of remote work and very long lunches. this site is
          my travel diary, built as a love letter to the early 2000s personal
          web.
        </p>
      </section>

      <section className="about-block">
        <h2 className="about-block-title">★ the trip</h2>
        <p>
          we left in mid-may 2026 and we're hitting twelve cities across spain,
          morocco, portugal, italy, and france. the rough plan is to spend
          enough time in each place to actually live there for a few days
          instead of just visiting. read more on the{' '}
          <Link href="/trip">trip page</Link>.
        </p>
      </section>

      <section className="about-block">
        <h2 className="about-block-title">★ currently into</h2>
        <ul className="about-list">
          <li>learning spanish (mostly for restaurants)</li>
          <li>ceramics, when i have a wheel nearby</li>
          <li>finding the best pastry in every neighborhood</li>
          <li>writing this blog!</li>
        </ul>
      </section>

      <section className="about-block">
        <h2 className="about-block-title">★ how this site was built</h2>
        <p>
          this site is a personal project built with{' '}
          <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">
            next.js 15
          </a>{' '}
          (app router), typescript, and hand-written css. posts are written in
          mdx with custom react components for photo carousels. it's deployed
          on{' '}
          <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
            vercel
          </a>{' '}
          with automatic deploys from{' '}
          <a
href="https://github.com/pbutler11/peytons-euro-summer"
target="_blank"
rel="noopener noreferrer"
>
github
</a>
.
        </p>
        <p>
          the design is a love letter to internet phone book, cameron's world,
          aim 2002, and the genuine warmth of geocities. it scores in the high
          90s on lighthouse despite the comic sans energy.
        </p>
      </section>

      <section className="about-block">
        <h2 className="about-block-title">★ say hi</h2>
        <p>
          if you find this site, leave a note in the{' '}
          <Link href="/guestbook">guestbook</Link> (coming soon) — it would make
          my whole day. otherwise i'm on the internet under <strong>@pbutler11</strong>{' '}
          most places.
        </p>
      </section>

      <footer className="about-footer">
        <p>✦ thanks for visiting ✦</p>
        <p style={{ fontSize: '10px' }}>
          last updated: monday, may 22 · best viewed in netscape 4.0 @ 1024×768
        </p>
      </footer>
    </div>
  );
}
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
          ~ howdy, hola, salem, alô, alve, bonjour  ~
        </p>
      </header>

      <section className="about-block">
        <h2 className="about-block-title">★ intro to da blog</h2>
        <p>
          welcome to my travel diary! it took a few weeks to get this blog up and running so my earlier entries have less detail as i've had to write them retroactively.

          anyway! lately i have been so bored with all the modern webdesign out there. too many animations and too many gradients. zara larsson's music and lisa frank aesthetic inspired me to make my travel blog based on the early 2000s WORLD WIDE WEB. i wanted it to be cute and craigslist-esque. but also wanted to include modern features so i could continue learning new programming languages and libraries.
        </p>
      </section>

      <section className="about-block">
        <h2 className="about-block-title">★ my trip</h2>
        <p>
          after i was laid off in april, my fiance jesse and i decided to jump ship and move across the pond for the summer. 
          we left on may 16th 2026 and we're hitting 14 cities across spain,
          morocco, portugal, italy, and france. see the full itinerary on the{' '}
          <Link href="/trip">trip page</Link>.
        </p>
      </section>
      <section className="about-block">
  <h2 className="about-block-title">★ how this site was built</h2>
  <p>
    this site is a personal project built with{' '}
    <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">
      next.js 15
    </a>{' '}
    (app router), typescript, and hand-written css — no tailwind, no
    component libraries. 
  </p>
  <p>
    posts are written in mdx with custom react components for photo
    carousels and inline images. the guestbook is backed by a real
    postgres database (
    <a href="https://neon.tech" target="_blank" rel="noopener noreferrer">
      neon
    </a>
    {' '}+ drizzle orm) with server actions for the form submission and
    zod validation. 
  </p>
  <p>
    deployed on{' '}
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
    . built mostly from cafés and apartments across europe.
  </p>
</section>



      <section className="about-block">
        <h2 className="about-block-title">★ say hi</h2>
        <p>
          leave a note in the{' '}
          <Link href="/guestbook">guestbook</Link>  i miss everyone from home every day 
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
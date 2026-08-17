import Reveal from '@/components/Reveal'
import SectionLabel from '@/components/SectionLabel'
import React from 'react'

const sections = [
  {
    number: '01',
    title: 'What Are Cookies?',
    content: (
      <p>
        Cookies are small text files stored on your device when you visit a
        website. They help websites remember information, understand how
        visitors use the site, provide certain functionality, and improve the
        overall browsing experience.
      </p>
    ),
  },
  {
    number: '02',
    title: 'How We Use Cookies',
    content: (
      <>
        <p>Built by Saurav may use cookies and similar technologies to:</p>

        <ul>
          <li>Keep the website functioning correctly.</li>
          <li>Remember certain preferences where applicable.</li>
          <li>Understand website traffic and usage.</li>
          <li>Improve performance and user experience.</li>
          <li>Measure advertising performance.</li>
          <li>Display relevant advertisements when advertising is enabled.</li>
        </ul>
      </>
    ),
  },
  {
    number: '03',
    title: 'Analytics Cookies',
    content: (
      <p>
        We may use analytics services such as Google Analytics to understand
        how visitors interact with the website. Analytics technologies can
        collect information such as pages visited, approximate location,
        browser/device information, traffic sources, and interaction patterns.
      </p>
    ),
  },
  {
    number: '04',
    title: 'Advertising Cookies',
    content: (
      <>
        <p>
          If Google AdSense or another advertising service is enabled, third-party
          vendors may use cookies or similar technologies to serve and measure
          advertisements.
        </p>

        <p>
          Google and its advertising partners may use information associated
          with advertising cookies to show ads based on a user's previous visits
          to this website or other websites, subject to applicable settings and
          consent requirements.
        </p>

        <p>
          Users can manage personalized advertising preferences through{' '}
          <a
            href="https://adssettings.google.com/"
            target="_blank"
            rel="noreferrer"
          >
            Google Ads Settings
          </a>
          .
        </p>
      </>
    ),
  },
  {
    number: '05',
    title: 'Third-Party Cookies',
    content: (
      <p>
        Third-party services used by the website may place their own cookies or
        similar technologies on your device. These services may include
        analytics providers, advertising networks, embedded content providers,
        social media platforms, or other external services.
      </p>
    ),
  },
  {
    number: '06',
    title: 'Managing Cookies',
    content: (
      <>
        <p>
          Most modern browsers allow you to view, block, delete, or restrict
          cookies through browser settings.
        </p>

        <p>
          Blocking certain cookies may affect the functionality or performance
          of some parts of the website.
        </p>
      </>
    ),
  },
  {
    number: '07',
    title: 'Consent & Regional Requirements',
    content: (
      <p>
        Depending on your location and applicable law, we may request consent
        before using certain cookies or processing information for advertising
        or analytics purposes. Visitors in regions subject to specific privacy
        requirements may see additional consent controls.
      </p>
    ),
  },
  {
    number: '08',
    title: 'Updates to This Policy',
    content: (
      <p>
        We may update this Cookie Policy when our website, analytics tools,
        advertising providers, or applicable requirements change. The latest
        version will always be available on this page.
      </p>
    ),
  },
]

const Page = () => {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-16 md:px-8 md:pb-20 md:pt-24">
        <Reveal>
          <SectionLabel index="cookie-policy.tsx">
            Cookie Policy
          </SectionLabel>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl md:text-6xl">
            Small files. Useful context.
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 text-base leading-7 text-muted md:text-lg">
            This Cookie Policy explains what cookies are, how Built by Saurav
            may use them, and how you can manage your preferences.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-8 text-xs uppercase tracking-[0.18em] text-muted">
            Last updated: August 17, 2026
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl border-y border-line px-5 md:px-8">
        {sections.map((section) => (
        <article
            key={section.number}
            className="grid gap-8 py-10 md:grid-cols-[120px_minmax(0,1fr)] md:py-14"
        >
            <Reveal>
            <span className="font-mono text-2xl text-muted">
                {section.number}
            </span>
            </Reveal>

            <Reveal delay={0.05}>
            <div className="">
                <h2 className="font-display text-2xl font-semibold text-ink md:text-3xl">
                {section.title}
                </h2>

                <div className="prose prose-neutral mt-5 max-w-none text-[15px] leading-7 text-muted [&_a]:font-medium [&_a]:text-ink [&_a]:underline [&_li]:my-2">
                {section.content}
                </div>
            </div>
            </Reveal>
        </article>
        ))}
    </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 border-t border-line pt-8 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                Privacy
              </p>

              <h2 className="mt-2 font-display text-2xl font-semibold text-ink">
                Want the complete picture?
              </h2>
            </div>

            <a
              href="/privacy-policy"
              className="inline-flex w-fit border border-ink px-5 py-3 text-xs font-medium uppercase tracking-[0.16em] text-ink transition hover:bg-ink hover:text-black"
            >
              Read Privacy Policy →
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  )
}

export default Page
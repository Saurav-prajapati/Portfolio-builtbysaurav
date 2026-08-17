import Reveal from '@/components/Reveal'
import SectionLabel from '@/components/SectionLabel'
import React from 'react'

const sections = [
  {
    number: '01',
    title: 'Information We Collect',
    content: (
      <>
        <p>
          When you visit Built by Saurav, we may collect limited information
          that helps us operate, improve, and secure the website.
        </p>

        <ul>
          <li>Information you voluntarily provide through contact forms or emails.</li>
          <li>Basic technical information such as browser type, device type, and operating system.</li>
          <li>Pages visited, approximate usage information, and referring pages.</li>
          <li>Cookies and similar technologies used for analytics, functionality, and advertising.</li>
        </ul>

        <p>
          We do not intentionally collect sensitive personal information through
          this website unless you voluntarily provide it and it is necessary for
          responding to your request.
        </p>
      </>
    ),
  },
  {
    number: '02',
    title: 'How We Use Information',
    content: (
      <>
        <p>Information collected through the website may be used to:</p>

        <ul>
          <li>Respond to enquiries and project requests.</li>
          <li>Provide and improve our services.</li>
          <li>Understand how visitors use the website.</li>
          <li>Maintain website security and prevent abuse.</li>
          <li>Improve website performance and user experience.</li>
          <li>Display relevant advertising where advertising services are enabled.</li>
        </ul>
      </>
    ),
  },
  {
    number: '03',
    title: 'Contact Information',
    content: (
      <p>
        If you contact us by email or through a contact form, we may receive
        information such as your name, email address, project details, and any
        other information you choose to include in your message.
      </p>
    ),
  },
  {
    number: '04',
    title: 'Analytics & Third-Party Services',
    content: (
      <>
        <p>
          Built by Saurav may use third-party services such as analytics,
          hosting, security, and advertising providers. These services may
          collect information according to their own privacy policies.
        </p>

        <p>
          If Google services such as Google Analytics or Google AdSense are
          enabled, Google and its partners may use cookies, web beacons, IP
          addresses, or similar technologies to measure traffic, provide
          analytics, and serve or personalize advertisements.
        </p>

        <p>
          Third-party vendors, including Google, may use cookies to serve ads
          based on a user's previous visits to this website or other websites.
          Users can manage advertising preferences through Google's Ads
          Settings.
        </p>
      </>
    ),
  },
  {
    number: '05',
    title: 'Cookies',
    content: (
      <p>
        We use cookies and similar technologies where necessary to operate the
        website, understand website usage, improve functionality, and support
        advertising. For more information, please see our{' '}
        <a href="/cookie-policy">Cookie Policy</a>.
      </p>
    ),
  },
  {
    number: '06',
    title: 'Data Sharing',
    content: (
      <p>
        We do not sell your personal information. Information may be shared with
        trusted service providers where necessary to operate the website,
        provide requested services, maintain security, perform analytics, or
        display advertising. Third-party providers are responsible for their
        own processing practices.
      </p>
    ),
  },
  {
    number: '07',
    title: 'Data Security',
    content: (
      <p>
        We take reasonable technical and organizational measures to protect
        information handled through this website. However, no method of
        transmission or storage over the internet can be guaranteed to be
        completely secure.
      </p>
    ),
  },
  {
    number: '08',
    title: 'External Links',
    content: (
      <p>
        Our website may contain links to third-party websites, services, or
        social media platforms. We are not responsible for the privacy practices
        or content of those external websites. We recommend reviewing their
        respective privacy policies before providing information.
      </p>
    ),
  },
  {
    number: '09',
    title: 'Your Choices',
    content: (
      <>
        <p>
          Depending on your location and applicable law, you may have rights
          relating to your personal information, including rights to access,
          correct, delete, or restrict certain processing.
        </p>

        <p>
          You may also control cookies through your browser settings. Some
          website features may not function correctly if certain cookies are
          disabled.
        </p>
      </>
    ),
  },
  {
    number: '10',
    title: 'Changes to This Policy',
    content: (
      <p>
        We may update this Privacy Policy from time to time to reflect changes
        in our website, services, technology, or legal requirements. The
        updated version will be published on this page with a revised effective
        date.
      </p>
    ),
  },
]

const Page = () => {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-16 md:px-8 md:pb-20 md:pt-24">
        <Reveal>
          <SectionLabel index="privacy-policy.tsx">
            Privacy Policy
          </SectionLabel>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl md:text-6xl">
            Your privacy matters.
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 text-base leading-7 text-muted md:text-lg">
            This Privacy Policy explains how Built by Saurav collects, uses,
            protects, and handles information when you visit this website or
            contact us.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-xs uppercase tracking-[0.18em] text-muted">
            <span>Effective date: August 17, 2026</span>
            <span>Last updated: August 17, 2026</span>
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

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <Reveal>
          <div className="border border-line p-6 md:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
              Questions
            </p>

            <h2 className="mt-3 font-display text-2xl font-semibold text-ink">
              Need clarification?
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
              If you have questions about this Privacy Policy or how information
              is handled on this website, please get in touch through the contact
              page.
            </p>

            <a
              href="/contact"
              className="mt-6 inline-flex border border-ink px-5 py-3 text-xs font-medium uppercase tracking-[0.16em] text-ink transition hover:bg-ink hover:text-black"
            >
              Contact Saurav →
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  )
}

export default Page
import Reveal from '@/components/Reveal'
import SectionLabel from '@/components/SectionLabel'
import React from 'react'

const sections = [
  {
    number: '01',
    title: 'Acceptance of Terms',
    content: (
      <p>
        By accessing or using Built by Saurav, you agree to these Terms &
        Conditions. If you do not agree with these terms, please discontinue
        use of the website.
      </p>
    ),
  },
  {
    number: '02',
    title: 'About the Website',
    content: (
      <p>
        Built by Saurav is a personal professional website operated by Saurav
        Prajapati. The website provides information about development services,
        projects, technical articles, tutorials, and other digital resources.
      </p>
    ),
  },
  {
    number: '03',
    title: 'Website Content',
    content: (
      <>
        <p>
          We make reasonable efforts to keep the information on this website
          accurate and useful. However, technical information, software
          platforms, APIs, pricing, features, and third-party services can
          change over time.
        </p>

        <p>
          Content published on this website is provided for general informational
          and educational purposes and should be independently verified before
          being used in a production environment.
        </p>
      </>
    ),
  },
  {
    number: '04',
    title: 'Intellectual Property',
    content: (
      <p>
        Unless otherwise stated, the website design, branding, original written
        content, graphics, code examples, and other materials created for Built
        by Saurav are owned by or licensed to Built by Saurav. You may not
        reproduce, redistribute, sell, or commercially exploit our original
        content without prior written permission.
      </p>
    ),
  },
  {
    number: '05',
    title: 'Code Examples & Tutorials',
    content: (
      <p>
        Code snippets and technical examples published on the blog are provided
        for learning and development purposes. You are responsible for testing
        and adapting any code before using it in your own project. We are not
        responsible for damage, data loss, security issues, or unexpected
        behavior resulting from the use of published examples.
      </p>
    ),
  },
  {
    number: '06',
    title: 'Services & Project Work',
    content: (
      <p>
        Information presented on this website about Shopify development, React,
        Next.js, WordPress, design, and other services does not constitute a
        binding offer. Project scope, pricing, timelines, deliverables, and
        responsibilities will be agreed separately with each client.
      </p>
    ),
  },
  {
    number: '07',
    title: 'Third-Party Services',
    content: (
      <p>
        This website may link to or integrate with third-party platforms,
        including Shopify, Google, GitHub, LinkedIn, Instagram, analytics
        providers, hosting providers, and advertising services. We do not
        control third-party websites and are not responsible for their
        availability, content, policies, or practices.
      </p>
    ),
  },
  {
    number: '08',
    title: 'Prohibited Use',
    content: (
      <>
        <p>You agree not to use this website to:</p>

        <ul>
          <li>Break or attempt to bypass applicable laws or regulations.</li>
          <li>Interfere with website security or functionality.</li>
          <li>Introduce malware, malicious code, or harmful content.</li>
          <li>Scrape, copy, or redistribute substantial portions of the website without permission.</li>
          <li>Misrepresent your relationship with Built by Saurav.</li>
        </ul>
      </>
    ),
  },
  {
    number: '09',
    title: 'Disclaimer of Warranties',
    content: (
      <p>
        The website and its content are provided on an “as is” and “as
        available” basis. We do not guarantee that the website will always be
        available, error-free, secure, or completely accurate.
      </p>
    ),
  },
  {
    number: '10',
    title: 'Limitation of Liability',
    content: (
      <p>
        To the maximum extent permitted by applicable law, Built by Saurav
        shall not be liable for indirect, incidental, special, consequential,
        or business losses arising from your use of this website or reliance on
        information published on it.
      </p>
    ),
  },
  {
    number: '11',
    title: 'Changes to These Terms',
    content: (
      <p>
        We may update these Terms & Conditions when necessary. Changes become
        effective when the updated terms are published on this page. Continued
        use of the website after an update means you acknowledge the revised
        terms.
      </p>
    ),
  },
  {
    number: '12',
    title: 'Governing Law',
    content: (
      <p>
        These terms are intended to be governed by the applicable laws of India.
        Any dispute will be subject to the jurisdiction of the courts having
        appropriate jurisdiction under applicable law.
      </p>
    ),
  },
]

const Page = () => {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-16 md:px-8 md:pb-20 md:pt-24">
        <Reveal>
          <SectionLabel index="terms-and-conditions.tsx">
            Terms & Conditions
          </SectionLabel>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl md:text-6xl">
            Clear terms. No unnecessary fine print.
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 text-base leading-7 text-muted md:text-lg">
            These terms explain the rules for using Built by Saurav, including
            our website, content, tutorials, and service information.
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
          <p className="text-sm text-muted">
            Questions about these terms?{' '}
            <a
              href="/contact"
              className="font-medium text-ink underline underline-offset-4"
            >
              Get in touch →
            </a>
          </p>
        </Reveal>
      </section>
    </main>
  )
}

export default Page
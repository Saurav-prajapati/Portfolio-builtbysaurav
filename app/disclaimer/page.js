import Reveal from '@/components/Reveal'
import SectionLabel from '@/components/SectionLabel'
import React from 'react'

const sections = [
  {
    number: '01',
    title: 'General Information',
    content: (
      <p>
        The information provided on Built by Saurav is for general informational
        and educational purposes only. While we make reasonable efforts to keep
        the information accurate and useful, we do not guarantee that all
        information is complete, current, or error-free.
      </p>
    ),
  },
  {
    number: '02',
    title: 'Technical Content',
    content: (
      <>
        <p>
          Articles, tutorials, guides, code examples, recommendations, and
          technical explanations are based on our experience and research.
        </p>

        <p>
          Software platforms, APIs, libraries, frameworks, pricing, and
          technical requirements may change after an article is published.
          Always verify important information against the official documentation
          of the relevant platform or service.
        </p>
      </>
    ),
  },
  {
    number: '03',
    title: 'Code & Development Examples',
    content: (
      <p>
        Code examples are provided for educational purposes. Before using any
        code in a production application, you should test it in your own
        environment, review security implications, and confirm compatibility
        with the versions and platforms you are using.
      </p>
    ),
  },
  {
    number: '04',
    title: 'Shopify Information',
    content: (
      <p>
        Built by Saurav provides independent educational content about Shopify,
        Shopify themes, Liquid, APIs, apps, and related technologies. Built by
        Saurav is not owned by, operated by, or officially affiliated with
        Shopify unless explicitly stated.
      </p>
    ),
  },
  {
    number: '05',
    title: 'Third-Party Links',
    content: (
      <p>
        Some pages may contain links to third-party websites, products,
        services, tools, or documentation. These links are provided for
        convenience and informational purposes. We do not guarantee the
        accuracy, availability, security, or policies of third-party websites.
      </p>
    ),
  },
  {
    number: '06',
    title: 'Advertising Disclosure',
    content: (
      <p>
        Built by Saurav may display advertisements from third-party advertising
        networks, including Google AdSense. Advertising partners may use cookies
        or similar technologies to provide, measure, or personalize
        advertisements in accordance with their applicable policies and your
        choices.
      </p>
    ),
  },
  {
    number: '07',
    title: 'Professional Services',
    content: (
      <p>
        Information on this website about development services, project
        experience, technologies, or estimated approaches does not constitute a
        guarantee of a specific result. Every project is different and final
        outcomes depend on project requirements, scope, resources, third-party
        services, and implementation decisions.
      </p>
    ),
  },
  {
    number: '08',
    title: 'No Professional Advice',
    content: (
      <p>
        Content published on Built by Saurav should not be treated as legal,
        financial, security, business, or other professional advice. When
        professional advice is required, consult a qualified professional.
      </p>
    ),
  },
  {
    number: '09',
    title: 'Changes to This Disclaimer',
    content: (
      <p>
        This Disclaimer may be updated from time to time. Any changes will be
        published on this page with an updated revision date.
      </p>
    ),
  },
]

const Page = () => {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-16 md:px-8 md:pb-20 md:pt-24">
        <Reveal>
          <SectionLabel index="disclaimer.tsx">
            Disclaimer
          </SectionLabel>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl md:text-6xl">
            A little context goes a long way.
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 text-base leading-7 text-muted md:text-lg">
            A quick note about the information, tutorials, recommendations, and
            third-party services you may find across Built by Saurav.
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
    </main>
  )
}

export default Page
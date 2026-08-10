import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/siteConfig";
import MarqueeStrip from "@/components/MarqueeStrip";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import ProjectCard from "@/components/ProjectCard";
import HeroSection from "@/components/HeroSection";
import { blogPosts } from "@/lib/blog";
import WhyWork from "@/components/WhyWork";
import WorkProcess from "@/components/WorkProcess";
import FinalCTA from "@/components/FinalCTA";

export const metadata = {
  title: "Shopify & Frontend Developer Delhi – Saurav Prajapati",
  description:
    "Freelance Shopify & React developer in Delhi. 50+ projects delivered. Custom themes, Liquid development, Next.js apps, and performance optimization.",
};

function getServiceIcon(code) {
  const icons = {
    "shopify.store": (
      <svg width="24px" height="24px" viewBox="-3 0 48 48">

        <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="Color-" transform="translate(-203.000000, -660.000000)" fill="currentColor">
            <path d="M233.8471,666.99462 C234.633657,667.77951 235.525036,668.6685 235.525036,668.6685 C235.525036,668.6685 239.195316,668.9415 239.368457,668.9565 C239.54309,668.9715 239.753545,669.105 239.786382,669.3465 C239.819219,669.588 245,704.7915 245,704.7915 L232.287087,707.554966 L233.8471,666.99462 Z M231.896906,665.661214 C231.799504,665.673829 231.715018,665.693029 231.656242,665.7105 C231.624898,665.7195 231.099506,665.883 230.229326,666.153 C229.377057,663.69 227.874018,661.4265 225.230641,661.4265 C225.157504,661.4265 225.081382,661.4295 225.006752,661.434 C224.254487,660.435 223.32311,660 222.518604,660 C216.358684,660 213.415295,667.74 212.492875,671.6715 C210.09876,672.417 208.398699,672.9465 208.182274,673.0155 C206.844913,673.437 206.80312,673.479 206.628487,674.7435 C206.495647,675.702 203,702.8715 203,702.8715 L230.239774,708 L230.268734,707.993705 L231.896906,665.661214 Z M224.805252,667.572 C224.805252,667.6665 224.80376,667.7535 224.80376,667.8405 C223.303707,668.307 221.675291,668.814 220.042397,669.3225 C220.958847,665.7675 222.676819,664.05 224.179857,663.402 C224.557482,664.356 224.805252,665.7255 224.805252,667.572 Z M222.348449,661.6605 C222.615622,661.6605 222.882796,661.752 223.139522,661.929 C221.164825,662.862 219.049824,665.214 218.155762,669.909 C216.849746,670.3155 215.573581,670.713 214.392942,671.0805 C215.439248,667.4985 217.924411,661.6605 222.348449,661.6605 Z M223.409681,682.593 C223.409681,682.593 221.815594,681.738 219.861793,681.738 C216.99602,681.738 216.851238,683.5455 216.851238,684 C216.851238,686.4855 223.296244,687.438 223.296244,693.258 C223.296244,697.836 220.406589,700.785 216.509435,700.785 C211.83315,700.785 209.44202,697.86 209.44202,697.86 L210.694303,693.7035 C210.694303,693.7035 213.1526,695.8245 215.2273,695.8245 C216.58108,695.8245 217.133338,694.752 217.133338,693.969 C217.133338,690.7275 211.84509,690.582 211.84509,685.2555 C211.84509,680.7735 215.046697,676.4355 221.509613,676.4355 C223.999254,676.4355 225.230641,677.1525 225.230641,677.1525 L223.409681,682.593 Z M226.418743,667.338 C226.418743,667.1745 226.420235,667.014 226.420235,666.8385 C226.420235,665.3085 226.208287,664.0755 225.869469,663.099 C227.232204,663.27 228.139699,664.8285 228.723302,666.621 C228.039696,666.834 227.262056,667.0755 226.418743,667.338 Z" id="Shopify">

            </path>
          </g>
        </g>
      </svg>
    ),
    "react.next": (
      <svg fill="currentColor" width="24px" height="24px" viewBox="0 0 24 24" data-name="Layer 1"><path d="M11.103,10.43793a1.78593,1.78593,0,1,0,2.43957.65362A1.786,1.786,0,0,0,11.103,10.43793Zm8.0047,1.93768q-.17587-.201-.37116-.40308.13641-.14337.264-.28649c1.60583-1.80427,2.28357-3.61371,1.65558-4.70154-.60217-1.043-2.39343-1.35382-4.63593-.91779q-.33132.06482-.659.14624-.06272-.21624-.13343-.43C14.467,3.49042,13.2381,1.99921,11.98206,2,10.77765,2.00055,9.61359,3.39709,8.871,5.5575q-.10959.31969-.20276.64471-.21908-.05375-.44-.0993c-2.366-.48578-4.27167-.16584-4.89844.9226-.601,1.04376.02753,2.74982,1.52851,4.47211q.22329.25562.45922.49976c-.18542.191-.361.38189-.52465.57171-1.4646,1.698-2.05719,3.37616-1.45716,4.41541.61969,1.07348,2.49854,1.42437,4.7854.97436q.278-.05511.55292-.124.10071.35156.22095.697c.73932,2.11706,1.89685,3.46863,3.097,3.4682,1.23944-.00073,2.48194-1.45288,3.23474-3.65875.05945-.17432.11573-.35535.16907-.54175q.35514.08835.71485.1568c2.20336.41687,3.95251.089,4.55145-.951C21.28058,15.93109,20.64288,14.12933,19.10767,12.37561ZM4.07019,7.45184c.38586-.67,1.94324-.93139,3.98608-.512q.19584.04027.39838.09a20.464,20.464,0,0,0-.42126,2.67767,20.88659,20.88659,0,0,0-2.10389,1.6936q-.21945-.22695-.42718-.4649l.00006.00006C4.21631,9.46057,3.708,8.08081,4.07019,7.45184Zm3.88666,5.72809c-.51056-.3866-.98505-.78265-1.41571-1.181.43036-.39587.90515-.79059,1.41467-1.17615q-.02746.58915-.02722,1.1792Q7.929,12.59117,7.95685,13.17993Zm-.00061,3.94061a7.23675,7.23675,0,0,1-2.63971.09314,1.766,1.766,0,0,1-1.241-.65631c-.36407-.63067.11176-1.978,1.36432-3.43023q.23621-.273.48791-.53174a20.49026,20.49026,0,0,0,2.10712,1.70007,20.80226,20.80226,0,0,0,.42621,2.712Q8.21011,17.07023,7.95624,17.12054Zm7.10113-8.03936q-.50309-.317-1.01861-.61365-.5073-.292-1.0268-.56207c.593-.24933,1.17591-.46228,1.73865-.63581A18.21775,18.21775,0,0,1,15.05737,9.08118ZM9.679,5.83521c.63623-1.85114,1.57763-2.98053,2.30352-2.98084.77308-.00037,1.77753,1.21826,2.43433,3.19763q.064.19355.121.38928a20.478,20.478,0,0,0-2.52716.9712,20.06145,20.06145,0,0,0-2.519-.98194Q9.578,6.13062,9.679,5.83521ZM9.27863,7.259a18.30717,18.30717,0,0,1,1.72967.642Q9.95746,8.4433,8.96094,9.0824C9.0412,8.4444,9.148,7.83313,9.27863,7.259ZM8.9624,14.91968q.49695.31813,1.00843.61273.52174.30039,1.05737.57556a18.19577,18.19577,0,0,1-1.74445.66492C9.15161,16.1908,9.04364,15.56879,8.9624,14.91968Zm5.45569,3.14551A7.23556,7.23556,0,0,1,13.18,20.39844l-.00006.00006a1.76585,1.76585,0,0,1-1.18841.747c-.72821.00042-1.65766-1.085-2.28992-2.89545q-.11169-.32108-.20551-.648a20.10863,20.10863,0,0,0,2.52918-1.0097,20.79976,20.79976,0,0,0,2.54736.97851Q14.50141,17.81983,14.41809,18.06519Zm.36224-1.32422c-.56921-.176-1.16058-.39252-1.76214-.64551q.50867-.2677,1.02472-.56543.52955-.30579,1.0321-.62689A18.1524,18.1524,0,0,1,14.78033,16.741Zm.44629-4.74268q.00111.91095-.05688,1.82044c-.49268.33343-1.01282.659-1.554.97143-.53894.31116-1.07293.59711-1.59674.8559q-.82682-.39624-1.62176-.854-.79047-.455-1.54468-.969-.06894-.90921-.06946-1.82172l.00012.00019q-.00063-.91187.06794-1.82184c.49255-.33637,1.00891-.66168,1.54278-.96991.53632-.30969,1.077-.59442,1.61469-.85248q.81664.39688,1.60382.85065.78992.454,1.549.95868.06519.91443.06524,1.83166Zm.95673-5.09283c1.92133-.37372,3.37-.12232,3.73291.50622.3866.66962-.16748,2.1485-1.55383,3.70636l-.00006.00006q-.1149.12891-.23841.25891A20.06118,20.06118,0,0,0,15.98,9.68915a20.04054,20.04054,0,0,0-.40546-2.64893Q15.88486,6.96387,16.18335,6.90546Zm-.12988,3.8847A18.16447,18.16447,0,0,1,17.51483,11.978a18.11912,18.11912,0,0,1-1.45672,1.20831q.02325-.59391.02288-1.18842Q16.08072,11.39389,16.05347,10.79016Zm3.8681,5.78876c-.36346.63116-1.76788.89435-3.65222.53784q-.32391-.06115-.66474-.14557a20.069,20.069,0,0,0,.38746-2.68176,19.93914,19.93914,0,0,0,2.13708-1.71588q.17643.18329.33563.36487v-.00007a7.23437,7.23437,0,0,1,1.40308,2.23792A1.76563,1.76563,0,0,1,19.92157,16.57892Z" /></svg>
    ),
    "wordpress.cms": (
      <svg fill="currentColor" width="24px" height="24px" viewBox="-2 -2 24 24" class="jam jam-wordpress"><path d='M9.99 0C4.474 0 0 4.473 0 9.99c0 5.518 4.473 9.991 9.99 9.991 5.518 0 9.991-4.473 9.991-9.99C19.981 4.473 15.508 0 9.991 0zM1.428 9.99c0-1.208.268-2.357.742-3.394l4.085 10.9c-2.857-1.351-4.827-4.205-4.827-7.505zm8.564 8.343a8.87 8.87 0 0 1-2.42-.339l2.57-7.273 2.63 7.024.06.116a8.77 8.77 0 0 1-2.84.472zM11.168 6.08c.515-.027.98-.08.98-.08.461-.053.408-.712-.053-.687 0 0-1.388.106-2.284.106-.84 0-2.256-.106-2.256-.106-.462-.026-.515.66-.055.688 0 0 .438.052.898.079l1.335 3.56-1.874 5.475-3.117-9.034c.517-.026.98-.079.98-.079.46-.054.407-.713-.054-.688 0 0-1.387.106-2.281.106l-.551-.01c1.53-2.264 4.162-3.76 7.153-3.76 2.23 0 4.259.83 5.784 2.19l-.112-.008c-.841 0-1.437.713-1.437 1.48 0 .688.406 1.268.84 1.956.329.557.706 1.27.706 2.3 0 .714-.28 1.542-.65 2.698l-.856 2.779-3.096-8.965zm3.127 11.117l2.617-7.365c.49-1.19.65-2.14.65-2.987 0-.307-.02-.592-.056-.858a8.155 8.155 0 0 1 1.049 4.003c-.001 3.077-1.713 5.763-4.26 7.207z' /></svg>
    ),
    "graphic.design": (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    "video.edit": (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
      </svg>
    ),
    "photography": (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-2c1.65 0 3-1.35 3-3s-1.35-3-3-3-3 1.35-3 3 1.35 3 3 3z" />
      </svg>
    ),
  };
  return icons[code] || (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

export default function HomePage() {
  const featured = siteConfig.projects.slice(0, 6);

  const recentPosts = [...blogPosts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <>
      {/* HERO */}
      <HeroSection />
      <MarqueeStrip />

      {/* STATS */}
      {/* <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {siteConfig.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <p className="font-display text-4xl font-semibold text-ink sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 font-mono text-xs uppercase tracking-wider text-muted">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section> */}

      {/* FEATURED PROJECTS */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <Reveal>
          <SectionLabel index="01">Selected work</SectionLabel>
        </Reveal>
        <div className="mb-8 flex items-end justify-between gap-4">
          <Reveal delay={0.05}>
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              A few things I've shipped.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="hidden sm:block">
            <Link
              href="/portfolio"
              data-cursor="view"
              className="font-mono text-sm text-muted transition-colors hover:text-lime"
            >
              all projects →
            </Link>
          </Reveal>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.1}>
              <ProjectCard project={project} index={i + 1} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── SERVICES (PREMIUM BENTO STYLE) ─── */}
      <section className="relative overflow-hidden border-t border-line bg-base/30 py-20">
        {/* Subtle background glow */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-80 w-80 rounded-full bg-violet/5 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 md:px-8">
          <Reveal>
            <SectionLabel index="02">What I do</SectionLabel>
          </Reveal>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <Reveal delay={0.05}>
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                Services tailored to your vision.
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="hidden sm:block">
              <Link
                href="/services"
                data-cursor="view"
                className="font-mono text-sm text-muted transition-colors hover:text-lime"
              >
                all services →
              </Link>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
            {siteConfig.serviceinner.map((service, i) => {
              const isLarge = i === 0 || i === 3;
              const isTall = i === 2 || i === 4;
              let cardClasses = "col-span-1 row-span-1";
              if (isLarge) cardClasses = "col-span-1 row-span-2";
              if (isTall) cardClasses = "col-span-1 row-span-1 md:row-span-2";

              return (
                <Reveal key={service.title} delay={i * 0.06} className={cardClasses}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-panel p-5 transition-all duration-300 hover:-translate-y-1 hover:border-lime/30 hover:shadow-2xl hover:shadow-violet/10"
                  >
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-500 group-hover:border-lime/20" />

                    <div className="relative z-10 mb-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-lime/10 text-lime transition-all duration-300 group-hover:scale-110 group-hover:bg-lime/20">
                        <span className="text-2xl">{getServiceIcon(service.code)}</span>
                      </div>
                    </div>

                    <div className="relative z-10 flex flex-1 flex-col">
                      <h3 className="font-display text-xl font-semibold text-ink transition-colors group-hover:text-lime">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted line-clamp-3 flex-1">
                        {service.description}
                      </p>
                      <div className="mt-4 flex items-center gap-2 font-mono text-xs text-lime opacity-0 transition-all duration-300 group-hover:opacity-100">
                        <span>explore service</span>
                        <svg className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>

                    <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-lime/5 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:bg-lime/10" />
                  </Link>
                </Reveal>
              );
            })}
          </div>

          {/* Mobile link */}
          <Reveal delay={0.3} className="mt-8 text-center sm:hidden">
            <Link
              href="/services"
              data-cursor="view"
              className="font-mono text-sm text-muted transition-colors hover:text-lime"
            >
              all services →
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-line bg-base py-20">
        <div className="absolute inset-0 bg-[radial-gradient(#22c55e10_1px,transparent_1px)] [background-size:20px_20px] opacity-60" />
        <div className="pointer-events-none absolute top-0 left-0 h-64 w-64 rounded-full bg-lime/5 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-violet/5 blur-[100px]" />

        <div className="relative mx-auto max-w-6xl px-5 md:px-8">
          <Reveal>
            <SectionLabel index="03">The Difference</SectionLabel>
          </Reveal>

          <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Reveal delay={0.05}>
                <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                  Why Built by Saurav?
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-4 max-w-2xl text-lg text-muted">
                  Not just another dev. Here’s what makes this studio different — and why clients keep coming back.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.15}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-lime/40 bg-lime/5 px-6 py-3 font-mono text-sm text-lime transition-all hover:bg-lime/10 hover:scale-105"
              >
                Start a project
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </Reveal>
          </div>
          <WhyWork />
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-line bg-base py-20">
        <div className="pointer-events-none absolute top-0 left-0 h-64 w-64 rounded-full bg-lime/5 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-violet/5 blur-[100px]" />

        <div className="relative mx-auto max-w-6xl px-5 md:px-8">
          <Reveal>
            <SectionLabel index="04">How I Work</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              From idea to launch, a proven process.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-2xl text-lg text-muted mb-12">
              Click any step to see what happens. It’s transparent, collaborative, and fast.
            </p>
          </Reveal>
          <WorkProcess />
        </div>
      </section>

      {/* SKILLS */}
      <section className="border-t border-line bg-panel/40">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
          <Reveal>
            <SectionLabel index="05">Stack</SectionLabel>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {siteConfig.stack.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.06}>
                <div className="group rounded-lg border border-line bg-panel p-5 transition-colors hover:border-violet/60">
                  <p className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</p>
                  <p className="mt-3 font-display text-xl font-semibold text-ink group-hover:text-lime transition-colors">
                    {s.name}
                  </p>
                  <p className="mt-1 font-mono text-xs text-muted">{s.tag}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <Reveal>
          <SectionLabel index="06">Latest articles</SectionLabel>
        </Reveal>
        <div className="mb-8 flex items-end justify-between gap-4">
          <Reveal delay={0.05}>
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              Insights from the studio.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="hidden sm:block">
            <Link
              href="/blog"
              data-cursor="view"
              className="font-mono text-sm text-muted transition-colors hover:text-lime"
            >
              all articles →
            </Link>
          </Reveal>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {recentPosts.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.1}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col justify-between overflow-hidden rounded-xl border border-line bg-panel p-5 transition-colors hover:border-violet/60"
              >
                <div className="relative -mx-5 -mt-5 mb-4 aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center gap-2 font-mono text-[10px] text-muted sm:text-xs">
                  <span className="rounded-full border border-line px-2 py-0.5 text-lime">
                    {post.category}
                  </span>
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold text-ink group-hover:text-lime transition-colors">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-muted line-clamp-2">
                  {post.metaDescription}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
        {/* Mobile view all link */}
        <Reveal delay={0.2} className="mt-6 block sm:hidden">
          <Link
            href="/blog"
            data-cursor="view"
            className="font-mono text-sm text-muted transition-colors hover:text-lime"
          >
            all articles →
          </Link>
        </Reveal>
      </section>

      {/* EXPERIENCE TIMELINE */}
      {/* <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <Reveal>
          <SectionLabel index="07">Experience</SectionLabel>
        </Reveal>
        <div className="relative border-l border-line pl-8">
          {siteConfig.experience.map((exp, i) => (
            <Reveal key={exp.role} delay={i * 0.1} className="relative mb-12 last:mb-0">
              <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-lime shadow-[0_0_12px_rgba(198,255,82,0.6)]" />
              <p className="font-mono text-xs uppercase tracking-wider text-muted">{exp.period}</p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-ink">{exp.role}</h3>
              <p className="mt-1 font-mono text-sm text-violet">{exp.org}</p>
              <ul className="mt-4 flex flex-col gap-2 text-muted">
                {exp.points.map((p, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section> */}

      <FinalCTA />
    </>
  );
}

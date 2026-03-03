export default function AboutPage() {
  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
        <h1 className="text-2xl font-extrabold text-sky-950">About HypoWare</h1>
        <p className="mt-1 text-sm text-sky-900">
          HypoWare is a web-based educational platform built to help insulin-treated patients
          recognize, respond to, and prevent hypoglycemia through clear and friendly learning.
        </p>
      </header>

      <section className="rounded-2xl border border-sky-200 bg-white p-4">
        <h2 className="text-lg font-bold text-sky-900">Why This Site Was Created</h2>
        <p className="mt-2 text-sm text-sky-900">
          HypoWare was designed to improve awareness of low blood sugar and support safe daily
          decisions. The platform aims to help users identify symptoms early, understand causes and
          risk factors, and follow practical response steps when hypoglycemia happens.
        </p>
        <p className="mt-2 text-sm text-sky-900">
          The interface uses a light clinic environment, large visuals, and beginner-friendly
          language so users of different ages can understand the content with less cognitive strain.
        </p>
      </section>

      <section className="rounded-2xl border border-cyan-200 bg-cyan-50 p-4">
        <h2 className="text-lg font-bold text-cyan-900">How HypoWare Was Developed</h2>
        <p className="mt-2 text-sm text-cyan-900">
          Content and flow were organized using respondent insights. When users show low
          foundational knowledge, HypoWare emphasizes core lessons such as glucose basics,
          symptoms, causes, quick response, and prevention. If users already understand the basics,
          the platform supports safer long-term habits and preparedness strategies.
        </p>
        <p className="mt-2 text-sm text-cyan-900">
          To move beyond passive reading, HypoWare includes an interactive first-person adventure
          where users make decisions in guided clinic scenarios. Nurse feedback and branching
          outcomes reinforce why each choice matters and encourage safer behavior in real-life
          situations.
        </p>
      </section>

      <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
        <h2 className="text-lg font-bold text-emerald-900">Project Scope and Features</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-emerald-900">
          <li>Learn module with beginner-first hypoglycemia education and visual cards.</li>
          <li>Interactive story scenes for guided decision-making practice.</li>
          <li>Tools module with symptom response workflow and nutrition/exercise guidance.</li>
          <li>Contact and FAQ for support, plus local-only data handling via LocalStorage.</li>
          <li>Accessibility settings for text size, line height, high contrast, and reduced motion.</li>
        </ul>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <h2 className="text-lg font-bold text-slate-900">References</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-900">
          <li>
            AllAccessible: Text adjustment features -{" "}
            <a
              href="https://support.allaccessible.org/en/articles/12559906-text-adjustment-features"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              support.allaccessible.org
            </a>
          </li>
          <li>
            Suroya, Torrens, & Downs (2024), Font Matters: Investigating the Typographical
            Components of Legibility -{" "}
            <a
              href="https://rsisinternational.org/journals/ijriss/articles/font-matters-investigating-the-typographical-components-of-legibility/"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              rsisinternational.org
            </a>
          </li>
          <li>
            Frontiers in Psychology (2022) -{" "}
            <a
              href="https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2022.931646/"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              frontiersin.org
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}

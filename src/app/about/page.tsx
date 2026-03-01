export default function AboutPage() {
  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
        <h1 className="text-2xl font-extrabold text-sky-950">About HypoWare</h1>
        <p className="mt-1 text-sm text-sky-900">
          HypoWare is a web-based educational platform designed to support insulin-treated patients
          affected by hypoglycemia through clear, guided, and all-age-friendly learning.
        </p>
      </header>

      <section className="rounded-2xl border border-sky-200 bg-white p-4">
        <h2 className="text-lg font-bold text-sky-900">Product Development</h2>
        <p className="mt-2 text-sm text-sky-900">
          In the growing field of digital health education, HypoWare was developed to increase
          awareness, help users recognize early symptoms of low blood sugar, and guide them toward
          appropriate responses. The website uses a clear and user-friendly interface to support
          users of different ages and backgrounds.
        </p>
        <p className="mt-2 text-sm text-sky-900">
          The implementation of content is strategically based on respondent data. If users show low
          knowledge, HypoWare emphasizes basic information such as causes, risk factors,
          on-the-spot treatments, and prevention. If users already have foundational knowledge,
          HypoWare focuses on advanced safety practices and long-term lifestyle management.
        </p>
      </section>

      <section className="rounded-2xl border border-cyan-200 bg-cyan-50 p-4">
        <h2 className="text-lg font-bold text-cyan-900">Interactive Learning Approach</h2>
        <p className="mt-2 text-sm text-cyan-900">
          Instead of passive information delivery, HypoWare uses story-based first-person scenarios.
          Users make decisions at key moments, see possible outcomes, and learn through nurse-guided
          dialogue. This improves active learning, confidence, and preparedness.
        </p>
        <p className="mt-2 text-sm text-cyan-900">
          The platform also includes practical tools such as a symptom response guide, lifestyle and
          nutrition tips, and a journal for reflections and experience tracking.
        </p>
      </section>

      <section className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
        <h2 className="text-lg font-bold text-sky-900">All-Age Accessibility Notes (Tab 2)</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-sky-900">
          <li>Text size supports 80% to 200% to improve readability for low-vision users.</li>
          <li>Elderly-friendly default sizing is used while still allowing smaller/larger adjustments.</li>
          <li>Line height options include 1.0x, 1.5x (recommended), and 2.0x.</li>
          <li>Sans-serif typography is used for maximum clarity and reduced cognitive load.</li>
          <li>High contrast and reduce motion options are available for comfort and accessibility.</li>
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
            Suroya, Torrens, & Downs (2024), Font Matters: Investigating the Typographical Components of Legibility -{" "}
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

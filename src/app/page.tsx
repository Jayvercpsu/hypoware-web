import Link from "next/link";
import { IconWithFallback } from "@/components/IconWithFallback";
import { NurseCard } from "@/components/NurseCard";

const quickCards = [
  {
    title: "Learn",
    subtitle: "Beginner-first lessons",
    icon: "/icons/book.svg",
    className: "border-emerald-200 bg-emerald-50 text-emerald-900",
    href: "/learn",
  },
  {
    title: "Interactive",
    subtitle: "Story-based adventure",
    icon: "/icons/gamepad.svg",
    className: "border-sky-200 bg-sky-50 text-sky-900",
    href: "/interactive",
  },
  {
    title: "Tools",
    subtitle: "Guides and downloads",
    icon: "/icons/tools.svg",
    className: "border-cyan-200 bg-cyan-50 text-cyan-900",
    href: "/tools",
  },
];

export default function LandingPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-sky-200 bg-white shadow-sm md:aspect-video md:min-h-[36rem]">
        <div className="pattern-bg grid min-h-[420px] grid-cols-1 gap-4 p-4 sm:p-6 md:min-h-full md:grid-cols-2 md:gap-6 md:p-8">
          <div className="min-w-0 flex flex-col justify-start lg:justify-center">
            <p className="inline-flex w-fit items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-800">
              <IconWithFallback
                src="/icons/info.svg"
                alt="Friendly intro"
                label="Info"
                className="h-4 w-4"
              />
              Friendly Clinic Guide
            </p>
            <h1 className="mt-3 max-w-[24ch] break-words text-[clamp(1.8rem,6.5vw,2.8rem)] font-extrabold leading-[1.08] text-sky-950">
              New to hypoglycemia? Don&apos;t worry, you&apos;ll be guided in every step of the way.
            </h1>
            <p className="mt-3 hidden max-w-xl text-base text-sky-900 sm:block">
              Learn how to recognize symptoms, make safer choices, and build healthy habits through
              clear lessons and playful interactions.
            </p>
            <div className="mt-5 text-white">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-6 py-3 text-sm font-bold text-white shadow transition hover:bg-sky-600"
              >
                Begin
                <IconWithFallback
                  src="/icons/gamepad.svg"
                  alt="Begin"
                  label="Begin"
                  className="h-4 w-4"
                />
              </Link>
            </div>
          </div>

          <div className="hidden items-center justify-center md:flex">
            <NurseCard
              mood="happy"
              message="Welcome to HypoWare. You can explore lessons, tools, and safe daily choices with me."
              className="w-full max-w-xl"
            />
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {quickCards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className={`rounded-2xl border p-4 shadow-sm transition hover:-translate-y-0.5 ${card.className}`}
          >
            <IconWithFallback
              src={card.icon}
              alt={card.title}
              label={card.title}
              className="h-10 w-10 rounded-full bg-white p-2"
            />
            <h2 className="mt-3 text-lg font-bold">{card.title}</h2>
            <p className="text-sm">{card.subtitle}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}

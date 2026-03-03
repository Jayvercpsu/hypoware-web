"use client";

import { useEffect, useMemo, useState } from "react";
import { IconWithFallback } from "@/components/IconWithFallback";

const downloads = [
  {
    label: "Emergency Card",
    path: "/downloads/emergency-card.jpg",
  },
  {
    label: "Step by Step Hypoglycemia Checklist",
    path: "/downloads/hypo-checklist.jpg",
  },
];

const responseSteps = [
  {
    id: "notice",
    label: "Notice Symptoms",
    icon: "/icons/heart.svg",
    details: [
      "Pay attention to early warning signs: shakiness, sweating, dizziness, sudden hunger, fast heartbeat, confusion, or irritability.",
      "Recognizing symptoms early helps prevent low blood sugar from becoming severe.",
    ],
  },
  {
    id: "check",
    label: "Check Blood Sugar",
    icon: "/icons/glucose.svg",
    details: [
      "If a glucometer is available, check blood glucose immediately (usually below 70 mg/dL indicates low blood sugar).",
      "If checking is not possible but symptoms are present, treat right away.",
    ],
  },
  {
    id: "take-sugar",
    label: "Take Sugar",
    icon: "/icons/checklist.svg",
    details: [
      "Consume 15 grams of fast-acting carbohydrates: 3-4 glucose tablets, 1/2 cup regular soda, 1/2 cup fruit juice, or 1 tbsp sugar/honey dissolved in water.",
      "Avoid chocolate or fatty foods at this stage because they slow absorption.",
    ],
  },
  {
    id: "wait",
    label: "Wait 15 Minutes",
    icon: "/icons/tools.svg",
    details: [
      "Wait 15 minutes, then recheck blood sugar or reassess symptoms.",
      "If still low or symptoms continue, repeat 15 grams of fast-acting sugar.",
      "This is the 15-15 rule.",
    ],
  },
  {
    id: "follow-up-snack",
    label: "Eat Snack",
    icon: "/icons/book.svg",
    details: [
      "After recovery, eat a carb + protein snack (example: bread + egg, crackers + cheese, fruit + peanut butter).",
      "This helps prevent another blood sugar drop.",
    ],
  },
  {
    id: "rest",
    label: "Rest",
    icon: "/icons/info.svg",
    details: [
      "Sit or lie down while recovering and avoid strenuous activity.",
      "Resume activity only after blood sugar is stable and symptoms are gone.",
    ],
  },
  {
    id: "inform",
    label: "Inform Someone",
    icon: "/icons/mail.svg",
    details: [
      "Tell a family member, friend, teacher, or coworker if symptoms are severe or worsening.",
      "Asking for help early improves safety.",
    ],
  },
  {
    id: "seek-help",
    label: "Seek Medical Help",
    icon: "/icons/settings.svg",
    details: [
      "If the person is unconscious, having seizures, or cannot swallow: do not give food or drinks by mouth.",
      "A trained person may give glucagon if available.",
      "Call emergency medical services immediately.",
    ],
  },
];

const nutritionTabs = [
  {
    id: "carbohydrates",
    title: "Carbohydrates",
    icon: "\u{1F35E}",
    intro:
      "Carbohydrates are the main energy source and provide glucose for brain and body function.",
    examples: ["Rice", "Whole wheat bread", "Oatmeal", "Sweet potatoes", "Corn", "Banana"],
    reason:
      "Balanced carbs help prevent sudden drops. Complex carbs release sugar more steadily.",
  },
  {
    id: "protein",
    title: "Protein",
    icon: "\u{1F95A}",
    intro: "Protein helps stabilize blood sugar and prevents rapid spikes and crashes.",
    examples: [
      "Eggs",
      "Fish (tilapia, tuna, salmon)",
      "Chicken breast",
      "Lean pork or beef",
      "Tofu",
      "Beans and lentils",
    ],
    reason: "Protein supports muscle repair, keeps you full longer, and improves meal balance.",
  },
  {
    id: "healthy-fats",
    title: "Healthy Fats",
    icon: "\u{1F951}",
    intro: "Healthy fats support sustained energy and slower glucose absorption.",
    examples: ["Nuts", "Avocado", "Milk", "Cheese", "Olive oil", "Chia seeds"],
    reason: "Adding healthy fats helps maintain stable energy and supports heart and brain health.",
  },
  {
    id: "safe-exercises",
    title: "Safe Exercises",
    icon: "\u{1F3C3}",
    intro:
      "Regular activity improves insulin sensitivity, but exercise should be planned safely.",
    examples: ["Brisk walking", "Light jogging", "Cycling", "Dancing", "Yoga", "Stretching"],
    reason:
      "Eat a snack before activity if needed, avoid empty-stomach workouts, and stay hydrated.",
  },
];

const mealCards = [
  {
    title: "Breakfast Ideas",
    icon: "\u{1F373}",
    items: [
      "Boiled egg + whole wheat bread + banana",
      "Oatmeal with milk and sliced fruits",
      "Scrambled eggs + rice + avocado",
    ],
    reason: "Helps prevent morning hypoglycemia and supports steady energy.",
  },
  {
    title: "Lunch Ideas",
    icon: "\u{1F35B}",
    items: [
      "Grilled chicken + brown rice + vegetables",
      "Fish + rice + sauteed spinach",
      "Tofu stir-fry + rice",
    ],
    reason: "Balanced carbs, protein, and fiber help keep glucose stable through the day.",
  },
  {
    title: "Dinner Ideas",
    icon: "\u{1F372}",
    items: [
      "Vegetable soup + grilled fish",
      "Chicken + sweet potato + salad",
      "Egg omelet + rice + tomatoes",
    ],
    reason: "Light but balanced meals lower the risk of nighttime blood sugar drops.",
  },
  {
    title: "Healthy Snacks",
    icon: "\u{1F34E}",
    items: [
      "Banana + peanut butter",
      "Apple slices + cheese",
      "Crackers + tuna spread",
      "Yogurt + nuts",
      "Trail mix",
      "Milk + whole grain biscuit",
    ],
    reason: "Small frequent snacks reduce long gaps without food and lower hypoglycemia risk.",
  },
];

export default function ToolsPage() {
  const [availability, setAvailability] = useState<Record<string, boolean>>({});
  const [activeStep, setActiveStep] = useState(responseSteps[0].id);
  const [activeNutritionTab, setActiveNutritionTab] = useState(nutritionTabs[0].id);

  useEffect(() => {
    let cancelled = false;

    async function checkFiles() {
      const result: Record<string, boolean> = {};

      await Promise.all(
        downloads.map(async (file) => {
          try {
            const response = await fetch(file.path, { method: "HEAD" });
            result[file.path] = response.ok;
          } catch {
            result[file.path] = false;
          }
        }),
      );

      if (!cancelled) {
        setAvailability(result);
      }
    }

    void checkFiles();

    return () => {
      cancelled = true;
    };
  }, []);

  const selectedStep = useMemo(
    () => responseSteps.find((step) => step.id === activeStep) ?? responseSteps[0],
    [activeStep],
  );

  const selectedNutrition = useMemo(
    () => nutritionTabs.find((tab) => tab.id === activeNutritionTab) ?? nutritionTabs[0],
    [activeNutritionTab],
  );

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
        <h1 className="text-2xl font-extrabold text-sky-950">Tools</h1>
        <p className="mt-1 text-sm text-sky-900">
          Interactive response guide, nutrition visuals, and downloadable checklists.
        </p>
      </header>

      <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
        <h2 className="text-lg font-bold text-emerald-900">Symptom Response Guide</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-4 lg:grid-cols-8">
          {responseSteps.map((step) => {
            const active = step.id === selectedStep.id;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStep(step.id)}
                className={`rounded-xl border px-2 py-3 text-center transition ${
                  active
                    ? "border-emerald-500 bg-emerald-500 text-white"
                    : "border-emerald-200 bg-white text-emerald-900 hover:bg-emerald-100"
                }`}
              >
                <IconWithFallback
                  src={step.icon}
                  alt={step.label}
                  label={step.label}
                  className={`mx-auto h-8 w-8 rounded-full p-1 ${active ? "bg-white/20" : "bg-white"}`}
                />
                <p className="mt-2 text-xs font-semibold">{step.label}</p>
              </button>
            );
          })}
        </div>

        <article className="mt-4 rounded-xl border border-emerald-200 bg-white p-4">
          <h3 className="text-base font-bold text-emerald-900">{selectedStep.label}</h3>
          <div className="mt-2 space-y-2 text-sm text-emerald-900">
            {selectedStep.details.map((detail) => (
              <p key={detail}>- {detail}</p>
            ))}
          </div>
        </article>
      </section>

      <section className="rounded-2xl border border-sky-200 bg-white p-4">
        <h2 className="text-lg font-bold text-sky-900">Lifestyle & Nutrition Tips</h2>
        <p className="mt-1 text-sm text-sky-900">
          Tap each visual category to view examples and why it matters.
        </p>

        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {nutritionTabs.map((tab) => {
            const active = tab.id === selectedNutrition.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveNutritionTab(tab.id)}
                className={`rounded-xl border p-3 text-left transition ${
                  active
                    ? "border-sky-500 bg-sky-500 text-white"
                    : "border-sky-200 bg-sky-50 text-sky-900 hover:bg-sky-100"
                }`}
              >
                <p className="text-3xl leading-none">{tab.icon}</p>
                <p className="mt-2 text-sm font-bold">{tab.title}</p>
              </button>
            );
          })}
        </div>

        <article className="mt-4 rounded-xl border border-sky-200 bg-sky-50 p-4">
          <h3 className="text-base font-bold text-sky-900">
            {selectedNutrition.icon} {selectedNutrition.title}
          </h3>
          <p className="mt-2 text-sm text-sky-900">{selectedNutrition.intro}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {selectedNutrition.examples.map((example) => (
              <span
                key={example}
                className="rounded-full border border-sky-300 bg-white px-3 py-1 text-xs font-semibold text-sky-900"
              >
                {example}
              </span>
            ))}
          </div>
          <p className="mt-3 text-sm font-semibold text-sky-900">Why it matters: {selectedNutrition.reason}</p>
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {mealCards.map((meal) => (
          <article key={meal.title} className="rounded-2xl border border-cyan-200 bg-cyan-50 p-4">
            <h3 className="text-base font-bold text-cyan-900">
              {meal.icon} {meal.title}
            </h3>
            <div className="mt-2 space-y-1 text-sm text-cyan-900">
              {meal.items.map((item) => (
                <p key={item}>- {item}</p>
              ))}
            </div>
            <p className="mt-3 text-sm font-semibold text-cyan-900">Reason: {meal.reason}</p>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
        <h2 className="text-lg font-bold text-sky-900">Hydration Tips</h2>
        <div className="mt-2 space-y-1 text-sm text-sky-900">
          <p>- Drink enough water (6-8 glasses daily).</p>
          <p>- Avoid too many sugary drinks.</p>
          <p>- Choose whole fruits more often than juice.</p>
        </div>
      </section>

      <section className="rounded-2xl border border-sky-200 bg-white p-4">
        <h2 className="text-lg font-bold text-sky-900">Downloadables</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {downloads.map((file) => {
            const available = availability[file.path];

            return (
              <div key={file.path} className="rounded-xl border border-sky-200 bg-sky-50 p-3">
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-sky-900">
                  <IconWithFallback
                    src="/icons/tools.svg"
                    alt={file.label}
                    label={file.label}
                    className="h-4 w-4"
                  />
                  {file.label}
                </p>

                {available === false ? (
                  <p className="mt-2 text-sm text-amber-900">
                    File not found yet. Please add it under <code>/public/downloads</code>.
                  </p>
                ) : (
                  <a
                    href={file.path}
                    download
                    className="mt-2 inline-block rounded-full bg-sky-500 px-3 py-1 text-xs font-bold text-white"
                  >
                    Download
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

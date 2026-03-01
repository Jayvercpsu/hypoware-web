export interface LearnTopic {
  id: string;
  title: string;
  summary: string;
  paragraphs: string[];
  bullets: string[];
  warning?: string;
  infographicCards: string[];
  videoPlaceholder: string;
  keywords: string[];
}

export const learnTopics: LearnTopic[] = [
  {
    id: "what-is-hypoglycemia",
    title: "What is Hypoglycemia?",
    summary: "Start from zero knowledge and understand why glucose is important.",
    paragraphs: [
      "Your body uses blood sugar (glucose) as its main source of energy. It comes from the food you eat, especially carbohydrates like rice, bread, and fruits.",
      "Hypoglycemia happens when your blood sugar level becomes too low. When this happens, your body and brain do not get enough energy, which can make you feel weak, shaky, or unwell.",
      "It is common among people with diabetes, especially those who take insulin or certain medications, but it can also happen to others in some situations.",
    ],
    bullets: [
      "Glucose is the main energy source for your body and brain.",
      "Low blood sugar can affect focus, strength, and safety.",
      "Early recognition helps prevent severe outcomes.",
    ],
    warning:
      "If not treated quickly, symptoms can become more serious, such as fainting or seizures. That is why early action is important.",
    infographicCards: [
      "Energy flow: Food -> Glucose -> Body cells",
      "What low blood sugar means",
      "Who is commonly affected",
    ],
    videoPlaceholder: "Short videos/gifs demonstrating what happens in the body.",
    keywords: ["glucose", "energy", "insulin", "hypoglycemia", "low blood sugar"],
  },
  {
    id: "common-symptoms",
    title: "Common Symptoms",
    summary: "Recognize the warning signs early.",
    paragraphs: [
      "Common symptoms to watch for include the following.",
    ],
    bullets: [
      "Shakiness or trembling",
      "Dizziness or lightheadedness",
      "Sweating",
      "Fast heartbeat",
      "Feeling very hungry",
      "Tiredness or weakness",
      "Confusion or difficulty concentrating",
    ],
    warning:
      "If not treated quickly, symptoms can become more serious, such as fainting or seizures. That is why early action is important.",
    infographicCards: [
      "Symptoms map",
      "Mild vs severe warning signs",
      "When to respond immediately",
    ],
    videoPlaceholder: "Short videos/gifs demonstrating what happens in the body.",
    keywords: ["shakiness", "dizziness", "sweating", "heartbeat", "hungry", "weak", "confusion"],
  },
  {
    id: "causes-risk-factors",
    title: "Causes & Risk Factors",
    summary: "Know common triggers and risk factors.",
    paragraphs: [
      "Hypoglycemia can happen due to daily routine changes, medication timing, or health conditions.",
    ],
    bullets: [
      "Missed or delayed meals",
      "Too much insulin or diabetes medication",
      "Exercising more than usual without eating enough",
      "Drinking alcohol without food",
      "Illness or infections",
    ],
    warning:
      "If not treated quickly, symptoms can become more serious, such as fainting or seizures. That is why early action is important.",
    infographicCards: [
      "Risk factor checklist",
      "Meal and medicine timing",
      "Exercise and alcohol reminders",
    ],
    videoPlaceholder: "Short videos/gifs demonstrating what happens in the body.",
    keywords: ["missed meals", "insulin", "medication", "exercise", "alcohol", "illness"],
  },
  {
    id: "quick-response-tips",
    title: "Quick Response Tips (15-15 rule)",
    summary: "Simple do-this-first steps during low blood sugar.",
    paragraphs: [
      "Eat or drink something sugary right away (example: fruit juice, regular soda, glucose tablets, or candy).",
      "Wait 15 minutes, then check how you feel. If symptoms continue, take another small sugary snack.",
      "Once you feel better, eat a small meal or snack with carbohydrates and protein to keep your blood sugar stable.",
    ],
    bullets: [
      "Step 1: Take quick sugar immediately.",
      "Step 2: Wait 15 minutes and reassess.",
      "Step 3: Follow with carbohydrate + protein snack.",
    ],
    warning:
      "If not treated quickly, symptoms can become more serious, such as fainting or seizures. That is why early action is important.",
    infographicCards: [
      "15-15 rule timeline",
      "Quick sugar options",
      "Follow-up snack examples",
    ],
    videoPlaceholder: "Short videos/gifs demonstrating what happens in the body.",
    keywords: ["15-15", "quick response", "juice", "glucose tablets", "snack"],
  },
  {
    id: "prevention-healthy-habits",
    title: "Prevention & Healthy Habits",
    summary: "Build habits that reduce hypoglycemia risk.",
    paragraphs: [
      "Prevention starts with consistency, planning, and carrying what you need.",
    ],
    bullets: [
      "Eating regular, balanced meals",
      "Not skipping meals",
      "Monitoring blood sugar levels regularly",
      "Taking medications exactly as prescribed",
      "Planning snacks before exercise",
      "Carrying a quick source of sugar at all times",
    ],
    warning:
      "If not treated quickly, symptoms can become more serious, such as fainting or seizures. That is why early action is important.",
    infographicCards: [
      "Daily healthy routine",
      "Prevention habit tracker",
      "Always-carry quick sugar list",
    ],
    videoPlaceholder: "Short videos/gifs demonstrating what happens in the body.",
    keywords: ["prevention", "balanced meals", "monitoring", "medication", "exercise", "quick sugar"],
  },
];

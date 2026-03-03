export interface LearnVisual {
  title: string;
  description: string;
  emoji: string;
}

export interface LearnTopic {
  id: string;
  title: string;
  summary: string;
  paragraphs: string[];
  bullets: string[];
  emphasis?: string;
  visuals: LearnVisual[];
  gifCaption: string;
  gifPath: string;
  keywords: string[];
}

export const learnTopics: LearnTopic[] = [
  {
    id: "what-is-hypoglycemia",
    title: "What is Hypoglycemia?",
    summary: "Hypoglycemia happens when your blood sugar level becomes too low.",
    paragraphs: [
      "Hypoglycemia happens when your blood sugar level becomes too low. When this happens, your body and brain do not get enough energy, which can make you feel weak, shaky, or unwell.",
      "It is common among people with diabetes, especially those who take insulin or certain medications, but it can also happen to others in some situations.",
      "Our body uses blood sugar (glucose) as its main source of energy. It comes from the food you eat, especially carbohydrates like rice, bread, and fruits.",
    ],
    bullets: [
      "Glucose is the body and brain's fuel source.",
      "Low blood sugar can affect focus, balance, and safety.",
      "Insulin-treated patients have higher risk and need quick response habits.",
    ],
    visuals: [
      {
        title: "Energy and Weakness",
        description: "A cartoon weak-looking person to show low energy symptoms.",
        emoji: "\u{1F62E}",
      },
      {
        title: "Low Blood Sugar State",
        description: "A cartoon low blood sugar visual with dropping glucose line.",
        emoji: "\u{1FA78}",
      },
      {
        title: "Insulin-Treated Risk",
        description: "A cartoon elder injecting insulin as a risk reminder.",
        emoji: "\u{1F489}",
      },
    ],
    gifCaption: "GIF: patient starting to feel dizzy from low blood sugar.",
    gifPath: "/gifs/dizzy-patient.gif",
    keywords: ["glucose", "energy", "insulin", "hypoglycemia", "low blood sugar", "definition"],
  },
  {
    id: "common-symptoms",
    title: "Signs and Symptoms",
    summary: "Recognize warning signs early to respond before symptoms become severe.",
    paragraphs: [
      "Signs and Symptoms include shakiness, dizziness, sweating, fast heartbeat, feeling very hungry, tiredness or weakness, and confusion or difficulty concentrating.",
      "A sudden drop in blood glucose cuts off the energy source for the brain and muscles, resulting in both cognitive and physical symptoms. This can cause brain fog, poor concentration, and loss of physical energy.",
      "Uncommon symptoms include night sweats and nightmares that may indicate nocturnal hypoglycemia, as well as sudden palpitations and the worsening of decision making skills.",
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
    emphasis:
      "Early action matters because untreated low blood sugar can quickly become dangerous in daily life.",
    visuals: [
      {
        title: "Physical Symptoms",
        description: "A cartoon person shaking or trembling.",
        emoji: "\u{1FAE8}",
      },
      {
        title: "Social Symptoms",
        description: "A cartoon person with slurred speech or difficulty communicating.",
        emoji: "\u{1F5E3}",
      },
      {
        title: "Mental Symptoms",
        description: "A cartoon person looking confused or disoriented.",
        emoji: "\u{1F914}",
      },
    ],
    gifCaption: "GIF: patient becoming pale while symptoms appear.",
    gifPath: "/gifs/pale-patient.gif",
    keywords: [
      "shakiness",
      "dizziness",
      "sweating",
      "heartbeat",
      "hungry",
      "weak",
      "confusion",
      "brain fog",
    ],
  },
  {
    id: "causes-risk-factors",
    title: "Causes & Risk Factors",
    summary: "Know the common triggers that can cause blood sugar to suddenly drop.",
    paragraphs: [
      "Hypoglycemia often occurs when medication timing or insulin dose is not synchronized with food intake, such as when a meal is delayed or skipped entirely.",
      "Increased exercise or alcohol use without food can further deplete glucose reserves. Illness or infection can also disrupt metabolic balance and trigger sudden drops despite a usual routine.",
    ],
    bullets: [
      "Missed or delayed meals",
      "Too much insulin or diabetes medication",
      "Exercising more than usual without eating enough",
      "Drinking alcohol without food",
      "Illness or infections",
    ],
    visuals: [
      {
        title: "Medicine Timing",
        description: "A phone with medicine reminder or insulin timing alarm.",
        emoji: "\u{1F4F1}",
      },
      {
        title: "Risk Checklist",
        description: "A visual checklist of daily risk factors to monitor.",
        emoji: "\u{1F4CB}",
      },
      {
        title: "Alcohol Without Food",
        description: "A no-alcohol sign reminder when no meal is available.",
        emoji: "\u{1F6AB}",
      },
    ],
    gifCaption: "GIF: patient preparing insulin properly before meals.",
    gifPath: "/gifs/insulin-check.gif",
    keywords: ["missed meals", "insulin", "medication", "exercise", "alcohol", "illness", "risk"],
  },
  {
    id: "quick-response-tips",
    title: "Quick Response Tips (15-15 rule)",
    summary: "Follow these first-response actions quickly and in order.",
    paragraphs: [
      "To treat a blood sugar drop, consume fast-acting sugar immediately such as fruit juice, regular soda, glucose tablets, or candy.",
      "Wait 15 minutes to reassess symptoms and repeat quick sugar if levels remain low or symptoms continue.",
      "After feeling better, eat a balanced snack with carbohydrates and protein to prevent a second crash and keep blood sugar stable.",
    ],
    bullets: [
      "Step 1: Take fast-acting sugar right away.",
      "Step 2: Wait 15 minutes and recheck.",
      "Step 3: Follow with carb + protein snack.",
    ],
    visuals: [
      {
        title: "Fast-Acting Sugar",
        description: "Quick snacks and drinks that act fast when symptoms start.",
        emoji: "\u{1F9C3}",
      },
      {
        title: "15-Minute Rule",
        description: "Cartoon timer visual to reinforce waiting and rechecking.",
        emoji: "\u{23F1}",
      },
      {
        title: "Stabilizing Snack",
        description: "Foods rich in carbohydrates and protein after recovery.",
        emoji: "\u{1F95A}",
      },
    ],
    gifCaption: "GIF: patient eating a snack after taking quick sugar.",
    gifPath: "/gifs/snack-response.gif",
    keywords: ["15-15", "quick response", "juice", "glucose tablets", "snack", "carb protein"],
  },
  {
    id: "prevention-healthy-habits",
    title: "Prevention & Healthy Habits",
    summary: "Consistent routines reduce risk and improve long-term safety.",
    paragraphs: [
      "Maintaining a consistent daily routine is the foundation of prevention. Eating regular, balanced meals and taking medications exactly as prescribed help keep blood sugar in a safe range.",
      "Plan ahead for activity by monitoring blood sugar and preparing snacks before exercise. Always carry a quick source of sugar so you can act immediately when symptoms begin.",
    ],
    bullets: [
      "Eating regular, balanced meals",
      "Not skipping meals",
      "Monitoring blood sugar levels regularly",
      "Taking medications exactly as prescribed",
      "Planning snacks before exercise",
      "Carrying a quick source of sugar at all times",
    ],
    visuals: [
      {
        title: "Balanced Meal",
        description: "A full plate with carbs, protein, and healthy fats.",
        emoji: "\u{1F957}",
      },
      {
        title: "Glucometer Habit",
        description: "A cartoon person checking glucose regularly.",
        emoji: "\u{1FA78}",
      },
      {
        title: "Prepared Snacks",
        description: "A basket with emergency quick-sugar snacks.",
        emoji: "\u{1F9FA}",
      },
    ],
    gifCaption: "GIF: happy patient standing after practicing healthy routines.",
    gifPath: "/gifs/happy-routine.gif",
    keywords: [
      "prevention",
      "balanced meals",
      "monitoring",
      "medication",
      "exercise",
      "quick sugar",
    ],
  },
];

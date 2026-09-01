import type { GrammarTopic, GrammarTopicPreview } from "../types";

export const frGrammarTopics: GrammarTopic[] = [
  {
    slug: "passe-compose-vs-imparfait",
    title: "Passé Composé vs. Imparfait",
    summary: "Two French past tenses, and how to tell which one a sentence needs.",
    lede:
      "English mostly gets by with one simple past tense and leaves the rest to context. French makes you choose between two — passé composé and imparfait — every time. Getting this right is less about memorizing endings — you already practice those on the conjugator — and more about deciding what kind of past you're describing.",
    quickTake: [
      { text: "Passé composé", tone: "a" },
      { text: " is for a completed action — it started and it finished. " },
      { text: "Imparfait", tone: "b" },
      {
        text: " is for the backdrop — something that was ongoing, repeated, or just describing how things were.",
      },
    ],
    compare: [
      {
        label: "Passé composé",
        kicker: "One event, start to finish",
        triggers: ["hier", "hier soir", "une fois", "tout à coup", "l'année dernière", "en 1999"],
        examples: [
          {
            parts: [{ text: "Hier, j'" }, { text: "ai mangé", tone: "a" }, { text: " des crêpes." }],
            gloss: "Yesterday I ate crepes.",
            why: "Done — it's over",
          },
          {
            parts: [{ text: "Nous " }, { text: "sommes arrivés", tone: "a" }, { text: " à huit heures." }],
            gloss: "We arrived at eight.",
            why: "A single event",
          },
          {
            parts: [
              { text: "Tout à coup, il " },
              { text: "a commencé", tone: "a" },
              { text: " à pleuvoir." },
            ],
            gloss: "Suddenly, it started to rain.",
            why: "The moment it happened",
          },
        ],
      },
      {
        label: "Imparfait",
        kicker: "Ongoing, repeated, or descriptive",
        triggers: ["toujours", "tous les jours", "pendant que", "enfant", "souvent", "chaque été"],
        examples: [
          {
            parts: [{ text: "Enfant, je " }, { text: "jouais", tone: "b" }, { text: " dans le parc." }],
            gloss: "As a kid, I used to play in the park.",
            why: "A habit, repeated",
          },
          {
            parts: [
              { text: "Il " },
              { text: "était", tone: "b" },
              { text: " huit heures quand nous sommes arrivés." },
            ],
            gloss: "It was eight o'clock when we arrived.",
            why: "Setting the scene",
          },
          {
            parts: [{ text: "Il " }, { text: "pleuvait", tone: "b" }, { text: " pendant que nous marchions." }],
            gloss: "It was raining while we were walking.",
            why: "Still going on",
          },
        ],
      },
    ],
    collision: {
      parts: [
        { text: "Je " },
        { text: "dormais", tone: "b" },
        { text: " quand le téléphone " },
        { text: "a sonné", tone: "a" },
        { text: "." },
      ],
      gloss: "I was sleeping when the phone rang.",
      note:
        "The imparfait draws the wavy background line — sleep was already in progress. The passé composé is the single point that cuts across it: the moment the phone rang.",
    },
    shiftTableIntro:
      "A handful of verbs are usually about mental or physical states rather than actions — so switching them to passé composé doesn't just change duration, it changes what happened.",
    shiftTable: [
      {
        verb: "savoir",
        formB: { form: "savais", meaning: "knew (already had the info)" },
        formA: { form: "ai su", meaning: "found out (the moment it landed)" },
      },
      {
        verb: "connaître",
        formB: { form: "connaissais", meaning: "knew, was acquainted with" },
        formA: { form: "ai connu", meaning: "met for the first time" },
      },
      {
        verb: "vouloir",
        formB: { form: "voulais", meaning: "wanted (an ongoing wish)" },
        formA: { form: "ai voulu", meaning: "decided to (and it took real effort)" },
      },
      {
        verb: "pouvoir",
        formB: { form: "pouvais", meaning: "was able to (in general)" },
        formA: { form: "ai pu", meaning: "managed to (this one time)" },
      },
    ],
    quiz: [
      {
        before: "Hier, nous ",
        after: " des tacos avec des amis.",
        infinitive: "manger",
        correctTone: "a",
        correctForm: "avons mangé",
        explanation: "\"Hier\" points at one day -- a single completed action, so it's passé composé.",
      },
      {
        before: "Enfant, elle ",
        after: " au foot tous les samedis.",
        infinitive: "jouer",
        correctTone: "b",
        correctForm: "jouait",
        explanation: "\"Tous les samedis\" is a repeated habit, not a one-time event -- imparfait.",
      },
      {
        before: "Il ",
        after: " neuf heures du soir quand le film a commencé.",
        infinitive: "être",
        correctTone: "b",
        correctForm: "était",
        explanation: "This is scene-setting background time, not an event itself -- imparfait.",
      },
      {
        before: "Tout à coup, le chien ",
        after: ".",
        infinitive: "aboyer",
        correctTone: "a",
        correctForm: "a aboyé",
        explanation: "\"Tout à coup\" flags a sudden, single moment -- passé composé.",
      },
      {
        before: "Pendant que je ",
        after: ", mon frère regardait la télé.",
        infinitive: "lire",
        correctTone: "b",
        correctForm: "lisais",
        explanation: "\"Pendant que\" sets up an action in progress alongside another -- imparfait.",
      },
      {
        before: "L'année dernière, nous ",
        after: " au Mexique.",
        infinitive: "voyager",
        correctTone: "a",
        correctForm: "avons voyagé",
        explanation: "\"L'année dernière\" marks a completed trip with a clear start and end -- passé composé.",
      },
      {
        before: "Je ",
        after: " Marie pour la première fois à cette fête.",
        infinitive: "connaître",
        correctTone: "a",
        correctForm: "ai connu",
        explanation:
          "Connaître in the passé composé means \"met for the first time\" -- a single moment, not an ongoing acquaintance.",
      },
      {
        before: "Avant, ma grand-mère ",
        after: " tous les dimanches.",
        infinitive: "cuisiner",
        correctTone: "b",
        correctForm: "cuisinait",
        explanation: "\"Avant\" plus a repeated routine describes a habit -- imparfait.",
      },
    ],
    quizCta: {
      heading: "Think you've got it?",
      body: "Take the quiz and see if you can tell passé composé and imparfait apart in context.",
      buttonLabel: "Take the quiz",
    },
  },
];

export const frUpcomingGrammarTopics: GrammarTopicPreview[] = [
  {
    title: "Être vs. Avoir as Auxiliaries",
    summary: "Which helper verb builds the passé composé, and why some verbs use the other one.",
  },
  {
    title: "Subjunctive Triggers",
    summary: "The wishes, doubts, and emotions that flip a verb into the subjunctive.",
  },
  {
    title: "Object Pronoun Order",
    summary: "Where COD, COI, y, and en actually line up in a sentence.",
  },
  {
    title: "Partitive Articles",
    summary: "Du, de la, and des -- saying \"some\" without a number.",
  },
  {
    title: "Gender & Adjective Agreement",
    summary: "Why French adjectives change shape to match the noun.",
  },
];

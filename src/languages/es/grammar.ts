import type { GrammarTopic, GrammarTopicPreview } from "../types";

export const esGrammarTopics: GrammarTopic[] = [
  {
    slug: "preterite-vs-imperfect",
    title: "Preterite vs. Imperfect",
    summary: "Two Spanish past tenses, and how to tell which one a sentence needs.",
    lede:
      "English mostly gets by with one simple past tense and leaves the rest to context. Spanish makes you choose between two — preterite and imperfect — every time. Getting this right is less about memorizing endings — you already practice those on the conjugator — and more about deciding what kind of past you're describing.",
    quickTake: [
      { text: "Preterite", tone: "a" },
      { text: " is for a completed action — it started and it finished. " },
      { text: "Imperfect", tone: "b" },
      {
        text: " is for the backdrop — something that was ongoing, repeated, or just describing how things were.",
      },
    ],
    compare: [
      {
        label: "Preterite",
        kicker: "One event, start to finish",
        triggers: ["ayer", "anoche", "una vez", "de repente", "el año pasado", "en 1999"],
        examples: [
          {
            parts: [{ text: "Ayer " }, { text: "comí", tone: "a" }, { text: " paella." }],
            gloss: "Yesterday I ate paella.",
            why: "Done — it's over",
          },
          {
            parts: [{ text: "Llegamos", tone: "a" }, { text: " a las ocho." }],
            gloss: "We arrived at eight.",
            why: "A single event",
          },
          {
            parts: [
              { text: "De repente, " },
              { text: "empezó", tone: "a" },
              { text: " a llover." },
            ],
            gloss: "Suddenly, it started to rain.",
            why: "The moment it happened",
          },
        ],
      },
      {
        label: "Imperfect",
        kicker: "Ongoing, repeated, or descriptive",
        triggers: ["siempre", "todos los días", "mientras", "de niño/a", "a menudo", "cada verano"],
        examples: [
          {
            parts: [
              { text: "De niño, " },
              { text: "jugaba", tone: "b" },
              { text: " en el parque." },
            ],
            gloss: "As a kid, I used to play in the park.",
            why: "A habit, repeated",
          },
          {
            parts: [{ text: "Eran", tone: "b" }, { text: " las ocho cuando llegamos." }],
            gloss: "It was eight o'clock when we arrived.",
            why: "Setting the scene",
          },
          {
            parts: [{ text: "Llovía", tone: "b" }, { text: " mientras caminábamos." }],
            gloss: "It was raining while we were walking.",
            why: "Still going on",
          },
        ],
      },
    ],
    collision: {
      parts: [
        { text: "Yo " },
        { text: "dormía", tone: "b" },
        { text: " cuando " },
        { text: "sonó", tone: "a" },
        { text: " el teléfono." },
      ],
      gloss: "I was sleeping when the phone rang.",
      note:
        "The imperfect draws the wavy background line — sleep was already in progress. The preterite is the single point that cuts across it: the moment the phone rang.",
    },
    shiftTableIntro:
      "A handful of verbs are usually about mental or physical states rather than actions — so switching them to preterite doesn't just change duration, it changes what happened.",
    shiftTable: [
      {
        verb: "saber",
        formB: { form: "sabía", meaning: "knew (already had the info)" },
        formA: { form: "supe", meaning: "found out (the moment it landed)" },
      },
      {
        verb: "conocer",
        formB: { form: "conocía", meaning: "knew, was acquainted with" },
        formA: { form: "conocí", meaning: "met for the first time" },
      },
      {
        verb: "querer",
        formB: { form: "quería", meaning: "wanted (an ongoing wish)" },
        formA: { form: "quise", meaning: "tried to (and it took real effort)" },
      },
      {
        verb: "poder",
        formB: { form: "podía", meaning: "was able to (in general)" },
        formA: { form: "pude", meaning: "managed to (this one time)" },
      },
    ],
    quiz: [
      {
        before: "Ayer, ",
        after: " tacos con mis amigos.",
        infinitive: "comer",
        correctTone: "a",
        correctForm: "comí",
        explanation: "\"Ayer\" points at one day -- a single completed action, so it's preterite.",
      },
      {
        before: "De niña, ",
        after: " al fútbol todos los sábados.",
        infinitive: "jugar",
        correctTone: "b",
        correctForm: "jugaba",
        explanation: "\"Todos los sábados\" is a repeated habit, not a one-time event -- imperfect.",
      },
      {
        before: "",
        after: " las nueve de la noche cuando empezó la película.",
        infinitive: "ser",
        correctTone: "b",
        correctForm: "Eran",
        explanation: "This is scene-setting background time, not an event itself -- imperfect.",
      },
      {
        before: "De repente, el perro ",
        after: ".",
        infinitive: "ladrar",
        correctTone: "a",
        correctForm: "ladró",
        explanation: "\"De repente\" flags a sudden, single moment -- preterite.",
      },
      {
        before: "Mientras yo ",
        after: ", mi hermano miraba la tele.",
        infinitive: "leer",
        correctTone: "b",
        correctForm: "leía",
        explanation: "\"Mientras\" sets up an action in progress alongside another -- imperfect.",
      },
      {
        before: "El año pasado, nosotros ",
        after: " a México.",
        infinitive: "viajar",
        correctTone: "a",
        correctForm: "viajamos",
        explanation: "\"El año pasado\" marks a completed trip with a clear start and end -- preterite.",
      },
      {
        before: "Yo no ",
        after: " que él vivía aquí -- me lo dijo ayer.",
        infinitive: "saber",
        correctTone: "a",
        correctForm: "supe",
        explanation:
          "Saber in the preterite means \"found out\" -- the moment the information landed, not an ongoing state.",
      },
      {
        before: "Antes, mi abuela ",
        after: " todos los domingos.",
        infinitive: "cocinar",
        correctTone: "b",
        correctForm: "cocinaba",
        explanation: "\"Antes\" plus a repeated routine describes a habit -- imperfect.",
      },
    ],
    practiceTenses: ["preterite", "imperfect"],
    practiceCta: {
      heading: "Ready to master it?",
      body: "Quiz yourself on preterite and imperfect side by side.",
      buttonLabel: "Practice these tenses",
    },
  },
];

export const esUpcomingGrammarTopics: GrammarTopicPreview[] = [
  {
    title: "Ser vs. Estar",
    summary: "Two verbs for \"to be,\" and how to know which one fits.",
  },
  {
    title: "Subjunctive Triggers",
    summary: "The wishes, doubts, and emotions that flip a verb into the subjunctive.",
  },
  {
    title: "Por vs. Para",
    summary: "Two words for \"for,\" each covering completely different ground.",
  },
  {
    title: "Object Pronoun Placement",
    summary: "Where direct and indirect object pronouns actually go in a sentence.",
  },
  {
    title: "The Personal \"a\"",
    summary: "A tiny word that shows up before people and nowhere else.",
  },
  {
    title: "Gustar-Type Verbs",
    summary: "Why \"I like it\" flips its subject and object in Spanish.",
  },
];

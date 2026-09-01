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
    quizCta: {
      heading: "Think you've got it?",
      body: "Take the quiz and see if you can tell preterite and imperfect apart in context.",
      buttonLabel: "Take the quiz",
    },
  },
  {
    slug: "ser-vs-estar",
    title: "Ser vs. Estar",
    summary: "Two verbs for \"to be,\" and how to know which one fits.",
    lede:
      "English gets by with a single verb, \"to be,\" for everything from professions to moods. Spanish splits that job between two verbs -- ser and estar -- and picking the wrong one doesn't just sound off, it can flip the meaning of the sentence entirely.",
    quickTake: [
      { text: "Ser", tone: "a" },
      { text: " is for identity -- who or what something fundamentally is. " },
      { text: "Estar", tone: "b" },
      { text: " is for state -- how something is right now, or where it's located." },
    ],
    compare: [
      {
        label: "Ser",
        kicker: "Identity, origin, and permanent traits",
        triggers: ["quién eres", "de dónde eres", "profesión", "personalidad", "hora y fecha"],
        examples: [
          {
            parts: [{ text: "Soy", tone: "a" }, { text: " médica." }],
            gloss: "I am a doctor.",
            why: "A profession — part of who she is",
          },
          {
            parts: [{ text: "Es", tone: "a" }, { text: " de Argentina." }],
            gloss: "He's from Argentina.",
            why: "Origin, not going anywhere",
          },
          {
            parts: [{ text: "La fiesta " }, { text: "es", tone: "a" }, { text: " a las nueve." }],
            gloss: "The party is at nine.",
            why: "When an event takes place",
          },
        ],
      },
      {
        label: "Estar",
        kicker: "Location, condition, and temporary states",
        triggers: ["cómo estás", "dónde está", "emociones", "resultado de un cambio"],
        examples: [
          {
            parts: [{ text: "Estoy", tone: "b" }, { text: " cansado." }],
            gloss: "I'm tired.",
            why: "A state, not a trait",
          },
          {
            parts: [{ text: "El café " }, { text: "está", tone: "b" }, { text: " frío." }],
            gloss: "The coffee is cold.",
            why: "A condition that changed",
          },
          {
            parts: [{ text: "Madrid " }, { text: "está", tone: "b" }, { text: " en España." }],
            gloss: "Madrid is in Spain.",
            why: "Location always uses estar, even when it's permanent",
          },
        ],
      },
    ],
    collision: {
      parts: [
        { text: "Ella " },
        { text: "es", tone: "a" },
        { text: " aburrida, pero hoy " },
        { text: "está", tone: "b" },
        { text: " aburrida en la reunión." },
      ],
      gloss: "She's boring, but today she's bored at the meeting.",
      note:
        "Same adjective, opposite meanings -- ser aburrido describes a personality trait (boring), estar aburrido describes a temporary feeling (bored). The same trick works on listo (smart / ready) and malo (bad / sick).",
    },
    quiz: [
      {
        before: "Yo ",
        after: " profesora de historia.",
        infinitive: "ser / estar",
        correctTone: "a",
        correctForm: "soy",
        explanation: "A profession is part of who she is, not a passing state -- ser.",
      },
      {
        before: "Hoy ",
        after: " muy cansada.",
        infinitive: "ser / estar",
        correctTone: "b",
        correctForm: "estoy",
        explanation: "Tired is a temporary condition, not a lasting trait -- estar.",
      },
      {
        before: "La reunión ",
        after: " a las tres.",
        infinitive: "ser / estar",
        correctTone: "a",
        correctForm: "es",
        explanation: "When an event takes place uses ser, not estar.",
      },
      {
        before: "El libro ",
        after: " en la mesa.",
        infinitive: "ser / estar",
        correctTone: "b",
        correctForm: "está",
        explanation: "Where a thing is located always takes estar.",
      },
      {
        before: "Nosotros ",
        after: " de Chile.",
        infinitive: "ser / estar",
        correctTone: "a",
        correctForm: "somos",
        explanation: "Origin doesn't change -- ser.",
      },
      {
        before: "¿Cómo ",
        after: " tú hoy?",
        infinitive: "ser / estar",
        correctTone: "b",
        correctForm: "estás",
        explanation: "Asking how someone's doing right now is a state -- estar.",
      },
      {
        before: "Mi hermano ",
        after: " médico.",
        infinitive: "ser / estar",
        correctTone: "a",
        correctForm: "es",
        explanation: "A profession, again -- ser.",
      },
      {
        before: "La sopa ",
        after: " fría; caliéntala.",
        infinitive: "ser / estar",
        correctTone: "b",
        correctForm: "está",
        explanation: "A condition the soup ended up in -- estar, not a trait of soup in general.",
      },
    ],
    quizCta: {
      heading: "Think you've got it?",
      body: "Take the quiz and see if picking ser or estar has become automatic.",
      buttonLabel: "Take the quiz",
    },
  },
  {
    slug: "subjunctive-triggers",
    title: "Subjunctive Triggers",
    summary: "The wishes, doubts, and emotions that flip a verb into the subjunctive.",
    lede:
      "Spanish has a whole separate set of verb endings -- the subjunctive -- reserved for sentences that aren't simply stating a fact. It shows up after wishes, doubts, emotions, recommendations, and impersonal judgments, almost always triggered by a specific word or phrase earlier in the sentence. Learn the triggers and the mood mostly takes care of itself.",
    quickTake: [
      { text: "Indicative", tone: "a" },
      { text: " states what's real. " },
      { text: "Subjunctive", tone: "b" },
      {
        text: " shows up the moment a sentence expresses a wish, a doubt, an emotion, or an attempt to influence someone else.",
      },
    ],
    compare: [
      {
        label: "Indicative",
        kicker: "Stating what's real or certain",
        triggers: ["creo que", "es verdad que", "sé que", "estoy seguro de que"],
        examples: [
          {
            parts: [{ text: "Creo que " }, { text: "viene", tone: "a" }, { text: "." }],
            gloss: "I think he's coming.",
            why: "A belief stated as fact, not doubt",
          },
          {
            parts: [{ text: "Sé que " }, { text: "tiene", tone: "a" }, { text: " razón." }],
            gloss: "I know she's right.",
            why: "Certainty",
          },
        ],
      },
      {
        label: "Subjunctive",
        kicker: "Triggered by wishes, doubts, emotions, and influence",
        triggers: ["quiero que", "espero que", "dudo que", "es importante que", "ojalá"],
        examples: [
          {
            parts: [{ text: "Quiero que " }, { text: "vengas", tone: "b" }, { text: "." }],
            gloss: "I want you to come.",
            why: "One subject wants something from another",
          },
          {
            parts: [{ text: "Dudo que " }, { text: "sea", tone: "b" }, { text: " verdad." }],
            gloss: "I doubt it's true.",
            why: "Doubt triggers subjunctive",
          },
          {
            parts: [
              { text: "Es importante que " },
              { text: "estudies", tone: "b" },
              { text: "." },
            ],
            gloss: "It's important that you study.",
            why: "Impersonal expressions of necessity",
          },
        ],
      },
    ],
    collision: {
      parts: [
        { text: "Creo que " },
        { text: "tiene", tone: "a" },
        { text: " razón, pero no creo que " },
        { text: "sea", tone: "b" },
        { text: " fácil." },
      ],
      gloss: "I think she's right, but I don't think it'll be easy.",
      note:
        "Creer que triggers the indicative when it states a belief, but no creer que flips to subjunctive -- denying certainty is itself a kind of doubt.",
    },
    quiz: [
      {
        before: "Creo que ",
        after: " la película esta noche.",
        infinitive: "empezar",
        correctTone: "a",
        correctForm: "empieza",
        explanation: "\"Creo que\" states a belief as fact -- indicative.",
      },
      {
        before: "Quiero que tú ",
        after: " conmigo.",
        infinitive: "venir",
        correctTone: "b",
        correctForm: "vengas",
        explanation: "\"Quiero que\" is one subject influencing another -- subjunctive.",
      },
      {
        before: "Es probable que ",
        after: " mañana.",
        infinitive: "llover",
        correctTone: "b",
        correctForm: "llueva",
        explanation: "Impersonal expressions of probability trigger subjunctive.",
      },
      {
        before: "Sé que ella ",
        after: " la verdad.",
        infinitive: "decir",
        correctTone: "a",
        correctForm: "dice",
        explanation: "\"Sé que\" expresses certainty -- indicative.",
      },
      {
        before: "Ojalá que ",
        after: " buen tiempo este fin de semana.",
        infinitive: "hacer",
        correctTone: "b",
        correctForm: "haga",
        explanation: "\"Ojalá\" is a wish, one of the classic subjunctive triggers.",
      },
      {
        before: "Dudo que él ",
        after: " la respuesta.",
        infinitive: "saber",
        correctTone: "b",
        correctForm: "sepa",
        explanation: "\"Dudar que\" expresses doubt -- subjunctive.",
      },
      {
        before: "Es verdad que ",
        after: " mucho dinero.",
        infinitive: "costar",
        correctTone: "a",
        correctForm: "cuesta",
        explanation: "\"Es verdad que\" states a fact -- indicative, not subjunctive.",
      },
      {
        before: "Mis padres insisten en que yo ",
        after: " medicina.",
        infinitive: "estudiar",
        correctTone: "b",
        correctForm: "estudie",
        explanation:
          "\"Insistir en que\" is a verb of influence, which pulls the following verb into subjunctive.",
      },
    ],
    quizCta: {
      heading: "Ready to test yourself?",
      body: "Take the quiz and see if you can spot the triggers that call for the subjunctive.",
      buttonLabel: "Take the quiz",
    },
  },
  {
    slug: "por-vs-para",
    title: "Por vs. Para",
    summary: "Two words for \"for,\" each covering completely different ground.",
    lede:
      "Both por and para translate to \"for\" in English, which is exactly why they're so easy to mix up. They're not interchangeable, though -- por looks backward at the cause, the means, or the exchange behind something, while para looks forward at the purpose, the destination, or the deadline it's aimed at.",
    quickTake: [
      { text: "Por", tone: "a" },
      { text: " points backward -- the cause, the means, the exchange behind something. " },
      { text: "Para", tone: "b" },
      { text: " points forward -- the purpose, destination, or deadline something is aimed at." },
    ],
    compare: [
      {
        label: "Por",
        kicker: "Cause, means, exchange, motion through",
        triggers: ["por eso", "por la mañana", "gracias por", "por ejemplo", "kilómetros por hora"],
        examples: [
          {
            parts: [{ text: "Lo hice " }, { text: "por", tone: "a" }, { text: " ti." }],
            gloss: "I did it because of / for you.",
            why: "The reason behind the action",
          },
          {
            parts: [{ text: "Caminamos " }, { text: "por", tone: "a" }, { text: " el parque." }],
            gloss: "We walked through the park.",
            why: "Movement through a space",
          },
          {
            parts: [
              { text: "Pagué diez dólares " },
              { text: "por", tone: "a" },
              { text: " el libro." },
            ],
            gloss: "I paid ten dollars for the book.",
            why: "An exchange",
          },
        ],
      },
      {
        label: "Para",
        kicker: "Purpose, destination, deadline, recipient",
        triggers: ["para mí", "para qué", "para las cinco", "salir para", "estudiar para"],
        examples: [
          {
            parts: [{ text: "Esto es " }, { text: "para", tone: "b" }, { text: " ti." }],
            gloss: "This is for you.",
            why: "The recipient",
          },
          {
            parts: [{ text: "Salimos " }, { text: "para", tone: "b" }, { text: " Madrid." }],
            gloss: "We're leaving for Madrid.",
            why: "A destination",
          },
          {
            parts: [
              { text: "Lo necesito " },
              { text: "para", tone: "b" },
              { text: " el lunes." },
            ],
            gloss: "I need it by Monday.",
            why: "A deadline",
          },
        ],
      },
    ],
    collision: {
      parts: [
        { text: "Trabajo " },
        { text: "por", tone: "a" },
        { text: " mi padre cuando está enfermo, pero normalmente trabajo " },
        { text: "para", tone: "b" },
        { text: " mi tío." },
      ],
      gloss: "I work in my father's place when he's sick, but normally I work for my uncle.",
      note:
        "Por mi padre means filling in on his behalf; para mi tío means he's the employer. Same sentence shape, opposite relationship to the person named.",
    },
    quiz: [
      {
        before: "Necesito el informe ",
        after: " el viernes.",
        infinitive: "necesitar",
        correctTone: "b",
        correctForm: "para",
        explanation: "A deadline -- by Friday -- calls for para.",
      },
      {
        before: "Caminamos ",
        after: " la playa toda la tarde.",
        infinitive: "caminar",
        correctTone: "a",
        correctForm: "por",
        explanation: "Movement through a place uses por.",
      },
      {
        before: "Este regalo es ",
        after: " mi abuela.",
        infinitive: "ser",
        correctTone: "b",
        correctForm: "para",
        explanation: "The recipient of something takes para.",
      },
      {
        before: "Gracias ",
        after: " tu ayuda.",
        infinitive: "ayudar",
        correctTone: "a",
        correctForm: "por",
        explanation: "\"Gracias por\" is fixed -- you thank someone por something.",
      },
      {
        before: "Salimos ",
        after: " Buenos Aires mañana.",
        infinitive: "salir",
        correctTone: "b",
        correctForm: "para",
        explanation: "A destination after salir takes para.",
      },
      {
        before: "Pagué veinte euros ",
        after: " las entradas.",
        infinitive: "pagar",
        correctTone: "a",
        correctForm: "por",
        explanation: "An exchange of money takes por.",
      },
      {
        before: "Estudio ",
        after: " ser abogada.",
        infinitive: "estudiar",
        correctTone: "b",
        correctForm: "para",
        explanation: "The goal a person is studying toward takes para.",
      },
      {
        before: "Lo hicimos todo ",
        after: " ti.",
        infinitive: "hacer",
        correctTone: "a",
        correctForm: "por",
        explanation: "Doing something for someone's sake takes por.",
      },
    ],
    quizCta: {
      heading: "Think it's a coin flip?",
      body: "Take the quiz and find out if por and para have started to feel different.",
      buttonLabel: "Take the quiz",
    },
  },
  {
    slug: "object-pronoun-placement",
    title: "Object Pronoun Placement",
    summary: "Where direct and indirect object pronouns actually go in a sentence.",
    lede:
      "Object pronouns like lo, la, me, and te don't always sit in the same spot in a Spanish sentence. With a conjugated verb they come first; with an infinitive, a gerund, or a command they can move to the end and attach directly onto the verb. The rule depends on what kind of verb form they're paired with.",
    quickTake: [
      { text: "Before the verb", tone: "a" },
      { text: " is the default with any conjugated verb. " },
      { text: "Attached to the end", tone: "b" },
      { text: " is what happens with an infinitive, a gerund, or an affirmative command." },
    ],
    compare: [
      {
        label: "Before the verb",
        kicker: "With a conjugated verb",
        triggers: ["lo veo", "la conozco", "les escribo", "no lo quiero"],
        examples: [
          {
            parts: [{ text: "Lo veo", tone: "a" }, { text: " todos los días." }],
            gloss: "I see him every day.",
            why: "A conjugated verb — the pronoun goes right before it",
          },
          {
            parts: [{ text: "Te llamo", tone: "a" }, { text: " esta noche." }],
            gloss: "I'll call you tonight.",
            why: "Same rule with a different conjugated verb",
          },
          {
            parts: [{ text: "No lo entiendo", tone: "a" }, { text: "." }],
            gloss: "I don't understand it.",
            why: "\"No\" comes before the pronoun, not between the pronoun and the verb",
          },
        ],
      },
      {
        label: "Attached to the end",
        kicker: "With an infinitive, gerund, or affirmative command",
        triggers: ["quiero verlo", "estoy escribiéndole", "dímelo", "llámame"],
        examples: [
          {
            parts: [{ text: "Quiero verlo", tone: "b" }, { text: "." }],
            gloss: "I want to see him.",
            why: "Attaches to the infinitive (lo quiero ver also works)",
          },
          {
            parts: [
              { text: "Estoy escribiéndole", tone: "b" },
              { text: " una carta." },
            ],
            gloss: "I'm writing her a letter.",
            why: "Attaches to the gerund, with an accent added to keep the stress in place",
          },
          {
            parts: [{ text: "¡Dímelo", tone: "b" }, { text: "!" }],
            gloss: "Tell it to me!",
            why: "Affirmative commands always take the pronoun at the end",
          },
        ],
      },
    ],
    collision: {
      parts: [
        { text: "¡" },
        { text: "Cómpralo", tone: "b" },
        { text: "!, pero " },
        { text: "no lo compres", tone: "a" },
        { text: " si es caro." },
      ],
      gloss: "Buy it!, but don't buy it if it's expensive.",
      note:
        "Affirmative commands attach the pronoun to the end (cómpralo); negative commands flip back to the pronoun-before-verb rule (no lo compres) -- the one case where the placement rule reverses itself depending on polarity.",
    },
    quiz: [
      {
        before: "¿Mi número de teléfono? ",
        after: " ahora mismo.",
        infinitive: "anotar",
        correctTone: "a",
        correctForm: "Lo anoto",
        explanation: "\"Anoto\" is a conjugated verb, so the pronoun goes right before it.",
      },
      {
        before: "Tengo la información. Voy a ",
        after: " mañana.",
        infinitive: "enviar",
        correctTone: "b",
        correctForm: "enviarla",
        explanation:
          "With an infinitive after \"voy a\", the pronoun can attach to the end (la voy a enviar works just as well).",
      },
      {
        before: "¡",
        after: " ahora, por favor!",
        infinitive: "decir",
        correctTone: "b",
        correctForm: "Dímelo",
        explanation: "Affirmative commands always take the pronoun attached to the end.",
      },
      {
        before: "",
        after: " todos los días sin falta.",
        infinitive: "llamar",
        correctTone: "a",
        correctForm: "Te llamo",
        explanation: "A conjugated present-tense verb takes the pronoun right before it.",
      },
      {
        before: "Estoy ",
        after: " una carta a mis padres.",
        infinitive: "escribir",
        correctTone: "b",
        correctForm: "escribiéndoles",
        explanation:
          "With a gerund, the pronoun attaches to the end and picks up a written accent to keep the stress in place.",
      },
      {
        before: "¡No ",
        after: " ahora, esperemos hasta mañana!",
        infinitive: "comprar",
        correctTone: "a",
        correctForm: "lo compres",
        explanation: "Negative commands flip back to putting the pronoun before the verb.",
      },
      {
        before: "",
        after: " mucho tu ayuda.",
        infinitive: "agradecer",
        correctTone: "a",
        correctForm: "Te agradezco",
        explanation: "A conjugated verb takes the pronoun directly in front of it.",
      },
      {
        before: "Vamos a ",
        after: " esta tarde.",
        infinitive: "terminar",
        correctTone: "b",
        correctForm: "terminarlo",
        explanation:
          "With an infinitive, attaching the pronoun to the end is the more common choice (lo vamos a terminar is also valid).",
      },
    ],
    quizCta: {
      heading: "Ready to test yourself?",
      body: "Take the quiz and see if the placement rule has become second nature.",
      buttonLabel: "Take the quiz",
    },
  },
  {
    slug: "personal-a",
    title: "The Personal \"a\"",
    summary: "A tiny word that shows up before people and nowhere else.",
    lede:
      "Spanish inserts a tiny word -- a -- right before a direct object when that object is a specific person or animal, and drops it for everything else. English has no equivalent, so it's easy to forget, but leaving it out in front of a person is one of the fastest ways to sound like you're still translating word for word.",
    quickTake: [
      { text: "Use it", tone: "a" },
      { text: " whenever the direct object is a specific person or pet. " },
      { text: "Skip it", tone: "b" },
      { text: " for things, places, and people who aren't specified." },
    ],
    compare: [
      {
        label: "Use the personal a",
        kicker: "Direct object is a specific person (or pet)",
        triggers: ["veo a", "conozco a", "busco a mi", "llamo a", "amo a"],
        examples: [
          {
            parts: [{ text: "Veo " }, { text: "a", tone: "a" }, { text: " Juan en la calle." }],
            gloss: "I see Juan on the street.",
            why: "Juan is a specific person",
          },
          {
            parts: [{ text: "Busco " }, { text: "a", tone: "a" }, { text: " mi perro." }],
            gloss: "I'm looking for my dog.",
            why: "Pets get the personal a too",
          },
          {
            parts: [
              { text: "¿Conoces " },
              { text: "a", tone: "a" },
              { text: " la profesora nueva?" },
            ],
            gloss: "Do you know the new teacher?",
            why: "A specific, known person",
          },
        ],
      },
      {
        label: "Skip it",
        kicker: "Direct object is a thing, place, or unspecified person",
        triggers: ["veo la", "busco un", "tengo tres", "necesito"],
        examples: [
          {
            parts: [{ text: "Veo la casa desde aquí." }],
            gloss: "I can see the house from here.",
            why: "A thing, not a person",
          },
          {
            parts: [{ text: "Busco un médico." }],
            gloss: "I'm looking for a doctor (any doctor).",
            why: "An unspecified person — not one particular doctor",
          },
          {
            parts: [{ text: "Tengo dos hermanos." }],
            gloss: "I have two brothers.",
            why: "Tener almost never takes the personal a, even with people",
          },
        ],
      },
    ],
    collision: {
      parts: [
        { text: "Busco " },
        { text: "al", tone: "a" },
        { text: " médico que me operó, no " },
        { text: "un", tone: "b" },
        { text: " médico cualquiera." },
      ],
      gloss: "I'm looking for the doctor who operated on me, not just any doctor.",
      note:
        "Same verb, same kind of object -- but al (a + el) marks a specific known person, while un médico leaves it open to anyone. The personal a tracks specificity, not just whether the object is human.",
    },
    quiz: [
      {
        before: "Veo ",
        after: " mi hermana en la foto.",
        infinitive: "ver",
        correctTone: "a",
        correctForm: "a",
        explanation: "\"Mi hermana\" is a specific person -- personal a.",
      },
      {
        before: "Veo ",
        after: " la casa desde aquí.",
        infinitive: "ver",
        correctTone: "b",
        correctForm: "",
        explanation: "\"La casa\" is a thing, not a person -- no personal a.",
      },
      {
        before: "¿Conoces ",
        after: " la profesora nueva?",
        infinitive: "conocer",
        correctTone: "a",
        correctForm: "a",
        explanation: "A specific, known person -- personal a.",
      },
      {
        before: "Tengo ",
        after: " dos hermanos.",
        infinitive: "tener",
        correctTone: "b",
        correctForm: "",
        explanation: "Tener almost never takes the personal a, even with people.",
      },
      {
        before: "Busco ",
        after: " mi perro; se escapó esta mañana.",
        infinitive: "buscar",
        correctTone: "a",
        correctForm: "a",
        explanation: "Pets get the personal a too, since they're a specific individual to the speaker.",
      },
      {
        before: "Busco ",
        after: " médico; no me importa cuál.",
        infinitive: "buscar",
        correctTone: "b",
        correctForm: "",
        explanation: "An unspecified person -- any doctor will do -- skips the personal a.",
      },
      {
        before: "Llamo ",
        after: " mi hermano cada domingo.",
        infinitive: "llamar",
        correctTone: "a",
        correctForm: "a",
        explanation: "A specific person on the other end of the call -- personal a.",
      },
      {
        before: "Necesito ",
        after: " una silla más para la mesa.",
        infinitive: "necesitar",
        correctTone: "b",
        correctForm: "",
        explanation: "An object, not a person -- no personal a needed.",
      },
    ],
    quizCta: {
      heading: "Ready to test yourself?",
      body: "Take the quiz and see if you can spot where the personal a belongs.",
      buttonLabel: "Take the quiz",
    },
  },
  {
    slug: "gustar-type-verbs",
    title: "Gustar-Type Verbs",
    summary: "Why \"I like it\" flips its subject and object in Spanish.",
    lede:
      "\"I like it\" in English puts the person doing the liking in the subject spot. Gustar flips that around: the thing being liked is the subject, and the person is just along for the ride as an indirect object. That's why gustar almost always shows up as gusta or gustan, agreeing with whatever's being liked instead of with the person.",
    quickTake: [
      { text: "Gusta", tone: "a" },
      { text: " agrees with one thing being liked, or an infinitive. " },
      { text: "Gustan", tone: "b" },
      {
        text: " agrees with more than one -- the verb never conjugates for the person doing the liking.",
      },
    ],
    compare: [
      {
        label: "Gusta",
        kicker: "One thing (or an infinitive) is doing the pleasing",
        triggers: ["me gusta", "te gusta", "le gusta", "nos gusta"],
        examples: [
          {
            parts: [{ text: "Me " }, { text: "gusta", tone: "a" }, { text: " el café." }],
            gloss: "I like coffee.",
            why: "El café is singular — gusta agrees with it, not with \"me\"",
          },
          {
            parts: [{ text: "Le " }, { text: "gusta", tone: "a" }, { text: " bailar." }],
            gloss: "She likes to dance.",
            why: "An infinitive always takes the singular gusta",
          },
          {
            parts: [
              { text: "¿Te " },
              { text: "gusta", tone: "a" },
              { text: " esta canción?" },
            ],
            gloss: "Do you like this song?",
            why: "One song, singular gusta",
          },
        ],
      },
      {
        label: "Gustan",
        kicker: "More than one thing is doing the pleasing",
        triggers: ["me gustan", "te gustan", "le gustan", "nos gustan"],
        examples: [
          {
            parts: [{ text: "Me " }, { text: "gustan", tone: "b" }, { text: " los perros." }],
            gloss: "I like dogs.",
            why: "Los perros is plural — gustan agrees with it",
          },
          {
            parts: [
              { text: "Nos " },
              { text: "gustan", tone: "b" },
              { text: " las playas de aquí." },
            ],
            gloss: "We like the beaches here.",
            why: "Plural subject, plural verb",
          },
          {
            parts: [
              { text: "¿Te " },
              { text: "gustan", tone: "b" },
              { text: " los mismos libros que a mí?" },
            ],
            gloss: "Do you like the same books as me?",
            why: "Plural books, plural gustan",
          },
        ],
      },
    ],
    collision: {
      parts: [
        { text: "A ella " },
        { text: "le gusta", tone: "a" },
        { text: " el libro, pero a mí " },
        { text: "me gustan", tone: "b" },
        { text: " las películas basadas en él." },
      ],
      gloss: "She likes the book, but I like the movies based on it.",
      note:
        "Gustar never conjugates for the person doing the liking -- me/te/le/nos/les just marks who's affected. The verb itself always agrees with the thing being liked: gusta for one, gustan for several.",
    },
    quiz: [
      {
        before: "A mí ",
        after: " el chocolate.",
        infinitive: "gustar",
        correctTone: "a",
        correctForm: "me gusta",
        explanation: "\"El chocolate\" is singular, so gustar stays singular: gusta.",
      },
      {
        before: "A nosotros ",
        after: " las novelas de misterio.",
        infinitive: "gustar",
        correctTone: "b",
        correctForm: "nos gustan",
        explanation: "\"Las novelas\" is plural, so gustar agrees: gustan.",
      },
      {
        before: "¿A ti ",
        after: " viajar solo?",
        infinitive: "gustar",
        correctTone: "a",
        correctForm: "te gusta",
        explanation:
          "An infinitive (viajar) always takes the singular gusta, even though the sentence feels like it's about an activity.",
      },
      {
        before: "A mis padres ",
        after: " los conciertos en vivo.",
        infinitive: "gustar",
        correctTone: "b",
        correctForm: "les gustan",
        explanation: "\"Los conciertos\" is plural, so it's gustan, not gusta.",
      },
      {
        before: "A él ",
        after: " esta ciudad.",
        infinitive: "gustar",
        correctTone: "a",
        correctForm: "le gusta",
        explanation: "\"Esta ciudad\" is one singular thing -- gusta.",
      },
      {
        before: "A ustedes ",
        after: " los mismos colores.",
        infinitive: "gustar",
        correctTone: "b",
        correctForm: "les gustan",
        explanation: "\"Los mismos colores\" is plural -- gustan.",
      },
      {
        before: "A mí no ",
        after: " madrugar ni hacer ejercicio.",
        infinitive: "gustar",
        correctTone: "a",
        correctForm: "me gusta",
        explanation: "Two infinitives strung together still count as one idea, so gustar stays singular: gusta.",
      },
      {
        before: "A ella ",
        after: " tus ideas.",
        infinitive: "gustar",
        correctTone: "b",
        correctForm: "le gustan",
        explanation: "\"Tus ideas\" is plural -- gustan, matched with le for \"a ella.\"",
      },
    ],
    quizCta: {
      heading: "Ready to test yourself?",
      body: "Take the quiz and see if you can match gusta and gustan to what's being liked.",
      buttonLabel: "Take the quiz",
    },
  },
];

export const esUpcomingGrammarTopics: GrammarTopicPreview[] = [];

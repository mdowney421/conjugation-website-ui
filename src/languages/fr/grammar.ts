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
  {
    slug: "etre-vs-avoir",
    title: "Être vs. Avoir as Auxiliaries",
    summary: "Which helper verb builds the passé composé, and why some verbs use the other one.",
    lede:
      "English builds every past tense with the same helper verb, have. French splits the job between two: avoir, the default nearly every verb reaches for, and être, reserved for a specific, memorizable group of verbs about movement or change of state — plus every reflexive verb, without exception. Picking the wrong one doesn't just sound off; with être verbs, the past participle also has to agree with the subject.",
    quickTake: [
      { text: "Avoir", tone: "a" },
      { text: " is the default helper for the passé composé — nearly every verb uses it. " },
      { text: "Être", tone: "b" },
      {
        text: " is reserved for a small set of movement and change-of-state verbs, plus every reflexive verb.",
      },
    ],
    compare: [
      {
        label: "Avoir",
        kicker: "The default auxiliary, used by most verbs",
        triggers: ["j'ai fait", "tu as vu", "il a pris", "elle a écrit"],
        examples: [
          {
            parts: [{ text: "J'" }, { text: "ai mangé", tone: "a" }, { text: " une pomme." }],
            gloss: "I ate an apple.",
            why: "Most verbs, transitive or not, default to avoir",
          },
          {
            parts: [{ text: "Elle " }, { text: "a fini", tone: "a" }, { text: " ses devoirs." }],
            gloss: "She finished her homework.",
            why: "Same default auxiliary",
          },
          {
            parts: [{ text: "Nous " }, { text: "avons vu", tone: "a" }, { text: " ce film." }],
            gloss: "We saw this movie.",
            why: "Avoir stays the auxiliary regardless of the verb's meaning",
          },
        ],
      },
      {
        label: "Être",
        kicker: "A specific set of movement/change verbs, plus every reflexive verb",
        triggers: ["il est allé", "elle est née", "je me suis", "nous sommes partis"],
        examples: [
          {
            parts: [{ text: "Il " }, { text: "est allé", tone: "b" }, { text: " au marché." }],
            gloss: "He went to the market.",
            why: "Aller is one of the classic être verbs of movement",
          },
          {
            parts: [{ text: "Elle " }, { text: "est née", tone: "b" }, { text: " à Lyon." }],
            gloss: "She was born in Lyon.",
            why: "Naître — birth counts as the ultimate change of state",
          },
          {
            parts: [{ text: "Je " }, { text: "me suis levé", tone: "b" }, { text: " tôt." }],
            gloss: "I got up early.",
            why: "Every reflexive verb takes être, no exceptions",
          },
        ],
      },
    ],
    collision: {
      parts: [
        { text: "Elle " },
        { text: "est sortie", tone: "b" },
        { text: " hier soir, mais elle " },
        { text: "a sorti", tone: "a" },
        { text: " la poubelle avant de partir." },
      ],
      gloss: "She went out last night, but she took out the trash before leaving.",
      note:
        "Sortir, monter, descendre, and a few other movement verbs take être when they're intransitive (no direct object) but switch to avoir the moment they take one — sortir la poubelle means \"take the trash out,\" not just \"go out.\"",
    },
    shiftTableIntro:
      "A handful of these movement verbs swing back to avoir the instant they take a direct object — the auxiliary tracks whether the verb is being used transitively, not just which verb it is.",
    shiftTable: [
      {
        verb: "sortir",
        formB: { form: "est sorti(e)", meaning: "went out (no direct object)" },
        formA: { form: "a sorti", meaning: "took [something] out" },
      },
      {
        verb: "monter",
        formB: { form: "est monté(e)", meaning: "went up" },
        formA: { form: "a monté", meaning: "carried [something] up" },
      },
      {
        verb: "descendre",
        formB: { form: "est descendu(e)", meaning: "went down" },
        formA: { form: "a descendu", meaning: "brought [something] down" },
      },
      {
        verb: "passer",
        formB: { form: "est passé(e)", meaning: "went by, dropped in" },
        formA: { form: "a passé", meaning: "spent [time], passed [something] along" },
      },
    ],
    quiz: [
      {
        before: "Hier soir, j'",
        after: " au restaurant avec des amis.",
        infinitive: "manger",
        correctTone: "a",
        correctForm: "ai mangé",
        explanation: "Manger takes avoir like most verbs — it isn't one of the être verbs of movement or change.",
      },
      {
        before: "Elle ",
        after: " en France l'année dernière.",
        infinitive: "naître",
        correctTone: "b",
        correctForm: "est née",
        explanation:
          "Naître is one of the classic être verbs — birth counts as the ultimate change of state — and its participle agrees with the feminine subject: née.",
      },
      {
        before: "Nous ",
        after: " à la gare à midi.",
        infinitive: "arriver",
        correctTone: "b",
        correctForm: "sommes arrivés",
        explanation: "Arriver is a classic être verb of movement.",
      },
      {
        before: "Ils ",
        after: " tôt ce matin.",
        infinitive: "se lever",
        correctTone: "b",
        correctForm: "se sont levés",
        explanation: "Every reflexive verb takes être, no exceptions.",
      },
      {
        before: "Le professeur ",
        after: " les examens hier.",
        infinitive: "corriger",
        correctTone: "a",
        correctForm: "a corrigé",
        explanation: "An ordinary transitive verb like corriger takes avoir, regardless of what it's acting on.",
      },
      {
        before: "Il ",
        after: " les valises dans le coffre avant de partir.",
        infinitive: "monter",
        correctTone: "a",
        correctForm: "a monté",
        explanation:
          "Monter switches to avoir the moment it takes a direct object — here, les valises — even though it's an être verb when used without one.",
      },
      {
        before: "Nous ",
        after: " chez nos grands-parents pendant les vacances.",
        infinitive: "rester",
        correctTone: "b",
        correctForm: "sommes restés",
        explanation:
          "Rester is one of the être verbs even though it doesn't involve motion — it's about a state of location, not a change of location.",
      },
      {
        before: "Vous ",
        after: " la porte derrière vous?",
        infinitive: "fermer",
        correctTone: "a",
        correctForm: "avez fermé",
        explanation: "Fermer is an ordinary transitive verb — avoir, like most verbs.",
      },
    ],
    quizCta: {
      heading: "Think you've got it?",
      body: "Take the quiz and see if you can pick avoir or être for the passé composé every time.",
      buttonLabel: "Take the quiz",
    },
  },
  {
    slug: "subjunctive-triggers",
    title: "Subjunctive Triggers",
    summary: "The wishes, doubts, and emotions that flip a verb into the subjunctive.",
    lede:
      "French, like several other Romance languages, keeps a separate mood beyond simple fact-stating — the subjunctive — for sentences shaped by a wish, a doubt, an emotion, a necessity, or an attempt to influence someone else. It's almost always triggered by a specific phrase before que earlier in the sentence, so once the common triggers become familiar, choosing the mood mostly stops being a puzzle. A few, like espérer que, are exceptions worth learning on their own.",
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
        triggers: ["je crois que", "c'est vrai que", "je sais que", "je suis sûr que"],
        examples: [
          {
            parts: [{ text: "Je crois qu'il " }, { text: "vient", tone: "a" }, { text: "." }],
            gloss: "I think he's coming.",
            why: "A belief stated as fact, not doubt",
          },
          {
            parts: [{ text: "Je sais qu'elle " }, { text: "a raison", tone: "a" }, { text: "." }],
            gloss: "I know she's right.",
            why: "Certainty",
          },
        ],
      },
      {
        label: "Subjunctive",
        kicker: "Triggered by wishes, doubts, emotions, and influence",
        triggers: ["je veux que", "il faut que", "je doute que", "il est important que"],
        examples: [
          {
            parts: [{ text: "Je veux que tu " }, { text: "viennes", tone: "b" }, { text: "." }],
            gloss: "I want you to come.",
            why: "One subject wants something from another",
          },
          {
            parts: [{ text: "Je doute qu'il " }, { text: "soit", tone: "b" }, { text: " là." }],
            gloss: "I doubt he's there.",
            why: "Doubt triggers subjunctive",
          },
          {
            parts: [{ text: "Il faut que tu " }, { text: "étudies", tone: "b" }, { text: "." }],
            gloss: "You have to study.",
            why: "Impersonal expressions of necessity",
          },
        ],
      },
    ],
    collision: {
      parts: [
        { text: "Je crois qu'il " },
        { text: "a", tone: "a" },
        { text: " raison, mais je ne crois pas qu'il " },
        { text: "soit", tone: "b" },
        { text: " facile à convaincre." },
      ],
      gloss: "I think he's right, but I don't think he's easy to convince.",
      note:
        "Croire que triggers the indicative when it states a belief, but ne pas croire que flips to subjunctive — denying certainty is itself a kind of doubt.",
    },
    quiz: [
      {
        before: "Je crois que le film ",
        after: " à vingt heures.",
        infinitive: "commencer",
        correctTone: "a",
        correctForm: "commence",
        explanation: "\"Je crois que\" states a belief as fact -- indicative.",
      },
      {
        before: "Je veux que tu ",
        after: " avec moi.",
        infinitive: "venir",
        correctTone: "b",
        correctForm: "viennes",
        explanation: "\"Je veux que\" is one subject influencing another -- subjunctive.",
      },
      {
        before: "Il est possible qu'il ",
        after: " demain.",
        infinitive: "pleuvoir",
        correctTone: "b",
        correctForm: "pleuve",
        explanation: "Impersonal expressions of possibility trigger the subjunctive.",
      },
      {
        before: "Je sais qu'elle ",
        after: " la vérité.",
        infinitive: "dire",
        correctTone: "a",
        correctForm: "dit",
        explanation: "\"Je sais que\" expresses certainty -- indicative.",
      },
      {
        before: "J'espère qu'il ",
        after: " beau ce week-end.",
        infinitive: "faire",
        correctTone: "a",
        correctForm: "fera",
        explanation: "Espérer que is one of French's exceptions -- unlike vouloir que, it keeps the indicative, not the subjunctive.",
      },
      {
        before: "Je doute qu'il ",
        after: " la réponse.",
        infinitive: "savoir",
        correctTone: "b",
        correctForm: "sache",
        explanation: "\"Douter que\" expresses doubt -- subjunctive, and savoir has an irregular subjunctive stem (sach-).",
      },
      {
        before: "C'est vrai que ça ",
        after: " beaucoup d'argent.",
        infinitive: "coûter",
        correctTone: "a",
        correctForm: "coûte",
        explanation: "\"C'est vrai que\" states a fact -- indicative, not subjunctive.",
      },
      {
        before: "Mes parents insistent pour que j'",
        after: " médecine.",
        infinitive: "étudier",
        correctTone: "b",
        correctForm: "étudie",
        explanation:
          "\"Insister pour que\" is a verb of influence, which pulls the following verb into subjunctive.",
      },
    ],
    quizCta: {
      heading: "Ready to test yourself?",
      body: "Take the quiz and see if you can spot the triggers that call for the subjunctive.",
      buttonLabel: "Take the quiz",
    },
  },
  {
    slug: "object-pronoun-order",
    title: "Object Pronoun Order",
    summary: "Where COD, COI, y, and en actually line up in a sentence.",
    lede:
      "A single object pronoun in French is easy — it just slots in right before the conjugated verb. The trouble starts once two pile up at the same time, because French doesn't always put the indirect object pronoun in the same slot relative to the direct one. Whether lui and leur land before or after le, la, and les depends entirely on which pronoun is doing the indirect-object job.",
    quickTake: [
      { text: "Me, te, nous, vous, se", tone: "a" },
      { text: " always come before le, la, les. " },
      { text: "Lui and leur", tone: "b" },
      {
        text: " come after le, la, les instead — and y, then en, trail behind everything else in the stack.",
      },
    ],
    compare: [
      {
        label: "Me/te/nous/vous first",
        kicker: "1st/2nd person (or reflexive) pronoun + le/la/les",
        triggers: ["il me le donne", "elle te la montre", "nous nous les rappelons", "je vous les envoie"],
        examples: [
          {
            parts: [{ text: "Il " }, { text: "me le", tone: "a" }, { text: " donne." }],
            gloss: "He gives it to me.",
            why: "\"Me\" (indirect, who receives it) comes before \"le\" (direct, the thing itself)",
          },
          {
            parts: [{ text: "Elle " }, { text: "te la", tone: "a" }, { text: " montre." }],
            gloss: "She shows it to you.",
            why: "Same order: \"te\" before \"la\"",
          },
          {
            parts: [{ text: "Je " }, { text: "vous les", tone: "a" }, { text: " envoie demain." }],
            gloss: "I'll send them to you tomorrow.",
            why: "\"Vous\" still leads, even with a plural direct object",
          },
        ],
      },
      {
        label: "Le/la/les first",
        kicker: "le/la/les + lui/leur (3rd person indirect)",
        triggers: ["il le lui donne", "elle la leur montre", "je les lui envoie"],
        examples: [
          {
            parts: [{ text: "Il " }, { text: "le lui", tone: "b" }, { text: " donne." }],
            gloss: "He gives it to him/her.",
            why: "With a 3rd-person indirect object, the order flips -- \"le\" now comes before \"lui\"",
          },
          {
            parts: [{ text: "Elle " }, { text: "la leur", tone: "b" }, { text: " montre." }],
            gloss: "She shows it to them.",
            why: "Same flip: \"la\" before \"leur\"",
          },
          {
            parts: [{ text: "Je " }, { text: "les lui", tone: "b" }, { text: " envoie demain." }],
            gloss: "I'll send them to him tomorrow.",
            why: "The direct object still leads whenever the indirect object is lui or leur",
          },
        ],
      },
    ],
    collision: {
      parts: [
        { text: "Il " },
        { text: "me le", tone: "a" },
        { text: " donne quand je le demande, mais il " },
        { text: "le lui", tone: "b" },
        { text: " donne seulement si elle insiste." },
      ],
      gloss: "He gives it to me when I ask, but he only gives it to her if she insists.",
      note:
        "Same verb, same two objects, same meaning of \"give it to (someone)\" -- but swap the recipient from \"me\" to a third person like \"her,\" and the order reverses: \"me\" can never follow \"le\"; \"lui\" can never precede it. Y and en, when they show up alongside other pronouns, always trail at the very end of the stack, after both of these pairs.",
    },
    quiz: [
      {
        before: "Ce cadeau ? Il ",
        after: " donne pour mon anniversaire.",
        infinitive: "donner",
        correctTone: "a",
        correctForm: "me le",
        explanation:
          "\"Me\" (who receives it) comes before \"le\" (the thing itself) -- me/te/nous/vous always lead when paired with le/la/les.",
      },
      {
        before: "Cette histoire, je ",
        after: " raconte tous les soirs.",
        infinitive: "raconter",
        correctTone: "b",
        correctForm: "la lui",
        explanation:
          "With a 3rd-person indirect object, the direct object pronoun (la) leads instead -- lui always follows le/la/les.",
      },
      {
        before: "Mes clés ? Je ",
        after: " prête si tu en as besoin.",
        infinitive: "prêter",
        correctTone: "a",
        correctForm: "te les",
        explanation: "\"Te\" comes before \"les\" -- the 1st/2nd person pronoun always leads.",
      },
      {
        before: "Le message, on ",
        after: " envoie ce soir.",
        infinitive: "envoyer",
        correctTone: "b",
        correctForm: "le leur",
        explanation: "\"Leur,\" like \"lui,\" always follows le/la/les rather than leading.",
      },
      {
        before: "Ma nouvelle adresse, je ",
        after: " donne tout de suite.",
        infinitive: "donner",
        correctTone: "a",
        correctForm: "vous la",
        explanation: "\"Vous\" leads, even paired with a feminine direct object like \"la.\"",
      },
      {
        before: "Les résultats, le professeur ",
        after: " annonce demain.",
        infinitive: "annoncer",
        correctTone: "b",
        correctForm: "les leur",
        explanation: "\"Leur\" follows \"les\" here too -- the rule doesn't change with a plural direct object.",
      },
      {
        before: "Cette chanson, nous ",
        after: " rappelons souvent.",
        infinitive: "se rappeler",
        correctTone: "a",
        correctForm: "nous la",
        explanation:
          "The reflexive \"nous\" acts like the indirect-object slot here, and it leads just like me/te/vous do.",
      },
      {
        before: "Ce secret, elle ",
        after: " confie, jamais à personne d'autre.",
        infinitive: "confier",
        correctTone: "b",
        correctForm: "le lui",
        explanation: "\"Lui\" trails behind \"le\" here as well, following the same le/la/les-then-lui/leur order.",
      },
    ],
    quizCta: {
      heading: "Think you've got it?",
      body: "Take the quiz and see if you can get the pronoun order right every time.",
      buttonLabel: "Take the quiz",
    },
  },
  {
    slug: "partitive-articles",
    title: "Partitive Articles",
    summary: "Du, de la, and des -- saying \"some\" without a number.",
    lede:
      "French doesn't let you skip the article the way English does with a sentence like \"I'm eating bread.\" It inserts a partitive article — du, de la, de l', or des — to mean \"some\" of an unspecified amount, agreeing with the noun's gender and number. That article doesn't survive everywhere, though: negate the sentence, or put a quantity word in front of the noun, and du, de la, and des all collapse down to a bare de.",
    quickTake: [
      { text: "Du, de la, des", tone: "a" },
      { text: " mean \"some\" in a plain affirmative sentence, matching the noun's gender and number. " },
      { text: "De (or d')", tone: "b" },
      { text: " replaces all of them after a negation or a word expressing quantity." },
    ],
    compare: [
      {
        label: "Du / de la / des",
        kicker: "Affirmative sentences -- \"some\"",
        triggers: ["je mange du", "elle boit de la", "nous avons des"],
        examples: [
          {
            parts: [{ text: "Je mange " }, { text: "du", tone: "a" }, { text: " pain." }],
            gloss: "I'm eating (some) bread.",
            why: "Masculine, singular, uncountable -- du",
          },
          {
            parts: [{ text: "Elle boit " }, { text: "de la", tone: "a" }, { text: " limonade." }],
            gloss: "She's drinking (some) lemonade.",
            why: "Feminine, singular -- de la",
          },
          {
            parts: [{ text: "Nous avons " }, { text: "des", tone: "a" }, { text: " amis à Paris." }],
            gloss: "We have (some) friends in Paris.",
            why: "Plural -- des, even though the friends are countable",
          },
        ],
      },
      {
        label: "De / d'",
        kicker: "After a negation or a quantity word",
        triggers: ["ne...pas de", "beaucoup de", "un peu de", "plus de"],
        examples: [
          {
            parts: [{ text: "Je ne mange pas " }, { text: "de", tone: "b" }, { text: " pain." }],
            gloss: "I'm not eating any bread.",
            why: "Negation strips du down to de",
          },
          {
            parts: [{ text: "Elle boit beaucoup " }, { text: "de", tone: "b" }, { text: " limonade." }],
            gloss: "She drinks a lot of lemonade.",
            why: "A quantity word (beaucoup de) always takes plain de",
          },
          {
            parts: [{ text: "Nous n'avons plus " }, { text: "d'", tone: "b" }, { text: "amis ici." }],
            gloss: "We don't have any friends here anymore.",
            why: "D' before a vowel sound, same rule as negation",
          },
        ],
      },
    ],
    collision: {
      parts: [
        { text: "Je ne bois jamais " },
        { text: "de", tone: "b" },
        { text: " café le soir, mais ce n'est pas " },
        { text: "du", tone: "a" },
        { text: " vrai café de toute façon." },
      ],
      gloss: "I never drink coffee in the evening, but it isn't real coffee anyway.",
      note:
        "The reduction to de only happens when a negated verb like boire is saying the noun doesn't exist in the sentence at all. Negating être to make an identity claim (\"it isn't [x]\") doesn't trigger the same collapse -- du/de la/des survive after ce n'est pas.",
    },
    quiz: [
      {
        before: "Le matin, je bois ",
        after: " café.",
        infinitive: "boire",
        correctTone: "a",
        correctForm: "du",
        explanation: "Affirmative sentence, masculine singular, uncountable -- du.",
      },
      {
        before: "Elle ne mange jamais ",
        after: " viande.",
        infinitive: "manger",
        correctTone: "b",
        correctForm: "de",
        explanation: "Negation collapses de la down to de.",
      },
      {
        before: "Il y a beaucoup ",
        after: " étudiants dans cette classe.",
        infinitive: "avoir",
        correctTone: "b",
        correctForm: "d'",
        explanation:
          "\"Beaucoup de\" is a quantity expression -- it takes plain de, elided to d' before a vowel sound, never des.",
      },
      {
        before: "Tu veux ",
        after: " eau?",
        infinitive: "vouloir",
        correctTone: "a",
        correctForm: "de l'",
        explanation: "Affirmative, and eau starts with a vowel sound, so de la elides to de l'.",
      },
      {
        before: "Ils n'ont pas ",
        after: " argent en ce moment.",
        infinitive: "avoir",
        correctTone: "b",
        correctForm: "d'",
        explanation: "Negation plus a noun starting with a vowel sound -- de elides to d'.",
      },
      {
        before: "Au marché, j'achète toujours ",
        after: " légumes frais.",
        infinitive: "acheter",
        correctTone: "a",
        correctForm: "des",
        explanation: "Affirmative, plural -- des.",
      },
      {
        before: "Ce gâteau ne contient pas ",
        after: " sucre.",
        infinitive: "contenir",
        correctTone: "b",
        correctForm: "de",
        explanation: "Negation of contenir collapses du down to de.",
      },
      {
        before: "Elle a ",
        after: " patience avec les enfants.",
        infinitive: "avoir",
        correctTone: "a",
        correctForm: "de la",
        explanation: "Affirmative, feminine singular -- de la.",
      },
    ],
    quizCta: {
      heading: "Ready to test yourself?",
      body: "Take the quiz and see if you can tell when du, de la, and des collapse to de.",
      buttonLabel: "Take the quiz",
    },
  },
  {
    slug: "gender-adjective-agreement",
    title: "Gender & Number Agreement",
    summary: "Why French adjectives change shape to match a noun's gender and number.",
    lede:
      "Every French noun carries a grammatical gender and a number, and adjectives have to agree with both — masculine nouns pair with an adjective's base form, feminine nouns usually add an -e, and either way, a plural noun adds an -s on top of whichever gender form you started with. Most adjectives follow that predictable pattern, but a handful of the most common ones — beau, vieux, nouveau — break it twice over: they change enough between masculine and feminine to be worth learning as sets, including a rarely-taught third form used only right before a masculine noun that starts with a vowel sound, and in the plural, beau and nouveau swap the expected -s for an -x instead.",
    quickTake: [
      { text: "Masculine", tone: "a" },
      { text: " nouns take the adjective's base form. " },
      { text: "Feminine", tone: "b" },
      {
        text: " nouns usually add -e, though the exact change depends on how the masculine form ends. Either way, a plural noun then adds an -s on top of whichever gender form you started with -- or, for a few adjectives like beau and nouveau, an -x instead.",
      },
    ],
    compare: [
      {
        label: "Masculine",
        kicker: "Base form of the adjective, +s for the plural",
        triggers: ["un grand homme", "un livre intéressant", "le vieux quartier", "les grands hommes"],
        examples: [
          {
            parts: [{ text: "un " }, { text: "grand", tone: "a" }, { text: " homme" }],
            gloss: "a tall man",
            why: "Masculine noun, base adjective form",
          },
          {
            parts: [{ text: "un livre " }, { text: "intéressant", tone: "a" }, { text: "" }],
            gloss: "an interesting book",
            why: "Already ends in a consonant sound -- no change needed for masculine",
          },
          {
            parts: [{ text: "un " }, { text: "beau", tone: "a" }, { text: " jardin" }],
            gloss: "a beautiful garden",
            why: "Irregular masculine form, used before a consonant sound",
          },
          {
            parts: [{ text: "les " }, { text: "grands", tone: "a" }, { text: " hommes" }],
            gloss: "the tall men",
            why: "Plural just adds -s on top -- the masculine form still doesn't take an -e",
          },
        ],
      },
      {
        label: "Feminine",
        kicker: "Usually the masculine form + -e, +s for the plural",
        triggers: ["une grande femme", "une histoire intéressante", "la vieille ville", "les grandes femmes"],
        examples: [
          {
            parts: [{ text: "une " }, { text: "grande", tone: "b" }, { text: " femme" }],
            gloss: "a tall woman",
            why: "Add -e to the masculine form",
          },
          {
            parts: [{ text: "une histoire " }, { text: "intéressante", tone: "b" }, { text: "" }],
            gloss: "an interesting story",
            why: "Same rule: add -e, which also makes the final consonant audible",
          },
          {
            parts: [{ text: "une " }, { text: "belle", tone: "b" }, { text: " maison" }],
            gloss: "a beautiful house",
            why: "Beau's irregular feminine pair, not just beau + e",
          },
          {
            parts: [{ text: "les " }, { text: "grandes", tone: "b" }, { text: " femmes" }],
            gloss: "the tall women",
            why: "Both markers stack -- -e for feminine, then -s for plural",
          },
        ],
      },
    ],
    collision: {
      parts: [
        { text: "C'est un " },
        { text: "vieil", tone: "a" },
        { text: " ami, pas une " },
        { text: "vieille", tone: "b" },
        { text: " amie." },
      ],
      gloss: "He's an old (male) friend, not an old (female) friend.",
      note:
        "Beau, nouveau, and vieux each have a special third form -- bel, nouvel, vieil -- used only right before a masculine noun that starts with a vowel sound, purely so the two words flow together. It's still the masculine form (ami stays a male friend), just spelled to avoid a vowel collision; vieille is the separate feminine form, used for amie regardless of what sound follows. The same three adjectives carry a second irregularity into the plural: beau and nouveau take -x instead of -s (de beaux jardins, de nouveaux amis), while vieux, already ending in -x in the singular, just stays vieux (de vieux amis).",
    },
    quiz: [
      {
        before: "Ces questions sont ",
        after: ".",
        infinitive: "intéressant",
        correctTone: "b",
        correctForm: "intéressantes",
        explanation:
          "Questions is feminine plural, so intéressant adds both -e (feminine) and -s (plural) -- the two markers stack.",
      },
      {
        before: "C'est un ",
        after: " arbre, planté il y a cent ans.",
        infinitive: "vieux",
        correctTone: "a",
        correctForm: "vieil",
        explanation:
          "Arbre is masculine but starts with a vowel sound, so vieux switches to its special pre-vowel form, vieil.",
      },
      {
        before: "Ma sœur a une ",
        after: " voiture.",
        infinitive: "beau",
        correctTone: "b",
        correctForm: "belle",
        explanation: "Voiture is feminine, and beau's feminine pair is the irregular belle, not \"beaue.\"",
      },
      {
        before: "Ce sont des hommes ",
        after: ".",
        infinitive: "généreux",
        correctTone: "a",
        correctForm: "généreux",
        explanation:
          "Hommes is masculine plural, but généreux already ends in -x, so the plural form stays généreux -- no extra -s needed.",
      },
      {
        before: "Elles sont très ",
        after: ".",
        infinitive: "généreux",
        correctTone: "b",
        correctForm: "généreuses",
        explanation:
          "Elles is feminine plural, so généreux both swaps to -euse (généreuse) and adds -s for the plural: généreuses.",
      },
      {
        before: "Ils habitent dans un ",
        after: " appartement.",
        infinitive: "nouveau",
        correctTone: "a",
        correctForm: "nouvel",
        explanation:
          "Appartement is masculine and starts with a vowel sound, so nouveau switches to nouvel -- still masculine, just spelled to avoid the vowel collision.",
      },
      {
        before: "C'est une ",
        after: " ville, fondée au Moyen Âge.",
        infinitive: "vieux",
        correctTone: "b",
        correctForm: "vieille",
        explanation: "Ville is feminine, and vieux's feminine pair is vieille.",
      },
      {
        before: "Ces jardins sont ",
        after: ".",
        infinitive: "beau",
        correctTone: "a",
        correctForm: "beaux",
        explanation:
          "Jardins is masculine plural, and beau's plural swaps the expected -s for an -x instead: beaux, not \"beaus.\"",
      },
    ],
    quizCta: {
      heading: "Think you've got it?",
      body: "Take the quiz and see if you can match adjectives to the noun they're describing.",
      buttonLabel: "Take the quiz",
    },
  },
];

export const frUpcomingGrammarTopics: GrammarTopicPreview[] = [];

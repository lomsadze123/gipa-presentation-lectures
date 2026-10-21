import type { Template, TypeId } from "./types";

const L01 = "/lectures/01";

const defaultSlideLimits = {
  titleWords: 8,
  bullets: 4,
  bulletWords: 10,
  slideWords: 30,
};

/** Listed in the type picker; filled in as later lectures cover each type. */
const soon = (
  id: TypeId,
  name: string,
  purpose: string,
  keyQuestion: string,
): Template => ({
  id,
  name,
  purpose,
  keyQuestion,
  status: "soon",
  timeLimit: 0,
  sections: [],
  slideLimits: defaultSlideLimits,
});

const pitch: Template = {
  id: "pitch",
  name: "Pitch",
  purpose: "To communicate an opportunity and persuade someone to support it.",
  keyQuestion: "Why should someone invest in, support, or choose this idea?",
  status: "ready",
  timeLimit: 90,
  slideLimits: defaultSlideLimits,
  sections: [
    {
      id: "hook",
      name: "Hook",
      question: "How will you grab attention in the first few seconds?",
      why: "The audience decides in the first seconds whether to listen. A relatable question, a surprising fact or a tiny story makes them lean in.",
      example: "Let me ask you a question: how many of you have ever lost your keys?",
      suggestedSeconds: 10,
      minWords: 5,
      maxWords: 30,
      checks: ["hook"],
      learnMore: `${L01}#example-pitch`,
    },
    {
      id: "problem",
      name: "Problem",
      question: "What is the problem, and who experiences it?",
      why: "If the audience does not feel the problem, they will not care about the solution. Name who has it and why it hurts.",
      example:
        "Keys are small, and we often leave them in our bags, pockets, or somewhere around the house. The worst part is that we can never seem to find them when we actually need them.",
      suggestedSeconds: 20,
      minWords: 10,
      maxWords: 60,
      checks: ["who"],
      learnMore: `${L01}#first-90-second-presentation`,
    },
    {
      id: "solution",
      name: "Solution",
      question: "What is your idea for solving the problem?",
      why: "This is the opportunity you are pitching. Keep it simple enough that someone could repeat it to a friend.",
      example:
        "SmartKey is a small tracking device that attaches to your keychain. It connects to your phone, shows the last location of your keys, and can play a sound so you find them in seconds.",
      suggestedSeconds: 20,
      minWords: 10,
      maxWords: 60,
      checks: [],
      learnMore: `${L01}#example-pitch`,
    },
    {
      id: "example",
      name: "Example",
      question: "Show how your idea would work in a realistic situation.",
      why: "One concrete scene makes an abstract idea believable. The audience should be able to picture it.",
      example:
        "Imagine you're running late for university one morning. Instead of turning your room upside down, you open the app, tap “Find My Key,” and there they are, under the sofa.",
      suggestedSeconds: 15,
      minWords: 10,
      maxWords: 50,
      checks: ["concrete"],
      learnMore: `${L01}#first-90-second-presentation`,
    },
    {
      id: "main-idea",
      name: "Main idea",
      question: "What is the one message you want your audience to remember?",
      why: "People forget most of what they hear. Give them one sentence to take home.",
      example:
        "If losing something costs you time, technology should help you find it.",
      suggestedSeconds: 10,
      minWords: 4,
      maxWords: 20,
      checks: ["oneSentence"],
      learnMore: `${L01}#first-90-second-presentation`,
    },
    {
      id: "cta",
      name: "Call to action",
      question:
        "What should your audience think, do, or support after hearing your presentation?",
      why: "A pitch exists to get a specific action. End by telling the audience exactly what you want from them.",
      example:
        "So the next time you lose something, ask yourself: how much time have I wasted searching for something that technology could help me find?",
      suggestedSeconds: 15,
      minWords: 5,
      maxWords: 40,
      checks: ["action"],
      learnMore: `${L01}#first-90-second-presentation`,
    },
  ],
};

export const templates: Template[] = [
  soon(
    "informative",
    "Informative presentation",
    "To communicate information or knowledge.",
    "What should the audience know after this presentation?",
  ),
  soon(
    "persuasive",
    "Persuasive presentation",
    "To convince the audience to accept an idea, change an opinion, or take action.",
    "What do I want the audience to believe or do?",
  ),
  soon(
    "instructional",
    "Instructional presentation",
    "To teach the audience how to do something.",
    "What should the audience be able to do after this presentation?",
  ),
  soon(
    "business",
    "Business presentation",
    "To communicate business information, performance, plans, or decisions.",
    "What does the business audience need to understand or decide?",
  ),
  pitch,
  soon(
    "inspirational",
    "Inspirational presentation",
    "To motivate people, create an emotional connection, or inspire action.",
    "What story and idea will move the audience to act?",
  ),
];

export const getTemplate = (id: TypeId | null) =>
  templates.find((t) => t.id === id && t.status === "ready");

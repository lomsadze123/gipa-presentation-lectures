import LectureWrapper from "../../components/LectureWrapper";
import {
  BulbIcon,
  LayersIcon,
  PersonIcon,
  ScreenIcon,
} from "../../components/Icons";
import Roadmap from "../../components/content/Roadmap";
import PartHeading from "../../components/content/PartHeading";
import PrincipleCards from "../../components/content/PrincipleCards";
import LecturerCard from "../../components/content/LecturerCard";
import ActivityBlock from "../../components/content/ActivityBlock";
import ElementSteps from "../../components/content/ElementSteps";
import Versus from "../../components/content/Versus";
import OrderPuzzle from "../../components/content/OrderPuzzle";
import Callout from "../../components/content/Callout";
import KeyIdea from "../../components/content/KeyIdea";
import LearningCycle from "../../components/content/LearningCycle";
import Quiz from "../../components/content/Quiz";
import ChallengeBlock from "../../components/content/ChallengeBlock";
import StatGrid from "../../components/content/StatGrid";
import SlideOutline from "../../components/content/SlideOutline";
import SortChallenge from "../../components/content/SortChallenge";
import Checklist from "../../components/content/Checklist";

const structureSteps = [
  "Introduction",
  "Context",
  "Main ideas",
  "Practical implications",
  "Conclusion",
];

const Lecture02 = () => (
  <LectureWrapper
    id="02"
    intro={
      <Roadmap
        steps={[
          {
            title: "Plan with the 5P model",
            detail: "Purpose, people, point, picture, performance",
            icon: BulbIcon,
          },
          {
            title: "Structure and delivery",
            detail: "A clear journey and a message that lands",
            icon: LayersIcon,
          },
          {
            title: "Practice and feedback",
            detail: "The learning cycle and a quick quiz",
            icon: PersonIcon,
          },
          {
            title: "Business case: HYPE",
            detail: "A 5-minute Canva pitch to Inditex management",
            icon: ScreenIcon,
          },
        ]}
      />
    }
  >
    <p className="mt-10 text-xl leading-relaxed">
      A great presentation is not about showing how much you know. It is about
      helping people understand, remember, and connect with your ideas.
    </p>
    <p>
      In this lecture, we will explore how to build a clear message, engage an
      audience, use visuals effectively, and deliver a presentation with
      confidence.
    </p>
    <p>
      This is a practical session. You will analyze examples, practice
      speaking, receive feedback, and improve your presentation.
    </p>

    <h3>Learning objectives</h3>
    <p>By the end of this lecture, you will be able to:</p>
    <ul>
      <li>Apply the 5P Model to plan a presentation.</li>
      <li>
        Structure a presentation with a clear beginning, middle, and end.
      </li>
      <li>Use storytelling and persuasion to engage an audience.</li>
      <li>Design clear, effective slides.</li>
      <li>Improve your delivery through voice, pauses, and body language.</li>
      <li>Give feedback and use it to improve your performance.</li>
    </ul>

    {/* 01 */}
    <section id="five-p-model">
      <PartHeading number="01">The 5P model</PartHeading>
      <p>Five principles can help you plan almost any presentation.</p>

      <PrincipleCards
        principles={[
          {
            id: "purpose",
            name: "Purpose",
            question: "Why am I presenting?",
            body: (
              <>
                <p>
                  Every presentation needs a goal. Do you want to inform,
                  persuade, teach, motivate, or inspire?
                </p>
                <p>Before creating your slides, ask yourself:</p>
                <p>
                  <strong>
                    What do I want my audience to think, feel, understand, or
                    do after listening to me?
                  </strong>
                </p>
              </>
            ),
            takeaway:
              "If you do not know your purpose, your audience may not understand your message.",
          },
          {
            id: "people",
            name: "People",
            question: "Who is my audience?",
            body: (
              <>
                <p>
                  A presentation is not just about what you want to say. It is
                  also about what your audience needs to hear.
                </p>
                <p>Ask yourself:</p>
                <ul>
                  <li>Who are they?</li>
                  <li>What do they already know?</li>
                  <li>What interests them?</li>
                  <li>Why should they care?</li>
                </ul>
                <p>
                  The same topic, such as artificial intelligence, should be
                  presented differently to business leaders, engineers,
                  university students, and children.
                </p>
              </>
            ),
            takeaway: "Adapt your message to your audience.",
          },
          {
            id: "point",
            name: "Point",
            question: "What is my ONE main idea?",
            body: (
              <>
                <p>Do not try to say everything you know.</p>
                <p>
                  A strong presentation has one central message supported by a
                  few relevant arguments, examples, or facts.
                </p>
                <p>Ask yourself:</p>
                <p>
                  <strong>
                    If my audience remembers only ONE thing, what should it be?
                  </strong>
                </p>
              </>
            ),
            takeaway:
              "Your main point should be clear enough to explain in one sentence.",
          },
          {
            id: "picture",
            name: "Picture",
            question: "What will I show?",
            body: (
              <>
                <p>
                  Visuals should help people understand your message, not
                  distract them from it.
                </p>
                <p>
                  A slide might contain one powerful photograph, one important
                  number, one diagram, one question, or one short example.
                </p>
                <p>
                  Avoid filling slides with paragraphs that you simply read
                  aloud.
                </p>
              </>
            ),
            takeaway: "Your slides support your speech; they do not replace it.",
          },
          {
            id: "performance",
            name: "Performance",
            question: "How will I deliver my message?",
            body: (
              <>
                <p>
                  Your delivery influences how people experience your
                  presentation.
                </p>
                <p>
                  Pay attention to your voice, speaking pace, pauses, eye
                  contact, gestures, posture, and energy.
                </p>
              </>
            ),
            takeaway:
              "Performance does not mean pretending to be someone else. It means communicating clearly, naturally, and with intention.",
          },
        ]}
      />

      <h3>Quick activity: your 5P plan (10 minutes)</h3>
      <p>
        Choose a topic you care about. Here is an example of a complete 5P
        plan.
      </p>
      <p className="mb-0 font-display text-sm font-bold text-accent-500">
        Example: social media
      </p>
      <LecturerCard
        facts={[
          {
            label: "Topic",
            value: "Is social media helping us or distracting us?",
          },
          {
            label: "Purpose",
            value:
              "To encourage students to think critically about their social media habits.",
          },
          {
            label: "People",
            value:
              "Young adults and university students who use social media every day.",
          },
          {
            label: "Point",
            value:
              "Social media can connect us with others, but excessive use can distract us from real-life priorities.",
          },
          {
            label: "Picture",
            value:
              "A split image showing a student connecting with friends online and another student distracted by a phone while studying.",
          },
          {
            label: "Performance",
            value:
              "Start with a show of hands: “Who checked social media within the first 15 minutes after waking up today?”",
          },
        ]}
      />
      <p>Now it is your turn. Each group plans a presentation on its topic.</p>
      <ActivityBlock
        groups={[
          {
            name: "AI for learning",
            task: "Should students use AI for learning?",
          },
          {
            name: "Healthy habits",
            task: "Why should students develop healthier daily habits?",
          },
          {
            name: "Managing money",
            task: "Why should university students learn to manage money?",
          },
          {
            name: "Managing stress",
            task: "How can university students manage stress?",
          },
        ]}
        questions={[
          "Purpose: why are you presenting?",
          "People: who is your audience?",
          "Point: what is your one main idea?",
          "Picture: what will you show?",
          "Performance: how will you deliver it, and how will you open?",
        ]}
      />
    </section>

    {/* 02 */}
    <section id="structure">
      <PartHeading number="02">Structure your presentation</PartHeading>
      <p>
        A good presentation takes the audience on a journey. It should not feel
        like a random collection of facts.
      </p>
      <p>Use this simple five-part structure:</p>
      <ElementSteps
        elements={[
          {
            name: "Introduction: get attention",
            question:
              "Start with a question, a short story, a surprising fact, a relatable situation, or a demonstration. Give your audience a reason to listen.",
          },
          {
            name: "Context: explain why it matters",
            question:
              "Introduce the problem or situation. Help the audience understand why the topic is relevant to them.",
          },
          {
            name: "Main ideas: develop your message",
            question:
              "Present your main point and support it with two or three arguments, examples, or pieces of evidence. Remove information that does not support your central message.",
          },
          {
            name: "Practical implications: show what people can do",
            question:
              "Explain how your idea can be applied in real life. What should your audience do differently? What can they learn or change?",
          },
          {
            name: "Conclusion: make it memorable",
            question:
              "Return to your main message. End with a clear recommendation, a challenge, a question, or a memorable final statement.",
          },
        ]}
      />

      <h3>Open with a reason to listen</h3>
      <Versus
        left={{
          name: "Instead of saying",
          quote: "Today I am going to talk about time management.",
          goal: "Announces the topic. Nobody has a reason to care yet.",
        }}
        right={{
          name: "Try",
          quote:
            "Have you ever spent an entire evening studying and still felt that you achieved nothing?",
          goal: "Puts the audience inside a familiar situation.",
        }}
      />

      <h3>Activity: fix the structure (10 minutes)</h3>
      <p>
        Each group has the five elements of a presentation, but they are in the
        wrong order. Put them back in the order of the five-part structure.
      </p>
      <OrderPuzzle
        steps={structureSteps}
        groups={[
          {
            name: "Social media and mental health",
            items: [
              {
                text: "Three ways to use social media more mindfully.",
                step: "Practical implications",
              },
              {
                text: "An explanation of how social media can affect mental health.",
                step: "Main ideas",
              },
              {
                text: "A recommendation to set daily limits on social media use.",
                step: "Conclusion",
              },
              {
                text: "An opening question: “How much time did you spend on social media yesterday?”",
                step: "Introduction",
              },
              {
                text: "Why the relationship between social media and mental health matters.",
                step: "Context",
              },
            ],
          },
          {
            name: "Artificial intelligence in education",
            items: [
              {
                text: "A recommendation to use AI as a support tool, not a replacement for independent thinking.",
                step: "Conclusion",
              },
              {
                text: "An explanation of how students use AI for learning.",
                step: "Main ideas",
              },
              {
                text: "Three benefits and challenges of using AI in education.",
                step: "Practical implications",
              },
              {
                text: "An opening question: “Should students be allowed to use AI to complete their assignments?”",
                step: "Introduction",
              },
              {
                text: "Why AI is changing the way students learn.",
                step: "Context",
              },
            ],
          },
          {
            name: "Healthy habits for university students",
            items: [
              {
                text: "An explanation of how sleep, nutrition, and exercise affect students.",
                step: "Main ideas",
              },
              {
                text: "A recommendation to choose one healthy habit to improve this week.",
                step: "Conclusion",
              },
              {
                text: "Why healthy habits matter for academic performance and well-being.",
                step: "Context",
              },
              {
                text: "Three practical habits students can introduce into their daily routines.",
                step: "Practical implications",
              },
              {
                text: "An opening question: “Can you concentrate well in class after sleeping only four hours?”",
                step: "Introduction",
              },
            ],
          },
          {
            name: "Online safety and digital privacy",
            items: [
              {
                text: "Three ways to protect personal information online.",
                step: "Practical implications",
              },
              {
                text: "An explanation of how apps and websites collect personal data.",
                step: "Main ideas",
              },
              {
                text: "A recommendation to review privacy settings and app permissions.",
                step: "Conclusion",
              },
              {
                text: "An opening question: “How many apps on your phone can access your location?”",
                step: "Introduction",
              },
              {
                text: "Why digital privacy matters in everyday life.",
                step: "Context",
              },
            ],
          },
        ]}
      />
    </section>

    {/* 03 */}
    <section id="delivery">
      <PartHeading number="03">Delivery: make your message land</PartHeading>
      <p>
        The way you deliver a message can make it more engaging and easier to
        understand.
      </p>
      <ElementSteps
        elements={[
          {
            name: "Voice and pace",
            question:
              "Speak clearly and avoid rushing. Change your pace naturally to emphasize important ideas.",
          },
          {
            name: "Pauses",
            question:
              "A short pause gives your audience time to think and makes key points more noticeable.",
          },
          {
            name: "Eye contact",
            question:
              "Look at different people around the room instead of speaking only to your slides or notes.",
          },
          {
            name: "Body language",
            question:
              "Stand comfortably, use natural gestures, and avoid repetitive movements that distract the audience.",
          },
          {
            name: "Confidence",
            question:
              "You do not need to eliminate nervousness. Prepare your opening, practice aloud, breathe comfortably, and focus on helping the audience understand your message.",
          },
        ]}
      />
    </section>

    {/* 04 */}
    <section id="practice-and-feedback">
      <PartHeading number="04">Practice, feedback, and improvement</PartHeading>
      <p>
        You improve as a presenter by practicing, receiving feedback, and
        making specific changes. Use this learning cycle:
      </p>
      <LearningCycle
        steps={[
          "Prepare",
          "Present",
          "Receive feedback",
          "Improve",
          "Present again",
        ]}
      />

      <h3>Test your understanding</h3>
      <Quiz
        questions={[
          {
            question: "What should you identify before creating your slides?",
            options: [
              "The number of slides.",
              "Your presentation purpose.",
              "The animation style.",
              "The font color.",
            ],
            answer: 1,
          },
          {
            question: "What is the Point principle?",
            options: [
              "Making every slide attractive.",
              "Identifying the one main message the audience should remember.",
              "Memorizing the entire speech.",
              "Including as many facts as possible.",
            ],
            answer: 1,
          },
          {
            question: "What is the best way to explain an unfamiliar concept?",
            options: [
              "Use as much technical language as possible.",
              "Read a long definition from a slide.",
              "Use a clear explanation and a relevant example.",
              "Skip the explanation.",
            ],
            answer: 2,
          },
          {
            question: "What makes feedback useful?",
            options: [
              "Judging the speaker's personality.",
              "Identifying specific strengths and actionable improvements.",
              "Avoiding all criticism.",
              "Comparing the speaker with a professional.",
            ],
            answer: 1,
          },
          {
            question: "What should you do after receiving feedback?",
            options: [
              "Ignore it if you felt confident.",
              "Change everything immediately.",
              "Make a useful improvement and present again.",
              "Defend every original decision.",
            ],
            answer: 2,
          },
        ]}
      />
      <p>
        Now let's move on to a practical task: open Canva and get started!
      </p>
    </section>

    {/* 05 */}
    <section id="business-case">
      <PartHeading number="05">Business case: Inditex</PartHeading>

      <ChallengeBlock title="The launch of HYPE: building the next fashion brand">
        <LecturerCard
          facts={[
            {
              label: "Your role",
              value: "Business Development and Brand Strategy Team",
            },
            {
              label: "Your task",
              value: "Prepare a business presentation for Inditex management.",
            },
            { label: "Your tool", value: "Canva" },
            {
              label: "Your audience",
              value: "The company's senior management",
            },
            { label: "Your presentation time", value: "5 minutes" },
          ]}
        />
      </ChallengeBlock>
      <Callout type="warning" title="Important note">
        <p>
          Inditex is a real company, and its history and financial figures
          below are based on published information. HYPE, its proposed launch,
          and the targets in this assignment are fictional and created for
          educational purposes.
        </p>
      </Callout>

      <h3>Company background</h3>
      <p>
        Inditex (Industria de Diseño Textil) is one of the world's largest
        fashion retail groups. Its story began in Spain with entrepreneur
        Amancio Ortega.
      </p>
      <LecturerCard
        facts={[
          {
            label: "1963",
            value:
              "Ortega starts a clothing manufacturing business called Confecciones GOA.",
          },
          {
            label: "1975",
            value: "The first Zara store opens in A Coruña, Spain.",
          },
          {
            label: "1985",
            value:
              "Inditex is formally established as a company bringing its business operations together.",
          },
        ]}
      />
      <p>
        Over the following decades, Inditex expanded internationally and
        developed a portfolio of fashion brands catering to different customers
        and lifestyles. Its brands include:
      </p>
      <ul className="m-0 mb-5 flex max-w-none list-none flex-wrap gap-2 p-0">
        {[
          "Zara",
          "Pull&Bear",
          "Massimo Dutti",
          "Bershka",
          "Stradivarius",
          "Oysho",
          "Zara Home",
          "Lefties",
        ].map((brand) => (
          <li
            key={brand}
            className="m-0 rounded-lg border border-line bg-panel px-3 py-1.5 font-display text-sm font-semibold text-navy-900"
          >
            {brand}
          </li>
        ))}
      </ul>
      <p>
        Each brand serves a different market segment, from everyday fashion and
        youth-oriented clothing to premium styles, sportswear, and home
        products.
      </p>

      <h3>How does Inditex operate?</h3>
      <p>
        Inditex's business model combines physical stores and online sales. The
        company uses customer preferences, product development, logistics, and
        retail operations to respond to changing fashion trends. Its
        competitive strengths include:
      </p>
      <ul>
        <li>A portfolio of brands with distinct identities.</li>
        <li>International operations across many markets.</li>
        <li>Integrated physical and online shopping experiences.</li>
        <li>The ability to adapt product offerings to customer preferences.</li>
        <li>Continued investment in stores, technology, and logistics.</li>
      </ul>
      <KeyIdea>
        Inditex does not simply sell clothing. It manages several brands, each
        with its own positioning, products, and target customers.
      </KeyIdea>

      <h3>Financial performance</h3>
      <p>Inditex reported the following results for its 2025 financial year.</p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Financial indicator</th>
              <th className="text-right">2024</th>
              <th className="text-right">2025</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Total sales", "€38.6 billion", "€39.9 billion"],
              ["Net profit", "€6 billion", "€6.2 billion"],
              ["Gross margin", "57.8%", "58.3%"],
              ["Online sales", "€10.3 billion", "€10.7 billion"],
              ["Annual sales growth", "—", "3.2%"],
            ].map(([label, y2024, y2025]) => (
              <tr key={label}>
                <td>{label}</td>
                <td className="whitespace-nowrap text-right tabular-nums">
                  {y2024}
                </td>
                <td className="whitespace-nowrap text-right font-semibold tabular-nums">
                  {y2025}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-sm text-muted">
        Source: Inditex's official 2025 annual report and financial results.
      </p>
      <p>
        These figures show that Inditex operates at a very large scale and
        continues to generate growth. Online sales are also an important part
        of its business.
      </p>

      <h3>The business challenge</h3>
      <p>
        Despite its strong performance, Inditex must continue to respond to
        changing customer expectations, fashion trends, competition, and the
        development of new shopping habits.
      </p>
      <p>
        Young consumers discover new styles through social media, creators,
        online communities, and fashion trends that can change quickly.
      </p>
      <p>
        Management is considering whether a new brand could attract a younger
        audience with a distinct identity and a clear market position.
      </p>
    </section>

    {/* 06 */}
    <section id="hype">
      <PartHeading number="06">The new brand: HYPE</PartHeading>

      <h3>The concept</h3>
      <p>
        Imagine that Inditex is preparing to launch a new brand called{" "}
        <strong>HYPE</strong>: a proposed fashion brand aimed at young adults
        aged 18–25 who want to express their individuality through clothing.
        The concept focuses on:
      </p>
      <ul>
        <li>Streetwear and casual fashion.</li>
        <li>Contemporary designs inspired by youth culture.</li>
        <li>Affordable prices.</li>
        <li>Limited collections that create excitement around new releases.</li>
        <li>
          An online-first shopping experience supported by selected physical
          retail experiences.
        </li>
      </ul>
      <p>
        The brand's proposed identity is youthful, creative, bold, and
        community-oriented.
      </p>
      <KeyIdea>
        HYPE should not simply look like another Zara or Bershka. It needs a
        clear reason to exist within the Inditex portfolio.
      </KeyIdea>

      <h3>Target audience</h3>
      <p>
        HYPE's primary target customers are young adults aged 18–25. They may
        include:
      </p>
      <ul>
        <li>University students.</li>
        <li>Young professionals.</li>
        <li>People interested in streetwear and contemporary fashion.</li>
        <li>Consumers who use clothing to express their personalities.</li>
        <li>
          Young shoppers who want fashionable products at accessible prices.
        </li>
      </ul>
      <p>
        These customers are likely to value style, affordability, convenience,
        and a brand identity that feels relevant to their lives.
      </p>

      <h3>The management decision</h3>
      <p>
        Inditex management wants to understand whether HYPE is ready to move
        from a brand concept to a market launch.
      </p>
      <p>
        Before committing further resources, management needs a clear business
        presentation explaining what the brand wants to achieve during its
        first quarter and how its progress will be evaluated.
      </p>
      <p>
        <strong>You have been selected to prepare this presentation.</strong>
      </p>
    </section>

    {/* 07 */}
    <section id="assignment">
      <PartHeading number="07">Your assignment</PartHeading>

      <h3>Your mission</h3>
      <p>
        You are part of the HYPE launch team at Inditex. The management team
        has requested a presentation outlining the brand's first-quarter
        business plan. Your presentation must explain:
      </p>
      <ol>
        <li>What is HYPE?</li>
        <li>Who are its target customers?</li>
        <li>How is HYPE different from existing Inditex brands?</li>
        <li>What should the brand achieve during its first three months?</li>
        <li>How will the team measure its progress?</li>
        <li>What resources and activities should be prioritised?</li>
        <li>What decisions should management make at the end of the quarter?</li>
      </ol>
      <p>
        Your task is not to repeat all the information in this document. Your
        task is to{" "}
        <strong>
          select the most relevant information, organise it logically, and
          present a convincing business plan.
        </strong>
      </p>

      <h3>First-quarter objectives</h3>
      <p>
        For this classroom scenario, assume that HYPE will initially launch in
        Spain through an online store and two temporary physical retail
        locations. These are the fictional planning targets for the first three
        months:
      </p>
      <StatGrid
        stats={[
          {
            value: "€300,000",
            label: "Sales",
            detail: "How much money the brand generates.",
          },
          {
            value: "5,000",
            label: "First-time customers",
            detail: "Whether the brand is attracting buyers.",
          },
          {
            value: "30",
            label: "Products at launch",
            detail: "Clothing and accessories.",
          },
          {
            value: "4.3 / 5",
            label: "Customer rating",
            detail: "Whether customers are happy with their experience.",
          },
          {
            value: "500,000",
            label: "People reached",
            detail: "Launch campaign on Meta and Google Ads.",
          },
          {
            value: "2.5%",
            label: "Conversion rate",
            detail: "Website visitors who complete a purchase.",
          },
        ]}
      />
      <Callout type="warning" title="These are targets, not forecasts">
        <p>
          These figures are hypothetical targets, not forecasts or actual
          Inditex results. Treat them as management objectives rather than
          guaranteed outcomes.
        </p>
      </Callout>

      <h3>What do these targets mean?</h3>
      <p>You do not need to be a marketing expert to use this information.</p>
      <ul>
        <li>
          <strong>Sales</strong> tell management how much money the brand
          generates.
        </li>
        <li>
          <strong>New customers</strong> show whether the brand is attracting
          buyers.
        </li>
        <li>
          <strong>Customer satisfaction</strong> indicates whether customers are
          happy with their experience.
        </li>
        <li>
          <strong>Brand awareness</strong> measures how many people are exposed
          to the brand.
        </li>
        <li>
          <strong>Conversion rate</strong> measures the percentage of website
          visitors who complete a purchase.
        </li>
      </ul>
      <p>
        You can use these indicators to show how the business will evaluate its
        performance.
      </p>
    </section>

    {/* 08 */}
    <section id="management-presentation">
      <PartHeading number="08">The management presentation</PartHeading>
      <p>
        Imagine that you have five minutes to present your plan to Inditex
        executives. They are busy people. They do not want to hear the entire
        history of the company or read paragraphs from a report.
      </p>
      <p>
        They want to understand the business opportunity, the proposed plan,
        and the results the team intends to achieve.
      </p>
      <ChallengeBlock title="Create a Canva presentation of 5–7 slides">
        <p>
          You may choose your own Canva template, colours, images, layouts, and
          visual style. Your presentation should have a clear beginning,
          middle, and end.
        </p>
      </ChallengeBlock>

      <h3>A suggested structure</h3>
      <SlideOutline
        slides={[
          {
            title: "Introduction",
            points: [
              "Introduce HYPE.",
              "Explain the purpose of your presentation.",
              "Create a professional first impression.",
            ],
          },
          {
            title: "The business opportunity",
            points: [
              "Briefly introduce Inditex.",
              "Explain why a new brand could be an opportunity.",
              "Show where HYPE fits within the existing portfolio.",
            ],
          },
          {
            title: "The target audience",
            points: [
              "Explain who HYPE is designed for.",
              "Show the brand's proposed positioning.",
              "Explain how it differs from other Inditex brands.",
            ],
          },
          {
            title: "First-quarter objectives",
            points: [
              "Select the most important business targets.",
              "Present them using numbers, icons, or a simple chart.",
              "Make the objectives easy to understand.",
            ],
          },
          {
            title: "The action plan",
            points: [
              "Explain the main activities needed to launch HYPE.",
              "Prioritise the activities that matter most during the first three months.",
            ],
          },
          {
            title: "Conclusion and recommendation",
            points: [
              "Summarise the business opportunity.",
              "Explain what management should approve or prioritise.",
              "Finish with one clear message.",
            ],
          },
        ]}
      />
      <Callout type="tip">
        <p>
          This is a suggested structure, not a mandatory template. You may
          combine slides or use fewer slides if you can communicate the
          information effectively.
        </p>
      </Callout>
    </section>

    {/* 09 */}
    <section id="information-selection">
      <PartHeading number="09">The information-selection challenge</PartHeading>
      <p>
        The following information is available to your team. You must decide
        what belongs in your presentation, what can be shortened, and what
        should be left out. You do not have enough time to discuss every item
        in detail.
      </p>
      <SortChallenge
        storageKey="02-info-select"
        facts={[
          "Inditex began its business history in 1963.",
          "The first Zara store opened in 1975.",
          "Inditex was formally established in 1985.",
          "Inditex generated €39.9 billion in sales in 2025.",
          "HYPE's proposed target audience is 18–25-year-olds.",
          "HYPE's proposed first-quarter sales target is €300,000.",
          "The proposed launch includes 30 products.",
          "The management team has several meetings each week.",
          "HYPE's proposed customer satisfaction target is 4.3 out of 5.",
          "The presentation must use a Canva template.",
          "Inditex operates multiple brands with different market positions.",
          "The team must decide which activities should receive the most attention during the first quarter.",
          "The company's history contains many other milestones and details.",
          "The proposed online store conversion target is 2.5%.",
        ]}
      />
      <KeyIdea>
        Decide which facts support your argument and which details would
        distract management from the main message.
      </KeyIdea>
      <p>
        You may include additional research if it helps you make a stronger
        business case, but you are not required to conduct extensive research
        to complete the task.
      </p>
    </section>

    {/* 10 */}
    <section id="final-question">
      <PartHeading number="10">The final question</PartHeading>
      <p>
        At the end of your presentation, imagine that the CEO asks you:
      </p>
      <blockquote>
        <strong>
          “Why should Inditex invest in HYPE when we already have brands such
          as Zara and Bershka?”
        </strong>
      </blockquote>
      <p>
        Prepare a convincing answer based on your proposed positioning, target
        audience, and business objectives.
      </p>
      <p>
        You do not need to prove that HYPE will succeed. You need to show that
        you understand the opportunity, can set meaningful goals, and can
        communicate a logical plan.
      </p>

      <h3>Before you present to management</h3>
      <Checklist
        storageKey="02-final-check"
        items={[
          "Does management understand the business opportunity?",
          "Will they remember the key targets?",
          "Are the next steps and the decision I need clear?",
          "Do I have a convincing answer to the CEO's question?",
          "Does my presentation fit in 5 minutes?",
        ]}
      />

      <KeyIdea>
        Make management understand the opportunity, remember the key targets,
        and feel confident about the next steps.
      </KeyIdea>
    </section>
  </LectureWrapper>
);

export default Lecture02;

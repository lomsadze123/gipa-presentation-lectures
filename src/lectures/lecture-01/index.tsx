import LectureWrapper from "../../components/LectureWrapper";
import {
  BulbIcon,
  LayersIcon,
  PersonIcon,
  ScreenIcon,
} from "../../components/Icons";
import Roadmap from "../../components/content/Roadmap";
import PartHeading from "../../components/content/PartHeading";
import LecturerCard from "../../components/content/LecturerCard";
import Callout from "../../components/content/Callout";
import KeyIdea from "../../components/content/KeyIdea";
import MaslowPyramid from "../../components/content/MaslowPyramid";
import PresentationType from "../../components/content/PresentationType";
import Versus from "../../components/content/Versus";
import ActivityBlock from "../../components/content/ActivityBlock";
import Gallery from "../../components/content/Gallery";
import PitchScript from "../../components/content/PitchScript";
import ChallengeBlock from "../../components/content/ChallengeBlock";
import ElementSteps from "../../components/content/ElementSteps";
import PracticeTimer from "../../components/content/PracticeTimer";
import Checklist from "../../components/content/Checklist";

const img = (n: number) => `/lectures/01/image${n}.png`;

const Lecture01 = () => (
  <LectureWrapper
    id="01"
    intro={
      <Roadmap
        steps={[
          {
            title: "Meet your lecturer",
            detail: "Introduction and class rules",
            icon: PersonIcon,
          },
          {
            title: "Why presentations matter",
            detail: "Ideas, communication and confidence",
            icon: BulbIcon,
          },
          {
            title: "Types of presentations",
            detail: "Six types and their purposes",
            icon: LayersIcon,
          },
          {
            title: "Learn by doing",
            detail: "Bad slides and SmartKey pitch",
            icon: ScreenIcon,
          },
        ]}
      />
    }
  >
    <p className="mt-10 text-xl leading-relaxed">
      Every great idea deserves to be understood. In this lecture, we will
      explore why presentation skills matter, how different types of
      presentations work, and how to turn a simple idea into a compelling
      message.
    </p>

    {/* 01 */}
    <section id="meet-your-lecturer">
      <PartHeading number="01">Meet your lecturer</PartHeading>
      <h3>A little about me</h3>
      <LecturerCard
        facts={[
          { label: "Age", value: "28" },
          { label: "Education", value: "Free University of Tbilisi, PMI" },
          { label: "Experience", value: "Meta Agency, Skytech, Clickout" },
          {
            label: "Industries",
            value: "iGaming, cryptocurrency, and digital media",
          },
          {
            label: "Previous experience",
            value:
              "Clickout Media, one of the major media companies in the cryptocurrency space",
          },
        ]}
      />
    </section>

    {/* 02 */}
    <section id="why-presentation-skills">
      <PartHeading number="02">
        Why should we learn presentation skills?
      </PartHeading>

      <h3>Imagine this situation</h3>
      <p>You have a great idea.</p>
      <p>
        You have developed a new application. You've conducted interesting
        research. Or perhaps you simply want to receive the highest possible
        grade for your university project.
      </p>
      <p>But there is one problem:</p>
      <KeyIdea>
        If you cannot explain your idea to other people, how much value can it
        really create?
      </KeyIdea>
      <p>
        In today's world, people are not evaluated only by what they know. It is
        also incredibly important how effectively they can communicate their
        knowledge and ideas to others.
      </p>
      <p>
        That is why a presentation is much more than preparing a few PowerPoint
        slides.
      </p>
      <blockquote>
        <strong>
          A presentation is the art of communicating an idea so that an audience
          can understand it, remember it, and, when necessary, take action.
        </strong>
      </blockquote>

      <h3>Where do we use presentations?</h3>
      <p>Presentations are part of everyday professional life.</p>
      <ul>
        <li>
          <strong>Managers</strong> introduce new projects.
        </li>
        <li>
          <strong>Marketing teams</strong> present campaigns.
        </li>
        <li>
          <strong>Startup founders</strong> explain business ideas to investors.
        </li>
        <li>
          <strong>Sales representatives</strong> persuade potential customers.
        </li>
        <li>
          <strong>HR managers</strong> introduce new company policies.
        </li>
        <li>
          <strong>Students</strong> present their research.
        </li>
        <li>
          <strong>CEOs</strong> communicate a company's future plans.
        </li>
      </ul>
      <p>
        Presentation skills are not just important at university; they are
        essential for career success.
      </p>

      <Callout type="reflect" title="Think about your experience">
        <p>
          When was the last time you gave a presentation or watched someone else
          give one?
        </p>
        <p>
          Think about a university class, a business meeting, a job interview, a
          conference, or a pitch.
        </p>
      </Callout>
    </section>

    {/* 03 */}
    <section id="fear-of-public-speaking">
      <PartHeading number="03">The fear of public speaking</PartHeading>

      <h3>You're nervous, right?</h3>
      <p>
        Stepping onto a public stage and seeing hundreds of eyes looking at you
        can be terrifying.
      </p>
      <p>
        Maybe you dread standing up in a company meeting to present your
        project.
      </p>
      <p>What if you get nervous and stumble over your words?</p>
      <p>What if you completely forget what you were going to say?</p>
      <p>
        Maybe you'll embarrass yourself. Maybe your career will suffer. Maybe
        the idea you believe in will remain unheard forever.
      </p>
      <p>
        These are the kinds of thoughts that can keep people awake at night. But
        guess what?
      </p>
      <KeyIdea>
        Almost everyone has experienced the fear of public speaking.
      </KeyIdea>
      <p>
        Surveys about people's greatest fears have often ranked public speaking
        among the most commonly reported fears, sometimes even ahead of snakes
        and heights.
      </p>

      <h3>Why are we so anxious?</h3>
      <p>Because there is a lot at stake.</p>
      <p>
        It is not just about how we feel in the moment. It is also about our
        long-term reputation and how other people perceive us.
      </p>
      <p>
        We are social creatures. We want affection, respect, recognition, and
        support from others.
      </p>
      <p>
        Psychologist Abraham Maslow developed a model known as{" "}
        <strong>Maslow's Hierarchy of Needs</strong>, which organizes human
        needs into five levels.
      </p>

      <h3>Maslow's hierarchy of needs</h3>
      <MaslowPyramid
        levels={[
          {
            name: "Physiological needs",
            detail: "Food, water, sleep, and other basic needs.",
          },
          {
            name: "Safety needs",
            detail: "Security, stability, and protection.",
          },
          {
            name: "Love and belonging",
            detail: "Friendship, connection, acceptance, and relationships.",
          },
          {
            name: "Esteem",
            detail:
              "Respect, recognition, confidence, and a sense of achievement.",
          },
          {
            name: "Self-actualization",
            detail:
              "Developing your potential and becoming the person you aspire to be.",
          },
        ]}
      />
      <p>
        The lower levels represent basic needs, while the higher levels relate
        to social connection, self-worth, and personal growth. In real life,
        these needs can overlap rather than following a strict sequence.
      </p>

      <Callout type="tip" title="Fear does not have to be your enemy">
        <p>
          With the right mindset, you can turn nervous energy into a powerful
          motivator.
        </p>
      </Callout>
      <KeyIdea>
        Your mission as a speaker is to take something that matters deeply to
        you and rebuild it inside the minds of your listeners.
      </KeyIdea>
      <p>
        We will call that something an <strong>idea</strong>.
      </p>
      <p>
        A successful presentation helps an audience see, understand, and
        remember an idea that previously existed only in the speaker's mind.
      </p>
    </section>

    {/* 04 */}
    <section id="types-of-presentations">
      <PartHeading number="04">What types of presentations exist?</PartHeading>
      <p>
        Presentations can serve different purposes. Before preparing one, you
        need to understand what you want your audience to learn, believe, or do.
      </p>

      <PresentationType
        number={1}
        name="Informative presentation"
        purpose="To communicate information or knowledge."
        description={
          <p>
            The goal is to help the audience understand a subject, discover
            facts, or learn about a particular topic.
          </p>
        }
        examples={[
          "Trends in Georgia's tourism market.",
          "The role of artificial intelligence in business.",
          "The current state of the cryptocurrency market.",
          "An introduction to a new technology.",
        ]}
        keyQuestion="What should the audience know after this presentation?"
      />

      <PresentationType
        number={2}
        name="Persuasive presentation"
        purpose="To convince the audience to accept an idea, change an opinion, or take action."
        description={
          <p>
            Providing information alone is not enough. You must explain why your
            argument makes sense and why the audience should care.
          </p>
        }
        examples={[
          "Why should our company adopt a four-day workweek?",
          "Why should we invest in this startup?",
          "Why should customers choose our product?",
          "Why should management approve my proposal?",
        ]}
        keyQuestion="What do I want the audience to believe or do?"
      />

      <PresentationType
        number={3}
        name="Instructional presentation"
        purpose="To teach the audience how to do something."
        description={
          <p>
            An instructional presentation breaks a process into clear steps and
            helps people develop a practical skill.
          </p>
        }
        examples={[
          "How to create an effective CV.",
          "How to use Excel for financial analysis.",
          "How to create a social media campaign.",
          "How to use a new software platform.",
        ]}
        keyQuestion="What should the audience be able to do after this presentation?"
      />

      <PresentationType
        number={4}
        name="Business presentation"
        purpose="To communicate business information, performance, plans, or decisions."
        description={
          <p>
            Business presentations can inform, persuade, teach, or support
            decision-making. Their defining feature is their professional
            business context.
          </p>
        }
        examplesLabel="Common examples"
        examples={[
          "Quarterly reports.",
          "Sales presentations.",
          "Marketing presentations.",
          "Project presentations.",
          "Financial presentations.",
          "Strategy presentations.",
        ]}
        keyQuestion="What does the business audience need to understand or decide?"
      />

      <PresentationType
        number={5}
        name="Pitch"
        purpose="To communicate an opportunity and persuade someone to support it."
        keyQuestion="Why should someone invest in, support, or choose this idea?"
        description={
          <>
            <p>
              A pitch is usually short, focused, and designed to generate
              interest or secure a specific commitment.
            </p>
            <p>
              For example, a startup founder might have only 3–5 minutes to
              explain a business idea to an investor.
            </p>
          </>
        }
      >
        <p>A strong pitch typically communicates:</p>
        <ol>
          <li>The problem.</li>
          <li>The proposed solution.</li>
          <li>The target audience or market.</li>
          <li>Why the idea is valuable.</li>
          <li>What support or action is needed.</li>
        </ol>
      </PresentationType>

      <h3>Pitch vs persuasive presentation</h3>
      <p>
        The main difference is that a pitch is meant to get someone to take a
        specific action, while a persuasive presentation is meant to convince
        someone to agree with your idea, opinion, or recommendation.
      </p>
      <Versus
        left={{
          name: "Pitch",
          quote:
            "Our reusable water bottle keeps drinks cold for 24 hours. We have already sold 5,000 bottles, and we are seeking $50,000 to expand our business. Would you invest in our company?",
          goal: "Get an investment.",
        }}
        right={{
          name: "Persuasive presentation",
          quote:
            "People should use reusable water bottles because they can reduce reliance on single-use plastic bottles, save money over time, and encourage environmentally friendly habits.",
          goal: "Convince people to use reusable bottles.",
        }}
      />

      <PresentationType
        number={6}
        name="Inspirational presentation"
        purpose="To motivate people, create an emotional connection, or inspire action."
        description={
          <p>
            These presentations often combine a personal story, a meaningful
            idea, and a message that the audience can relate to.
          </p>
        }
        examples={[
          "TED Talks.",
          "A CEO's speech to employees.",
          "A graduation speech.",
          "A motivational speech.",
        ]}
      >
        <p>Inspiration is not just about emotional language.</p>
      </PresentationType>
      <KeyIdea>
        A meaningful story + a powerful idea + a clear purpose = a stronger
        impact.
      </KeyIdea>

      <h3>Quick comparison</h3>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Main purpose</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Informative</td>
              <td>Explain</td>
              <td>Presenting market trends</td>
            </tr>
            <tr>
              <td>Persuasive</td>
              <td>Convince</td>
              <td>Getting approval for an idea</td>
            </tr>
            <tr>
              <td>Instructional</td>
              <td>Teach</td>
              <td>Demonstrating new software</td>
            </tr>
            <tr>
              <td>Business</td>
              <td>Communicate business information</td>
              <td>Quarterly performance report</td>
            </tr>
            <tr>
              <td>Pitch</td>
              <td>Win support</td>
              <td>Presenting a startup to investors</td>
            </tr>
            <tr>
              <td>Inspirational</td>
              <td>Motivate</td>
              <td>A graduation speech</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Callout type="tip">
        <p>
          These categories can overlap. A business presentation can also be
          persuasive, and a pitch can be both informative and inspirational.
        </p>
      </Callout>
    </section>

    {/* 05 */}
    <section id="group-activity">
      <PartHeading number="05">
        Group activity: identify the presentation type
      </PartHeading>
      <ActivityBlock
        groups={[
          {
            name: "The Investor",
            task: "You need to secure €100,000 from an investor for your startup.",
          },
          {
            name: "The Teacher",
            task: "You need to teach employees how to use a new software platform (for example, Jira).",
          },
          {
            name: "The Persuader",
            task: "You need to convince a manager to accept your idea for improving the company.",
          },
          {
            name: "The Researcher",
            task: "You need to present your research findings at university.",
          },
        ]}
        questions={[
          "What should your audience know, believe, or do afterward?",
          "Which type of presentation would be most appropriate?",
        ]}
      />
    </section>

    {/* 06 */}
    <section id="bad-presentation">
      <PartHeading number="06">The bad presentation</PartHeading>
      <p>
        Sometimes the easiest way to learn what makes a good presentation is to
        see a terrible one.
      </p>
      <Gallery
        caption="Slides from the bad presentation. Click a slide to see it full size."
        images={[
          {
            src: img(3),
            alt: "Slide titled Colors in presentations: low-contrast blue, red and orange text on a bright green background.",
          },
          {
            src: img(4),
            alt: "Slide titled Common mistakes in presentations: seven long sentences of small text on a purple gradient.",
          },
          {
            src: img(5),
            alt: "Slide titled Images: a short bullet list crowded by eight photos in mixed frames and shapes.",
          },
          {
            src: img(6),
            alt: "Slide titled Fonts: every bullet set in a different typeface, including script and decorative fonts.",
          },
          {
            src: img(7),
            alt: "Slide titled Images as background: white text placed over a busy photo of roses, hard to read.",
          },
          {
            src: img(8),
            alt: "Slide titled Images as background: text boxes over a photo of cherry blossoms.",
          },
        ]}
      />
      <Callout type="warning" title="Common Mistakes Presenters Should Avoid">
        <ul className="mb-0">
          <li>Put far too much text on the slides.</li>
          <li>Used a tiny font that is difficult to read.</li>
          <li>Spoke in a monotonous voice.</li>
          <li>Turned their back to the audience.</li>
          <li>Included unnecessary statistics.</li>
          <li>Repeatedly said “Umm… basically… so…”</li>
          <li>Read every word directly from the slides.</li>
          <li>Used cluttered layouts and too many bullet points.</li>
          <li>
            Used excessive italics and harsh black-and-white text combinations.
          </li>
        </ul>
      </Callout>

      <h3>The lesson</h3>
      <p>
        A presentation is not successful simply because it contains a lot of
        information. The goal is to communicate the right information in a way
        that the audience can easily understand.
      </p>
      <KeyIdea>Clarity beats clutter.</KeyIdea>
    </section>

    {/* 07 */}
    <section id="example-pitch">
      <PartHeading number="07">Example pitch: SmartKey</PartHeading>

      <h3>Find it. Don't lose time.</h3>
      <p>
        Imagine a small device that helps you find your keys when you lose them.
      </p>
      <p>
        This is an example of how to turn a simple everyday problem into a
        compelling presentation.
      </p>

      <h3>The pitch structure</h3>
      <PitchScript
        parts={[
          {
            name: "Hook",
            seconds: 10,
            script: (
              <>
                <p>
                  Let me ask you a question: how many of you have ever lost your
                  keys?
                </p>
                <p>
                  Personally, I've lost mine so many times that sometimes I
                  spend more time searching for my keys before leaving home than
                  getting dressed.
                </p>
              </>
            ),
          },
          {
            name: "Problem",
            seconds: 15,
            script: (
              <>
                <p>
                  The problem is simple: keys are small, and we often leave them
                  in our bags, pockets, or somewhere around the house. The worst
                  part is that we can never seem to find them when we actually
                  need them.
                </p>
                <p>And ordinary keys can't tell us, “I'm right here.”</p>
              </>
            ),
          },
          {
            name: "Solution",
            seconds: 20,
            script: (
              <>
                <p>
                  That's why my idea is SmartKey: a small tracking device that
                  attaches directly to your keychain.
                </p>
                <p>
                  It connects to your phone through a dedicated mobile app. If
                  you lose your keys, you can open the app and check their last
                  recorded location.
                </p>
                <p>
                  But that's not all. If your keys are nearby, you can activate
                  a sound or signal from the device and find them in seconds.
                </p>
              </>
            ),
          },
          {
            name: "Example",
            seconds: 15,
            script: (
              <>
                <p>Imagine you're running late for university one morning.</p>
                <p>
                  You're standing at the door, but your keys are nowhere to be
                  found.
                </p>
                <p>
                  Instead of turning your entire room and bag upside down ten
                  times, you open the app, tap “Find My Key,” and there they
                  are, under the sofa.
                </p>
              </>
            ),
          },
          {
            name: "Main idea",
            seconds: 10,
            script: (
              <>
                <p>The main idea behind SmartKey is simple:</p>
                <p>
                  If losing something costs you time, technology should help you
                  find it.
                </p>
              </>
            ),
          },
          {
            name: "Call to action",
            seconds: 10,
            script: (
              <>
                <p>
                  Now imagine that this technology could work for more than just
                  keys.
                </p>
                <p>
                  Bags, wallets, student cards, bicycles: anything you
                  frequently search for could potentially benefit from a similar
                  tracking system.
                </p>
                <p>So the next time you lose something, ask yourself:</p>
                <p>
                  How much time have I wasted searching for something that
                  technology could help me find?
                </p>
              </>
            ),
          },
        ]}
      />
      <KeyIdea>SmartKey. Find it. Don't lose time.</KeyIdea>

      <h3>Why does this pitch work?</h3>
      <ul>
        <li>
          <strong>Hook:</strong> It starts with a relatable question.
        </li>
        <li>
          <strong>Problem:</strong> It describes a familiar frustration.
        </li>
        <li>
          <strong>Solution:</strong> It introduces a simple product.
        </li>
        <li>
          <strong>Example:</strong> It shows the product in a realistic
          situation.
        </li>
        <li>
          <strong>Main idea:</strong> It communicates one memorable message.
        </li>
        <li>
          <strong>Call to action:</strong> It leaves the audience with something
          to think about.
        </li>
      </ul>
    </section>

    {/* 08 */}
    <section id="first-90-second-presentation">
      <PartHeading number="08">Your first 90-second presentation</PartHeading>

      <ChallengeBlock title="One idea that could make university life better">
        <p>
          Your task is to identify one problem that university students
          experience and propose a solution.
        </p>
        <p>
          It could be anything: finding classrooms, managing assignments,
          organizing group projects, saving money, meeting new people, or
          improving student life in another way.
        </p>
      </ChallengeBlock>

      <h3>Your presentation must include five elements</h3>
      <ElementSteps
        elements={[
          {
            name: "The problem",
            question: "What is the problem, and who experiences it?",
          },
          {
            name: "The solution",
            question: "What is your idea for solving the problem?",
          },
          {
            name: "The main idea",
            question:
              "What is the one message you want your audience to remember?",
          },
          {
            name: "One example",
            question: "Show how your idea would work in a realistic situation.",
          },
          {
            name: "Call to action",
            question:
              "What should your audience think, do, or support after hearing your presentation?",
          },
        ]}
      />

      <h3>The rules</h3>
      <ul>
        <li>Maximum presentation time: 90 seconds.</li>
        <li>Focus on one main idea.</li>
        <li>Make the problem easy to understand.</li>
        <li>Use one specific example.</li>
        <li>Finish with a clear call to action.</li>
      </ul>

      <h3>Rehearse with the timer</h3>
      <PracticeTimer
        stages={[
          { name: "Problem", seconds: 20 },
          { name: "Solution", seconds: 25 },
          { name: "Main idea", seconds: 10 },
          { name: "Example", seconds: 20 },
          { name: "Call to action", seconds: 15 },
        ]}
      />

      <h3>Self-check before presenting</h3>
      <Checklist
        storageKey="01-self-check"
        items={[
          "Can I explain my idea in one sentence?",
          "Is the problem clear?",
          "Is my solution easy to understand?",
          "Have I included a concrete example?",
          "Does my ending give the audience a reason to care?",
        ]}
      />

      <KeyIdea>
        You do not need a perfect idea. You need to communicate your idea
        clearly.
      </KeyIdea>
      <p>
        Your job as a presenter is not to show people how much you know. It is
        to help them understand what matters.
      </p>
    </section>
  </LectureWrapper>
);

export default Lecture01;

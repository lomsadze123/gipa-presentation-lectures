import HomeworkWrapper from "../../components/HomeworkWrapper";
import PartHeading from "../../components/content/PartHeading";
import StatGrid from "../../components/content/StatGrid";
import Callout from "../../components/content/Callout";
import CaseSwitch from "../../components/content/CaseSwitch";
import SlideOutline from "../../components/content/SlideOutline";
import Checklist from "../../components/content/Checklist";

/** Two-column table: label on the left, amount on the right. */
const AmountTable = ({
  head,
  rows,
  total,
}: {
  head: [string, string];
  rows: [string, string][];
  total?: [string, string];
}) => (
  <div className="mb-5 overflow-x-auto">
    <table>
      <thead>
        <tr>
          <th>{head[0]}</th>
          <th className="text-right">{head[1]}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([label, amount]) => (
          <tr key={label}>
            <td>{label}</td>
            <td className="whitespace-nowrap text-right tabular-nums">
              {amount}
            </td>
          </tr>
        ))}
        {total && (
          <tr>
            <td className="font-semibold">{total[0]}</td>
            <td className="whitespace-nowrap text-right font-semibold tabular-nums">
              {total[1]}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

const appleCase = (
  <>
    <h3>The scenario</h3>
    <p>
      You are Apple's management team. Apple is considering launching a new
      foldable smartphone called the <strong>iPhone Flip</strong>. Your task is
      to prepare a presentation that convinces the CEO to approve your launch
      plan.
    </p>

    <h3>Case data</h3>
    <p>Apple is considering three selling prices for the phone.</p>
    <AmountTable
      head={["Option", "Selling price"]}
      rows={[
        ["Premium", "$1,800"],
        ["Standard", "$1,500"],
        ["Affordable", "$1,200"],
      ]}
    />
    <ul>
      <li>Manufacturing and delivery costs: $900 per phone.</li>
      <li>Planned production: 400,000 phones.</li>
      <li>
        Product development and launch: $150 million fixed investment
        (includes the $20 million marketing budget).
      </li>
      <li>Profit target: $100 million in operating profit after all costs.</li>
    </ul>

    <h3>What your 10 slides cover</h3>
    <SlideOutline
      slides={[
        {
          title: "Product announcement",
          points: [
            "A professional product launch slide.",
            "Product name and an image or mockup of the iPhone Flip.",
            "A creative slogan.",
            "The names of your team members.",
          ],
        },
        {
          title: "Introduce your product",
          points: [
            "At least four features.",
            "Three reasons it is different from a regular iPhone.",
            "The one feature you believe will be its strongest selling point.",
          ],
        },
        {
          title: "Why Apple should launch it",
          points: [
            "Three business reasons to introduce the product.",
            "How it could increase revenue, expand the portfolio, or strengthen Apple's competitive position.",
            "One possible disadvantage of launching it.",
          ],
        },
        {
          title: "Pricing strategy",
          points: [
            "Contribution per phone for each price.",
            "Contribution margin percentage for each price.",
            "Choose one pricing strategy and justify it.",
          ],
        },
        {
          title: "Production and costs",
          points: [
            "Total variable production cost for 400,000 phones.",
            "Total sales revenue at your selected price.",
            "Total contribution before fixed costs.",
            "Present it in a table or chart.",
          ],
        },
        {
          title: "Break-even analysis",
          points: [
            "How many phones cover the $150 million fixed investment at your price.",
            "Show the formula and your calculation.",
            "Add a break-even chart.",
          ],
        },
        {
          title: "Profit challenge",
          points: [
            "Phones needed to earn $100 million in operating profit.",
            "The profit if Apple sells only 300,000 phones.",
            "Is your pricing strategy financially attractive?",
          ],
        },
        {
          title: "Marketing campaign",
          points: [
            "Split the $20 million budget across at least four activities (online ads, launch events, influencers, promotional videos…).",
            "Show the allocation in a pie chart.",
            "Explain which activity gets the most and why.",
          ],
        },
        {
          title: "Final CEO recommendation",
          points: [
            "Chosen selling price, expected sales, estimated operating profit.",
            "Three reasons the project should be approved.",
            "The biggest financial risk.",
          ],
        },
        {
          title: "Closing statement",
          points: ["End with a persuasive closing statement to the CEO."],
        },
      ]}
    />
  </>
);

const teslaCase = (
  <>
    <h3>The scenario</h3>
    <p>
      Imagine Tesla is developing its first flying electric car, called{" "}
      <strong>Tesla Sky</strong>. You are Tesla's executive team, preparing a
      presentation for investors who must decide whether to finance the
      project.
    </p>

    <h3>Case data</h3>
    <p>Tesla is considering three selling prices.</p>
    <AmountTable
      head={["Option", "Selling price"]}
      rows={[
        ["Luxury", "$350,000"],
        ["Premium", "$300,000"],
        ["Standard", "$250,000"],
      ]}
    />
    <p>
      The variable cost of producing and delivering one vehicle is $160,000.
      Tesla estimates this fixed investment:
    </p>
    <AmountTable
      head={["Investment category", "Amount"]}
      rows={[
        ["Research and development", "$500 million"],
        ["Factory construction", "$300 million"],
        ["Safety testing and certification", "$150 million"],
        ["Marketing and launch", "$50 million"],
      ]}
      total={["Total", "$1 billion"]}
    />
    <ul>
      <li>
        Investors' profit target: $500 million in operating profit after
        covering the $1 billion investment.
      </li>
      <li>Factory capacity: 8,000 flying cars per year.</li>
    </ul>

    <h3>What your 10 slides cover</h3>
    <SlideOutline
      slides={[
        {
          title: "Introduce Tesla Sky",
          points: [
            "A professional presentation cover.",
            "Product name and an original slogan.",
            "A product mockup or illustration.",
            "Your team members' names.",
          ],
        },
        {
          title: "Explain the innovation",
          points: [
            "How the vehicle would operate.",
            "At least four proposed features.",
            "Three differences from a regular electric car.",
            "One major engineering challenge.",
          ],
        },
        {
          title: "Business opportunity",
          points: [
            "Why Tesla might enter the flying vehicle industry.",
            "Three potential business benefits and two potential disadvantages.",
            "One alternative use for the technology if the flying car does not succeed.",
          ],
        },
        {
          title: "Product pricing",
          points: [
            "Contribution per car for each price.",
            "Contribution margin percentage for each price.",
            "Recommend one price and explain why.",
          ],
        },
        {
          title: "Investment requirements",
          points: [
            "Percentage of the $1 billion in each category.",
            "Show it in a pie chart.",
            "Name the largest category and say whether you would change the allocation.",
          ],
        },
        {
          title: "Break-even challenge",
          points: [
            "Cars needed to recover the $1 billion at your selected price.",
            "Show the formula.",
            "Add a break-even chart.",
          ],
        },
        {
          title: "Profit target",
          points: [
            "Vehicles needed to reach $500 million operating profit.",
            "Operating profit if Tesla sells only 10,000 vehicles.",
          ],
        },
        {
          title: "Production capacity problem",
          points: [
            "Maximum annual revenue and contribution at 8,000 cars.",
            "Can Tesla reach the $500 million target in year one?",
            "If not: how much extra capacity is needed (assume every extra car sells)?",
          ],
        },
        {
          title: "Final investor decision",
          points: [
            "Proposed price, required sales volume, expected operating profit under your forecast.",
            "Major risks.",
            "Recommend: approve, delay, or reject.",
          ],
        },
        {
          title: "Closing statement",
          points: ["Finish with a convincing statement to investors."],
        },
      ]}
    />
  </>
);

const Homework01 = () => (
  <HomeworkWrapper
    id="01"
    intro={
      <StatGrid
        stats={[
          { value: "10", label: "slides maximum" },
          { value: "8–10", label: "minutes to present" },
          { value: "3+", label: "charts or visuals" },
        ]}
      />
    }
  >
    <p className="mt-6 text-xl leading-relaxed">
      Your team steps into the role of company leadership and pitches a bold
      new product to the people who decide whether it happens.
    </p>
    <p>
      Both cases ask the same thing: build a business story, back every
      decision with numbers, and end with a clear recommendation.
    </p>
    <Callout type="tip" title="Your team chooses one case">
      <p>
        Pick Apple or Tesla. The products are fictional and the numbers are
        assumptions for this exercise; say so clearly in your presentation.
      </p>
    </Callout>

    <section id="cases">
      <PartHeading number="01">Choose your case</PartHeading>
      <CaseSwitch
        storageKey="homework-01"
        cases={[
          {
            id: "apple",
            label: "Case A: Apple",
            title: "Launch the iPhone Flip",
            content: appleCase,
          },
          {
            id: "tesla",
            label: "Case B: Tesla",
            title: "The flying car investment decision",
            content: teslaCase,
          },
        ]}
      />
      <Callout type="warning" title="The slide list is a guide, not a script">
        <p>
          Do not copy these points onto slides and answer them one by one. Use
          them to know what to analyze, then tell one connected story that
          leads to your recommendation.
        </p>
      </Callout>
    </section>

    <section id="rules">
      <PartHeading number="02">Presentation rules</PartHeading>
      <p>These apply to both cases. Tick them off before you present.</p>
      <Checklist
        storageKey="homework-01-rules"
        items={[
          "Maximum 10 slides.",
          "At least 3 charts or data visualizations.",
          "Every financial calculation shows the formula and the result.",
          "Each slide has a clear headline with its main message.",
          "No reading long paragraphs from the slides.",
          "Every team member speaks.",
          "The final recommendation is supported by numbers.",
          "Financial assumptions and the fictional product are clearly labelled.",
          "The slides tell one engaging business story, each building on the previous one.",
          "It is not a question-and-answer exercise: case questions are not copied onto slides.",
          "Smooth transitions make it feel like one business proposal.",
          "Main slides highlight key formulas, results, and implications without drowning the audience in numbers.",
        ]}
      />
    </section>

    <section id="grading">
      <PartHeading number="03">How it is graded</PartHeading>
      <AmountTable
        head={["Assessment", "Points"]}
        rows={[
          ["Presentation structure and storytelling", "25"],
          ["Financial calculations and accuracy", "20"],
          ["Business decisions and justification", "20"],
          ["Slide design and data visualization", "20"],
          ["Public speaking and confidence", "10"],
          ["Time management", "5"],
        ]}
        total={["Total", "100"]}
      />
    </section>
  </HomeworkWrapper>
);

export default Homework01;

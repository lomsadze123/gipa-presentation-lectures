import { Link } from "react-router-dom";
import LectureWrapper from "../../components/LectureWrapper";
import PartHeading from "../../components/content/PartHeading";
import ElementSteps from "../../components/content/ElementSteps";
import Callout from "../../components/content/Callout";

const Lecture03 = () => (
  <LectureWrapper id="03">
    <section id="presentations">
      <PartHeading number="01">Student presentations</PartHeading>
      <p className="text-xl leading-relaxed">
        In this lecture, students present two case scenarios.
      </p>
      <ElementSteps
        elements={[
          { name: "Tesla", question: "Case scenario" },
          { name: "Apple", question: "Case scenario" },
        ]}
      />
      <Callout type="tip" title="Before you present">
        <p>
          Review your plan with the{" "}
          <Link
            to="/lectures/02#five-p-model"
            className="font-semibold text-accent-600 underline underline-offset-2 hover:text-accent-500"
          >
            5P model from lecture 02
          </Link>
          : purpose, people, point, picture, and performance.
        </p>
      </Callout>
    </section>
  </LectureWrapper>
);

export default Lecture03;

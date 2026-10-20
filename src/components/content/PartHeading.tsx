interface PartHeadingProps {
  number: string;
  children: React.ReactNode;
}

/** Section heading with its part number, e.g. "01 Meet your lecturer". */
const PartHeading = ({ number, children }: PartHeadingProps) => (
  <h2>
    <span className="part-number">{number}</span>
    <span>{children}</span>
  </h2>
);

export default PartHeading;

export interface HomeworkInfo {
  /** Zero-padded number. Must match the folder name src/homework/homework-NN. */
  id: string;
  title: string;
  tagline: string;
  tags?: string[];
  /** "locked" homework is listed but cannot be opened yet. */
  status: "open" | "locked";
}

const locked = (id: string): HomeworkInfo => ({
  id,
  title: "Coming soon",
  tagline: "This homework opens later in the semester.",
  status: "locked",
});

export const homework: HomeworkInfo[] = [
  {
    id: "01",
    title: "Pitch a Product Launch",
    tagline:
      "Pick Apple or Tesla and convince the decision-makers with a 10-slide, numbers-backed business case.",
    tags: ["Team presentation", "Business case", "Break-even", "10 slides"],
    status: "open",
  },
  locked("02"),
  locked("03"),
];

export const openHomework = homework.filter((h) => h.status === "open");

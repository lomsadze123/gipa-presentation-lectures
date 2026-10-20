export interface LectureInfo {
  /** Zero-padded number. Must match the folder name src/lectures/lecture-NN. */
  id: string;
  title: string;
  tagline: string;
  tags?: string[];
  /** "locked" lectures are listed but cannot be opened yet. */
  status: "open" | "locked";
}

const locked = (id: string): LectureInfo => ({
  id,
  title: "Coming soon",
  tagline: "This lecture opens later in the semester.",
  status: "locked",
});

export const lectures: LectureInfo[] = [
  {
    id: "01",
    title: "Words That Connect",
    tagline:
      "How to communicate ideas clearly, confidently, and effectively.",
    tags: ["Communication", "Public speaking", "Practical workshop"],
    status: "open",
  },
  locked("02"),
  locked("03"),
  locked("04"),
  locked("05"),
  locked("06"),
  locked("07"),
  locked("08"),
];

export const openLectures = lectures.filter((l) => l.status === "open");

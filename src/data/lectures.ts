export interface LectureInfo {
  /** Zero-padded number. Must match the folder name src/lectures/lecture-NN. */
  id: string;
  title: string;
  tagline: string;
  tags?: string[];
  /** "locked" lectures are listed but cannot be opened yet. */
  status: "open" | "locked";
  /**
   * SHA-256 hex of a password students must enter before an "open" lecture shows. Remove to open it for everyone.
   * Generate: node -e "console.log(require('crypto').createHash('sha256').update('PASSWORD').digest('hex'))"
   */
  passwordHash?: string;
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
  {
    id: "02",
    title: "The Art of an Effective Presentation",
    tagline:
      "Build a clear message, engage your audience, and deliver it with confidence.",
    tags: ["5P model", "Structure", "Delivery", "Business case"],
    status: "open",
    passwordHash:
      "70d34a2e87f46e44f8f1c7e764feab30cf674a4707c6ab4837ebd12995b14e77",
  },
  locked("03"),
  locked("04"),
  locked("05"),
  locked("06"),
  locked("07"),
  locked("08"),
];

export const openLectures = lectures.filter((l) => l.status === "open");

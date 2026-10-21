/** Average speaking pace used for timing estimates. */
export const WORDS_PER_MINUTE = 130;

const tokens = (text: string) =>
  text
    .toLowerCase()
    .split(/\s+/)
    .map((w) => w.replace(/[^\p{L}\p{N}'’-]/gu, ""))
    .filter((w) => /[\p{L}\p{N}]/u.test(w));

export const countWords = (text: string) => tokens(text).length;

export const estimateSeconds = (text: string) =>
  Math.round((countWords(text) / WORDS_PER_MINUTE) * 60);

export const sentenceCount = (text: string) =>
  text
    .split(/[.!?]+/)
    .filter((s) => countWords(s) > 0).length;

const FILLERS = /\b(u+m+|u+h+|e+r+m+|basically|literally|you know|kind of|sort of)\b/gi;

/** Filler words the speaker should drop, lowercased, in order of appearance. */
export const hasFiller = (text: string) =>
  [...text.matchAll(FILLERS)].map((m) => m[0].toLowerCase());

/** Three or more words written entirely in capitals. */
export const isShouting = (text: string) => {
  const letters = text.replace(/[^\p{L}]/gu, "");
  return countWords(text) >= 3 && letters.length > 0 && letters === letters.toUpperCase();
};

const trigrams = (words: string[]) =>
  words.slice(0, -2).map((_, i) => words.slice(i, i + 3).join(" "));

/** Share of the slide's three-word phrases that also appear in the notes (0 to 1). */
export const sharedPhraseRatio = (slideText: string, notes: string) => {
  const slide = trigrams(tokens(slideText));
  if (!slide.length) return 0;
  const said = new Set(trigrams(tokens(notes)));
  return slide.filter((t) => said.has(t)).length / slide.length;
};

export const hasNumber = (text: string) => /\d/.test(text);

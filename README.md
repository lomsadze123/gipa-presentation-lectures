# GIPA Presentation Lectures

Lecture website for the **Project Design** course at GIPA (Faculty of Digital Marketing, 1st semester).
The course has 8 lectures. A lecture is listed from day one but stays locked until it is opened.

Live: https://gipa-presentation-lectures.netlify.app

## Run locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build into dist/
npm run lint
npm test          # checker rules (vitest)
```

## Where things live

| Path | What it is |
|---|---|
| `src/data/course.ts` | Course name, faculty, semester, description, stats on the home page |
| `src/data/lectures.ts` | The 8 lectures: id, title, tagline, tags, `status: "open" \| "locked"` |
| `src/lectures/lecture-NN/index.tsx` | Content of one lecture |
| `src/components/content/` | Building blocks used inside lectures (see below) |
| `src/components/` | Site shell: layout, sidebar, home, lecture page, locked page, 404 |
| `src/builder/` | Presentation builder at `/builder` (see below) |
| `public/lectures/NN/` | Images for lecture NN |
| `source/` | Original `.md` files from the lecturer (not part of the site) |
| `scripts/extract-images.mjs` | Pulls embedded images out of a Google Docs `.md` export |

## Opening the next lecture

When the lecturer sends the next `.md` file (example: lecture 02):

1. Save it as `source/02-<short-name>.md`.
2. Extract its images:
   ```bash
   node scripts/extract-images.mjs source/02-<short-name>.md 02
   ```
   They land in `public/lectures/02/image1.png`, `image2.png`, …
3. Create `src/lectures/lecture-02/index.tsx`, using `lecture-01` as the pattern:
   ```tsx
   import LectureWrapper from "../../components/LectureWrapper";
   import PartHeading from "../../components/content/PartHeading";

   const Lecture02 = () => (
     <LectureWrapper id="02">
       <section id="first-part">
         <PartHeading number="01">First part</PartHeading>
         <p>…</p>
       </section>
     </LectureWrapper>
   );
   export default Lecture02;
   ```
4. In `src/data/lectures.ts`, replace `locked("02")` with the real entry:
   ```ts
   {
     id: "02",
     title: "…",
     tagline: "…",
     tags: ["…"],
     status: "open",
   },
   ```
5. `npm run build && npm run lint`, then deploy.

The sidebar, the home page cards, and the previous lecture's **Next** button unlock on their own.
The folder number, the `id` in `lectures.ts`, and the `id` passed to `LectureWrapper` must all match.

## Content components

| Component | Use it for |
|---|---|
| `Roadmap` | Plan of the lecture, under the title slide (`intro` prop of `LectureWrapper`) |
| `PartHeading` | `<h2>` of each part, with its number |
| `LecturerCard` | Label / value facts |
| `Callout` | `type="reflect" \| "tip" \| "warning"`, optional `title` |
| `KeyIdea` | One sentence to remember, in large type |
| `MaslowPyramid` | Levels passed from the bottom up |
| `PresentationType` | A type with purpose, description, examples, key question |
| `Versus` | Two examples side by side |
| `ActivityBlock` | Group work: groups + shared questions |
| `Gallery` | Image grid that opens full size (arrow keys move between images) |
| `PitchScript` | Spoken script split into timed parts with a timeline |
| `ChallengeBlock` | Task students prepare themselves |
| `ElementSteps` | Ordered building blocks, each with a question |
| `PracticeTimer` | Rehearsal countdown split into stages |
| `Checklist` | Ticks saved in the browser (`storageKey` must be unique) |
| `PrincipleCards` | A model's principles (e.g. 5P): overview strip + one card each with question and takeaway |
| `OrderPuzzle` | Groups put scrambled items back in step order, with check / show answer |
| `LearningCycle` | Repeating steps as a flow with a loop back |
| `Quiz` | Multiple choice, marked on pick, with score |
| `StatGrid` | Key numbers as large tiles |
| `SlideOutline` | Suggested deck drawn as mini slides with bullet points |
| `SortChallenge` | Include / Shorten / Leave out per fact, saved in the browser (`storageKey` must be unique) |

Plain `<p>`, `<h3>`, `<ul>`, `<ol>`, `<blockquote>` and `<table>` are styled automatically inside a lecture.

## Presentation builder

`/builder` lets a student build their own presentation in five steps: setup (type, topic, audience), structure, slides, rehearse, export.
A rule-based checker runs in the browser and says what to fix, where, why, and links to the lecture part that teaches it.
For now there are no links to it (header, sidebar, home page): open `/builder` by typing the URL. Search for `BUILDER-HIDDEN` to bring the links back.
`/builder/present` is the full-screen slideshow (arrow keys, `N` notes, `F` full screen, `Esc` back).

| Path | What it is |
|---|---|
| `src/builder/templates.ts` | Presentation types. Only `pitch` is `status: "ready"`; the rest show as "Later lecture" |
| `src/builder/rules/` | Checker rules (`setup.ts`, `outline.ts`, `slides.ts`) and their tests |
| `src/builder/useBuilder.ts` | Draft store, saved in the browser under `gipa-presentation:builder:v1` |
| `src/builder/components/` | Builder screens |

To open another type, fill in its `sections` (question, why, example, word limits, `checks`, `learnMore` link), set `timeLimit`, and change `status` to `"ready"`.
Rules read their limits from the template, so most types need no new rule code.

## Cleaning up a Google Docs export

Docs exports add noise. When converting, remove escapes like `\.` `\-` `\$` `\+` `\=`, drop the `**` around headings, and check that quotes open and close.

## Deploy

Netlify site `gipa-presentation-lectures`: build command `npm run build`, publish directory `dist`.
`public/_redirects` sends every path to `index.html`, so links like `/lectures/01` work on refresh.

Student progress (completed lectures, checklist ticks, builder drafts) is stored in each student's browser only.

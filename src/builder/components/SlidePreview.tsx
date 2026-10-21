import type { Slide } from "../types";

interface SlidePreviewProps {
  slide: Slide;
  /** Small line under the title slide (presentation type, audience). */
  subtitle?: string;
  className?: string;
}

/** 16:9 slide. Text sizes follow the slide width, so thumbnails and full screen look the same. */
const SlidePreview = ({ slide, subtitle, className = "" }: SlidePreviewProps) => {
  const bullets = slide.bullets.filter((b) => b.trim());
  const isTitle = slide.sectionId === null;

  return (
    <div
      className={`@container relative aspect-video w-full overflow-hidden rounded-lg border border-line bg-white text-navy-900 ${className}`}
    >
      <span className="absolute inset-y-0 left-0 w-[1.2cqw] bg-accent-500" aria-hidden="true" />
      {isTitle || !bullets.length ? (
        <div className="flex h-full flex-col items-center justify-center px-[8cqw] text-center">
          <p
            className="font-extrabold leading-tight tracking-tight"
            style={{ fontSize: isTitle ? "6cqw" : "5cqw" }}
          >
            {slide.title || <span className="text-navy-300">Slide title</span>}
          </p>
          {isTitle && subtitle && (
            <p className="mt-[2cqw] text-muted" style={{ fontSize: "2.4cqw" }}>
              {subtitle}
            </p>
          )}
        </div>
      ) : (
        <div className="flex h-full flex-col px-[7cqw] py-[6cqw]">
          <p className="font-extrabold leading-tight tracking-tight" style={{ fontSize: "4.4cqw" }}>
            {slide.title || <span className="text-navy-300">Slide title</span>}
          </p>
          <ul className="mt-[3.5cqw] space-y-[1.6cqw]" style={{ fontSize: "2.8cqw" }}>
            {bullets.map((b, i) => (
              <li key={i} className="flex gap-[1.5cqw] leading-snug">
                <span className="mt-[1cqw] h-[1cqw] w-[1cqw] shrink-0 rounded-full bg-accent-500" />
                <span className="min-w-0 break-words">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SlidePreview;

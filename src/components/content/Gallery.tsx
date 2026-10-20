import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from "../Icons";

interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryProps {
  images: GalleryImage[];
  caption?: string;
}

/** Thumbnail grid; clicking an image opens it full size. Arrow keys move between images. */
const Gallery = ({ images, caption }: GalleryProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [current, setCurrent] = useState<number | null>(null);

  const open = (i: number) => {
    setCurrent(i);
    dialogRef.current?.showModal();
  };
  const close = useCallback(() => dialogRef.current?.close(), []);
  const step = useCallback(
    (delta: number) =>
      setCurrent((c) =>
        c === null ? c : (c + delta + images.length) % images.length,
      ),
    [images.length],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const onClose = () => setCurrent(null);
    dialog.addEventListener("keydown", onKey);
    dialog.addEventListener("close", onClose);
    return () => {
      dialog.removeEventListener("keydown", onKey);
      dialog.removeEventListener("close", onClose);
    };
  }, [step]);

  const shown = current === null ? null : images[current];

  return (
    <figure className="my-8">
      <ul className="m-0 grid max-w-none list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3">
        {images.map((img, i) => (
          <li key={img.src} className="m-0 p-0">
            <button
              onClick={() => open(i)}
              className="block w-full cursor-zoom-in overflow-hidden rounded-lg border border-line bg-white transition-transform hover:-translate-y-0.5"
              aria-label={`Open slide ${i + 1} full size`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="aspect-video w-full object-cover"
              />
            </button>
          </li>
        ))}
      </ul>
      {caption && (
        <figcaption className="mt-3 font-display text-sm text-muted">
          {caption}
        </figcaption>
      )}

      <dialog
        ref={dialogRef}
        onClick={(e) => e.target === dialogRef.current && close()}
        className="m-auto w-[min(64rem,calc(100vw-2rem))] max-w-none outline-none rounded-xl bg-navy-950 p-0 text-white backdrop:bg-navy-950/80"
        aria-label="Slide viewer"
      >
        {shown && current !== null && (
          <div className="p-3 sm:p-4">
            <img src={shown.src} alt={shown.alt} className="w-full rounded-md" />
            <div className="mt-3 flex items-center justify-between gap-4 font-display text-sm">
              <button
                onClick={() => step(-1)}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 hover:bg-navy-800"
              >
                <ArrowLeftIcon className="h-4 w-4" /> Previous
              </button>
              <span className="text-navy-300">
                {current + 1} / {images.length}
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => step(1)}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 hover:bg-navy-800"
                >
                  Next <ArrowRightIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={close}
                  aria-label="Close viewer"
                  className="cursor-pointer rounded-full p-1.5 hover:bg-navy-800"
                >
                  <CloseIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </figure>
  );
};

export default Gallery;

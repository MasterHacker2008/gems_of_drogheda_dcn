import { urlForImage } from "@/lib/sanity/image";
import type { SanityImage } from "@/lib/sanity/types";

type PersonVideoProps = {
  heading?: string;
  caption?: string;
  videoUrl?: string;
  videoFileUrl?: string;
  poster?: SanityImage;
  title: string;
};

function toEmbedUrl(raw?: string) {
  if (!raw) return null;
  try {
    const url = new URL(raw);
    const host = url.hostname.replace(/^www\./, "");
    if (host === "youtu.be") return `https://www.youtube-nocookie.com/embed/${url.pathname.slice(1)}`;
    if (host === "youtube.com" || host === "m.youtube.com") {
      if (url.pathname.startsWith("/embed/")) return `https://www.youtube-nocookie.com${url.pathname}`;
      const id = url.searchParams.get("v");
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }
    if (host === "vimeo.com") {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return id && /^\d+$/.test(id) ? `https://player.vimeo.com/video/${id}` : null;
    }
    if (host === "player.vimeo.com") return url.toString();
  } catch {
    return null;
  }
  return null;
}

export function PersonVideo({ heading, caption, videoUrl, videoFileUrl, poster, title }: PersonVideoProps) {
  const embedUrl = videoFileUrl ? null : toEmbedUrl(videoUrl);
  if (!videoFileUrl && !embedUrl) return null;

  return (
    <section className="mx-auto w-full max-w-[1240px] px-5 pt-16 md:px-12 md:pt-24">
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          {heading ? (
            <h2 className="m-0 font-heading text-[clamp(2.5rem,6vw,4.75rem)] font-extrabold leading-[0.9] tracking-[-0.045em]">
              {heading}
            </h2>
          ) : null}
          {caption ? <p className="m-0 max-w-[26em] text-pretty text-base leading-relaxed text-muted-foreground">{caption}</p> : null}
        </div>
        <div className="relative aspect-video overflow-hidden rounded-[1.75rem] bg-foreground shadow-[0_22px_44px_-24px_rgba(34,31,26,0.6)] md:rounded-[2rem]">
          {videoFileUrl ? (
            <video
              controls
              preload="metadata"
              playsInline
              poster={poster ? urlForImage(poster).width(1600).height(900).fit("crop").url() : undefined}
              className="h-full w-full object-cover"
            >
              <source src={videoFileUrl} />
            </video>
          ) : (
            <iframe
              src={embedUrl!}
              title={title}
              loading="lazy"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0 h-full w-full border-0"
            />
          )}
        </div>
      </div>
    </section>
  );
}

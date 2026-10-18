import { siteUrl } from "../lib/paths";
export default function Artwork({
  name,
  className = "",
  eager = false,
  sizes = "(max-width: 780px) 100vw, 50vw",
}: {
  name: string;
  className?: string;
  eager?: boolean;
  sizes?: string;
}) {
  return (
    <img
      className={className}
      src={siteUrl(`art/${name}.webp`)}
      srcSet={`${siteUrl(`art/${name}-small.webp`)} 768w, ${siteUrl(`art/${name}.webp`)} 1536w`}
      sizes={sizes}
      alt=""
      width="1536"
      height="1024"
      loading={eager ? "eager" : "lazy"}
      decoding="async"
    />
  );
}

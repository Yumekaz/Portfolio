import { ArrowUpLeft } from "lucide-react";
import { siteUrl } from "../lib/paths";
interface Props {
  eyebrow: string;
  title: string;
  description: string;
}
export default function RouteHeader({ eyebrow, title, description }: Props) {
  return (
    <section className="route-header">
      <a href={siteUrl()} className="text-link back-link">
        <ArrowUpLeft size={16} /> Back to home
      </a>
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="route-description">{description}</p>
    </section>
  );
}

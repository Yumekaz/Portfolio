import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import projects from "../data/projects";
interface LogEntry {
  date: string;
  text: string;
  sha: string;
  url: string;
}
interface Commit {
  sha: string;
  html_url: string;
  commit: { author: { date: string }; message: string };
}
const CACHE_TTL = 60 * 60 * 1000;
async function fetchCommits(
  repo: string,
  signal: AbortSignal,
): Promise<LogEntry[]> {
  const cacheKey = `kernellog_${repo}`;
  try {
    const cached = JSON.parse(localStorage.getItem(cacheKey) ?? "null");
    if (
      cached &&
      Date.now() - cached.ts < CACHE_TTL &&
      Array.isArray(cached.data)
    )
      return cached.data;
  } catch {
    /* Storage is optional. */
  }
  const response = await fetch(
    `https://api.github.com/repos/Yumekaz/${repo}/commits?per_page=3`,
    { signal },
  );
  if (!response.ok) throw new Error("Repository activity unavailable");
  const json: Commit[] = await response.json();
  const data = json.map((commit) => ({
    sha: commit.sha.slice(0, 7),
    date: commit.commit.author.date.slice(0, 10),
    text: commit.commit.message.split("\n")[0],
    url: commit.html_url,
  }));
  try {
    localStorage.setItem(cacheKey, JSON.stringify({ ts: Date.now(), data }));
  } catch {
    /* Storage is optional. */
  }
  return data;
}
export default function KernelLog({
  activeSection,
}: {
  activeSection: string;
}) {
  const project = projects.find((item) => item.id === activeSection)!;
  const repo = project.githubUrl.split("/").pop()!;
  const [entries, setEntries] = useState<LogEntry[]>([]);
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");
  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");
    setEntries([]);
    fetchCommits(repo, controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) {
          setEntries(data);
          setStatus("ok");
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) setStatus("error");
      });
    return () => controller.abort();
  }, [repo]);
  return (
    <div className="repository-log">
      <p role="status">
        {status === "loading"
          ? "Loading recent commits…"
          : status === "error"
            ? "Recent activity is unavailable here. The repository remains available below."
            : entries.length
              ? "Recent repository activity. Cached for up to one hour."
              : "No recent commits returned."}
      </p>
      {status === "ok" && (
        <ul>
          {entries.map((entry) => (
            <li key={entry.sha}>
              <a href={entry.url} target="_blank" rel="noopener noreferrer">
                <time>{entry.date}</time>
                <div>
                  <strong>{entry.text}</strong>
                  <code>{entry.sha}</code>
                </div>
                <ArrowUpRight size={16} />
              </a>
            </li>
          ))}
        </ul>
      )}
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="edition-link"
      >
        Open {project.name} on GitHub <ArrowUpRight size={17} />
      </a>
    </div>
  );
}

/**
 * KernelLog — shows the 3 latest commits for the currently selected project.
 * Uses the GitHub Commits API: api.github.com/repos/Yumekaz/{repo}/commits
 * Caches each repo's result in localStorage for 1 hour.
 * Typewriter animation when new commits appear.
 */

import { useEffect, useState, useRef } from 'react';

interface LogEntry {
  date: string;
  text: string;
  sha: string;
  url: string;
}

const GITHUB_USER = 'Yumekaz';
const CACHE_TTL = 60 * 60 * 1000;

/** Maps project id → GitHub repo name */
const REPO_MAP: Record<string, string> = {
  coordination:  'Coordination-service',
  miniRedis:     'Mini-Redis-Cassandra',
  failforge:     'FAILFORGE',
  cairn:         'Cairn',
  drt:           'DRT',
  qydrel:        'Qydrel',
  miniDocker:    'Mini-Docker',
  tinyTantrum:   'TinyTantrum',
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${mm}/${dd}`;
}

/** Truncate long commit messages to keep the UI clean */
function truncate(msg: string, max = 60): string {
  const first = msg.split('\n')[0].trim();
  return first.length > max ? first.slice(0, max) + '…' : first;
}

async function fetchCommits(repo: string, signal?: AbortSignal): Promise<LogEntry[]> {
  const cacheKey = `kernellog_${repo}`;

  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const { ts, data } = JSON.parse(cached);
      if (Date.now() - ts < CACHE_TTL) return data;
    }
  } catch { /* ignore */ }

  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_USER}/${repo}/commits?per_page=3`,
    { signal }
  );
  if (!res.ok) throw new Error(`GitHub API ${res.status}`);
  const json = await res.json();

  const data: LogEntry[] = json.map((c: any) => ({
    sha:  c.sha.slice(0, 7),
    date: formatDate(c.commit.author.date),
    text: truncate(c.commit.message),
    url:  c.html_url,
  }));

  try {
    localStorage.setItem(cacheKey, JSON.stringify({ ts: Date.now(), data }));
  } catch { /* quota — skip */ }

  return data;
}

interface KernelLogProps {
  activeSection: string;
}

export default function KernelLog({ activeSection }: KernelLogProps) {
  const [entries, setEntries]     = useState<LogEntry[]>([]);
  const [status, setStatus]       = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');
  const [repoName, setRepoName]   = useState('');
  const [visible, setVisible]     = useState<number>(0);   // typewriter reveal count
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  // Fetch commits when activeSection changes
  useEffect(() => {
    const repo = REPO_MAP[activeSection];
    if (!repo) {
      setStatus('idle');
      setEntries([]);
      setRepoName('');
      return;
    }

    const controller = new AbortController();
    setRepoName(repo);
    setStatus('loading');
    setEntries([]);
    setVisible(0);

    fetchCommits(repo, controller.signal)
      .then((data) => {
        setEntries(data);
        setStatus('ok');
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setStatus('error');
      });

    return () => controller.abort();
  }, [activeSection]);

  // Typewriter reveal — stagger entries one by one
  useEffect(() => {
    if (status !== 'ok' || entries.length === 0) return;
    setVisible(0);

    let i = 0;
    const reveal = () => {
      i++;
      setVisible(i);
      if (i < entries.length) {
        timerRef.current = setTimeout(reveal, 180);
      }
    };
    timerRef.current = setTimeout(reveal, 120);

    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [entries, status]);

  return (
    <div className="p-4 mt-2">
      {/* Header */}
      <div className="font-mono text-xs font-bold mb-1 flex items-center gap-2 tracking-wider">
        KERNEL LOG
        {status === 'loading' && (
          <span className="text-gray-400 font-normal animate-pulse">fetching…</span>
        )}
        {status === 'ok' && (
          <span className="text-green-500 font-normal text-[10px] flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            live
          </span>
        )}
        {status === 'error' && (
          <span className="text-red-500 font-normal text-[10px] flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500" />
            offline
          </span>
        )}
      </div>

      {/* Repo path */}
      {repoName && (
        <a
          href={`https://github.com/${GITHUB_USER}/${repoName}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[10px] text-orange-600 hover:underline mb-3 block"
        >
          {GITHUB_USER}/{repoName}
        </a>
      )}

      {/* Error state */}
      {status === 'error' && (
        <p className="font-mono text-[10px] text-gray-400 italic">
          Could not reach GitHub API.
        </p>
      )}

      {/* Idle / no mapping */}
      {status === 'idle' && (
        <p className="font-mono text-[10px] text-gray-400 italic">
          Select a project to view commits.
        </p>
      )}

      {/* Commit list */}
      <ul className="font-mono text-[10px] space-y-3 text-gray-600">
        {entries.slice(0, visible).map((entry, i) => (
          <li
            key={entry.sha}
            className="flex gap-2 items-start transition-all duration-300"
            style={{
              opacity: 1,
              animation: `kernelFadeIn 0.3s ease-out ${i * 0.08}s both`,
            }}
          >
            <a
              href={entry.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-orange-500 shrink-0 transition-colors"
              title="View commit on GitHub"
            >
              {entry.sha}
            </a>
            <span className="leading-relaxed">
              <span className="text-gray-400 mr-1">{entry.date}</span>
              {entry.text}
            </span>
          </li>
        ))}
      </ul>

      {/* Empty state */}
      {status === 'ok' && entries.length === 0 && (
        <p className="font-mono text-[10px] text-gray-400 italic">
          No recent commits found.
        </p>
      )}

      {/* Loading skeleton */}
      {status === 'loading' && (
        <div className="space-y-3 mt-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex gap-2 items-center animate-pulse">
              <span className="bg-gray-200 rounded h-3 w-14" />
              <span className="bg-gray-200 rounded h-3 flex-1" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

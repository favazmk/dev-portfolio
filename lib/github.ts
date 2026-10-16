import { archiveRepos, site, type ArchiveEntry } from "@/config/site";

export interface ArchiveItem extends ArchiveEntry {
  url: string;
  stars: number;
}

interface GitHubRepo {
  name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
}

/**
 * Enriches the curated archive list with live GitHub data at build time
 * (revalidated daily). The curated note, live URL and language in
 * config/site.ts always render, so the grid is complete even when the API is
 * unreachable or rate-limited — the API only adds star counts and fills in a
 * language we didn't curate.
 */
export async function getArchive(): Promise<ArchiveItem[]> {
  let repos: GitHubRepo[] = [];

  try {
    const res = await fetch(
      `https://api.github.com/users/${site.github}/repos?sort=updated&per_page=100`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 86400 },
      }
    );
    if (res.ok) repos = (await res.json()) as GitHubRepo[];
  } catch {
    // Offline or rate-limited — the curated list alone is enough.
  }

  return archiveRepos.map((entry) => {
    const match = repos.find(
      (r) => r.name.toLowerCase() === entry.repo.toLowerCase()
    );
    return {
      ...entry,
      live: entry.live || match?.homepage || "",
      language: entry.language || match?.language || "",
      url: match?.html_url ?? `https://github.com/${site.github}/${entry.repo}`,
      stars: match?.stargazers_count ?? 0,
    };
  });
}

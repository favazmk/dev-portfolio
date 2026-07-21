import { site } from "@/config/site";

export interface Project {
  repo: string;
  title: string;
  description: string;
  live: string;
  repoUrl: string;
  language: string;
  topics: string[];
  stars: number;
}

interface GitHubRepo {
  name: string;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  stargazers_count: number;
}

/**
 * Fetches public repos at build time (revalidated daily) and merges them with
 * the curated featured list in config/site.ts. If the API is unreachable or
 * rate-limited, the curated config data alone is enough to render the site.
 */
export async function getProjects(): Promise<Project[]> {
  let repos: GitHubRepo[] = [];

  try {
    const res = await fetch(
      `https://api.github.com/users/${site.github}/repos?sort=updated&per_page=50`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 86400 },
      }
    );
    if (res.ok) repos = (await res.json()) as GitHubRepo[];
  } catch {
    // Offline / rate-limited — fall back to config data.
  }

  return site.featuredProjects.map((f) => {
    const match = repos.find(
      (r) => r.name.toLowerCase() === f.repo.toLowerCase()
    );
    return {
      repo: f.repo,
      title: f.title,
      description: f.description,
      live: f.live || match?.homepage || "",
      repoUrl: match?.html_url ?? `https://github.com/${site.github}/${f.repo}`,
      language: match?.language ?? f.language,
      topics: match?.topics?.slice(0, 4) ?? [],
      stars: match?.stargazers_count ?? 0,
    };
  });
}

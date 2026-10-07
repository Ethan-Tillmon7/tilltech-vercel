import type { GitHubRepoInfo } from "@/types";

const GITHUB_API = "https://api.github.com";

export async function getRepoInfo(
  owner: string,
  repo: string
): Promise<GitHubRepoInfo> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  // A slow GitHub shouldn't hold the whole stats response hostage; stats are optional.
  const url = `${GITHUB_API}/repos/${owner}/${repo}`;
  let res = await fetch(url, { headers, signal: AbortSignal.timeout(5000) });

  // An expired or revoked token fails every request; public repos still answer without one.
  if (res.status === 401 && headers.Authorization) {
    delete headers.Authorization;
    res = await fetch(url, { headers, signal: AbortSignal.timeout(5000) });
  }

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} for ${owner}/${repo}`);
  }

  const data = await res.json();

  return {
    stars: data.stargazers_count,
    forks: data.forks_count,
    language: data.language,
    updatedAt: data.pushed_at,
    openIssues: data.open_issues_count,
  };
}

/** Extract owner/repo from a GitHub URL, e.g. "https://github.com/Ethan-Tillmon7/RAgent" */
export function parseGitHubUrl(
  url: string
): { owner: string; repo: string } | null {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return null;
  return { owner: match[1], repo: match[2].replace(/\.git$/, "") };
}

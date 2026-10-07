import { NextResponse } from "next/server";
import { getRepoInfo, parseGitHubUrl } from "@/lib/github";
import type { GitHubRepoInfo } from "@/types";
import projectsData from "@/data/projects.json";

let cached: Record<string, GitHubRepoInfo> | null = null;
let cacheExpiry = 0;
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes
const RETRY_TTL = 5 * 60 * 1000; // after a failed refresh

export async function GET() {
  try {
    const now = Date.now();

    if (cached && now < cacheExpiry) {
      return NextResponse.json(cached, {
        headers: { "Cache-Control": "s-maxage=1800, stale-while-revalidate=900" },
      });
    }

    const repos: Record<string, GitHubRepoInfo> = {};

    const fetches = projectsData
      .filter((p) => p.githubUrl)
      .map(async (project) => {
        const parsed = parseGitHubUrl(project.githubUrl!);
        if (!parsed) return;
        try {
          repos[project.id] = await getRepoInfo(parsed.owner, parsed.repo);
        } catch {
          // Skip repos that fail (private, deleted, rate-limited)
        }
      });

    await Promise.all(fetches);

    // An empty result usually means GitHub rate-limited us. Keep serving the last good
    // set rather than caching nothing for 30 minutes.
    if (Object.keys(repos).length === 0 && cached) {
      cacheExpiry = now + RETRY_TTL;
      return NextResponse.json(cached, {
        headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=900" },
      });
    }

    cached = repos;
    cacheExpiry = now + (Object.keys(repos).length === 0 ? RETRY_TTL : CACHE_TTL);

    return NextResponse.json(repos, {
      headers: { "Cache-Control": "s-maxage=1800, stale-while-revalidate=900" },
    });
  } catch {
    if (cached) {
      return NextResponse.json(cached, {
        headers: { "Cache-Control": "s-maxage=1800, stale-while-revalidate=900" },
      });
    }
    return NextResponse.json({});
  }
}

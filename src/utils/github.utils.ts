import { AppMetadata } from "@/lib/config";
import { ContentPath } from "@/lib/content";
import { Octokit } from "octokit";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";
const GITHUB_OWNER = process.env.GITHUB_OWNER || AppMetadata.author.github;
const GITHUB_REPO = process.env.GITHUB_REPO || AppMetadata.siteUrl;

const octokit = new Octokit({ auth: GITHUB_TOKEN });

export async function getLastCommit(filename: string) {
  const filePath = `${ContentPath.NOTES}/${filename}`;
  const commit = await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    {
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      path: filePath,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );
}

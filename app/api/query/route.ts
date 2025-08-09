/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEqual } from "@/lib/utils";
import { NpmPackages } from "@/types/type";
import axios from "axios";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const fetchGitHubUsers = async (name: string) => {
  const username = name.replaceAll("@", "");
  const res = await axios.get("https://api.github.com/search/users", {
    params: { q: username, per_page: 2 },
    headers: { Accept: "application/vnd.github+json" },
  });
  return res.data.items
    .filter((item: any) => isEqual(item.login, username))
    .map((item: any) => {
      return {
        username: item.login,
        avatarUrl: item.avatar_url,
      };
    });
};

const fetchNpmPackages = async (name: string): Promise<NpmPackages> => {
  const res = await axios.get("https://registry.npmjs.org/-/v1/search", {
    params: { text: name, size: 2 },
  });
  return res.data.objects
    .filter((item: any) => item.package.name == name)
    .map((item: any) => ({
      name: item.package.name,
      version: item.package.version,
      description: item.package.description,
      author: item.package.publisher.username,
      lastModified: item.package.date,
    }));
};

const fetchCratesIo = async (name: string) => {
  const res = await axios.get("https://crates.io/api/v1/crates", {
    params: { q: name, per_page: 2 },
  });
  return res.data.crates
    .filter((item: any) => item.exact_match)
    .map((item: any) => {
      return {
        name: item.name,
        description: item.description,
        version: item.default_version,
        lastModified: item.updated_at,
        downloads: item.downloads,
        license: item.license,
      };
    });
};

const fetchPypiPackages = async (name: string) => {
  const request = axios.create();
  request.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status == 404) {
        return null;
      }
    }
  );
  const res = await request.get(`https://pypi.org/pypi/${name}/json`);
  if (!res) {
    return [];
  }
  return [
    {
      name: res.data.info.name,
      description: res.data.info.summary,
      author: res.data.info.author,
      version: res.data.info.version,
      // lastModified: res.data.info.release_date,
      // downloads: res.data.info.downloads,
      // license: res.data.info.license,
    },
  ];
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get("name");
  if (!name) {
    return NextResponse.json(
      { error: "Name parameter is required" },
      { status: 400 }
    );
  }
  try {
    const [githubUsers, npmPackages, crates, pypiPackages] = await Promise.all([
      fetchGitHubUsers(name),
      fetchNpmPackages(name),
      fetchCratesIo(name),
      fetchPypiPackages(name),
    ]);

    return NextResponse.json({
      githubUsers,
      npmPackages,
      crates,
      pypiPackages,
    });
  } catch (err) {
    console.error("Search failed:", err);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}

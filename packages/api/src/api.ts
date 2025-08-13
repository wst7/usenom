import axios from 'axios';
import { Crates, GithubUsers, NpmPackages, PyPiPackages, SearchResult } from './types';

function isEqual(a: string, b: string) {
  return a.toLowerCase() === b.toLowerCase();
}

export const fetchGitHubUsers = async (name: string): Promise<GithubUsers> => {
  const username = name.replaceAll('@', '');
  const res = await axios.get('https://api.github.com/search/users', {
    params: { q: username, per_page: 2 },
    headers: { Accept: 'application/vnd.github+json' },
  });
  return res.data.items
    .filter((item: any) => isEqual(item.login, username))
    .map((item: any) => {
      return {
        username: item.login,
        avatarUrl: item.avatar_url,
        html_url: item.html_url,
      };
    });
};

export const fetchNpmPackages = async (name: string): Promise<NpmPackages> => {
  const pkgName = name.toLowerCase();
  const res = await axios.get('https://registry.npmjs.org/-/v1/search', {
    params: { text: pkgName, size: 2 },
  });
  return res.data.objects
    .filter((item: any) => item.package.name == pkgName)
    .map((item: any) => ({
      name: item.package.name,
      version: item.package.version,
      description: item.package.description,
      author: item.package.publisher.username,
      lastModified: item.package.date,
    }));
};

export const fetchCratesIo = async (name: string): Promise<Crates> => {
  const res = await axios.get('https://crates.io/api/v1/crates', {
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

export const fetchPypiPackages = async (name: string): Promise<PyPiPackages> => {
  const request = axios.create();
  request.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status == 404) {
        return null;
      }
    },
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
    },
  ];
};

export const queryPkgsAndUsers = async (name: string): Promise<SearchResult> => {
  try {
    const [githubUsers, npmPackages, crates, pypiPackages] = await Promise.all([
      fetchGitHubUsers(name),
      fetchNpmPackages(name),
      fetchCratesIo(name),
      fetchPypiPackages(name),
    ]);
    return {
      githubUsers,
      npmPackages,
      crates,
      pypiPackages,
    };
  } catch (error) {
    console.error(error);
    return {
      githubUsers: [],
      npmPackages: [],
      crates: [],
      pypiPackages: [],
    };
  }
};

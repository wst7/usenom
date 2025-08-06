import Npm from "@/components/result/npm";
import Github from "@/components/result/github";
import CratesIo from "@/components/result/crates";
import PyPI from "@/components/result/pypi";
import SearchForm from "@/components/search-form";
import { getApiUrl } from "@/lib/utils";
import { SearchResult } from "@/types/type";
type SearchParams = {
  q: string;
};
export default async function Index({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { q } = await searchParams;
  if (!q) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <SearchForm q={q} />
        <p className="text-gray-500">
          Enter a name to search for packages and users.
        </p>
      </div>
    );
  }

  const res = await fetch(getApiUrl(`/api/query?name=${q}`));
  const data: SearchResult = await res.json();

  const npmPackages = data.npmPackages || [];
  const githubUsers = data.githubUsers || [];
  const crates = data.crates || [];
  const pypiPackages = data.pypiPackages || [];

  return (
    <div className="flex flex-col w-full items-center gap-2">
      <SearchForm q={q} />
      <div className="space-y-10 ml-2 mr-2">
        <Npm packages={npmPackages} />
        <Github users={githubUsers} />
        <CratesIo crates={crates} />
        <PyPI packages={pypiPackages} />
      </div>
    </div>
  );
}


export type List<T> = T[]

export type NpmPackageRecord = {
  name: string
  version: string
  description: string
  author: string
  lastModified: string
}



export type GithubRecord = {
  username: string
  avatarUrl: string
  html_url: string
}

export type CrateRecord = {
  name: string
  description: string
  author?: string
  version: string
  lastModified: string
  downloads: number
}

export type PyPiRecord = {
  name: string
  description: string
  author: string
  version: string
}

export type NpmPackages = List<NpmPackageRecord>
export type GithubUsers = List<GithubRecord>
export type Crates = List<CrateRecord>
export type PyPiPackages = List<PyPiRecord>
export type SearchResult = {
  npmPackages?: NpmPackages
  githubUsers?: GithubUsers
  crates?: Crates
  pypiPackages?: PyPiPackages
}
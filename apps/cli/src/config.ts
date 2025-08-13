import {
  CrateRecord,
  GithubRecord,
  NpmPackageRecord,
  PyPiRecord,
  SearchResult,
} from '@usenom/api';
import chalk from 'chalk';

export type PlatformConfig = {
  borderColor: string;
  title: string;
  fields: {
    label: string;
    index: string;
    format?: (value: string, item: any) => string;
  }[];
};

export const platformConfigs: Record<keyof SearchResult, PlatformConfig> = {
  npmPackages: {
    borderColor: 'blue',
    title: '📦 NPM Package',
    fields: [
      { label: 'Name', index: 'name', format: (value) => chalk.blue(value) },
      {
        label: 'Version',
        index: 'version',
        format: (value) => chalk.yellow(value),
      },
      { label: 'Description', index: 'description' },
      {
        label: 'Author',
        index: 'author',
        format: (value) => chalk.green(value),
      },
      { label: 'Last Modified', index: 'lastModified' },
      {
        label: 'Url',
        index: 'url',
        format: (_, record: NpmPackageRecord) =>
          chalk.underline(`https://www.npmjs.com/package/${record.name}`),
      },
    ],
  },
  crates: {
    borderColor: 'magenta',
    title: '🦀 Crates.io',
    fields: [
      { label: 'Name', index: 'name', format: (value) => chalk.magenta(value) },
      {
        label: 'Version',
        index: 'version',
        format: (value) => chalk.yellow(value),
      },
      { label: 'Description', index: 'description' },
      {
        label: 'Downloads',
        index: 'downloads',
        format: (value) => chalk.yellow(value),
      },
      { label: 'Last Modified', index: 'lastModified' },
      {
        label: 'Url',
        index: 'url',
        format: (_, record: CrateRecord) =>
          chalk.underline(`https://crates.io/crates/${record.name}`),
      },
    ],
  },
  pypiPackages: {
    borderColor: 'yellow',
    title: '🐍 PyPI',
    fields: [
      { label: 'Name', index: 'name', format: (value) => chalk.yellow(value) },
      {
        label: 'Version',
        index: 'version',
        format: (value) => chalk.yellow(value),
      },
      { label: 'Description', index: 'description' },
      {
        label: 'Author',
        index: 'author',
        format: (value) => chalk.green(value),
      },

      { label: 'Last Modified', index: 'lastModified' },
      {
        label: 'Url',
        index: 'url',
        format: (_, record: PyPiRecord) =>
          chalk.underline(`https://pypi.org/project/${record.name}`),
      },
    ],
  },
  githubUsers: {
    borderColor: 'green',
    title: '🐙 GitHub',
    fields: [
      {
        label: 'Username',
        index: 'username',
        format: (value) => chalk.blue(value),
      },
      {
        label: 'Url',
        index: 'html_url',
        format: (value) => chalk.underline(value),
      },
    ],
  },
};

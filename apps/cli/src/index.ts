import {
  cancel,
  intro,
  isCancel,
  outro,
  text,
  note,
  spinner,
} from '@clack/prompts';

import chalk from 'chalk';
import { queryPkgsAndUsers, SearchResult } from '@usenom/api';
import boxen from 'boxen';
import { PlatformConfig, platformConfigs } from './config';

intro(chalk.bold.green(`Welcome to usenom`));

note(
  `Check if a  name is taken on your favorite registry:
${chalk.red('📦 NPM')}
${chalk.yellowBright('🦀 Crates.io')}
${chalk.blue('🐍 PyPI')}
${chalk.blackBright('🐙 GitHub')}`,
  'Do not nom a used name',
);

const name = checkCancel<string>(
  await text({
    message: 'What name do you want to check?',
    placeholder: `usenom`,
    validate(value) {
      if (value.length === 0) return `Name is required!`;
    },
  }),
);
const loading = spinner();
loading.start('Checking name...');
try {
  const result = await queryPkgsAndUsers(name);
  loading.stop();
  printResult('npmPackages', result);
  printResult('crates', result);
  printResult('pypiPackages', result);
  printResult('githubUsers', result);

  outro('All set, happy coding!');
} catch (error) {
  loading.stop();
  console.error(error);
  cancelAndExit();
}

export function checkCancel<T>(value: unknown) {
  if (isCancel(value)) {
    cancelAndExit();
  }
  return value as T;
}

function cancelAndExit() {
  cancel('Operation cancelled.');
  process.exit(0);
}

/**
 * Print the result of a search
 * @param title
 * @param result
 */
function printResult<T extends keyof SearchResult>(
  type: T,
  result: SearchResult,
) {
  const list = result[type];

  const config = platformConfigs[type];
  const content = formatContent(type, list, config.fields);
  console.log(
    boxen(content, {
      title: config.title,
      titleAlignment: 'center',
      padding: 1,
      margin: 1,
      borderColor: config.borderColor,
      borderStyle: 'round',
      float: 'left',
    }),
  );
}

function formatContent<T extends keyof SearchResult>(
  type: T,
  result: SearchResult[T],
  fields: PlatformConfig['fields'],
) {
  if (!result || result.length === 0) {
    if (type === 'githubUsers') {
      return 'No user found';
    }
    return 'No package found';
  }
  const content = result
    .map((item) => {
      return fields
        .map((field: any) => {
          //@ts-ignore
          const value = item[field.index as string];
          return `${chalk.bold(field.label)}: ${field.format?.(value, item) || value}`;
        })
        .join('\n');
    })
    .join('\n\n');
  return content;
}

import { PropsWithChildren } from "react";

export enum LinkType {
  NpmPackage,
  NpmUser,
  GithubUser,
  GithubRepo,
  Crate,
  CrateUser,
  PypiPackage,
  PypiUser,
}
type Props =
  | PropsWithChildren<{
      type: LinkType.NpmUser;
      npmUser: string;
    }>
  | PropsWithChildren<{
      type: LinkType.NpmPackage;
      npmPackage: string;
    }>
  | PropsWithChildren<{
      type: LinkType.GithubUser;
      githubUser: string;
    }>
  | PropsWithChildren<{
      type: LinkType.PypiPackage;
      pypiPackage: string;
    }>
  | PropsWithChildren<{
      type: LinkType.PypiUser;
      pypiUser: string;
    }>
  | PropsWithChildren<{
      type: LinkType.Crate;
      crate: string;
    }>
  | PropsWithChildren<{
      type: LinkType.CrateUser;
      crateUser: string;
    }>;

export default function BackLink(props: Props & {
  className?: string;
}) {
  const { type, children, className } = props;
  switch (type) {
    case LinkType.NpmUser:
      return (
        <a
          href={`https://www.npmjs.com/~${props.npmUser}?ref=usenom`}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {children}
        </a>
      );
    case LinkType.NpmPackage:
      return (
        <a
          href={`https://www.npmjs.com/package/${props.npmPackage}?ref=usenom`}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {children}
        </a>
      );
    case LinkType.GithubUser:
      return (
        <a
          href={`https://github.com/${props.githubUser}?ref=usenom`}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {children}
        </a>
      );
    case LinkType.PypiPackage:
      return (
        <a
          href={`https://pypi.org/project/${props.pypiPackage}?ref=usenom`}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {children}
        </a>
      );
    case LinkType.PypiUser:
      return (
        <a
          href={`https://pypi.org/user/${props.pypiUser}?ref=usenom`}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {children}
        </a>
      );
    case LinkType.Crate:
      return (
        <a
          href={`https://crates.io/crates/${props.crate}?ref=usenom`}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {children}
        </a>
      );
    case LinkType.CrateUser:
      return (
        <a
          href={`https://crates.io/users/${props.crateUser}?ref=usenom`}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {children}
        </a>
      );
  }
}

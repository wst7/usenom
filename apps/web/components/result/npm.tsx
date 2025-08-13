import type { NpmPackages } from "@usenom/api";
import Empty from "@/components/empty";
import BackLink, { LinkType } from "../back-link";
import dayjs from "@/lib/dayjs";

export default function Npm(props: { packages: NpmPackages }) {
  const { packages } = props;

  return (
    <div className="space-y-2">
      <h4 className="text-lg font-semibold">📦 NPM Packages</h4>
      {packages.length == 0 ? (
        <Empty
          title="No packages found"
          description="Great, this name has not been occupied yet, you can use it directly!"
        />
      ) : (
        <div className="space-y-4">
          {packages.map((pkg) => (
            <div key={pkg.name}>
              <div className="border border-gray-200 p-4 rounded-lg bg-white shadow-sm hover:shadow transition">
                <div className="flex justify-between items-center">
                  <BackLink
                    type={LinkType.NpmPackage}
                    npmPackage={pkg.name}
                    className="text-blue-600 font-semibold text-lg hover:underline"
                  >
                    {pkg.name}
                  </BackLink>
                  <span className="text-sm text-gray-500">v{pkg.version}</span>
                </div>
                <p className="text-gray-700 text-sm mt-1">{pkg.description}</p>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <BackLink
                    type={LinkType.NpmUser}
                    npmUser={pkg.author}
                  >
                    {pkg.author}
                  </BackLink>
                  <span>
                    {dayjs(pkg.lastModified).fromNow()}
                  </span>
                </div>
              </div>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

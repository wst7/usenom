import type { CrateRecord } from "@usenom/api";
import Empty from "../empty";
import BackLink, { LinkType } from "../back-link";
import dayjs from "@/lib/dayjs";

export default function CratesIo(props: { crates: CrateRecord[] }) {
  const { crates } = props;

  return (
    <div className="space-y-2">
      <h4 className="text-lg font-semibold">🦀 Crates.io Packages</h4>
      {crates.length === 0 ? (
        <Empty
          title="No crates found"
          description="Great, this name has not been occupied yet, you can use it directly!"
        />
      ) : (
        <div className="space-y-4">
          {crates.map((crate) => (
            <div key={crate.name}>
              <div className="border border-gray-200 p-4 rounded-lg bg-white shadow-sm hover:shadow transition">
                <div className="flex justify-between items-center">
                  <BackLink
                    type={LinkType.Crate}
                    crate={crate.name}
                    className="text-orange-600 font-semibold text-lg hover:underline"
                  >
                    {crate.name}
                  </BackLink>
                  <span className="text-sm text-gray-500">
                    v{crate.version}
                  </span>
                </div>
                <p className="text-gray-700 text-sm mt-1">
                  {crate.description}
                </p>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Downloads: {crate.downloads.toLocaleString()}</span>
                  <span>{dayjs(crate.lastModified).fromNow()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

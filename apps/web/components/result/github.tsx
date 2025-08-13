import type { GithubUsers } from "@usenom/api";
import Empty from "../empty";
import Image from "next/image";

export default function GithubUserList(props: { users: GithubUsers }) {
  const { users } = props;

  return (
    <div className="space-y-2">
      <h4 className="text-lg font-semibold">🐙 GitHub Users or Organizations</h4>
      {users.length == 0 ? (
        <Empty
          title="No users found"
          description="Great, this name has not been occupied yet, you can use it directly!"
        />
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.username}>
              <div className="border border-gray-200 p-4 rounded-lg bg-white shadow-sm hover:shadow transition">
                <div className="flex items-center space-x-4">
                  <Image
                    src={user.avatarUrl}
                    alt={user.username}
                    className="w-12 h-12 rounded-full"
                    width={48}
                    height={48}
                  />
                  <div className="flex-1">
                    <a
                      href={`https://github.com/${user.username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 font-semibold text-lg hover:underline"
                    >
                      {user.username}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

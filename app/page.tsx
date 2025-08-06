import SearchForm from "@/components/search-form";
import { FaGithub, FaNpm, FaPython, FaRust } from "react-icons/fa";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px]  items-center w-full max-w-xl">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">usenom</h1>
        <p className="text-gray-600 text-lg sm:text-xl max-w-xl mx-auto">
          <strong>Do not nom a used name</strong> — check if a package name is
          taken on your favorite registry:
        </p>

        {/* 支持平台 badge */}
        <section className="flex flex-wrap gap-4 justify-center mt-6 text-gray-700 text-sm">
          <a
            href="https://www.npmjs.com/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-1 border rounded hover:bg-gray-100"
          >
            <FaNpm className="text-red-500" /> npm
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-1 border rounded hover:bg-gray-100"
          >
            <FaGithub /> GitHub
          </a>
          <a
            href="https://pypi.org/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-1 border rounded hover:bg-gray-100"
          >
            <FaPython className="text-blue-500" /> PyPI
          </a>
          <a
            href="https://crates.io/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-1 border rounded hover:bg-gray-100"
          >
            <FaRust className="text-orange-600" /> crates.io
          </a>
        </section>
        <SearchForm q={""} />

        {/* 功能介绍 */}
        <section className="w-full max-w-xl text-gray-800">
          <h2 className="text-2xl font-bold mb-3">🔍 What Can It Do?</h2>
          <ul className="space-y-2 list-disc list-inside text-base leading-relaxed">
            <li>
              Check if a name is already taken on npm, PyPI, crates.io, and
              GitHub
            </li>
            <li>Avoid naming collisions before publishing your project</li>
            <li>Quick search with instant feedback</li>
            <li>Minimal, focused, and open-source</li>
          </ul>
        </section>

        {/* GitHub 地址 */}
        <section className="mt-8">
          <a
            href="https://github.com/wst7/usenom"
            target="_blank"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black"
          >
            <FaGithub /> View on GitHub
          </a>
        </section>
      </main>

      {/* 页脚 */}
      <footer className="text-sm text-gray-400 text-center ">
        &copy; 2025 usenom. All rights reserved.
      </footer>
    </div>
  );
}

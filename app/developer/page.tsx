import Link from "next/link";
import {
  QrCode,
  Braces,
  FileJson,
  Type,
  Binary,
} from "lucide-react";

export default function DeveloperPage() {
  const tools = [
    {
      name: "QR Code Generator",
      href: "/tools/qr-code-generator",
      icon: QrCode,
    },
    {
      name: "JSON Formatter",
      href: "/tools/json-formatter",
      icon: Braces,
    },
    {
      name: "JSON Validator",
      href: "/tools/json-validator",
      icon: FileJson,
    },
    {
      name: "Text to Slug",
      href: "/tools/text-to-slug",
      icon: Type,
    },
    {
      name: "Binary Converter",
      href: "/tools/binary-converter",
      icon: Binary,
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-slate-900">
            Developer Tools
          </h1>

          <p className="mt-4 text-slate-600">
            Essential tools for developers and programmers.
          </p>
        </header>

        <section
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
          aria-label="Developer tools"
        >
          {tools.map((tool) => {
            const Icon = tool.icon;

            return (
              <Link
                key={tool.name}
                href={tool.href}
                className="group flex items-center gap-3 rounded-xl border border-slate-200/50 bg-white p-4 shadow-lg transition-all hover:border-indigo-200 hover:shadow-xl"
              >
                <div className="rounded-lg bg-indigo-100 p-2">
                  <Icon
                    className="h-5 w-5 text-indigo-600"
                    aria-hidden="true"
                  />
                </div>

                <span className="font-medium text-slate-900 group-hover:text-indigo-700">
                  {tool.name}
                </span>
              </Link>
            );
          })}
        </section>
      </div>
    </main>
  );
}
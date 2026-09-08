import Image from "next/image";
import Link from "next/link";

const toolLinks = [
  { label: "All Tools", href: "/tools" },
  { label: "Calculators", href: "/tools/calculators" },
  { label: "Developer Tools", href: "/tools/developer" },
  { label: "Image Tools", href: "/tools/image" },
  { label: "Text Tools", href: "/tools/text" },
  { label: "Design Tools", href: "/tools/design" },
  { label: "Utility Tools", href: "/tools/utility" },
];

const companyLinks = [
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Docs", href: "/docs" },
  { name: "Contact", href: "/contact" },
];

const legalLinks = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-3 text-lg font-bold text-gray-900"
            >
              <Image
                src="/logo.png"
                alt="ToolNoveHub"
                width={42}
                height={42}
                className="h-10 w-10 object-contain"
              />

              <span>
                Tool<span className="text-blue-600">Nove</span>Hub
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-gray-600">
              Free and practical online tools designed to make everyday tasks
              simpler, faster, and easier.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Tools</h2>

            <ul className="mt-4 space-y-3">
              {toolLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 transition hover:text-blue-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Company</h2>

            <ul className="mt-4 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 transition hover:text-blue-600"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Legal</h2>

            <ul className="mt-4 space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 transition hover:text-blue-600"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-gray-200 pt-6">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} ToolNoveHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
import Link from "next/link";

const footerLinks = [
  {
    title: "Tools",
    links: [
      { name: "QR Code Generator", href: "/tools/office/qr-code-generator" },
      { name: "Image Resizer", href: "/tools/office/image-resizer" },
      { name: "Percentage Calculator", href: "/tools/student/percentage-calculator" },
      { name: "Word Counter", href: "/tools/student/word-counter" },
      { name: "JSON Formatter", href: "/tools/developer/json-formatter" },
    ],
  },
  {
    title: "Categories",
    links: [
      { name: "Student Tools", href: "/tools/student" },
      { name: "Developer Tools", href: "/tools/developer" },
      { name: "Office Tools", href: "/tools/office" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Contact", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">ToolNoveHub</h3>
            <p className="text-sm">
              Free online tools for everyday use. Privacy-first, no account required.
              Everything runs in your browser.
            </p>
          </div>
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} ToolNoveHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
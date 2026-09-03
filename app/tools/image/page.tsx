import Link from "next/link";
import {
  ArrowRight,
  Crop,
  Image as ImageIcon,
  Maximize,
} from "lucide-react";

const imageTools = [
  {
    name: "Image Resizer",
    slug: "image-resizer",
    description:
      "Resize images to custom dimensions while maintaining the aspect ratio when needed.",
    icon: Maximize,
  },
  {
    name: "Image Cropper",
    slug: "image-cropper",
    description:
      "Crop images manually by dragging the crop area or entering precise crop dimensions.",
    icon: Crop,
  },
];

export const metadata = {
  title: "Free Image Tools",
  description:
    "Free online image tools from ToolNoveHub for resizing and cropping images directly in your browser.",
  alternates: {
    canonical: "https://toolnovehub.tools/tools/image",
  },
};

export default function ImageToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
              <ImageIcon size={32} strokeWidth={2} />
            </div>

            <p className="mt-6 text-sm font-bold uppercase tracking-wide text-blue-600">
              Tool Category
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Free Image Tools
            </h1>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              Simple browser-based tools for resizing and
              cropping images quickly and easily.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Image Tools
            </h2>

            <p className="mt-1 text-sm text-gray-600">
              Choose an image tool below.
            </p>
          </div>

          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
          >
            View all tools
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* TOOL CARDS */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {imageTools.map((tool) => {
            const Icon = tool.icon;

            return (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                    <Icon size={24} />
                  </div>

                  <ArrowRight
                    size={20}
                    className="text-gray-300 transition group-hover:translate-x-1 group-hover:text-blue-600"
                  />
                </div>

                <h3 className="mt-5 text-lg font-bold text-gray-900">
                  {tool.name}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {tool.description}
                </p>

                <div className="mt-5 text-sm font-semibold text-blue-600">
                  Open tool →
                </div>
              </Link>
            );
          })}
        </div>

        {/* FEATURES */}
        <section className="mt-12 rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Simple image editing in your browser
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600">
            ToolNoveHub provides easy-to-use image utilities
            for common tasks such as changing image dimensions
            and removing unwanted areas from a picture.
          </p>

          <div className="mt-7 grid gap-6 md:grid-cols-3">
            <div>
              <div className="text-2xl">📐</div>

              <h3 className="mt-3 font-bold text-gray-900">
                Resize images
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Set custom width and height values and
                preserve the image ratio when required.
              </p>
            </div>

            <div>
              <div className="text-2xl">✂️</div>

              <h3 className="mt-3 font-bold text-gray-900">
                Crop images
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Drag the crop area manually or use precise
                crop settings for greater control.
              </p>
            </div>

            <div>
              <div className="text-2xl">🔒</div>

              <h3 className="mt-3 font-bold text-gray-900">
                Browser based
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Supported image processing happens directly
                in your browser without requiring an upload
                to a server.
              </p>
            </div>
          </div>
        </section>

        {/* USE CASES */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">
            Common image tasks
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <h3 className="font-bold text-gray-900">
                Resize for websites
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Reduce or change image dimensions for
                websites, blogs, and online content.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <h3 className="font-bold text-gray-900">
                Crop unwanted areas
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Remove unwanted parts of an image and keep
                only the area you need.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <h3 className="font-bold text-gray-900">
                Prepare social images
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Quickly adjust images before using them on
                social media or other platforms.
              </p>
            </div>
          </div>
        </section>

        {/* PRIVACY NOTE */}
        <section className="mt-12 rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-bold text-gray-900">
            Privacy-focused image processing
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            Our image tools are designed to process supported
            images locally in your browser. Avoid uploading
            sensitive images to any online service unless you
            are comfortable doing so.
          </p>
        </section>

        {/* BREADCRUMB */}
        <nav
          aria-label="Breadcrumb"
          className="mt-10 text-sm text-gray-500"
        >
          <Link
            href="/"
            className="transition hover:text-blue-600"
          >
            Home
          </Link>

          <span className="mx-2">/</span>

          <Link
            href="/tools"
            className="transition hover:text-blue-600"
          >
            Tools
          </Link>

          <span className="mx-2">/</span>

          <span className="text-gray-700">
            Image
          </span>
        </nav>
      </main>
    </div>
  );
}
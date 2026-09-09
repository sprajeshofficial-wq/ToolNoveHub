import type { Metadata } from "next";
import WordCounter from "./WordCounter";

const pageUrl = "https://toolnovehub.tools/tools/word-counter";

export const metadata: Metadata = {
  title: "Word Counter - Count Words and Characters Online",
  description:
    "Count words, characters, sentences, paragraphs, and lines online with a fast browser-based word counter.",
  keywords: [
    "word counter",
    "word count",
    "character counter",
    "count words online",
    "online word counter",
    "sentence counter",
    "paragraph counter",
  ],
  alternates: {
    canonical: pageUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Word Counter - Count Words and Characters Online",
    description:
      "Count words, characters, sentences, paragraphs, and lines with a fast browser-based word counter.",
    url: pageUrl,
    siteName: "ToolNoveHub",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Word Counter - Count Words and Characters Online",
    description:
      "Count words, characters, sentences, paragraphs, and lines with a fast browser-based word counter.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Word Counter",
  url: pageUrl,
  description:
    "A free browser-based word counter for counting words, characters, sentences, paragraphs, and lines.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "All",
  browserRequirements: "Requires JavaScript",
  isAccessibleForFree: true,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Word counting",
    "Character counting",
    "Character counting without spaces",
    "Sentence counting",
    "Paragraph counting",
    "Line counting",
    "Estimated reading time",
    "Browser-based text processing",
  ],
};

const faqItems = [
  {
    question: "Is the Word Counter free?",
    answer:
      "Yes. You can use the ToolNoveHub Word Counter without creating an account.",
  },
  {
    question: "Does the Word Counter update automatically?",
    answer:
      "Yes. The statistics are recalculated automatically whenever the text in the editor changes.",
  },
  {
    question: "How is reading time calculated?",
    answer:
      "The estimated reading time is based on approximately 200 words per minute. Actual reading speed varies by person and by the complexity of the text.",
  },
  {
    question: "Can I count text in different languages?",
    answer:
      "The tool can process Unicode text, but word and sentence counting rules can vary between languages. The displayed counts are based on the browser-side counting rules used by this tool.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function WordCounterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <WordCounter />
    </>
  );
}
export function generateStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "ToolNoveHub",
    "description": "Free online tools for students, developers, and office work. No account required, 100% private.",
    "applicationCategory": "UtilityApplication",
    "browserRequirements": "Requires JavaScript",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "url": "https://toolnovehub.tools"
  };
}
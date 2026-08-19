export default function TermsPage() {
  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-slate-900 text-center mb-8">Terms of Service</h1>

        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-8 shadow-xl space-y-6">
          <section>
            <h2 className="text-xl font-bold text-slate-900">1. Acceptance of Terms</h2>
            <p className="mt-2 text-slate-600">
              By using ToolNoveHub, you agree to these terms. If you don't agree, please don't use our tools.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">2. Free Service</h2>
            <p className="mt-2 text-slate-600">
              All tools on ToolNoveHub are completely free. We may add premium features in the future, 
              but the core tools will always remain free.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">3. Privacy</h2>
            <p className="mt-2 text-slate-600">
              All tools process data in your browser. We don't store, share, or have access to your data. 
              Your privacy is our priority.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">4. Use of Tools</h2>
            <p className="mt-2 text-slate-600">
              You may use our tools for personal, educational, or commercial purposes. Don't use them 
              for illegal activities or to harass others.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">5. Intellectual Property</h2>
            <p className="mt-2 text-slate-600">
              All content on this site, including tools, code, and design, is property of ToolNoveHub.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">6. Limitation of Liability</h2>
            <p className="mt-2 text-slate-600">
              We provide tools "as is" without warranties. Use at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">7. Changes to Terms</h2>
            <p className="mt-2 text-slate-600">
              We may update these terms occasionally. We'll notify you via the website when we do.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">8. Contact Us</h2>
            <p className="mt-2 text-slate-600">
              Questions? <a href="/contact" className="text-indigo-600 hover:underline">Contact us</a>.
            </p>
          </section>

          <div className="pt-4 border-t border-slate-200/50">
            <p className="text-sm text-slate-500">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
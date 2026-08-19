export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-slate-900 text-center mb-8">Privacy Policy</h1>

        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-8 shadow-xl space-y-6">
          <section>
            <h2 className="text-xl font-bold text-slate-900">1. We Don't Collect Your Data</h2>
            <p className="mt-2 text-slate-600">
              All processing happens in your browser. We don't store, collect, or have access to 
              any data you process using our tools.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">2. No Cookies</h2>
            <p className="mt-2 text-slate-600">
              We use minimal cookies for functionality. We don't use tracking cookies or analytics 
              that track you across the web.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">3. No Third-Party Tracking</h2>
            <p className="mt-2 text-slate-600">
              We don't use third-party trackers, ads, or analytics that share your data with anyone.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">4. Your Data Stays With You</h2>
            <p className="mt-2 text-slate-600">
              Everything you upload or enter stays on your device. Nothing is sent to our servers 
              or any third-party service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">5. Updates to This Policy</h2>
            <p className="mt-2 text-slate-600">
              We'll update this policy if we change how we handle data. You'll be notified on the site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">6. Contact Us</h2>
            <p className="mt-2 text-slate-600">
              If you have questions about this policy, <a href="/contact" className="text-indigo-600 hover:underline">contact us</a>.
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
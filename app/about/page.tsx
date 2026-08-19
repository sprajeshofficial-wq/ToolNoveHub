import { Users, Target, Shield, Zap } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900">About ToolNoveHub</h1>
          <p className="mt-4 text-lg text-slate-600">
            Free online tools for everyone — built with ❤️ by developers
          </p>
        </div>

        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-8 shadow-xl space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Our Mission</h2>
            <p className="mt-2 text-slate-600">
              To provide powerful, simple online tools that make everyday tasks easier for students, 
              developers, office workers, and everyone else. All tools are 100% free and process 
              data entirely in your browser.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl bg-indigo-50/50 p-6 border border-indigo-200/50">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-indigo-600 p-2">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-semibold text-slate-900">Why We Built This</h3>
              </div>
              <p className="mt-2 text-sm text-slate-600">
                We needed tools that work quickly, without ads, without signups, and without 
                sending data to servers. So we built them.
              </p>
            </div>

            <div className="rounded-xl bg-purple-50/50 p-6 border border-purple-200/50">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-purple-600 p-2">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-semibold text-slate-900">Privacy First</h3>
              </div>
              <p className="mt-2 text-sm text-slate-600">
                All tools process data in your browser. Nothing is uploaded to any server. 
                Your data stays on your device.
              </p>
            </div>

            <div className="rounded-xl bg-emerald-50/50 p-6 border border-emerald-200/50">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-emerald-600 p-2">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-semibold text-slate-900">Fast & Light</h3>
              </div>
              <p className="mt-2 text-sm text-slate-600">
                Built with Next.js 14 and optimized for speed. All tools load instantly and 
                work offline.
              </p>
            </div>

            <div className="rounded-xl bg-amber-50/50 p-6 border border-amber-200/50">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-amber-600 p-2">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-semibold text-slate-900">For Everyone</h3>
              </div>
              <p className="mt-2 text-sm text-slate-600">
                Students, developers, office workers, and casual users — there's a tool for everyone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
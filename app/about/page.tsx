import { Users, Target, Shield, Zap, Award, Heart } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'All tools process data in your browser. Nothing is uploaded to servers.',
      color: 'from-indigo-500 to-purple-500',
    },
    {
      icon: Zap,
      title: 'Fast & Light',
      description: 'Built with Next.js 14 for lightning-fast performance.',
      color: 'from-amber-500 to-orange-500',
    },
    {
      icon: Users,
      title: 'For Everyone',
      description: 'Students, developers, office workers, and casual users.',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Award,
      title: '100% Free',
      description: 'All tools are completely free with no hidden charges.',
      color: 'from-rose-500 to-pink-500',
    },
    {
      icon: Target,
      title: 'Simple & Effective',
      description: 'No complicated interfaces. Just the tools you need.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Heart,
      title: 'Built with Love',
      description: 'Made by developers who care about user experience.',
      color: 'from-red-500 to-rose-500',
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900">About ToolNoveHub</h1>
          <p className="mt-4 text-lg text-slate-600">
            Free online tools for everyone — built with ❤️ by developers
          </p>
        </div>

        <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 p-8 shadow-xl space-y-8">
          {/* Mission */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Our Mission</h2>
            <p className="mt-2 text-slate-600">
              To provide powerful, simple online tools that make everyday tasks easier for students, 
              developers, office workers, and everyone else. All tools are 100% free and process 
              data entirely in your browser.
            </p>
          </div>

          {/* Values Grid */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">What We Stand For</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <div key={value.title} className="rounded-xl bg-slate-50/80 p-4 border border-slate-200/50">
                    <div className={`inline-flex rounded-lg bg-gradient-to-r ${value.color} p-2`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="mt-2 font-semibold text-slate-900">{value.title}</h3>
                    <p className="text-sm text-slate-600">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200/50">
            <div className="text-center">
              <p className="text-2xl font-bold text-indigo-600">5+</p>
              <p className="text-sm text-slate-600">Free Tools</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-indigo-600">100%</p>
              <p className="text-sm text-slate-600">Browser-Based</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-indigo-600">0</p>
              <p className="text-sm text-slate-600">Server Uploads</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
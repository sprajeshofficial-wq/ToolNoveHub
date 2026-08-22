'use client';

import { useState, useEffect } from 'react';
import { Users } from 'lucide-react';

export default function VisitorCounter() {
  const [visitors, setVisitors] = useState({ active: 0, total: 0 });

  useEffect(() => {
    fetch('/api/visitors')
      .then(res => res.json())
      .then(data => setVisitors(data))
      .catch(() => {});
  }, []);

  return (
    <div className="inline-flex items-center gap-2 text-sm text-slate-500">
      <Users className="h-4 w-4" />
      <span>{visitors.total.toLocaleString()} visitors</span>
    </div>
  );
}
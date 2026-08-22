'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn && window.location.pathname !== '/admin') {
      router.push('/admin');
    }
  }, [router]);

  return <>{children}</>;
}
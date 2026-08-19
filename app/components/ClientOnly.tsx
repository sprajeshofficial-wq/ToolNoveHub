"use client";

import { useEffect, useState, ReactNode } from "react";

interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * ClientOnly component that only renders children on the client side.
 * Prevents hydration mismatches for browser-only features.
 * 
 * @param children - The components to render on client
 * @param fallback - Optional fallback UI while waiting for client render
 */
export default function ClientOnly({ 
  children, 
  fallback = null 
}: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
'use client';

import { useEffect } from 'react';

interface ToolAnalyticsProps {
  toolName: string;
  toolCategory: string;
}

export function useToolAnalytics({ toolName, toolCategory }: ToolAnalyticsProps) {
  useEffect(() => {
    // Track page view with tool details
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: `${toolName} | ToolNoveHub`,
        page_location: window.location.href,
        page_path: window.location.pathname,
      });
    }

    // Track tool usage
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'tool_view', {
        tool_name: toolName,
        tool_category: toolCategory,
        tool_url: window.location.pathname,
      });
    }

    // Track time spent on tool
    const startTime = Date.now();

    return () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      if (typeof window !== 'undefined' && window.gtag && timeSpent > 5) {
        window.gtag('event', 'tool_time_spent', {
          tool_name: toolName,
          tool_category: toolCategory,
          time_seconds: timeSpent,
        });
      }
    };
  }, [toolName, toolCategory]);
}
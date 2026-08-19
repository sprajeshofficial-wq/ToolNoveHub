'use client';

interface UseToolActionsProps {
  toolName: string;
  toolCategory: string;
}

export function useToolActions(toolName: string, toolCategory: string) {
  const trackAction = (action: string, label?: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'tool_action', {
        tool_name: toolName,
        tool_category: toolCategory,
        action: action,
        action_label: label || '',
      });
    }
  };

  return { trackAction };
}
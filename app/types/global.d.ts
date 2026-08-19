// Type declarations for global objects
export {};

declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'set',
      action: string,
      params?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}
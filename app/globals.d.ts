// globals.d.ts
export {};

declare global {
  interface Window {
    mobileAndTabletCheck: () => boolean;
  }
}

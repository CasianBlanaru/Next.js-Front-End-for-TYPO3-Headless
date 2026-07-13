export function isDevToolsEnabled(): boolean {
  if (process.env.NEXT_PUBLIC_HEADLESS_DEVTOOLS === 'true') return true;
  if (process.env.NEXT_PUBLIC_HEADLESS_DEVTOOLS === 'false') return false;
  return process.env.NODE_ENV === 'development';
}

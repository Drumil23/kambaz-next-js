// Centralized client-side config values.
// Use `NEXT_PUBLIC_HTTP_SERVER` so Next.js exports it to the browser.
export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || 'http://localhost:4000';

// Debug: Log the server URL being used
if (typeof window !== 'undefined') {
  console.log('HTTP_SERVER configured as:', HTTP_SERVER);
}

import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Security headers carried over from the original deployment's .htaccess.
 *
 * The original also shipped a Content-Security-Policy in a <meta> tag. It is
 * intentionally NOT reproduced here: it whitelisted the Supabase project origin
 * and the two CDNs the single-file build loaded React from, none of which this
 * app uses any more. Add a CSP back when the real backend origin is known — it
 * will need a nonce-based script-src for Next's inline bootstrap.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "geolocation=(), camera=(), microphone=(), payment=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Hide the dev-only Next.js badge so local screenshots match production.
  devIndicators: false,
  // Pin the workspace root to this project. Without it Next walks up looking
  // for a lockfile and lands on the home directory.
  turbopack: {
    root: __dirname,
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // sw.js must always be revalidated, or an old worker keeps controlling
      // the app after a deploy. This mirrors the original .htaccess rule.
      {
        source: "/sw.js",
        headers: [{ key: "Cache-Control", value: "no-cache, must-revalidate" }],
      },
    ];
  },
};

export default nextConfig;

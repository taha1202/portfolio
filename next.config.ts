import type { NextConfig } from "next";

/**
 * Security posture notes (August 2026 Next.js security release):
 *
 * - GHSA-2xp9-vwfh-vxw4 — RCE via the Image Optimization API when optimising
 *   attacker-controlled AVIF input (libheif, reached through `sharp`).
 *   Fixed in >=16.3.3 by disabling AVIF. We additionally pin `formats` to
 *   WebP only so AVIF can never be re-enabled by a future default change.
 * - CVE-2026-75604 — RCE on Windows-hosted servers. Mitigated by running
 *   >=16.3.3; production is Linux (Vercel) regardless.
 *
 * `next` is pinned exactly in package.json — no caret — so a lockfile refresh
 * cannot silently roll back below the patched line.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    // Explicitly exclude AVIF. See GHSA-2xp9-vwfh-vxw4.
    formats: ["image/webp"],
    // No remote sources: nothing untrusted ever reaches the optimiser.
    remotePatterns: [],
    dangerouslyAllowSVG: false,
  },

  async headers() {
    const csp = [
      "default-src 'self'",
      // Next injects inline bootstrap scripts; 'unsafe-inline' is required
      // for the no-flash theme script and framework hydration payload.
      "script-src 'self' 'unsafe-inline'",
      // Fonts are self-hosted via next/font — no external font CDN needed.
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self' data:",
      "img-src 'self' data: blob:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

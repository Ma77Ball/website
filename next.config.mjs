/** @type {import('next').NextConfig} */
const nextConfig = {
  // Produces a minimal self-contained server in .next/standalone for a small Docker image.
  output: "standalone",
  reactStrictMode: true,
};

export default nextConfig;

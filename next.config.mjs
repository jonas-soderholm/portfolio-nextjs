// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

// const nextConfig = {
//   distDir: "dist", // Custom output directory
//   eslint: {
//     ignoreDuringBuilds: true, // Ignore ESLint during builds if desired
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Skip ESLint errors in production build if needed
  },
  output: "standalone", // optional: ensure Vercel builds a standalone app
};

export default nextConfig;

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
  output: "standalone", // Ensure standalone mode, compatible with Vercel's serverless functions
  eslint: {
    ignoreDuringBuilds: true, // Skip ESLint errors in production builds if necessary
  },
};

export default nextConfig;

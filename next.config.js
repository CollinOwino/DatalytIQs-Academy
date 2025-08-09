/** @type {import('next').NextConfig} */
const webpack = require("webpack");

const nextConfig = {
  experimental: {
    serverActions: {},
  },
  webpack(config) {
    // Polyfills for Node.js core modules in the browser
    config.resolve.fallback = {
      ...config.resolve.fallback,
      process: require.resolve("process/browser"),
      stream: require.resolve("stream-browserify"),
      crypto: require.resolve("crypto-browserify"),
      path: require.resolve("path-browserify"),
      fs: false, // Prevent polyfilling fs (not supported in browser)
    };

    // Fix "node:" scheme imports (like node:process) for compatibility
    config.resolve.alias = {
      ...config.resolve.alias,
      "node:process": "process/browser",
      "node:stream": "stream-browserify",
      "node:crypto": "crypto-browserify",
      "node:path": "path-browserify",
    };

    config.plugins = config.plugins || [];

    config.plugins.push(
      new webpack.ProvidePlugin({
        process: "process/browser",
        Buffer: ["buffer", "Buffer"],
      })
    );

    config.watchOptions = {
      ignored: ["**/node_modules"],
    };

    return config;
  },
};

module.exports = nextConfig;

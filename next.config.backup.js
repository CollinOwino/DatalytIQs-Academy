const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

const nextConfig = {
  experimental: {
    serverActions: {},
  },
  allowedDevOrigins: ["http://192.168.1.64:3000"],
  webpack: (config, { isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      assert: require.resolve("assert"),
      buffer: require.resolve("buffer"),
      crypto: require.resolve("crypto-browserify"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      os: require.resolve("os-browserify/browser"),
      path: require.resolve("path-browserify"),
      process: require.resolve("process/browser"),
      stream: require.resolve("stream-browserify"),
      url: require.resolve("url"),
      util: require.resolve("util"),
    };

    config.plugins.push(new NodePolyfillPlugin());

    return config;
  },
};

module.exports = nextConfig;

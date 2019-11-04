const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  assetPrefix: "./",
  env: {
    STATIC_PREFIX: isProduction ? "./static" : "/static",
  },
  exportPathMap: async (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) => {
    return !dev
      ? {
          "/panel": { page: "/panel.html" },
          "/live_config": { page: "/live_config.html" },
          "/config": { page: "/config.html" },
        }
      : defaultPathMap;
  },
  webpack(config, options) {
    config.optimization.minimize = false;
    return config;
  }
};

require("./env");
const plugins = require("./config/plugins");

module.exports = {
  webpack(config, { isServer }) {
    /* adds custom plugins to client and server */
    config.plugins.push(...plugins(isServer));

    /* return new config to next */
    return config;
  },
};

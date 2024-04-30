const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const dotenv = require('dotenv');
const webpack = require('webpack');

module.exports = function override(config, env) {
    // Remove ModuleScopePlugin to allow imports from outside the 'src' directory
    config.resolve.plugins = config.resolve.plugins.filter(
        (plugin) => !(plugin instanceof ModuleScopePlugin)
    );

    // Load environment variables from .env file
    const envConfig = dotenv.config().parsed;

    // Replace process.env.REACT_APP_ with environment variables from .env file
    Object.keys(envConfig).forEach((key) => {
        config.plugins.push(new webpack.DefinePlugin({
            [`process.env.${key}`]: JSON.stringify(envConfig[key])
        }));
    });

    return config;
};

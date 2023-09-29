const postcss = require('rollup-plugin-postcss');
const cssnano = require('cssnano');

module.exports = {
  rollup(config, options) {
    config.plugins = [
      postcss({
        plugins: [
          cssnano({
            preset: 'default',
          }),
        ],
        inject: true,
        extract: 'styles.css',
      }),
      ...config.plugins,
    ];

    return config;
  },
};

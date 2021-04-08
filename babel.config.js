module.exports = {
  presets: [['@babel/preset-env']],
  plugins: [
    '@babel/plugin-transform-runtime',
    {
      corejs: {
        version: 3,
        proposals: true
      },
      helpers: true,
      regenerator: true,
      useESModules: true
    }
  ],
  env: {
    test: {
      plugins: ['@babel/plugin-transform-modules-commonjs']
    }
  }
}

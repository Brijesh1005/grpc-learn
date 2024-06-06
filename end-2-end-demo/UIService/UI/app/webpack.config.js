const exec = require('child_process').exec;
const path = require('path');

module.exports = {
  mode: "production",
  entry: "./client.js",
  devServer: {
    static: {
      directory: path.join(__dirname),
    },
    compress: true,
    port: 8082
  },
  plugins: [
    {
      apply: (compiler) => {
        compiler.hooks.initialize.tap('initialize', (compilation) => {
          exec('../compile.sh', (err, stdout, stderr) => {
            if (stdout) process.stdout.write(stdout);
            if (stderr) process.stderr.write(stderr);
          });
        });
      }
    }
  ],
  optimization: {
    minimize: false
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
};

const path = require('path');

const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    mode: 'development',
    entry: [
      './src/client.js'
    ],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'web')
      },
    module: {
      rules: [
        {
            test: /\.css$/,
            use: [
              'vue-style-loader',
              'css-loader'
            ],
        },
        {
            test: /\.scss$/,
            use: [
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ],
          },
          {
            test: /\.sass$/,
            use: [
              'vue-style-loader',
              'css-loader',
              'sass-loader?indentedSyntax'
            ],
          },
          {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
              loaders: {
                // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                // the "scss" and "sass" values for the lang attribute to the right configs here.
                // other preprocessors should work out of the box, no loader config like this necessary.
                'scss': [
                  'vue-style-loader',
                  'css-loader',
                  'sass-loader'
                ],
                'sass': [
                  'vue-style-loader',
                  'css-loader',
                  'sass-loader?indentedSyntax'
                ]
              }
        }
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin()
    ]
  };
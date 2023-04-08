<h1 align="center">Welcome to webpack-manifest-version-sync-plugin 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> Webpack plugin for version sync between package.json and manifest.json.

This plugin will sync your `package.json` version into your `manifest.json`. So you don't need to manually edit `manifest.json`.

Use [npm version](https://docs.npmjs.com/cli/version) to bump your package version, and this plugin will ensure that it's in sync with `manifest.json`.

## Install

```sh
yarn add --dev webpack-manifest-version-sync-plugin
```

or

```sh
npm install webpack-manifest-version-sync-plugin --save-dev
```

## Usage

```js
const ManifestVersionSyncPlugin = require('webpack-manifest-version-sync-plugin');

{
  // Add it to your webpack.config.js
  plugins: [
    new ManifestVersionSyncPlugin({
      packagePath: 'package.json',
      manifestPath: 'manifest.json',
    }),
  ];
}
```

## Options

<table>
    <tr>
        <td>Parameter</td>
        <td>Description</td>
        <td>Default value</td>
    </tr>
    <tr>
        <td>packagePath</td>
        <td>Path to package.json. If you have your package.json in the project root, just omit this parameter.</td>
        <td>"package.json"</td>
    </tr>
    <tr>
        <td>manifestPath</td>
        <td>Path to you manifest.json. You can omit this parameter, if your manifest.json is located in modules root.</td>
        <td>"manifest.json"</td>
    </tr>
</table>

## Author

👤 **Eugene Dzhumak**

- Github: [@ElForastero](https://github.com/ElForastero)

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_

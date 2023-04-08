const fs = require('fs');

class ManifestVersionSyncPlugin {
  constructor(options) {
    const defaultOptions = {
      manifestPath: 'manifest.json',
      packagePath: 'package.json',
    };

    this.options = { ...defaultOptions, ...options };
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('ManifestVersionSyncPlugin', (compilation, compilationParams) => {
      compilation.hooks.afterProcessAssets.tap('ManifestVersionSyncPlugin', () => {
        const { packagePath, manifestPath } = this.options;

        // Skip watch mode
        if (compilation.options.watch || compilation.assets[manifestPath] == undefined) {
          return;
        }
  
        const { version } = JSON.parse(fs.readFileSync(packagePath).toString());
        const manifest = JSON.parse(compilation.assets[manifestPath].source().toString());
        const content = JSON.stringify({ ...manifest, version }, undefined, 2);
  
        compilation.assets[manifestPath] = {
          source: function() {
            return content;
          },
          size: function() {
            return Buffer.byteLength(content);
          },
        };
      });
    });
  }
}

module.exports = ManifestVersionSyncPlugin;

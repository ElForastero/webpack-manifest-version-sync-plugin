const fs = require('fs');

class ManifestVersionSyncPlugin {
  constructor(options) {
    this.options = { ...this.options, ...options };
  }

  options = {
    manifestPath: 'manifest.json',
    packagePath: 'package.json',
  };

  apply(compiler) {
    compiler.hooks.emit.tapAsync('ManifestVersionSyncPlugin', (compilation, callback) => {
      const { packagePath, manifestPath } = this.options;

      const { version } = JSON.parse(fs.readFileSync(packagePath).toString());
      const manifest = JSON.parse(compilation.assets[manifestPath].source().toString());
      const content = JSON.stringify({ ...manifest, version });

      compilation.assets[manifestPath] = {
        source: function() {
          return content;
        },
        size: function() {
          return Buffer.byteLength(content);
        },
      };

      callback();
    });
  }
}

module.exports = ManifestVersionSyncPlugin;

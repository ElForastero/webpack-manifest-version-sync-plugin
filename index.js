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
    compiler.hooks.emit.tapAsync('ManifestVersionSyncPlugin', (compilation, callback) => {
      // Skip watch mode
      if (compilation.options.watch) {
        return callback();
      }

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

const { describe, it, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert');

const { showVersion } = require('../src/commands/version.js');

describe('version command', () => {
  let consoleOutput;
  let originalLog;

  beforeEach(() => {
    consoleOutput = [];
    originalLog = console.log;
    console.log = (...args) => consoleOutput.push(args.join(' '));
  });

  afterEach(() => {
    console.log = originalLog;
  });

  describe('showVersion', () => {
    it('should output version string', () => {
      showVersion();

      assert.strictEqual(consoleOutput.length, 1);
    });

    it('should output valid semver format', () => {
      showVersion();

      const version = consoleOutput[0];
      const semverRegex = /^\d+\.\d+\.\d+$/;
      assert.ok(semverRegex.test(version), `Version "${version}" is not valid semver`);
    });

    it('should match package.json version', () => {
      showVersion();

      const version = consoleOutput[0];
      const pkg = require('../package.json');
      assert.strictEqual(version, pkg.version);
    });
  });
});

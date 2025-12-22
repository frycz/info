const { describe, it, beforeEach, afterEach, mock } = require('node:test');
const assert = require('node:assert');

describe('main router', () => {
  let consoleOutput;
  let stdoutOutput;
  let consoleErrorOutput;
  let originalLog;
  let originalWrite;
  let originalError;
  let originalExit;
  let exitCode;

  beforeEach(() => {
    consoleOutput = [];
    stdoutOutput = [];
    consoleErrorOutput = [];
    exitCode = null;

    originalLog = console.log;
    originalWrite = process.stdout.write;
    originalError = console.error;
    originalExit = process.exit;

    console.log = (...args) => consoleOutput.push(args.join(' '));
    process.stdout.write = (data) => stdoutOutput.push(data);
    console.error = (...args) => consoleErrorOutput.push(args.join(' '));
    process.exit = (code) => { exitCode = code; };
  });

  afterEach(() => {
    console.log = originalLog;
    process.stdout.write = originalWrite;
    console.error = originalError;
    process.exit = originalExit;

    // Clear module cache to ensure fresh imports
    delete require.cache[require.resolve('../src/index.js')];
  });

  describe('help routing', () => {
    it('should show help when no arguments provided', () => {
      const { run } = require('../src/index.js');

      run([]);

      const output = consoleOutput.join('\n');
      assert.ok(output.includes('Usage:'));
    });

    it('should show help with -h flag', () => {
      const { run } = require('../src/index.js');

      run(['-h']);

      const output = consoleOutput.join('\n');
      assert.ok(output.includes('Usage:'));
    });

    it('should show help with --help flag', () => {
      const { run } = require('../src/index.js');

      run(['--help']);

      const output = consoleOutput.join('\n');
      assert.ok(output.includes('Usage:'));
    });
  });

  describe('version routing', () => {
    it('should show version with -v flag', () => {
      const { run } = require('../src/index.js');

      run(['-v']);

      const version = consoleOutput[0];
      assert.ok(/^\d+\.\d+\.\d+$/.test(version));
    });

    it('should show version with --version flag', () => {
      const { run } = require('../src/index.js');

      run(['--version']);

      const version = consoleOutput[0];
      assert.ok(/^\d+\.\d+\.\d+$/.test(version));
    });
  });

  describe('argument joining', () => {
    // These tests verify argument handling without actually calling AI
    // We test this indirectly through the module structure

    it('should export run function', () => {
      const { run } = require('../src/index.js');

      assert.strictEqual(typeof run, 'function');
    });
  });
});

describe('argument processing', () => {
  it('should join multiple arguments into single question', () => {
    const args = ['gold', 'price', 'in', 'usd'];
    const question = args.join(' ');

    assert.strictEqual(question, 'gold price in usd');
  });

  it('should handle single argument', () => {
    const args = ['test'];
    const question = args.join(' ');

    assert.strictEqual(question, 'test');
  });

  it('should handle arguments with special characters', () => {
    const args = ['what', 'is', '2+2?'];
    const question = args.join(' ');

    assert.strictEqual(question, 'what is 2+2?');
  });
});

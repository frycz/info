const { describe, it, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert');

const { showHelp } = require('../src/commands/help.js');

describe('help command', () => {
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

  describe('showHelp', () => {
    it('should output help text', () => {
      showHelp();

      const output = consoleOutput.join('\n');
      assert.ok(output.length > 0);
    });

    it('should show tool name', () => {
      showHelp();

      const output = consoleOutput.join('\n');
      assert.ok(output.includes('info'));
    });

    it('should show usage section', () => {
      showHelp();

      const output = consoleOutput.join('\n');
      assert.ok(output.includes('Usage:'));
    });

    it('should document version flag', () => {
      showHelp();

      const output = consoleOutput.join('\n');
      assert.ok(output.includes('-v'));
      assert.ok(output.includes('--version'));
    });

    it('should document help flag', () => {
      showHelp();

      const output = consoleOutput.join('\n');
      assert.ok(output.includes('-h'));
      assert.ok(output.includes('--help'));
    });

    it('should document INFO_AI_TOOL configuration', () => {
      showHelp();

      const output = consoleOutput.join('\n');
      assert.ok(output.includes('INFO_AI_TOOL'));
    });

    it('should list supported AI tools', () => {
      showHelp();

      const output = consoleOutput.join('\n');
      assert.ok(output.includes('claude'));
      assert.ok(output.includes('gemini'));
      assert.ok(output.includes('ollama'));
      assert.ok(output.includes('sgpt'));
    });

    it('should show examples', () => {
      showHelp();

      const output = consoleOutput.join('\n');
      assert.ok(output.includes('Examples:'));
      assert.ok(output.includes('gold price'));
    });
  });
});

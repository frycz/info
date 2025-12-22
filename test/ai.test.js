const { describe, it, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert');

const { getAiCommand } = require('../src/utils/ai.js');

describe('AI utilities', () => {
  let originalEnv;

  beforeEach(() => {
    originalEnv = { ...process.env };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('getAiCommand', () => {
    describe('claude (default)', () => {
      it('should use claude by default when no env is set', () => {
        delete process.env.INFO_AI_TOOL;

        const cmd = getAiCommand('test prompt');

        assert.strictEqual(cmd, 'claude -p "test prompt"');
      });

      it('should use claude when INFO_AI_TOOL=claude', () => {
        process.env.INFO_AI_TOOL = 'claude';

        const cmd = getAiCommand('hello world');

        assert.strictEqual(cmd, 'claude -p "hello world"');
      });
    });

    describe('gemini', () => {
      it('should build gemini command', () => {
        process.env.INFO_AI_TOOL = 'gemini';

        const cmd = getAiCommand('test prompt');

        assert.strictEqual(cmd, 'gemini -p "test prompt"');
      });
    });

    describe('ollama', () => {
      it('should use default model llama3.2', () => {
        process.env.INFO_AI_TOOL = 'ollama';
        delete process.env.INFO_OLLAMA_MODEL;

        const cmd = getAiCommand('test');

        assert.strictEqual(cmd, 'ollama run llama3.2 "test"');
      });

      it('should use custom model from INFO_OLLAMA_MODEL', () => {
        process.env.INFO_AI_TOOL = 'ollama';
        process.env.INFO_OLLAMA_MODEL = 'mistral';

        const cmd = getAiCommand('test');

        assert.strictEqual(cmd, 'ollama run mistral "test"');
      });
    });

    describe('sgpt', () => {
      it('should build sgpt command', () => {
        process.env.INFO_AI_TOOL = 'sgpt';

        const cmd = getAiCommand('test prompt');

        assert.strictEqual(cmd, 'sgpt "test prompt"');
      });
    });

    describe('unsupported tool', () => {
      it('should throw error for unsupported tool', () => {
        process.env.INFO_AI_TOOL = 'unknown-tool';

        assert.throws(
          () => getAiCommand('test'),
          /Unsupported AI tool: unknown-tool/
        );
      });
    });

    describe('quote escaping', () => {
      it('should escape double quotes in prompt', () => {
        delete process.env.INFO_AI_TOOL;

        const cmd = getAiCommand('What is "hello" world?');

        assert.strictEqual(cmd, 'claude -p "What is \\"hello\\" world?"');
      });

      it('should escape multiple double quotes', () => {
        delete process.env.INFO_AI_TOOL;

        const cmd = getAiCommand('He said "hello" and she said "goodbye"');

        assert.strictEqual(cmd, 'claude -p "He said \\"hello\\" and she said \\"goodbye\\""');
      });

      it('should handle prompt with no quotes', () => {
        delete process.env.INFO_AI_TOOL;

        const cmd = getAiCommand('simple prompt');

        assert.strictEqual(cmd, 'claude -p "simple prompt"');
      });

      it('should escape quotes for all tools', () => {
        const testCases = [
          { tool: 'claude', expected: 'claude -p "test \\"quote\\""' },
          { tool: 'gemini', expected: 'gemini -p "test \\"quote\\""' },
          { tool: 'sgpt', expected: 'sgpt "test \\"quote\\""' },
        ];

        for (const { tool, expected } of testCases) {
          process.env.INFO_AI_TOOL = tool;
          const cmd = getAiCommand('test "quote"');
          assert.strictEqual(cmd, expected, `Failed for tool: ${tool}`);
        }
      });
    });

    describe('special characters', () => {
      it('should handle newlines in prompt', () => {
        delete process.env.INFO_AI_TOOL;

        const cmd = getAiCommand('line1\nline2');

        assert.strictEqual(cmd, 'claude -p "line1\nline2"');
      });

      it('should handle unicode characters', () => {
        delete process.env.INFO_AI_TOOL;

        const cmd = getAiCommand('What is the price in EUR?');

        assert.ok(cmd.includes('EUR'));
      });
    });
  });
});

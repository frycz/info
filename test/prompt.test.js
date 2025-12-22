const { describe, it, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert');
const path = require('path');
const fs = require('fs');

const { getMasterPrompt, buildPrompt } = require('../src/utils/prompt.js');

describe('prompt utilities', () => {
  describe('getMasterPrompt', () => {
    it('should return the master prompt content', () => {
      const prompt = getMasterPrompt();

      assert.ok(typeof prompt === 'string');
      assert.ok(prompt.length > 0);
      assert.ok(prompt.includes('info bot'));
      assert.ok(prompt.includes('Question:'));
    });

    it('should end with "Question:" followed by newline', () => {
      const prompt = getMasterPrompt();

      assert.ok(prompt.trimEnd().endsWith('Question:'));
    });
  });

  describe('buildPrompt', () => {
    it('should concatenate master prompt and user question', () => {
      const masterPrompt = 'You are a bot.\n\nQuestion:\n';
      const userQuestion = 'What is 2+2?';

      const result = buildPrompt(masterPrompt, userQuestion);

      assert.strictEqual(result, 'You are a bot.\n\nQuestion:\nWhat is 2+2?');
    });

    it('should handle empty user question', () => {
      const masterPrompt = 'System prompt\n';
      const userQuestion = '';

      const result = buildPrompt(masterPrompt, userQuestion);

      assert.strictEqual(result, 'System prompt\n');
    });

    it('should handle multi-word questions', () => {
      const masterPrompt = 'Prompt: ';
      const userQuestion = 'gold price in usd';

      const result = buildPrompt(masterPrompt, userQuestion);

      assert.strictEqual(result, 'Prompt: gold price in usd');
    });

    it('should handle special characters in question', () => {
      const masterPrompt = 'Q: ';
      const userQuestion = 'What is "quoted" text?';

      const result = buildPrompt(masterPrompt, userQuestion);

      assert.strictEqual(result, 'Q: What is "quoted" text?');
    });

    it('should preserve newlines in master prompt', () => {
      const masterPrompt = 'Line 1\nLine 2\n\nLine 3\n';
      const userQuestion = 'test';

      const result = buildPrompt(masterPrompt, userQuestion);

      assert.strictEqual(result, 'Line 1\nLine 2\n\nLine 3\ntest');
    });
  });
});

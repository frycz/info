const fs = require('fs');
const path = require('path');

function getMasterPrompt() {
  const promptPath = path.join(__dirname, '../../prompts/MASTER.md');

  try {
    return fs.readFileSync(promptPath, 'utf-8');
  } catch (err) {
    throw new Error(`Master prompt file not found: ${promptPath}`);
  }
}

function buildPrompt(masterPrompt, userQuestion) {
  return masterPrompt + userQuestion;
}

module.exports = { getMasterPrompt, buildPrompt };

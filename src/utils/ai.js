const { execSync } = require('child_process');

function escapeQuotes(str) {
  return str.replace(/"/g, '\\"');
}

function getAiCommand(prompt) {
  const tool = process.env.INFO_AI_TOOL || 'claude';

  switch (tool) {
    case 'claude':
    case 'gemini':
      return `${tool} -p "${escapeQuotes(prompt)}"`;
    case 'ollama':
      const model = process.env.INFO_OLLAMA_MODEL || 'llama3.2';
      return `ollama run ${model} "${escapeQuotes(prompt)}"`;
    case 'sgpt':
      return `sgpt "${escapeQuotes(prompt)}"`;
    default:
      throw new Error(`Unsupported AI tool: ${tool}`);
  }
}

function execAi(prompt) {
  const cmd = getAiCommand(prompt);

  try {
    return execSync(cmd, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] });
  } catch (err) {
    const tool = process.env.INFO_AI_TOOL || 'claude';

    if (err.code === 'ENOENT' || (err.stderr && err.stderr.includes('not found'))) {
      throw new Error(`AI tool '${tool}' is not installed. Please install it first.`);
    }

    if (err.stderr) {
      throw new Error(err.stderr);
    }

    throw err;
  }
}

module.exports = { getAiCommand, execAi };

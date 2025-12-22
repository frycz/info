const { showHelp } = require('./commands/help.js');
const { showVersion } = require('./commands/version.js');
const { getMasterPrompt, buildPrompt } = require('./utils/prompt.js');
const { execAi } = require('./utils/ai.js');

function run(args) {
  const firstArg = args[0];

  if (!firstArg || firstArg === '-h' || firstArg === '--help') {
    showHelp();
    return;
  }

  if (firstArg === '-v' || firstArg === '--version') {
    showVersion();
    return;
  }

  const question = args.join(' ');

  try {
    const masterPrompt = getMasterPrompt();
    const fullPrompt = buildPrompt(masterPrompt, question);
    const response = execAi(fullPrompt);
    process.stdout.write(response);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

module.exports = { run };

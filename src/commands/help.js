function showHelp() {
  console.log(`info - Quick answers from AI

Usage:
  info <question>     Ask a question
  info -v, --version  Show version
  info -h, --help     Show this help

Configuration - environment variables:
  INFO_AI_TOOL        AI tool to use (default: claude)
                      Supported: claude, gemini, ollama, sgpt
  INFO_OLLAMA_MODEL   Model to use with ollama (default: llama3.2)

Examples:
  info gold price
  info number of countries in the world
  info git log print nicely`);
}

module.exports = { showHelp };

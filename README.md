# info

Ask questions in natural language and get concise, formatted responses directly in your terminal.

`info` comes in handy when you want a quick lookup without changing the context. No need to run AI cli or switching to an UI-based tool. Just type `info git log print nicely` and you get `git log --oneline --graph --decorate`.

## Installation

```bash
npm install -g @frycz/info
```

## Prerequisites

You need at least one of the supported AI CLI tools installed:

- [Claude CLI](https://github.com/anthropics/claude-code) (default)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [Ollama](https://ollama.ai/)
- [ShellGPT](https://github.com/TheR1D/shell_gpt)

## Usage

```bash
info <question>
```

Simply type your question after `info`. All arguments are joined into a single query.

### Examples

```bash
info number of countries in the world
# 193

info capital of australia
# canberra

info mass of the sun in kg
# 1.989e30

info git log print nicely
# git log --oneline --graph --decorate
```

### Options

```
info -h, --help     Show help
info -v, --version  Show version
```

## Configuration

Configure via environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `INFO_AI_TOOL` | AI tool to use (`claude`, `gemini`, `ollama`, `sgpt`) | `claude` |
| `INFO_OLLAMA_MODEL` | Model to use with Ollama | `llama3.2` |

### Examples

```bash
# Use Gemini instead of Claude
export INFO_AI_TOOL=gemini

# Use Ollama with a specific model
export INFO_AI_TOOL=ollama
export INFO_OLLAMA_MODEL=mistral
```

## How It Works

The tool sends your question to an AI with a specialized system prompt that instructs it to:

- Respond with the shortest possible answer
- Use lowercase text only
- Return numbers without units (unless requested)
- Assume the most probable context for vague questions
- Return `ERR: <reason>` for unanswerable questions

## License

MIT

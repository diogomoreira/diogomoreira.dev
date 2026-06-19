---
title: "How to set up multiple Claude Code accounts"
categories: ["Tech"]
date: 2026-06-19T17:13:08-03:00
description: "Using aliases to run separate personal and professional Claude Code accounts from the same terminal."
tags: ["learning", "claude code", "ai tools", "til"]
cover: ""
credits: ""
disclaimer: ""
draft: true
---

I have been using Claude Code for both personal projects and work. Since each account has its own subscription and settings, I wanted separate CLI environments for each one.

The easiest way to do this is to use different `CLAUDE_CONFIG_DIR` values via shell aliases.
In your shell config file (for example, `.zshrc`), add:

```
alias claude-personal="CLAUDE_CONFIG_DIR=~/.claude-personal command claude"
alias claude-pro="CLAUDE_CONFIG_DIR=~/.claude-pro command claude"
```

With this setup, each alias keeps its own Claude Code session and config directory.

To avoid accidentally running the default `claude` command, you can override it:

```
alias claude="echo 'Use a specific command: claude-personal or claude-pro'"
```

After reloading your shell (`source ~/.zshrc`), run each alias once and sign in to the corresponding account.

---
title: Versioning .dotfiles
description: Why versioning dotfiles?
lang: en-us
status: draft
timestamp: "2023-04-28"
cover: dotfiles.jpeg
comments: true
category: development
tags: [dotfiles, shell, terminal, linux, macos]
---

> 💡 **tl/dr**; You can set up a new system using **dotfiles** and an installation script in minutes. This post tries to explains some things about dotfiles and we will build a repository together

**Dotfiles** are configuration files typically stored in a user's home directory (the directory represented by the symbol `~` on Unix-based operating systems) and that begin with a dot (`.`) in their file name.

These files are used to **store** settings for the various programs and tools that a user can use on their system. Files like `.bashrc`, `.zshrc`, `.vimrc` and `.gitconfig` are examples (just to name a few) that practically every user has on their machine.

Make a test on your machine and run the following command to view just some of the dotfiles that are in your user directory.

```bash
find ~ -type f -iname ".*" -maxdepth 1
```

For example, the file `.bashrc` is a configuration file for the **[Bash](https://www.gnu.org/software/bash/)** shell (a popular command-line interface for systems Unix-like). It can contain settings such as the **prompt displayed** when the shell is opened, **aliases** (or shortcuts) for frequently used commands, and custom functions. Another example is the `.vimrc` file is a configuration file for the **Vim** text editor and can contain settings such as the color scheme to use, the line format and custom keyboard shortcuts.

In this post, we will talk a little about how to start your dotfiles versioning, what to version, good practices, security issues and I will share with you my own version of **dotfiles**

## Why is this important?

Many users choose to manage their **dotfiles** using version control systems such as **Git** so that they can track changes to their configurations over time and easily synchronize their configurations when starting a new development environment on a new machine.

Imagine that your development machine, whether used for studies or work, has a problem that prevents you from continuing to use the system. Regardless of the reason, “fixing” this problem usually involves a new OS installation and all the work of reconfiguring a development environment from scratch. This new installation will certainly have a multitude of details that you usually configure little by little, over time, things like **color of your terminal**, **font of your text editor**, etc.

The objective of versioning your **dotfiles** is to save time with this process and maintain a development environment with your changes over time, being able to return to old configurations if something goes wrong during a change or there is simply a need to reconfigure the environment on a clean install of your OS.

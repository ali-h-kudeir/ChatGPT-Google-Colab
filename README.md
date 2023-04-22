# ChatGPT for Google Colab

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/ali-h-kudeir/chatgpt-google-colab/pre-release-build.yml)
![Visitors](https://visitor-badge.glitch.me/badge?page_id=ali-h-kudeir.chatgpt-google-colab&left_color=green&right_color=red)
[![Twitter Follow](https://img.shields.io/twitter/follow/ali_h_kudeir?style=social)](https://twitter.com/ali_h_kudeir)

A browser extension to interact with ChatGPT inside Google Colab code cells.


[Install from Chrome Web Store](https://chrome.google.com/webstore/detail/chatgpt-for-google-colab/dfhfeifekpgapdlhfakecbbinnnfoohh)

[Install from Mozilla Add-on Store](https://addons.mozilla.org/en-US/firefox/addon/chatgpt-for-google-colab/)

## Supported Jupyter notebook environments

Currently I'm only supporting Google Colab, and very soon to include Jupyter Notebook local and online versions as well.

## Screenshot

### Dark
![Screenshot](screenshots/extension.jpeg?raw=true)

### Light
![Screenshot](screenshots/extension-light.jpeg?raw=true)


## Features
- [x] Free
- [x] All features supported with your ChatGPT account. 
- [x] Pre-made prompts for code fixing, refactoring, summarizing, explaining, and comments adding.
- [x] A text area for custom ChatGPT with and without code context for generic interaction.
- [x] Dark & Light mode support.
- [x] Adapting to newly added code cells.
- [ ] Supporting other notebooks environments
- [x] Copying ChatGPT responses



## Troubleshooting

### How to make it work in Brave

![Screenshot](screenshots/brave.png?raw=true)

Disable "Prevent sites from fingerprinting me based on my language preferences" in `brave://settings/shields`

## Build from source

1. Clone the repo
2. Install dependencies with `npm`
3. `npm run build`
4. Load `build/chromium/` or `build/firefox/` directory to your browser

## Credit

This project is inspired by [Wong2/chatgpt-google-extension](https://github.com/wong2/chatgpt-google-extension/)

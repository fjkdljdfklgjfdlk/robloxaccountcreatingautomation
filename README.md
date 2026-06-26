# Roblox Account Creation Automation

An automated form-filling utility using Playwright to launch clean instances of Google Chrome on macOS, dynamically generate randomized account credentials, fill out the Roblox account creation form, and log the details locally.

> [!IMPORTANT]
> **Strict Environment Support:** This script relies explicitly on the local macOS filesystem layout and standard absolute application bundle paths (`/Applications/Google Chrome.app`). It is supported **ONLY** on macOS.

## 📥 Download Project

If you want to download the entire prepared project directory as a ready-to-run ZIP file instead of creating the files manually:

[![Download Zip](https://img.shields.io/badge/Download-Project_Files_src--zip-blue?style=for-the-badge&logo=github)](https://github.com/fjkdljdfklgjfdlk/robloxaccountcreatingautomation/archive/refs/heads/main.zip)

*(After downloading, extract the ZIP file on your Mac, open Terminal, navigate to the folder, and run `npm install`.)*

## The CAPTCHA Constraint & Timing Logic

Roblox employs highly sophisticated Arkose Labs anti-bot challenges (CAPTCHA) on account creation endpoints. Because completely automated background solving is mitigated by these security checkpoints, **manual intervention is required**.

### Execution Behavior
1. The script automatically launches Google Chrome, generates unique credentials, records them to `accounts.txt`, and populates the form fields seamlessly.
2. Once the registration triggers, Roblox will present a manual CAPTCHA challenge in the visible browser window.
3. **You must manually click and solve the CAPTCHA puzzle within the active browser window.**
4. If this defense bypass did not exist, the job would run fully autonomously; however, this approach handles all data generation and submission while leaving only the visual verification step to you.

To safely accommodate the time it takes for a human to complete these intricate puzzles, the session loop timeout has been structurally calibrated to a **3-minute window** (180,000 ms) before the active browser instance automatically terminates and cycles to the next account generation attempt.

## Features

- **Google Chrome Integration**: Automatically hooks into your local macOS Google Chrome application.
- **Session Isolation**: Spins up a completely isolated, fresh user profile environment on each run, mimicking a clean browser session every single time.
- **Dynamic Variable Generation**: Pure JavaScript algorithmic generation of random lowercase alphanumeric usernames (6-13 characters) appended with exactly 3 digits (e.g., `sahdkadhwqkh831`), alongside randomized secure passwords.
- **Automatic Logging**: Captures credentials inside the running context and streams them directly into a local `accounts.txt` file.
- **Automated Lifecycle**: Visibly loads the signup portal, populates inputs via a React framework value bypass, runs staggered submission hooks, waits exactly 3 minutes to permit manual CAPTCHA resolution, and tears down the browser context cleanly before recycling the loop.

## File Structure

```text
RobloxAccountCreation/
├── index.js          # Main Node.js automation loop and browser orchestrator
├── fillForm.js       # Web-context injection script (handles data generation and UI injection)
├── package.json      # Node project definition and dependency manifest
└── accounts.txt      # Generated output containing credential history (Auto-generated)

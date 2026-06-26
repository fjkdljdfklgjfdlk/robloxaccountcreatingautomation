# Roblox Account Creation Automation

An automated form-filling utility using Playwright to launch clean instances of Google Chrome on macOS, dynamically generate randomized account credentials, fill out the Roblox account creation form, and log the details locally.

> [!IMPORTANT]
> **Strict Environment Support:** This script relies explicitly on the local macOS filesystem layout and standard absolute application bundle paths (`/Applications/Google Chrome.app`). It is supported **ONLY** on macOS.

## 📥 Download Project

If you want to download the entire prepared project directory as a ready-to-run ZIP file instead of creating the files manually:

[![Download Zip](https://img.shields.io/badge/Download-Project_Files_src--zip-blue?style=for-the-badge&logo=github)](https://github.com/fjkdljdfklgjfdlk/robloxaccountcreatingautomation/archive/refs/heads/main.zip)

*(After downloading, extract the ZIP file on your Mac, open Terminal, navigate to the folder, and run `npm install`.)*

## How To Make It Work?

**Step 1:** Installing Node.js on your Mac
Before you can run any JavaScript or Playwright automation code, your operating system needs to have the Node.js runtime environment installed. Open your preferred web browser and go directly to nodejs.org. Download the recommended LTS (Long Term Support) installer package created specifically for macOS. Once downloaded, open the .pkg file from your Downloads directory and click through the standard installation software setup prompts. To make sure everything installed correctly, open up your Mac's Terminal app, type node -v, and press Enter. If a version string like v20.x.x appears, Node.js is ready to use.

**Step 2:** Extracting and Positioning the Project Folder
Next, you need to locate the project ZIP folder you downloaded from GitHub. Go to your user downloads folder and double-click the compressed archive to extract the folder. Make sure the newly extracted folder is renamed to exactly RobloxAccountCreation. Move this folder wherever you like, but for the path setup instructions in this guide, go to index.js 

**Step 3:** Navigating Terminal into the Directory
Your Terminal app doesn't know where your code lives until you point it there. Open Terminal and use the Change Directory command by running cd /Users/YourName/RobloxAccountCreation to lock the terminal window into your project workspace. If you want a quick trick to avoid typing the file path manually, you can simply type the letters cd  followed by a space, then drag-and-drop the physical RobloxAccountCreation folder from Finder straight into the Terminal panel, which will auto-complete the path string for you.

**Step 4:** Fetching the Core Dependencies
Now that your terminal is pointed at the right folder directory, you need to pull down the automation modules required to control Google Chrome. Run the package manager installation command by typing npm install and pressing Enter. The terminal will scan the project manifest configuration file (package.json), fetch the Playwright browser automation framework, and automatically generate a new local folder in your project workspace named node_modules containing everything required.

**Step 5:** Launching and Running the Automation
With the setup complete, you are ready to boot up the automated system loop. Run the execution script by entering npm start into your terminal window. The program will automatically launch a clean, visible, completely isolated instance of Google Chrome tracking directly from your /Applications/ directory and head straight to the Roblox signup homepage. The automation script will instantly generate random credentials, stream those account details directly into a local text spreadsheet layout named accounts.txt, populate all the on-screen form fields, and click the registration signup action.

**Step 6:** Handling the Manual CAPTCHA Process
Because Roblox monitors its account endpoints with advanced Arkose Labs security, you will immediately be prompted with an interactive visual CAPTCHA verification puzzle right inside the running Google Chrome window. You must quickly click on the Chrome window and manually solve the verification challenge myself. To ensure you have plenty of time to solve these puzzles without the software breaking, the execution loop is hardcoded to sit open and wait for exactly 3 minutes (180 seconds). Once that time expires, the script automatically terminates the current browser window session, clears out the active profile footprint data, launches a fresh guest user profile, and restarts the automation step for the next account. If you ever need to stop the entire continuous generation process completely, click back onto the Terminal application window and press Control + C on your keyboard to kill the execution threads safely.


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
- **Automated Lifecycle**: Visibly loads the signup portal, populates inputs via a React framework value bypass, runs staggered submission hooks, waits exactly 3 minutes (you can change that in index.js) to permit manual CAPTCHA resolution, and tears down the browser context cleanly before recycling the loop. 

## File Structure (Use this if something is missing).

```text
RobloxAccountCreation/
├── index.js          # Main Node.js automation loop and browser orchestrator
├── fillForm.js       # Web-context injection script (handles data generation and UI 
├── package.json      # Node project definition and dependency manifest
├── accounts.txt      # Generated output containing credential history (Auto-generated)
├── node_modules      # Folder for Playwright.

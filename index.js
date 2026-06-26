import { chromium } from "playwright";
import fs from "fs/promises";
import path from "path";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function run() {
  console.log("Starting account creation loop... Press Ctrl+C to stop.");
  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

  while (true) {
    let context;
    try {
      // Create a unique temporary directory name for this specific session
      // This acts exactly like opening a brand new Guest/Incognito window
      const uniqueSessionId = `session-${Date.now()}`;
      const userDataDir = path.join(process.cwd(), '.chrome-profiles', uniqueSessionId);

      console.log(`\nLaunching a fresh Chrome window (${uniqueSessionId})...`);

      // Launch standard Chrome visibly
      context = await chromium.launchPersistentContext(userDataDir, {
        executablePath: chromePath,
        headless: false, // Runs visibly on your Mac screen
        viewport: null,   // Lets it use normal browser scaling
        args: ['--start-maximized']
      });
      
      const page = context.pages()[0] || await context.newPage();
      await page.goto("https://roblox.com/CreateAccount");

      // Wait a brief moment for the page elements to parse fully
      await delay(2000);

      // 1. Read your form-filling script
      const script = await fs.readFile("fillForm.js", "utf8");
      
      // 2. Execute the script and catch the generated credentials object
      const credentials = await page.evaluate(script); 

      if (credentials && credentials.username) {
        console.log(`Successfully generated and logged: ${credentials.username}`);
        
        // 3. Write the credentials to accounts.txt automatically
        const accountLog = `Username: ${credentials.username} | Password: ${credentials.password} | Created: ${new Date().toLocaleString()}\n`;
        await fs.appendFile("accounts.txt", accountLog, "utf8");
      }

      // Keep the window open for exactly 15 seconds (15000 ms) before closing
      console.log("Waiting 25 seconds before closing the window...");
      await delay(60000);

    } catch (error) {
      console.error("Error running cycle:", error);
    } finally {
      // 4. Close the browser context completely when finished with this account
      if (context) {
        console.log("Closing browser window...");
        await context.close();
      }
      
      // Short breath pause before spinning up the next automated window
      await delay(2000);
    }
  }
}

run();
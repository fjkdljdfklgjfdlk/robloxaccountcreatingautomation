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
      
      const uniqueSessionId = `session-${Date.now()}`;
      const userDataDir = path.join(process.cwd(), '.chrome-profiles', uniqueSessionId);

      console.log(`\nLaunching a fresh Chrome window (${uniqueSessionId})...`);

    
      context = await chromium.launchPersistentContext(userDataDir, {
        executablePath: chromePath,
        headless: false, 
        viewport: null,   
        args: ['--start-maximized']
      });
      
      const page = context.pages()[0] || await context.newPage();
      await page.goto("https://roblox.com/CreateAccount");

      
      await delay(2000);

      
      const script = await fs.readFile("fillForm.js", "utf8");
      
      
      const credentials = await page.evaluate(script); 

      if (credentials && credentials.username) {
        console.log(`Successfully generated and logged: ${credentials.username}`);
        
        
        const accountLog = `Username: ${credentials.username} | Password: ${credentials.password} | Created: ${new Date().toLocaleString()}\n`;
        await fs.appendFile("accounts.txt", accountLog, "utf8");
      }

      
      console.log("Waiting 3 minutes before closing the window...");
      await delay(60000);

    } catch (error) {
      console.error("Error running cycle:", error);
    } finally {
      
      if (context) {
        console.log("Closing browser window...");
        await context.close();
      }
      
      
      await delay(2000);
    }
  }
}

run();

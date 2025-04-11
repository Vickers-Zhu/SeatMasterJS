#!/usr/bin/env node

/**
 * rebuild-ios.js
 *
 * This script automates the process of rebuilding the iOS app with the latest changes.
 * It runs the following steps in sequence:
 * 1. Clean and prepare the project with expo prebuild
 * 2. Execute post-prebuild customizations
 * 3. Build and run the iOS app
 */

const { execSync } = require("child_process");
const chalk = require("chalk");

// Helper to run commands and log them nicely
function runCommand(command, description) {
  console.log(chalk.cyan(`\n📦 ${description}...\n`));
  try {
    execSync(command, { stdio: "inherit" });
    console.log(chalk.green(`✅ ${description} completed successfully\n`));
    return true;
  } catch (error) {
    console.error(chalk.red(`❌ Error during ${description.toLowerCase()}:`));
    console.error(chalk.red(error.message));
    return false;
  }
}

// Main execution sequence
async function rebuildIOS() {
  console.log(chalk.blue("🚀 Starting iOS rebuild process\n"));

  // Step 1: Clean and prebuild
  if (
    !runCommand("npx expo prebuild --clean", "Cleaning and prebuilding project")
  ) {
    process.exit(1);
  }

  // Step 2: Run post-prebuild script
  if (
    !runCommand(
      "node scripts/post-prebuild.js",
      "Running post-prebuild customizations"
    )
  ) {
    process.exit(1);
  }

  // Step 3: Run iOS app
  if (!runCommand("npx expo run:ios", "Building and running iOS app")) {
    process.exit(1);
  }

  console.log(
    chalk.green.bold("🎉 iOS rebuild process completed successfully!")
  );
}

// Run the script
rebuildIOS().catch((error) => {
  console.error(chalk.red("Unexpected error during rebuild:"), error);
  process.exit(1);
});

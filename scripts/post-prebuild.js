// scripts/post-prebuild.js
const fs = require("fs");
const path = require("path");
const xcode = require("xcode");

// Path to the Xcode project
const projectPath = path.join(
  __dirname,
  "..",
  "ios",
  "seatmasterjs.xcodeproj",
  "project.pbxproj"
);
const project = xcode.project(projectPath);

// Parse the project
project.parseSync();

const target = project.getFirstTarget();
if (!target) {
  throw new Error("No iOS target found in the Xcode project.");
}

const shellScript = `#!/bin/sh
set -e

# Define source and destination paths
SOURCE_DIR="$PROJECT_DIR/../assets/3d_build"
TARGET_DIR="$CONFIGURATION_BUILD_DIR/$UNLOCALIZED_RESOURCES_FOLDER_PATH/3d_build"

# Ensure the target directory is clean
rm -rf "$TARGET_DIR"

# Copy the directory
cp -R "$SOURCE_DIR" "$TARGET_DIR"
`;

// Define an output path for the script
const outputPath =
  "$CONFIGURATION_BUILD_DIR/$UNLOCALIZED_RESOURCES_FOLDER_PATH/3d_build";

// Add the build phase
project.addBuildPhase(
  [], // Empty array for file paths
  "PBXShellScriptBuildPhase", // Build phase type
  "Copy 3D Build", // Comment
  target.uuid, // Target UUID
  {
    inputPaths: [], // Ensure inputPaths is an empty array
    outputPaths: [outputPath], // Add an output path
    shellPath: "/bin/sh", // Define the shell interpreter
    shellScript, // Inline shell script
  },
  null // Subfolder path (not applicable for Shell Script phase)
);

// Write the updated project back to disk
fs.writeFileSync(projectPath, project.writeSync());
console.log('Successfully added "Copy 3D Build" script to the iOS project.');

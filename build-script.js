const fs = require('fs');
const path = require('path');
const fsExtra = require('fs-extra'); // Ensure you have fs-extra installed

// Function to replace a placeholder in script.js
function replaceApiKeyInScript(scriptPath, apiKey) {
  let scriptContent = fs.readFileSync(scriptPath, 'utf8');
  scriptContent = scriptContent.replace('const apiKey = "YOUR_PLACEHOLDER";', `const apiKey = "${apiKey}";`);
  fs.writeFileSync(scriptPath, scriptContent);
}

// Function to copy all files to the 'public' directory
function copyToPublicDirectory(source, destination) {
  fsExtra.ensureDirSync(destination); // Ensure the destination directory exists
  fsExtra.copySync(source, destination); // Copy everything from source to destination
}

// Replace placeholder in script.js
const scriptFilePath = path.join(__dirname, 'script.js'); // Path to your script.js
replaceApiKeyInScript(scriptFilePath, process.env.API_KEY);

// After processing, copy all necessary files to 'public'
const sourceDirectory = path.join(__dirname, 'your_output_directory'); // Replace with your actual output directory
const publicDirectory = path.join(__dirname, 'public');
copyToPublicDirectory(sourceDirectory, publicDirectory);

console.log('Build process completed and files copied to public directory.');

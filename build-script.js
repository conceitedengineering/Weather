const fs = require('fs');
const path = require('path');

// Function to replace a placeholder in script.js
function replaceApiKeyInScript(scriptPath, apiKey) {
  let scriptContent = fs.readFileSync(scriptPath, 'utf8');
  scriptContent = scriptContent.replace('const apiKey = "YOUR_PLACEHOLDER";', `const apiKey = "${apiKey}";`);
  fs.writeFileSync(scriptPath, scriptContent);
}

// Function to copy all files to the 'public' directory using native fs module
function copyToPublicDirectory(source, destination) {
  if (!fs.existsSync(destination)){
    fs.mkdirSync(destination, { recursive: true });
  }

  const files = fs.readdirSync(source);
  for (const file of files) {
    const srcPath = path.join(source, file);
    const destPath = path.join(destination, file);
    fs.copyFileSync(srcPath, destPath);
  }
}

// Replace placeholder in script.js
const scriptFilePath = path.join(__dirname, 'script.js'); // Path to your script.js
replaceApiKeyInScript(scriptFilePath, process.env.API_KEY);

// After processing, copy all necessary files to 'public'
//const sourceDirectory = path.join(__dirname, 'your_output_directory'); // Replace with your actual output directory
const publicDirectory = path.join(__dirname, 'public');
copyToPublicDirectory(sourceDirectory, publicDirectory);

console.log('Build process completed and files copied to public directory.');

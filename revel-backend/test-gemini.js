const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('❌ GEMINI_API_KEY is not set in .env file.');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function listAllModels() {
  console.log('Fetching list of models from API...');
  try {
    // Note: The newer SDK version has genAI.listModels() or similar methods. Let's try calling it.
    // Or we can perform a direct HTTP fetch using the REST API to be absolutely sure.
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errText}`);
    }
    const data = await response.json();
    console.log('✅ Success! Found models:');
    if (data.models) {
      data.models.forEach(m => {
        console.log(`- Name: ${m.name} (Display: ${m.displayName})`);
        console.log(`  Supported Methods: ${m.supportedGenerationMethods.join(', ')}`);
      });
    } else {
      console.log('No models returned in response data:', data);
    }
  } catch (err) {
    console.error('❌ Failed to list models:', err.message);
  }
}

listAllModels();

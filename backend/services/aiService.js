const dotenv = require('dotenv');
const { GoogleGenAI } = require('@google/genai');
dotenv.config();

const genAI = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const getTaskSuggestions = async (req, res) => {
    try {
        const taskTitle = req.body.title || "Default Task Title";
        const prompt = `I want to assign JIRA story to my employee. Now for my task title I need task description and time required to complete the task: ${taskTitle}`

        const response = await genAI.models.generateContent({
            model: 'gemini-1.5-flash',
            contents: prompt
        });
        console.log('Task Suggestions:', response.text);
        
        return res.status(200).json({ suggestions: response.text });

    } catch (error) {
        console.error('Error fetching task suggestions:', error);
        return "Error fetching task suggestions";
    }
}

const chatbotGemini = async (req, res) => {
    try {
        const userPrompt = req.body.prompt || "Hello, how can I assist you today?";
        const response = await genAI.models.generateContent({
            model: 'gemini-1.5-flash',
            contents: userPrompt
        });
        console.log('Gemini Reply:', response.text);
        
        return res.status(200).json({ reply: response.text });

    } catch (error) {
        console.error('Error fetching task suggestions:', error);
        return "Error fetching task suggestions";
    }
}

module.exports = {
    getTaskSuggestions,
    chatbotGemini
};
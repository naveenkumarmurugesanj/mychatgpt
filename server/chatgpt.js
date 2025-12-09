const { GoogleGenAI } = require("@google/genai");

const googleAI = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const chatGPT = async (req, res) => {

    const response = await googleAI.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: req.body.userQuery,
    })
    let gptAnswer = response?.candidates[0]?.content?.parts[0]?.text
    let resFormat = { code: 200, status: "success", response: gptAnswer }
    return resFormat;
}

module.exports = { chatGPT };
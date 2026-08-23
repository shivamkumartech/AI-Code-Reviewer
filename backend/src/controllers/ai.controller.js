import aiService from "../services/ai.service.js"

export const getReview = async (req, res) => {
    
    const prompt = req.query.prompt

    if (!prompt) {
        return res.status(400).send("Prompt is Required")
    }

    const responce = await aiService(prompt)

    res.send(responce)
}
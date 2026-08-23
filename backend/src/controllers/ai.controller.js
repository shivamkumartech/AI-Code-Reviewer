import aiService from "../services/ai.service.js"

export const getReview = async (req, res) => {
    try {
        const {code}  = req.body;

        if (!code) {
            return res.status(400).send("Code is Required");
        }

        const response = await aiService(code);

        res.send(response);

    } catch (error) {
        console.error("AI Service Error: ", error.message);
        
        res.status(500).send("Something went wrong while generating the review.");
    }
}
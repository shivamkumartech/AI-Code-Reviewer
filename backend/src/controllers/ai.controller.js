import generateContent from "../services/ai.service.js";

export const getReview = async (req, res) => {
  try {
    const { code } = req.body;

        if (!code) {
            return res.status(400).send("Code is Required");
    }

    const response = await generateContent(code);
    return res.status(200).send(response);
  } catch (error) {
    console.error("AI Controller Error:", error);
    return res.status(500).json({
      message: "Something went wrong while generating the code review.",
      error: error.message,
    });
  }
};
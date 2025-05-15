const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { InferenceClient } = require("@huggingface/inference");

dotenv.config();


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const hf = new InferenceClient(process.env.HF_ACCESS_TOKEN);

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention. Format your response in markdown to make it easier to render to a web page.
`;

app.post("/api/recipe", async (req, res) => {
  const { ingredients } = req.body;

  try {
    const response = await hf.chatCompletion({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `I have ${ingredients.join(", ")}. What recipe can I make?` },
      ],
      max_tokens: 1024,
    });

    res.json({ recipe: response.choices[0].message.content });
  } catch (err) {
    console.error("Error from Hugging Face:", err.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));

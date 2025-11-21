import express from "express";
import OpenAI from "openai";

const app = express();
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/translate", async (req, res) => {
  const { translations } = req.body;

  const text = JSON.stringify(translations, null, 2);

  const result = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "Translate all incoming JSON values into natural English. Do not change the JSON keys."
      },
      {
        role: "user",
        content: text
      }
    ]
  });

  const translated = JSON.parse(result.choices[0].message.content);
  res.json(translated);
});

app.listen(3001, () => console.log("API running"));

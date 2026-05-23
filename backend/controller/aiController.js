import dotenv from "dotenv";
dotenv.config();
export const generateInterviewPrep = async (req, res) => {
  const { company, role, tags } = req.body;

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content:
                "You are an expert interview coach. Generate interview prep material in JSON format only. No markdown, no explanation, just raw JSON.",
            },
            {
              role: "user",
              content: `Generate 5 likely interview questions with suggested answers for this job:
Company: ${company}
Role: ${role}
Skills/Tags: ${tags?.join(", ")}

Respond ONLY with this JSON format, no other text:
{
  "questions": [
    {
      "question": "question here",
      "answer": "suggested answer here",
      "type": "technical | behavioral | situational"
    }
  ]
}`,
            },
          ],
          temperature: 0.7,
          max_tokens: 2000,
        }),
      },
    );

    const data = await response.json();
    const text = data.choices[0].message.content;
    const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());

    res.status(200).json({ ok: true, data: parsed });
  } catch (error) {
    res.status(400).json({ ok: false, error: error.message });
  }
};

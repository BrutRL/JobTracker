import dotenv from "dotenv";
dotenv.config();
import { User } from "../model/userModel.js";
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
export const analyzeJobDescription = async (req, res) => {
  const { description, userSkills, jobTags } = req.body;

  if (!description) {
    return res
      .status(400)
      .json({ ok: false, message: "Job description is required" });
  }
  const user = await User.findById(req.userId).select("skills");
  const skills = userSkills?.length ? userSkills : user?.skills || [];

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
                "You are an expert job market analyst. Analyze job descriptions and return structured JSON only. No markdown, no explanation, just raw JSON.",
            },
            {
              role: "user",
              content: `Analyze this job description and return insights.

Job Description:
${description}

Candidate's skills: ${skills.join(", ") || "none provided"}
Job requirements/tags: ${jobTags?.join(", ") || "none provided"}

Respond ONLY with this exact JSON format:
{
  "summary": "2 sentence summary of the role",
  "requiredSkills": ["skill1", "skill2"],
  "niceToHaveSkills": ["skill1", "skill2"],
  "experienceLevel": "Junior | Mid | Senior",
  "yearsOfExperience": "e.g. 2-3 years",
  "salaryEstimate": "e.g. ₱40,000 - ₱60,000/mo",
  "matchScore": 75,
  "matchedSkills": ["skills user has that match"],
  "missingSkills": ["skills user lacks"],
  "redFlags": ["any concerning things in the JD or empty array if none"],
  "verdict": "Strong Match | Good Match | Partial Match | Low Match"
}`,
            },
          ],
          temperature: 0.3,
          max_tokens: 1000,
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

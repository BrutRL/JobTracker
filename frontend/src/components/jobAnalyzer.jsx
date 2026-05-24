import { useState } from "react";
import { analyzeJobDescription } from "@/api/ai";

const VERDICT_COLORS = {
  "Strong Match": { bg: "#3DDC8420", color: "#3DDC84" },
  "Good Match": { bg: "#4A90D920", color: "#4A90D9" },
  "Partial Match": { bg: "#F0A50020", color: "#F0A500" },
  "Low Match": { bg: "#E05C6B20", color: "#E05C6B" },
};

export default function JobAnalyzer({ job }) {
  const [description, setDescription] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!description.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await analyzeJobDescription({
        description,
        userTags: job.tags || [],
      });
      setResult(data);
    } catch (err) {
      setError("Failed to analyze. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (result) {
    const verdict =
      VERDICT_COLORS[result.verdict] || VERDICT_COLORS["Partial Match"];

    return (
      <div className="flex flex-col gap-4">
        {/* verdict */}
        <div
          className="flex items-center gap-3 p-3 rounded-lg"
          style={{
            backgroundColor: verdict.bg,
            border: `0.5px solid ${verdict.color}30`,
          }}
        >
          <div className="flex-1">
            <p className="text-white text-[14px] font-medium">
              {result.verdict}
            </p>
            <p className="text-[#6E7681] text-[11px] mt-0.5">
              {result.summary}
            </p>
          </div>
          <div
            className="text-[20px] font-bold"
            style={{ color: verdict.color, fontFamily: "Geist Mono" }}
          >
            {result.matchScore}%
          </div>
        </div>

        {/* match score bar */}
        <div>
          <div className="flex justify-between mb-1">
            <p className="text-[#6E7681] text-[11px]">Match score</p>
            <p className="text-[11px]" style={{ color: verdict.color }}>
              {result.matchScore}%
            </p>
          </div>
          <div className="w-full bg-[#21262D] rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all duration-500"
              style={{
                width: `${result.matchScore}%`,
                backgroundColor: verdict.color,
              }}
            />
          </div>
        </div>

        {/* job details */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#21262D] rounded-lg p-3">
            <p className="text-[#6E7681] text-[11px] mb-1">Experience</p>
            <p className="text-white text-[13px]">{result.experienceLevel}</p>
            <p className="text-[#6E7681] text-[11px]">
              {result.yearsOfExperience}
            </p>
          </div>
          <div className="bg-[#21262D] rounded-lg p-3">
            <p className="text-[#6E7681] text-[11px] mb-1">Salary Estimate</p>
            <p className="text-white text-[13px]">{result.salaryEstimate}</p>
          </div>
        </div>

        {/* matched skills */}
        {result.matchedSkills?.length > 0 && (
          <div>
            <p className="text-[#6E7681] text-[11px] mb-2">✓ Skills you have</p>
            <div className="flex flex-wrap gap-1">
              {result.matchedSkills.map((skill, i) => (
                <span
                  key={i}
                  className="text-[11px] px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: "#3DDC8420", color: "#3DDC84" }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* missing skills */}
        {result.missingSkills?.length > 0 && (
          <div>
            <p className="text-[#6E7681] text-[11px] mb-2">✗ Skills to learn</p>
            <div className="flex flex-wrap gap-1">
              {result.missingSkills.map((skill, i) => (
                <span
                  key={i}
                  className="text-[11px] px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: "#E05C6B20", color: "#E05C6B" }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* required skills */}
        {result.requiredSkills?.length > 0 && (
          <div>
            <p className="text-[#6E7681] text-[11px] mb-2">Required skills</p>
            <div className="flex flex-wrap gap-1">
              {result.requiredSkills.map((skill, i) => (
                <span
                  key={i}
                  className="text-[11px] px-2 py-0.5 rounded-full bg-[#21262D] text-[#6E7681]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* red flags */}
        {result.redFlags?.length > 0 && (
          <div
            className="p-3 rounded-lg"
            style={{
              backgroundColor: "#E05C6B10",
              border: "0.5px solid #E05C6B30",
            }}
          >
            <p className="text-[#E05C6B] text-[12px] mb-2 flex items-center gap-1">
              Red flags
            </p>
            {result.redFlags.map((flag, i) => (
              <p key={i} className="text-[#6E7681] text-[11px] mb-1">
                • {flag}
              </p>
            ))}
          </div>
        )}

        <button
          onClick={() => setResult(null)}
          className="w-full border border-white/10 text-[#6E7681] py-2 rounded-lg text-[13px] hover:text-white transition-colors"
        >
          Analyze another
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <p className="text-white text-[14px]">Job Description Analyzer</p>
      </div>
      <p className="text-[#6E7681] text-[12px]">
        Paste the job description and AI will analyze your match score, required
        skills, salary estimate and red flags.
      </p>

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Paste the full job description here..."
        className="w-full bg-[#21262D] text-white rounded-lg px-3 py-2 text-[13px] outline-none resize-none h-[160px] focus:ring-1 focus:ring-[#F0A500] placeholder:text-[#6E7681]"
      />

      {error && <p className="text-[#E05C6B] text-[12px]">{error}</p>}

      <button
        onClick={handleAnalyze}
        disabled={isLoading || !description.trim()}
        className="w-full flex items-center justify-center gap-2 bg-[#F0A500] text-[#0D1117] py-3 rounded-lg text-[13px] hover:opacity-90 disabled:opacity-50"
      >
        {isLoading ? "Analyzing..." : "Analyze Job Description"}
      </button>
    </div>
  );
}

import { useState } from "react";
import { Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { generateInterviewPrep } from "@/api/ai";

const TYPE_COLORS = {
  technical: { bg: "#4A90D920", color: "#4A90D9" },
  behavioral: { bg: "#3DDC8420", color: "#3DDC84" },
  situational: { bg: "#F0A50020", color: "#F0A500" },
};

export default function InterviewPrep({ job }) {
  const [prep, setPrep] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await generateInterviewPrep({
        company: job.company,
        role: job.role,
        tags: job.tags,
      });
      setPrep(data);
    } catch (err) {
      setError("Failed to generate. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {!prep ? (
        <div className="flex flex-col items-center gap-4 py-8">
          <div className="w-12 h-12 rounded-full bg-[#F0A500]/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-[#F0A500]" />
          </div>
          <div className="text-center">
            <p className="text-white text-[14px] mb-1">AI Interview Prep</p>
            <p className="text-[#6E7681] text-[12px]">
              Generate likely interview questions and suggested answers for{" "}
              <span className="text-white">{job.company}</span>
            </p>
          </div>
          {error && <p className="text-[#E05C6B] text-[12px]">{error}</p>}
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="flex items-center gap-2 bg-[#F0A500] text-[#0D1117] px-6 py-2.5 rounded-lg text-[13px] hover:opacity-90 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            {isLoading ? "Generating..." : "Generate Interview Prep"}
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-white text-[14px]">Interview Questions</p>
            <button
              onClick={() => setPrep(null)}
              className="text-[#6E7681] text-[12px] hover:text-white"
            >
              Regenerate
            </button>
          </div>

          {prep.questions.map((item, index) => (
            <div
              key={index}
              className="bg-[#21262D] rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setExpanded(expanded === index ? null : index)}
                className="w-full flex items-start justify-between p-3 text-left gap-2"
              >
                <p className="text-white text-[13px] flex-1">{item.question}</p>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full capitalize"
                    style={{
                      backgroundColor:
                        TYPE_COLORS[item.type]?.bg || "#6E768120",
                      color: TYPE_COLORS[item.type]?.color || "#6E7681",
                    }}
                  >
                    {item.type}
                  </span>
                  {expanded === index ? (
                    <ChevronUp className="w-4 h-4 text-[#6E7681]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#6E7681]" />
                  )}
                </div>
              </button>

              {expanded === index && (
                <div className="px-3 pb-3 border-t border-white/5">
                  <p className="text-[#6E7681] text-[12px] mb-1 mt-2">
                    Suggested answer
                  </p>
                  <p className="text-white text-[13px] leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}

          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 border border-white/10 text-[#6E7681] py-2 rounded-lg text-[13px] hover:text-white hover:border-white/20 transition-colors disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            {isLoading ? "Regenerating..." : "Regenerate"}
          </button>
        </div>
      )}
    </div>
  );
}

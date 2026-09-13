"use client";
import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
export interface QuestionType {
  question: string;
  correctAnswer: string;
  userAnswer: string;
  isCorrect: boolean;
  explanation: string;
}
export interface SubmitResultType {
  id: string;
  quizScore: number;
  questions: QuestionType[];
  category: string;
  improvementTip: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}
interface QuizResultProps {
  submitResult: SubmitResultType;
  startNewQuizFn?: () => void;
  showNewQuizBtn?: boolean;
  previousScore?: number;
}
export default function QuizResult({
  submitResult,
  startNewQuizFn,
  showNewQuizBtn = true,
  previousScore,
}: QuizResultProps) {
  const [filter, setFilter] = useState("all");
  const id = useId();
  const correct = submitResult.questions.filter((q) => q.isCorrect).length;
  const delta =
    previousScore === undefined ? null : submitResult.quizScore - previousScore;
  return (
    <div className="assessment-results py-4 px-0">
      <p className="eyebrow flex items-center text-primary text-[0.6875rem] leading-[1.6] tracking-[0.12em] font-medium [.landing-stories_&]:mb-[1.5625rem] [.story-documents_&]:text-[#8eafb8] [.workspace-sidebar_>_&]:text-[#91a5ad] [.workspace-sidebar_>_&]:pl-3 [@media(width<=850px)]:[.workspace-sidebar_>_&]:hidden gap-2.5">
        ANOTHER STEP FORWARD / {submitResult.category.toUpperCase()}
      </p>
      <div className="result-summary flex [@media(width<=480px)]:[align-items:start] items-center [@media(width<=480px)]:flex-col bg-transparent [background-image:radial-gradient(ellipse_at_10%_40%,_#1e3c48,_#102028_75%)] my-7.5 border-[#456674] rounded-[9px] [@media(width<=480px)]:gap-6 [@media(480px<width<=750px)]:gap-[1.4375rem] gap-[2.8125rem]">
        <div className="result-score [@media(width<=750px)]:pr-[1.4375rem] pr-10 border-r [@media(width<=480px)]:[border-right-style:none] [border-right-style:solid] border-r-[#35474f] [@media(width<=480px)]:[border-top-style:none] [@media(width<=480px)]:[border-bottom-style:none] [@media(width<=480px)]:[border-left-style:none] [@media(width<=480px)]:border-0 [@media(width<=480px)]:border-[currentColor]">
          <strong className="block text-primary [@media(width<=480px)]:text-[4.75rem] [@media(480px<width<=750px)]:text-[3.875rem] text-[5.25rem] font-normal leading-[1.1] tracking-[-0.065em]">
            {submitResult.quizScore.toFixed(1)}
            <span className="[@media(width<=750px)]:text-[1.5rem] text-[2rem]">
              %
            </span>
          </strong>
          <p className="text-[0.75rem] text-[#b4c2c8] mt-2.5 [.result-summary_>_div:last-child_>_&]:mt-3 [@media(width<=750px)]:[.result-summary_>_div:last-child_>_&]:text-[0.75rem] [.result-summary_>_div:last-child_>_&]:text-[0.875rem] [.result-summary_>_div:last-child_>_&]:leading-[1.8] [.result-summary_>_div:last-child_>_&]:text-[#b4c2c8]">
            Your assessment score
          </p>
        </div>
        <div>
          <h2 className="[@media(width<=750px)]:text-[1.5625rem] text-[1.875rem] tracking-[-0.04em]">
            A little more clarity.
          </h2>
          <p className="[.result-summary_>_div:last-child_>_&]:mt-3 [@media(width<=750px)]:[.result-summary_>_div:last-child_>_&]:text-[0.75rem] [.result-summary_>_div:last-child_>_&]:text-[0.875rem] [.result-summary_>_div:last-child_>_&]:leading-[1.8] [.result-summary_>_div:last-child_>_&]:text-[#b4c2c8]">
            <strong>{correct}</strong> answers correct.
            <br />
            <strong>{submitResult.questions.length - correct}</strong>{" "}
            {submitResult.questions.length - correct === 1
              ? "opportunity"
              : "opportunities"}{" "}
            to learn.
          </p>
          {delta !== null && (
            <p className="result-change [.result-summary_>_div:last-child_>_&]:mt-3 [.result-summary_>_div:last-child_>_&]:leading-[1.8] [.result-summary_>_div:last-child_>_&]:text-[#b4c2c8] text-[0.6875rem]!">
              {delta > 0 ? "+" : ""}
              {delta.toFixed(1)} percentage points from the previous assessment
            </p>
          )}
        </div>
      </div>
      <div
        className="result-topology flex flex-wrap [@media(width<=480px)]:gap-1.5 gap-[0.4375rem]"
        aria-label="Answer results"
      >
        {submitResult.questions.map((q, i) => (
          <a
            key={i}
            href={"#" + id + "-q-" + i}
            className={[
              q.isCorrect ? "correct" : "revisit",
              "[@media(width<=560px)]:w-[44px] w-9 [@media(width<=560px)]:h-[44px] h-9 grid place-items-center text-[0.6875rem] [border-top-style:solid] [border-right-style:solid] [border-bottom-style:solid] [border-left-style:solid] [&.correct]:bg-[#70b7c215] [&.correct]:bg-none [&.correct]:text-[#70b7c2] [&.revisit]:bg-[#e3b86f0a] [&.revisit]:bg-none [&.revisit]:text-[#e3bc80] border border-[currentColor] [&.correct]:border-[#91a5ad] [&.revisit]:border-[#8f734a] rounded-[3px]",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-label={
              "Question " +
              (i + 1) +
              ": " +
              (q.isCorrect ? "correct" : "review recommended")
            }
            onClick={() => setFilter("all")}
          >
            {String(i + 1).padStart(2, "0")}
          </a>
        ))}
      </div>
      <div className="result-legend flex mt-3.5 text-[0.6875rem] text-[#b4c2c8] [@media(width<=480px)]:gap-[0.9375rem] gap-5">
        <span className="flex items-center gap-[0.4375rem]">
          <i className="w-1.5 h-1.5 bg-primary bg-none [.result-legend_>_span:last-child_&]:bg-[#e3bc80] [.result-legend_>_span:last-child_&]:bg-none" />{" "}
          Answered correctly
        </span>
        <span className="flex items-center gap-[0.4375rem]">
          <i className="w-1.5 h-1.5 bg-primary bg-none [.result-legend_>_span:last-child_&]:bg-[#e3bc80] [.result-legend_>_span:last-child_&]:bg-none" />{" "}
          Worth revisiting
        </span>
      </div>
      {submitResult.improvementTip && (
        <div className="improvement-direction flex bg-[#11272e] bg-none border-l-[2px] [border-left-style:solid] border-l-[#b4c2c8] rounded-tl-[0] rounded-tr-[0.25rem] rounded-br-[0.25rem] rounded-bl-[0] [&_>_svg]:text-primary [&_>_svg]:shrink-0 [@media(width<=480px)]:[&_>_svg]:hidden [@media(width<=750px)]:p-[1.1875rem] p-6 my-7.5 [@media(width<=750px)]:gap-3.5 gap-4.5">
          <div>
            <p className="eyebrow flex items-center text-primary text-[0.6875rem] leading-[1.6] tracking-[0.12em] font-medium mb-3 [.story-documents_&]:text-[#8eafb8] [.workspace-sidebar_>_&]:text-[#91a5ad] [.workspace-sidebar_>_&]:pl-3 [@media(width<=850px)]:[.workspace-sidebar_>_&]:hidden last:text-[0.9375rem] last:leading-[1.9] last:text-[#b4c2c8] gap-2.5">
              YOUR NEXT PRACTICE FOCUS
            </p>
            <p className="last:text-[0.9375rem] last:leading-[1.9] last:text-[#b4c2c8]">
              {submitResult.improvementTip}
            </p>
          </div>
        </div>
      )}
      <div className="review-heading flex flex-wrap items-center justify-between mt-[2.1875rem] mb-5 gap-5">
        <h3 className="text-[1.3125rem] tracking-[-0.03em]">
          Learn from every answer.
        </h3>
        <div
          className="result-filters flex gap-[0.3125rem]"
          role="group"
          aria-label="Filter answer review"
        >
          {[
            ["all", "All answers"],
            ["correct", "Correct"],
            ["revisit", "Revisit"],
          ].map(([value, label]) => (
            <button
              className="[@media(width<=560px)]:min-h-[44px] min-h-[2.3125rem] text-[0.75rem] [border-top-style:solid] [border-right-style:solid] [border-bottom-style:solid] [border-left-style:solid] text-[#b4c2c8] aria-[pressed=true]:text-primary aria-[pressed=true]:bg-[#70b7c20a] aria-[pressed=true]:bg-none py-2 px-3 border border-[transparent] aria-[pressed=true]:border-[#6b838d] rounded-[0.25rem]"
              type="button"
              key={value}
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="answer-review-list">
        {submitResult.questions
          .map((q, i) => ({ q, i }))
          .filter(
            ({ q }) =>
              filter === "all" ||
              (filter === "correct" ? q.isCorrect : !q.isCorrect),
          )
          .map(({ q, i }) => (
            <article
              key={i}
              id={id + "-q-" + i}
              className="answer-review border-t [border-top-style:solid] border-t-[var(--border)] scroll-mt-[6.25rem] py-[1.5625rem] px-0"
            >
              <div className="answer-review-title flex [align-items:start] [@media(width<=750px)]:flex-wrap [@media(width<=750px)]:gap-2.5 gap-4">
                <span className="first:text-[0.6875rem] first:text-[#91a5ad] first:mt-1">
                  Q{String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="[@media(width<=750px)]:text-[0.875rem] text-[0.9375rem] leading-[1.8] font-medium [@media(width<=750px)]:basis-[calc(100%_-_2.8125rem)]">
                  {q.question}
                </h4>
                <span
                  className={[
                    q.isCorrect
                      ? "answer-status correct"
                      : "answer-status revisit",
                    "first:text-[0.6875rem] first:text-[#91a5ad] first:mt-1 [@media(width<=750px)]:[&.answer-status]:ml-9 [&.answer-status]:ml-auto [&.answer-status]:flex [&.answer-status]:items-center [&.answer-status]:text-[0.6875rem] [&.answer-status]:shrink-0 [&.answer-status]:border-t [&.answer-status]:[border-top-style:solid] [&.answer-status]:border-r [&.answer-status]:[border-right-style:solid] [&.answer-status]:border-b [&.answer-status]:[border-bottom-style:solid] [&.answer-status]:border-l [&.answer-status]:[border-left-style:solid] [&.answer-status.correct]:text-[#70b7c2] [&.answer-status.revisit]:text-[#e3bc80] [&.answer-status]:py-[0.3125rem] [&.answer-status]:px-[0.4375rem] [&.answer-status]:border-[#35474f] [&.answer-status.revisit]:border-[#756440] [&.answer-status]:rounded-[3px] [&.answer-status]:gap-[0.3125rem]",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {q.isCorrect ? (
                    <>
                      <Check size={13} /> Correct
                    </>
                  ) : (
                    "Revisit"
                  )}
                </span>
              </div>
              <p className="review-your-answer text-[0.8125rem] text-[#b4c2c8] leading-[1.8] mt-3">
                Your answer:{" "}
                <span className="text-[#e4ebee]">{q.userAnswer}</span>
              </p>
              {!q.isCorrect && (
                <p className="review-correct-answer text-[0.8125rem] text-[#b4c2c8] leading-[1.8] mt-3">
                  Correct answer: {q.correctAnswer}
                </p>
              )}
              <details className="mt-3.5 text-[0.75rem] text-[#b4c2c8]">
                <summary className="[cursor:pointer] py-2">
                  Understand the reasoning
                </summary>
                <p className="bg-[#131e22] bg-none text-[0.8125rem] leading-[1.85] p-[0.9375rem] rounded-[0.25rem]">
                  {q.explanation}
                </p>
              </details>
            </article>
          ))}
      </div>
      {((filter === "correct" && correct === 0) ||
        (filter === "revisit" &&
          correct === submitResult.questions.length)) && (
        <p className="empty-note text-center [border-top-style:dashed] [border-right-style:dashed] [border-bottom-style:dashed] [border-left-style:dashed] mt-[1.5625rem] py-10 px-[1.5625rem] border border-[#35474f] rounded-[0.3125rem]">
          {filter === "revisit"
            ? "Every answer was correct. Explore the reasoning to keep learning."
            : "No correct answers in this attempt. Review the explanations to prepare for your next session."}
        </p>
      )}
      {showNewQuizBtn && (
        <div className="result-footer flex flex-wrap items-center justify-between border-t [border-top-style:solid] border-t-[var(--border)] pt-[1.5625rem] mt-5 gap-5">
          <p className="text-[0.875rem] text-[#b4c2c8]">
            Keep the momentum going.
          </p>
          <Button onClick={startNewQuizFn}>Start New Quiz</Button>
        </div>
      )}
    </div>
  );
}

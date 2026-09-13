import { Assessment } from "@prisma/client";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
export default function QuizStats({
  assessments,
}: {
  assessments: Assessment[];
}) {
  const latest = assessments.at(-1);
  const previous = assessments.at(-2);
  const average = assessments.length
    ? assessments.reduce((sum, a) => sum + a.quizScore, 0) / assessments.length
    : null;
  const questions = assessments.reduce((sum, a) => sum + a.questions.length, 0);
  const difference =
    latest && previous ? latest.quizScore - previous.quizScore : null;
  const Direction =
    difference === null || difference === 0
      ? Minus
      : difference > 0
        ? ArrowUpRight
        : ArrowDownRight;
  return (
    <div className="assessment-stats grid [@media(width<=750px)]:grid-cols-[1fr_1fr] grid-cols-[1.3fr_1fr_1fr] [border-top-style:solid] [border-right-style:solid] [border-bottom-style:solid] [border-left-style:solid] bg-transparent [background-image:linear-gradient(110deg,_#19354055,_#0b171f)] mb-7 border border-[#385664] rounded-[9px] overflow-hidden">
      <div className="latest-assessment-stat border-l [border-left-style:solid] border-l-[#1d2b30] [@media(width<=750px)]:border-t [@media(width<=750px)]:[border-top-style:solid] [@media(width<=750px)]:border-t-[#35474f] first:[border-top-style:none] first:[border-right-style:none] first:[border-bottom-style:none] first:[border-left-style:none] first:bg-[#101b20] first:bg-none [@media(width<=750px)]:first:[grid-column:span_2] [@media(width<=750px)]:p-5.5 p-7 first:border-0 first:border-[currentColor]">
        <p className="eyebrow flex items-center text-[#b4c2c8] text-[0.6875rem] leading-[1.8] tracking-[0.12em] font-medium [.landing-stories_&]:mb-[1.5625rem] [.landing-stories_&]:text-[0.6875rem] [.story-documents_&]:text-[#8eafb8] [.workspace-sidebar_>_&]:text-[0.6875rem] [.workspace-sidebar_>_&]:text-[#91a5ad] [.workspace-sidebar_>_&]:pl-3 [@media(width<=850px)]:[.workspace-sidebar_>_&]:hidden gap-2.5">
          YOUR LATEST CHECKPOINT
        </p>
        <strong className="block [@media(width<=750px)]:text-[3rem] text-[2.5rem] font-normal tracking-[-0.05em] mt-4 mb-2.5">
          {latest ? latest.quizScore.toFixed(1) : "—"}
          {latest && <span className="text-[1.5rem]">%</span>}
        </strong>
        <p className="text-[0.6875rem] text-[#b4c2c8] leading-[1.8]">
          {latest
            ? "Most recent assessment"
            : "Your first assessment sets your starting point."}
        </p>
        {difference !== null && (
          <span className="score-delta text-[0.6875rem] text-[#b4c2c8] flex mt-3.5 leading-[1.7] gap-[0.4375rem]">
            <Direction size={16} />
            {difference > 0 ? "+" : ""}
            {difference.toFixed(1)} percentage points from the previous attempt
          </span>
        )}
      </div>
      <div className="border-l [border-left-style:solid] border-l-[#1d2b30] [@media(width<=750px)]:border-t [@media(width<=750px)]:[border-top-style:solid] [@media(width<=750px)]:border-t-[#35474f] first:[border-top-style:none] first:[border-right-style:none] first:[border-bottom-style:none] first:[border-left-style:none] first:bg-[#101b20] first:bg-none [@media(width<=750px)]:first:[grid-column:span_2] [@media(width<=750px)]:p-5.5 p-7 first:border-0 first:border-[currentColor]">
        <p className="text-[0.6875rem] text-[#b4c2c8] leading-[1.8]">
          AVERAGE SCORE
        </p>
        <strong className="block [@media(width<=750px)]:text-[2rem] text-[2.5rem] font-normal tracking-[-0.05em] mt-4 mb-2.5">
          {average === null ? "—" : average.toFixed(1) + "%"}
        </strong>
        <span className="text-[0.75rem] text-[#b4c2c8]">
          Across {assessments.length} assessments
        </span>
      </div>
      <div className="border-l [border-left-style:solid] border-l-[#1d2b30] [@media(width<=750px)]:border-t [@media(width<=750px)]:[border-top-style:solid] [@media(width<=750px)]:border-t-[#35474f] first:[border-top-style:none] first:[border-right-style:none] first:[border-bottom-style:none] first:[border-left-style:none] first:bg-[#101b20] first:bg-none [@media(width<=750px)]:first:[grid-column:span_2] [@media(width<=750px)]:p-5.5 p-7 first:border-0 first:border-[currentColor]">
        <p className="text-[0.6875rem] text-[#b4c2c8] leading-[1.8]">
          QUESTIONS PRACTICED
        </p>
        <strong className="block [@media(width<=750px)]:text-[2rem] text-[2.5rem] font-normal tracking-[-0.05em] mt-4 mb-2.5">
          {questions}
        </strong>
        <span className="text-[0.75rem] text-[#b4c2c8]">
          One answer at a time.
        </span>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import Link from "next/link";
import { Assessment } from "@prisma/client";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import QuizResult, { QuestionType } from "./quiz-result";
export default function QuizList({
  assessments,
}: {
  assessments: Assessment[];
}) {
  const [selectedQuiz, setSelectedQuiz] = useState<Assessment | null>(null);
  const selectedIndex = assessments.findIndex((a) => a.id === selectedQuiz?.id);
  return (
    <>
      <section className="assessment-history py-[0.9375rem]">
        <div className="data-section-heading flex flex-wrap [align-items:end] justify-between mt-6 gap-5">
          <div>
            <p className="eyebrow flex items-center text-primary text-[0.6875rem] leading-[1.6] tracking-[0.12em] font-medium mb-3 [.story-documents_&]:text-[#8eafb8] [.workspace-sidebar_>_&]:text-[#91a5ad] [.workspace-sidebar_>_&]:pl-3 [@media(width<=850px)]:[.workspace-sidebar_>_&]:hidden gap-2.5">
              YOUR PROGRESS, RECORDED
            </p>
            <h2 className="[@media(width<=560px)]:text-[25px] text-[28px] font-normal tracking-[-0.045em] leading-[1.2]">
              Every attempt counts.
            </h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/interview/mock">Start New Quiz</Link>
          </Button>
        </div>
        {!assessments.length && (
          <div className="empty-note text-center [border-top-style:dashed] [border-right-style:dashed] [border-bottom-style:dashed] [border-left-style:dashed] mt-[1.5625rem] py-10 px-[1.5625rem] border border-[#35474f] rounded-[0.3125rem]">
            <h3 className="text-[1.3125rem] mb-3">
              Your first checkpoint is ahead.
            </h3>
            <p className="text-[0.875rem] text-muted-foreground leading-[1.8] max-w-125 m-auto">
              Complete a practice session to see your score, answer review, and
              personalized feedback here.
            </p>
          </div>
        )}
        <div className="history-list mt-6.5 border-t [border-top-style:solid] border-t-[var(--border)]">
          {assessments.map((assessment, index) => (
            <button
              type="button"
              className="history-row flex w-full items-center text-left border-b [border-bottom-style:solid] transition-[background] [transition-duration:0.2s] [transition-timing-function:ease] delay-0 hover:bg-[#1a303d] hover:bg-none py-[1.4375rem] px-[16px] border-[#294552] rounded-[5px] [@media(width<=750px)]:gap-4 gap-[1.4375rem]"
              key={assessment.id}
              onClick={() => setSelectedQuiz(assessment)}
            >
              <span className="history-index text-[0.75rem] text-[#91a5ad]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="grid gap-2">
                <strong className="[@media(width<=750px)]:text-[0.875rem] text-[1rem] font-normal">
                  {assessment.category} assessment
                </strong>
                <span className="[@media(width<=750px)]:text-[0.6875rem] text-[0.75rem] text-[#b4c2c8]">
                  {format(
                    new Date(assessment.createdAt),
                    "dd MMM yyyy · HH:mm",
                  )}{" "}
                  · {assessment.questions.length} questions
                </span>
              </div>
              <span className="history-score ml-auto text-[1.625rem] text-[#b4c2c8] tracking-[-0.04em]">
                {assessment.quizScore.toFixed(1)}
                <small className="text-[0.9375rem]">%</small>
              </span>
              <span className="history-review [@media(width<=750px)]:hidden flex items-center text-[0.75rem] text-[#b4c2c8] gap-[0.5625rem]">
                Review <ArrowRight size={15} />
              </span>
            </button>
          ))}
        </div>
      </section>
      <Dialog
        open={!!selectedQuiz}
        onOpenChange={(open) => {
          if (!open) setSelectedQuiz(null);
        }}
      >
        <DialogContent
          aria-describedby={undefined}
          className="assessment-review-dialog w-[calc(100%-2rem)] sm:max-w-4xl max-h-[88vh] overflow-y-auto [scrollbar-color:#05080a_#11181b] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-[10px] [&::-webkit-scrollbar-track]:bg-[#11181b] [&::-webkit-scrollbar-track]:bg-none [&::-webkit-scrollbar-thumb]:bg-[#05080a] [&::-webkit-scrollbar-thumb]:bg-none [&::-webkit-scrollbar-thumb]:[border-top-style:solid] [&::-webkit-scrollbar-thumb]:[border-right-style:solid] [&::-webkit-scrollbar-thumb]:[border-bottom-style:solid] [&::-webkit-scrollbar-thumb]:[border-left-style:solid] [&::-webkit-scrollbar-thumb:hover]:bg-[#000] [&::-webkit-scrollbar-thumb:hover]:bg-none [&::-webkit-scrollbar-thumb]:border-[2px] [&::-webkit-scrollbar-thumb]:border-[#11181b] [&::-webkit-scrollbar-thumb]:rounded-[0]"
        >
          <DialogHeader>
            <DialogTitle>Assessment review</DialogTitle>
          </DialogHeader>
          {selectedQuiz && (
            <QuizResult
              key={selectedQuiz.id}
              submitResult={{
                ...selectedQuiz,
                questions: selectedQuiz.questions as unknown as QuestionType[],
              }}
              showNewQuizBtn={false}
              previousScore={
                selectedIndex > 0
                  ? assessments[selectedIndex - 1].quizScore
                  : undefined
              }
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

"use client";
import {
  generateInterviewQuestions,
  saveInterviewAssessment,
} from "@/actions/interview";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useFetch from "@/hooks/use-fetch";
import {
  ChevronLeft,
  ChevronRight,
  CircleCheckBig,
  Lightbulb,
  Loader2,
} from "lucide-react";
import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { toast } from "sonner";
import QuizResult from "./quiz-result";
export const Quiz = () => {
  const [currentQues, setCurrentQues] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>([]);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [disableQuizOptn, setDisableQuizOptn] = useState<boolean>(false);

  //question generation hook
  const {
    data: questionsData,
    setData: setQuestionsData,
    loading: questionsLoading,
    fn: questionsFn,
  } = useFetch<Awaited<ReturnType<typeof generateInterviewQuestions>>>();

  //quiz submission hook
  const {
    data: submitData,
    setData: setSubmitData,
    loading: submitLoading,
    fn: submitFn,
  } = useFetch<Awaited<ReturnType<typeof saveInterviewAssessment>>>();

  //generate question (hook fn)
  const handleGenerateQuiz = async () => {
    try {
      const questions = await questionsFn(generateInterviewQuestions);
      if (questions) {
        setUserAnswers(new Array(questions.length).fill(null));
        toast.success("Your practice session is ready");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error("Error while generating quiz questions");
      } else {
        toast.error("An unknown error occured while quiz questions");
      }
    }
  };

  const handleChange = (val: string) => {
    //fn to fill the radio component option selected by the user in the userAnswer array
    const userAnswersNew = [...userAnswers];
    userAnswersNew[currentQues] = val;
    setUserAnswers(userAnswersNew);
  };

  //submit quiz (hook fn)
  const handleSubmit = async () => {
    if (!questionsData || userAnswers.some((answer) => answer === null)) {
      toast.error("Attempt each question in the quiz");
      return;
    }
    try {
      let score = 0;
      userAnswers.forEach((userAns, index) => {
        if (userAns === questionsData[index].correctAnswer) score++;
      });
      const scorePercentage = (score / questionsData.length) * 100;

      const result = await submitFn(
        saveInterviewAssessment,
        questionsData,
        userAnswers.filter((answer): answer is string => answer !== null),
        scorePercentage,
      );
      if (result) toast.success("Assessment saved successfully");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error("Error while submitting the quiz");
      } else {
        toast.error("An unknown error occured while submitting the quiz");
      }
    }
  };

  const startNewQuiz = async () => {
    //function to clear all state variables, or to set them to null. Called when the user clicks to start a new quiz
    setCurrentQues(0);
    setUserAnswers([]);
    setQuestionsData(null);
    setShowExplanation(false);
    setDisableQuizOptn(false);
    setSubmitData(null);
    //new quiz questions
    await handleGenerateQuiz();
  };

  const reduced = useReducedMotion();
  return (
    <div
      className="assessment-session max-w-240 mx-auto"
      aria-busy={questionsLoading || submitLoading}
    >
      <AnimatePresence mode="wait">
        {submitData ? (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <QuizResult
              submitResult={submitData}
              startNewQuizFn={startNewQuiz}
            />
          </motion.div>
        ) : questionsLoading ? (
          <div
            className="assessment-loading min-h-92.5 flex flex-col items-center justify-center text-center [border-top-style:solid] [border-right-style:solid] [border-bottom-style:solid] [border-left-style:solid] p-7.5 border border-[var(--border)] rounded-[0.3125rem]"
            key="loading"
            role="status"
          >
            <Loader2 className="animate-spin text-primary" size={25} />
            <h2 className="text-[1.5rem] mt-5 mb-3 mx-0">
              Building your practice session.
            </h2>
            <p className="text-[0.875rem] text-muted-foreground">
              Preparing questions around your industry and skills.
            </p>
          </div>
        ) : !questionsData ? (
          <div
            className="assessment-start [border-top-style:solid] [border-right-style:solid] [border-bottom-style:solid] [border-left-style:solid] bg-[#102028] [background-image:radial-gradient(ellipse_at_5%_0,_#23434f,_transparent_75%),_none] [box-shadow:inset_0_1px_0_#a8d6e416,_0_20px_60px_#0003] [@media(width<=480px)]:p-6 [@media(480px<width<=750px)]:p-7.5 p-12.5 border border-[#456777] rounded-[10px]"
            key="start"
          >
            <p className="eyebrow flex items-center text-primary [@media(width<=560px)]:text-[0.6875rem] text-[0.75rem] leading-[1.6] tracking-[0.12em] font-medium [.landing-stories_&]:mb-[1.5625rem] [@media(width>480px)]:[.landing-stories_&]:text-[0.6875rem] [.story-documents_&]:text-[#8eafb8] [@media(width>480px)]:[.workspace-sidebar_>_&]:text-[0.6875rem] [.workspace-sidebar_>_&]:text-[#91a5ad] [.workspace-sidebar_>_&]:pl-3 [@media(width<=850px)]:[.workspace-sidebar_>_&]:hidden [&:not(.eyebrow)]:text-[#b4c2c8] [@media(width<=480px)]:[&:not(.eyebrow)]:text-[0.875rem] [&:not(.eyebrow)]:text-[0.9375rem] [&:not(.eyebrow)]:leading-[1.9] [&:not(.eyebrow)]:max-w-140 gap-2.5">
              A SMALL INVESTMENT IN YOUR NEXT CHAPTER
            </p>
            <h2 className="[@media(width<=480px)]:text-[2.25rem] [@media(480px<width<=750px)]:text-[2.5625rem] text-[3rem] tracking-[-0.055em] leading-[1.1] my-6">
              Find out what
              <br />
              you’re ready for.
            </h2>
            <p className="text-[#b4c2c8] [@media(width<=480px)]:text-[0.875rem] text-[0.9375rem] leading-[1.9] max-w-140">
              20 questions, shaped around your industry and skills. Take your
              time, choose your answer, and learn from the explanation.
            </p>
            <div className="session-facts flex [border-top-style:solid] [border-bottom-style:solid] [@media(width<=750px)]:flex-wrap py-[1.5625rem] my-8.5 border-y border-y-[#35474f] [@media(width<=750px)]:gap-5.5 gap-8.5">
              <span className="flex flex-col text-[0.75rem] text-[#b4c2c8] [@media(width<=480px)]:basis-full gap-2">
                <strong className="[@media(width<=750px)]:text-[1rem] text-[1.125rem] font-normal text-[#e4ebee]">
                  20
                </strong>{" "}
                tailored questions
              </span>
              <span className="flex flex-col text-[0.75rem] text-[#b4c2c8] [@media(width<=480px)]:basis-full gap-2">
                <strong className="[@media(width<=750px)]:text-[1rem] text-[1.125rem] font-normal text-[#e4ebee]">
                  Your pace
                </strong>{" "}
                no time limit
              </span>
              <span className="flex flex-col text-[0.75rem] text-[#b4c2c8] [@media(width<=480px)]:basis-full gap-2">
                <strong className="[@media(width<=750px)]:text-[1rem] text-[1.125rem] font-normal text-[#e4ebee]">
                  Clear feedback
                </strong>{" "}
                after every answer
              </span>
            </div>
            <Button
              size="lg"
              onClick={handleGenerateQuiz}
              disabled={questionsLoading}
            >
              Start the Quiz
            </Button>
          </div>
        ) : (
          <motion.div
            key={"question-" + currentQues}
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div className="question-header flex justify-between text-[0.8125rem] text-[#b4c2c8] gap-[0.9375rem]">
              <span className="eyebrow flex items-center text-primary [@media(width<=560px)]:text-[0.6875rem] text-[0.75rem] leading-[1.6] tracking-[0.12em] font-medium [.landing-stories_&]:mb-[1.5625rem] [@media(width>480px)]:[.landing-stories_&]:text-[0.6875rem] [.story-documents_&]:text-[#8eafb8] [@media(width>480px)]:[.workspace-sidebar_>_&]:text-[0.6875rem] [.workspace-sidebar_>_&]:text-[#91a5ad] [.workspace-sidebar_>_&]:pl-3 [@media(width<=850px)]:[.workspace-sidebar_>_&]:hidden [@media(width<=480px)]:last:text-[0.6875rem] gap-2.5">
                YOUR PRACTICE SESSION
              </span>
              <span
                className="[@media(width<=480px)]:last:text-[0.6875rem]"
                aria-live="polite"
              >
                Question{" "}
                <strong className="text-primary font-medium">
                  {currentQues + 1}
                </strong>{" "}
                / {questionsData.length}
              </span>
            </div>
            <div
              className="question-trajectory flex mt-[1.1875rem] mb-[2.1875rem] [@media(width<=480px)]:gap-[3px] gap-[0.3125rem]"
              role="progressbar"
              aria-label="Questions answered"
              aria-valuenow={userAnswers.filter(Boolean).length}
              aria-valuemin={0}
              aria-valuemax={questionsData.length}
            >
              {questionsData.map((_, i) => (
                <span
                  className="grow shrink basis-[0%] h-1 bg-[#1d2b30] bg-none data-[answered=true]:bg-[#91a5ad] data-[answered=true]:bg-none data-[current=true]:bg-primary data-[current=true]:bg-none data-[current=true]:[outline:1px_solid_#70b7c244] data-[current=true]:[outline-offset:3px] rounded-[2px]"
                  key={i}
                  data-answered={userAnswers[i] !== null}
                  data-current={i === currentQues}
                />
              ))}
            </div>
            <div className="question-surface bg-[#102028] [background-image:radial-gradient(ellipse_at_5%_0,_#23434f,_transparent_75%),_none] [border-top-style:solid] [border-right-style:solid] [border-bottom-style:solid] [border-left-style:solid] [box-shadow:inset_0_1px_0_#a8d6e416,_0_20px_60px_#0003] [@media(width<=480px)]:py-5 [@media(480px<width<=750px)]:p-[1.4375rem] p-8.5 [@media(width<=480px)]:px-[1.0625rem] border border-[#456777] rounded-[10px]">
              <p className="question-number text-[0.6875rem] tracking-[0.1em] text-[#91a5ad] mb-[1.1875rem]">
                QUESTION {String(currentQues + 1).padStart(2, "0")}
              </p>
              <h2
                className="[@media(width<=750px)]:text-[1.3125rem] text-[1.5rem] leading-[1.6] tracking-[-0.035em] font-[450]"
                id="current-question"
              >
                {questionsData[currentQues].question}
              </h2>
              <RadioGroup
                aria-labelledby="current-question"
                onValueChange={handleChange}
                value={userAnswers[currentQues]}
                className="question-options mt-7.5 grid gap-3"
              >
                {questionsData[currentQues].options.map((option, index) => (
                  <div
                    key={index}
                    className="question-option flex relative items-center [border-top-style:solid] [border-right-style:solid] [border-bottom-style:solid] [border-left-style:solid] bg-[#10212b] bg-none transition-[border-color,_background] [transition-duration:0.2s,_0.2s] [transition-timing-function:ease,_ease] [transition-delay:0s,_0s] [&:has([data-state='checked'])]:bg-[#25434f] [&:has([data-state='checked'])]:bg-none [&:has(:focus-visible)]:[outline:2px_solid_var(--primary)] [&:has(:focus-visible)]:[outline-offset:3px] [&:has(:disabled)]:[cursor:default] [&_[role='radio']]:order-[3] [&_[role='radio']]:ml-auto [&_[role='radio']]:shrink-0 [&_[role='radio']]:z-1 [&:hover:not(:has(:disabled))]:bg-[#1a3542] [&:hover:not(:has(:disabled))]:bg-none [@media(width<=750px)]:p-[0.9375rem] p-4.5 border border-[#3a5766] [&:has([data-state='checked'])]:border-[#86b8c6] [&:hover:not(:has(:disabled))]:border-[#7fabbc] rounded-[7px] [@media(width<=750px)]:gap-3 gap-3.5"
                  >
                    <span
                      className="answer-letter text-[0.75rem] text-[#91a5ad] [@media(width<=750px)]:hidden"
                      aria-hidden="true"
                    >
                      {String.fromCharCode(65 + index)}
                    </span>
                    <RadioGroupItem
                      value={option}
                      id={"option-" + index}
                      disabled={disableQuizOptn || submitLoading}
                    />
                    <Label
                      className="text-[16px] leading-[1.75] font-normal [cursor:pointer] grow shrink basis-[0%] after:[content:''] after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0"
                      htmlFor={"option-" + index}
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              <div className="question-help flex flex-wrap items-center justify-between mt-6 gap-4">
                <span className="text-[0.6875rem] leading-[1.7] text-[#b4c2c8]">
                  Choose one answer. Use arrow keys to move between options.
                </span>
                <Button
                  variant="ghost"
                  onClick={() => {
                    if (showExplanation) setShowExplanation(false);
                    else {
                      setShowExplanation(true);
                      setDisableQuizOptn(true);
                    }
                  }}
                  disabled={userAnswers[currentQues] == null || submitLoading}
                >
                  <Lightbulb />
                  {showExplanation ? "Hide Explanation" : "Show Explanation"}
                </Button>
              </div>
              {showExplanation && (
                <div
                  className="answer-explanation mt-5 border-l-[2px] [border-left-style:solid] border-l-[#b4c2c8] bg-[#131e22] bg-none p-5"
                  role="region"
                  aria-label="Answer explanation"
                >
                  <p className="eyebrow flex items-center text-primary text-[0.6875rem] leading-[1.6] tracking-[0.12em] font-medium mb-2.5 [.story-documents_&]:text-[#8eafb8] [.workspace-sidebar_>_&]:text-[#91a5ad] [.workspace-sidebar_>_&]:pl-3 [@media(width<=850px)]:[.workspace-sidebar_>_&]:hidden last:text-[0.875rem] last:leading-[1.9] last:text-[#b4c2c8] gap-2.5">
                    THE REASONING
                  </p>
                  <p className="last:text-[0.875rem] last:leading-[1.9] last:text-[#b4c2c8]">
                    {questionsData[currentQues].explanation}
                  </p>
                </div>
              )}
            </div>
            <div className="question-footer flex items-center justify-between mt-6 [@media(width<=480px)]:flex-wrap gap-[0.9375rem]">
              <span className="text-[0.75rem] text-muted-foreground">
                {userAnswers.filter(Boolean).length} of {questionsData.length}{" "}
                answered
              </span>
              <div className="flex [@media(width<=480px)]:ml-auto gap-3">
                {currentQues > 0 && (
                  <Button
                    className="[@media(width<=480px)]:data-[slot=button]:text-[0.75rem] [@media(width<=480px)]:data-[slot=button]:px-3"
                    variant="outline"
                    disabled={submitLoading}
                    onClick={() => {
                      setCurrentQues((prev) => prev - 1);
                      setShowExplanation(false);
                      setDisableQuizOptn(true);
                    }}
                  >
                    <ChevronLeft /> Back
                  </Button>
                )}
                {currentQues < questionsData.length - 1 ? (
                  <Button
                    className="[@media(width<=480px)]:data-[slot=button]:text-[0.75rem] [@media(width<=480px)]:data-[slot=button]:px-3"
                    onClick={() => {
                      setCurrentQues((prev) => prev + 1);
                      setShowExplanation(false);
                      setDisableQuizOptn(false);
                    }}
                    disabled={userAnswers[currentQues] == null}
                  >
                    Next <ChevronRight />
                  </Button>
                ) : (
                  <Button
                    className="[@media(width<=480px)]:data-[slot=button]:text-[0.75rem] [@media(width<=480px)]:data-[slot=button]:px-3"
                    onClick={handleSubmit}
                    disabled={submitLoading}
                  >
                    {submitLoading ? (
                      <>
                        <Loader2 className="animate-spin" /> Saving your
                        results…
                      </>
                    ) : (
                      <>
                        Submit Quiz <CircleCheckBig />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

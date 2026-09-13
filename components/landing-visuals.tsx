"use client";

import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  FileText,
  RotateCcw,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function FlowLines() {
  return (
    <div
      className="zen-flow absolute top-0 right-0 bottom-0 left-0 z-0 pointer-events-none [@media(width<=850px)]:opacity-55 [@media(width<=850px)]:[.zen-market-copy_&]:left-[calc(50%_-_50vw)] [@media(width<=850px)]:[.zen-market-copy_&]:right-[calc(50%_-_50vw)] [@media(width<=850px)]:[.zen-market-copy_&]:overflow-clip"
      aria-hidden="true"
    >
      <svg
        className="w-full h-full block [transform:scaleX(-1)]"
        viewBox="0 0 1600 700"
        preserveAspectRatio="none"
        focusable="false"
      >
        <defs>
          <linearGradient id="zen-flow-ink">
            <stop stopColor="#70b7c2" stopOpacity=".24" />
            <stop offset=".35" stopColor="#70b7c2" stopOpacity=".08" />
            <stop offset=".75" stopColor="#70b7c2" stopOpacity=".35" />
            <stop offset="1" stopColor="#70b7c2" stopOpacity=".18" />
          </linearGradient>
        </defs>
        {Array.from({ length: 12 }, (_, i) => (
          <path
            key={i}
            d={
              "M-40 " +
              (440 + i * 13) +
              " C400 " +
              (650 + i * 4) +
              " 640 " +
              (575 + i * 3) +
              " 920 " +
              (395 + i * 8) +
              " S1360 " +
              (215 + i * 16) +
              " 1640 " +
              (255 + i * 17)
            }
            fill="none"
            stroke="url(#zen-flow-ink)"
            strokeWidth={i === 5 ? 1.5 : 0.6}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
    </div>
  );
}

const practiceQuestions = [
  {
    question: "What makes a project example stand out in an interview?",
    answers: [
      "Listing every tool you used.",
      "Connecting a problem, your action, and a result.",
      "Describing your team’s responsibilities.",
    ],
    correct: 1,
    explanation:
      "A specific problem, your contribution, and a concrete result help an interviewer understand how you think and the difference you made.",
  },
  {
    question: "How should you describe a disagreement with a teammate?",
    answers: [
      "Explain how you listened and reached a decision.",
      "Focus on why your approach was better.",
      "Avoid mentioning that disagreements happen.",
    ],
    correct: 0,
    explanation:
      "Explain the different perspectives, how you listened, and how you reached a decision. Show collaboration without assigning blame.",
  },
  {
    question: "What’s a useful first step when a question is unfamiliar?",
    answers: [
      "Give an answer immediately.",
      "Change the subject to a familiar project.",
      "Clarify the problem and explain your reasoning.",
    ],
    correct: 2,
    explanation:
      "Clarify what’s being asked, state your assumptions, and walk through your reasoning. It’s okay to acknowledge what you don’t yet know.",
  },
];

export function PracticeLab() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const question = practiceQuestions[questionIndex];
  return (
    <div className="zen-practice-scene relative [perspective:1200px] [@media(width<=560px)]:pt-[10px] w-full max-w-[530px] py-[24px] px-0 mx-auto">
      <div
        className="zen-practice-orbit absolute [@media(width<=560px)]:w-[106%] w-[112%] [aspect-ratio:1] left-[50%] top-[50%] [transform:translate(-50%,_-50%)_rotate(-20deg)] pointer-events-none"
        aria-hidden="true"
      >
        {Array.from({ length: 5 }, (_, i) => (
          <i
            className="absolute [border-top-style:solid] [border-right-style:solid] [border-bottom-style:solid] [border-left-style:solid] opacity-75 border-[2px] border-[#42697524] rounded-[27%]"
            key={i}
            style={{ inset: i * 19 + "px" }}
          />
        ))}
      </div>
      <div className="zen-lab relative bg-transparent [background-image:linear-gradient(135deg,_#15262ef5,_#0d171dfc_65%)] [box-shadow:0_32px_90px_#0006,_inset_0_1px_0_#b9d8e00a] [@media(width<=560px)]:py-[20px] [@media(560px<width<=1100px)]:p-[21px] p-[22px] [@media(width<=560px)]:px-[16px] rounded-[10px]">
        <div className="zen-lab-progress flex items-center not-italic font-normal text-[9px] leading-[normal] font-sans text-[#93aeb9] mt-[24px] gap-[15px]">
          <span className="last:ml-auto last:text-[#6f909d] [@media(width<=560px)]:last:text-[7px] last:text-[8px]">
            0{questionIndex + 1} / 03
          </span>
          <div className="flex [@media(width<=1100px)]:w-[70px] w-[100px] gap-[4px]">
            {practiceQuestions.map((_, i) => (
              <i
                className="h-[2px] grow shrink basis-[0%] bg-[#2e4652] bg-none data-[active=true]:bg-[#92c8d6] data-[active=true]:bg-none"
                key={i}
                data-active={i <= questionIndex}
              />
            ))}
          </div>
        </div>
        <h3 className="mt-[12px] mb-[21px] [@media(width<=1100px)]:text-[20px] text-[21px] tracking-[-0.035em] leading-[1.4] font-normal mx-0">
          {question.question}
        </h3>
        <div
          className="zen-demo-answers grid gap-[10px]"
          role="group"
          aria-label="Choose an interview answer"
        >
          {question.answers.map((item, i) => (
            <button
              className="flex items-center min-h-[52px] text-left [@media(width<=560px)]:text-[14px] text-[13px] text-[#b6cad3] bg-[#101d25] bg-none [border-top-style:solid] [border-right-style:solid] [border-bottom-style:solid] [border-left-style:solid] transition-[background,_border-color] [transition-duration:0.2s,_0.2s] [transition-timing-function:ease,_ease] [transition-delay:0s,_0s] [&:hover:not(:disabled)]:bg-[#19313b] [&:hover:not(:disabled)]:bg-none data-[correct=true]:bg-[#23414a] data-[correct=true]:bg-none data-[correct=true]:text-[#e0eff2] data-[incorrect=true]:bg-[#26323b] data-[incorrect=true]:bg-none [@media(width<=560px)]:py-[11px] p-[12px] [@media(width<=560px)]:px-[10px] border border-[#2e4652] [&:hover:not(:disabled)]:border-[#82b3c2] data-[correct=true]:border-[#78aeba] data-[incorrect=true]:border-[#83959b] rounded-[12px] [@media(width<=560px)]:gap-[10px] gap-[12px]"
              key={item}
              type="button"
              aria-pressed={answer === i}
              disabled={answer !== null}
              data-correct={answer !== null && i === question.correct}
              data-incorrect={answer === i && i !== question.correct}
              onClick={() => setAnswer(i)}
            >
              <span className="first:grid first:place-items-center first:not-italic first:font-normal first:text-[11px] first:leading-[normal] first:font-sans first:shrink-0 first:w-[26px] first:h-[26px] first:bg-[#1b303c] first:bg-none first:text-[#8badbb] first:rounded-[3px]">
                {String.fromCharCode(65 + i)}
              </span>
              {item}
              {answer !== null && i === question.correct ? (
                <Check className="ml-auto shrink-0" size={16} />
              ) : (
                <span className="zen-answer-circle first:grid first:place-items-center first:not-italic first:font-normal first:text-[11px] first:leading-[normal] first:font-sans first:shrink-0 first:w-[26px] first:h-[26px] first:bg-[#1b303c] first:bg-none first:text-[#8badbb] ml-auto shrink-0 w-[12px] h-[12px] [border-top-style:solid] [border-right-style:solid] [border-bottom-style:solid] [border-left-style:solid] border border-[#456371] first:rounded-[3px] rounded-[50%]" />
              )}
            </button>
          ))}
        </div>
        <div
          className="zen-lab-feedback min-h-[48px] mt-[20px] pt-[17px] border-t [border-top-style:solid] border-t-[#2b424f]"
          aria-live="polite"
        >
          {answer === null ? (
            <p className="text-[#617a86] text-[12px] leading-[1.8] first:flex first:items-center first:gap-[8px]">
              A little practice changes how you show up.
            </p>
          ) : (
            <>
              <strong className="text-[12px] block mb-[7px] text-[#bfe3eb] font-medium">
                {answer === question.correct
                  ? "That’s a strong approach."
                  : "Here’s a more useful approach."}
              </strong>
              <p className="text-[#617a86] text-[12px] leading-[1.8] first:flex first:items-center first:gap-[8px]">
                {question.explanation}
              </p>
              <button
                className="flex items-center min-h-[44px] mt-[8px] text-[#c3e4ea] text-[12px] gap-[9px]"
                type="button"
                onClick={() => {
                  setQuestionIndex(
                    (questionIndex + 1) % practiceQuestions.length,
                  );
                  setAnswer(null);
                }}
              >
                {questionIndex === 2 ? "Start again" : "Try another question"}{" "}
                {questionIndex === 2 ? (
                  <RotateCcw size={14} />
                ) : (
                  <ArrowRight size={14} />
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function DocumentStudio() {
  const [document, setDocument] = useState("resume");
  return (
    <div className="zen-document-scene relative [@media(width<=560px)]:pt-[120px] [@media(560px<width<=850px)]:pt-[72px] pt-[70px] [@media(width<=560px)]:pl-[17px] [@media(560px<width<=850px)]:pl-[44px] [@media(850px<width<=1100px)]:pl-[30px] pl-[52px] [@media(width<=560px)]:pr-[8px] [@media(560px<width<=1100px)]:pr-[5px] pr-[15px] [@media(width<=850px)]:max-w-[450px] [@media(width<=850px)]:mx-auto">
      <div className="zen-document-source absolute z-3 top-0 [@media(width<=560px)]:left-0 left-[-5px] bg-[#102129ee] bg-none [transform:rotate(-5deg)] [box-shadow:0_15px_35px_#0004] [&_>_span]:flex [&_>_span]:items-center [&_>_span]:text-[#8ab2c2] [&_>_span]:not-italic [&_>_span]:font-normal [&_>_span]:text-[9px] [&_>_span]:leading-[normal] [&_>_span]:font-sans [&_>_span]:tracking-[0.06em] [@media(width<=560px)]:py-[13px] py-[15px] [@media(width<=560px)]:px-[16px] px-[18px] rounded-[6px] [&_>_span]:gap-[7px]">
        <p className="[@media(width<=560px)]:text-[12px] text-[13px] leading-[1.6] text-[#d0e1e8] mt-[10px]">
          “I helped make onboarding
          <br />
          easier for new users.”
        </p>
        <div className="flex mt-[12px] gap-[7px]">
          <span className="[border-top-style:solid] [border-right-style:solid] [border-bottom-style:solid] [border-left-style:solid] text-[#85a8bb] text-[9px] py-[3px] px-[6px] border border-[#314f60] rounded-[3px]">
            Clarity
          </span>
          <span className="[border-top-style:solid] [border-right-style:solid] [border-bottom-style:solid] [border-left-style:solid] text-[#85a8bb] text-[9px] py-[3px] px-[6px] border border-[#314f60] rounded-[3px]">
            Impact
          </span>
          <span className="[border-top-style:solid] [border-right-style:solid] [border-bottom-style:solid] [border-left-style:solid] text-[#85a8bb] text-[9px] py-[3px] px-[6px] border border-[#314f60] rounded-[3px]">
            Your voice
          </span>
        </div>
      </div>
      <div
        className="zen-document-connector absolute [@media(width<=560px)]:left-[-6px] left-[-20px] [@media(width<=560px)]:top-[133px] top-[145px] w-[44%]"
        aria-hidden="true"
      >
        <svg className="w-full" viewBox="0 0 220 95">
          <path
            d="M0 2 H70 Q85 2 85 18 V70 Q85 85 100 85 H210"
            fill="none"
            stroke="#6a9da8"
            strokeDasharray="3 5"
          />
          <circle cx="210" cy="85" r="3" fill="#a3d0d8" />
        </svg>
      </div>
      <Tabs
        value={document}
        onValueChange={setDocument}
        className="zen-document-view relative z-2"
      >
        <TabsList
          className="zen-tabs zen-document-tabs data-[slot=tabs-list]:flex data-[slot=tabs-list]:w-full data-[slot=tabs-list]:h-auto data-[slot=tabs-list]:bg-transparent data-[slot=tabs-list]:bg-none data-[slot=tabs-list]:border-b-0 data-[slot=tabs-list]:[border-bottom-style:none] data-[slot=tabs-list]:border-b-[currentColor] data-[slot=tabs-list]:justify-end data-[slot=tabs-list]:mb-[16px] [&_[data-slot='tabs-trigger'][data-state='active']]:text-[#d2e9ed] [&_[data-slot='tabs-trigger'][data-state='active']]:bg-transparent [&_[data-slot='tabs-trigger'][data-state='active']]:bg-none [&_[data-slot='tabs-trigger'][data-state='active']]:[box-shadow:0_1px_0_#9ed0da] data-[slot=tabs-list]:p-0 data-[slot=tabs-list]:rounded-[0] [@media(width<=560px)]:data-[slot=tabs-list]:gap-[22px] data-[slot=tabs-list]:gap-[24px]"
          aria-label="Preview application documents"
        >
          <TabsTrigger
            className="data-[slot=tabs-trigger]:grow-0 data-[slot=tabs-trigger]:shrink data-[slot=tabs-trigger]:basis-auto data-[slot=tabs-trigger]:relative data-[slot=tabs-trigger]:min-h-[38px] data-[slot=tabs-trigger]:pt-[10px] data-[slot=tabs-trigger]:pb-[13px] data-[slot=tabs-trigger]:text-[12px] data-[slot=tabs-trigger]:text-[#8aa2ad] data-[slot=tabs-trigger]:bg-transparent data-[slot=tabs-trigger]:bg-none data-[slot=tabs-trigger]:[box-shadow:none] data-[slot=tabs-trigger]:font-normal data-[slot=tabs-trigger]:[border-top-style:none] data-[slot=tabs-trigger]:[border-right-style:none] data-[slot=tabs-trigger]:[border-bottom-style:none] data-[slot=tabs-trigger]:[border-left-style:none] data-[slot=tabs-trigger]:px-0 data-[slot=tabs-trigger]:border-0 data-[slot=tabs-trigger]:border-[currentColor] data-[slot=tabs-trigger]:rounded-[0] data-[slot=tabs-trigger]:gap-[8px]"
            value="resume"
          >
            <FileText size={13} /> Resume
          </TabsTrigger>
          <TabsTrigger
            className="data-[slot=tabs-trigger]:grow-0 data-[slot=tabs-trigger]:shrink data-[slot=tabs-trigger]:basis-auto data-[slot=tabs-trigger]:relative data-[slot=tabs-trigger]:min-h-[38px] data-[slot=tabs-trigger]:pt-[10px] data-[slot=tabs-trigger]:pb-[13px] data-[slot=tabs-trigger]:text-[12px] data-[slot=tabs-trigger]:text-[#8aa2ad] data-[slot=tabs-trigger]:bg-transparent data-[slot=tabs-trigger]:bg-none data-[slot=tabs-trigger]:[box-shadow:none] data-[slot=tabs-trigger]:font-normal data-[slot=tabs-trigger]:[border-top-style:none] data-[slot=tabs-trigger]:[border-right-style:none] data-[slot=tabs-trigger]:[border-bottom-style:none] data-[slot=tabs-trigger]:[border-left-style:none] data-[slot=tabs-trigger]:px-0 data-[slot=tabs-trigger]:border-0 data-[slot=tabs-trigger]:border-[currentColor] data-[slot=tabs-trigger]:rounded-[0] data-[slot=tabs-trigger]:gap-[8px]"
            value="letter"
          >
            Cover letter <ArrowUpRight size={13} />
          </TabsTrigger>
        </TabsList>
        <div className="zen-paper-stack relative">
          <div
            className="zen-paper-back absolute top-0 right-0 bottom-0 left-0 bg-[#74909e] bg-none [transform:rotate(4deg)_translate(5px,_4px)] opacity-40 rounded-[3px]"
            aria-hidden="true"
          />
          <TabsContent
            value="resume"
            className="zen-paper data-[slot=tabs-content]:relative data-[slot=tabs-content]:text-[#203740] data-[slot=tabs-content]:bg-transparent data-[slot=tabs-content]:[background-image:linear-gradient(135deg,_#e5eff1,_#c3d4d9)] data-[slot=tabs-content]:border-t data-[slot=tabs-content]:[border-top-style:solid] data-[slot=tabs-content]:border-r data-[slot=tabs-content]:[border-right-style:solid] data-[slot=tabs-content]:border-b data-[slot=tabs-content]:[border-bottom-style:solid] data-[slot=tabs-content]:border-l data-[slot=tabs-content]:[border-left-style:solid] [@media(width<=560px)]:data-[slot=tabs-content]:pt-[23px] data-[slot=tabs-content]:pt-[24px] [@media(width<=560px)]:data-[slot=tabs-content]:pb-[17px] data-[slot=tabs-content]:pb-[16px] [@media(width<=560px)]:data-[slot=tabs-content]:min-h-[420px] data-[slot=tabs-content]:min-h-[400px] data-[slot=tabs-content]:[box-shadow:0_25px_55px_#0004] data-[slot=tabs-content]:[transform:rotate(-2deg)] [@media(width<=560px)]:data-[slot=tabs-content]:px-[22px] [@media(560px<width<=850px)]:data-[slot=tabs-content]:px-[30px] [@media(850px<width<=1100px)]:data-[slot=tabs-content]:px-[22px] data-[slot=tabs-content]:px-[26px] data-[slot=tabs-content]:border-[#e1eff5] data-[slot=tabs-content]:rounded-[3px]"
          >
            <div className="zen-paper-meta flex justify-between not-italic font-normal text-[7px] leading-[1.6] font-sans tracking-[0.07em] text-[#5b737e] gap-[10px]">
              <span>PROFESSIONAL PROFILE</span>
              <span>01 / 01</span>
            </div>
            <h3 className="text-[26px] tracking-[-0.055em] font-medium mt-[22px]">
              Maya Chen
              <span className="block text-[11px] tracking-[0] text-[#466571] mt-[4px]">
                Product Designer
              </span>
            </h3>
            <p className="zen-paper-contact text-[8px] mt-[12px] leading-[1.75] text-[#354e5b]">
              maya.chen@example.com · San Francisco, CA
            </p>
            <div className="zen-paper-rule h-px bg-[#829ca766] bg-none my-[16px]" />
            <small className="block not-italic font-normal text-[7px] leading-[normal] font-sans tracking-[0.1em] text-[#527180] mt-[17px]">
              PROFILE
            </small>
            <p className="text-[10px] leading-[1.75] mt-[9px] text-[#354e5b]">
              Thoughtful product design. Clearer experiences.
              <br />A focus on the moments that matter.
            </p>
            <small className="block not-italic font-normal text-[7px] leading-[normal] font-sans tracking-[0.1em] text-[#527180] mt-[17px]">
              SELECTED EXPERIENCE
            </small>
            <div className="zen-paper-role flex items-center justify-between mt-[9px] gap-[10px]">
              <strong className="text-[10px] font-[550]">
                Product Designer
              </strong>
              <span className="not-italic font-normal text-[7px] leading-[normal] font-sans text-[#567381]">
                2023 — PRESENT
              </span>
            </div>
            <p className="zen-paper-highlight text-[10px] leading-[1.75] mt-[9px] text-[#23434f] bg-[#6aa4b724] bg-none border-l-[2px] [border-left-style:solid] border-l-[#598a9b] py-[9px] px-[11px] mx-[-11px]">
              Redesigned the onboarding experience, reducing first-run drop-off
              by 24% through user research and iterative testing.
            </p>
            <p className="text-[10px] leading-[1.75] mt-[9px] text-[#354e5b]">
              Partnered with engineering to turn complex workflows into simple,
              accessible interactions.
            </p>
            <small className="block not-italic font-normal text-[7px] leading-[normal] font-sans tracking-[0.1em] text-[#527180] mt-[17px]">
              CORE SKILLS
            </small>
            <div className="zen-paper-skills flex flex-wrap mt-[9px] gap-[7px]">
              <span className="text-[8px] [border-top-style:solid] [border-right-style:solid] [border-bottom-style:solid] [border-left-style:solid] py-[3px] px-[5px] border border-[#86a1ad66]">
                Product strategy
              </span>
              <span className="text-[8px] [border-top-style:solid] [border-right-style:solid] [border-bottom-style:solid] [border-left-style:solid] py-[3px] px-[5px] border border-[#86a1ad66]">
                Interaction design
              </span>
              <span className="text-[8px] [border-top-style:solid] [border-right-style:solid] [border-bottom-style:solid] [border-left-style:solid] py-[3px] px-[5px] border border-[#86a1ad66]">
                User research
              </span>
            </div>
            <div className="zen-paper-bottom flex justify-between border-t [border-top-style:solid] border-t-[#8ca3ad66] pt-[10px] mt-[24px] text-[#537381] not-italic font-normal text-[7px] leading-[normal] font-sans">
              <span>YOUR EXPERIENCE, WITH INTENTION.</span>
              <span>↗</span>
            </div>
          </TabsContent>
          <TabsContent
            value="letter"
            className="zen-paper zen-letter-paper data-[slot=tabs-content]:relative data-[slot=tabs-content]:text-[#203740] data-[slot=tabs-content]:bg-transparent data-[slot=tabs-content]:[background-image:linear-gradient(135deg,_#e5eff1,_#c3d4d9)] data-[slot=tabs-content]:border-t data-[slot=tabs-content]:[border-top-style:solid] data-[slot=tabs-content]:border-r data-[slot=tabs-content]:[border-right-style:solid] data-[slot=tabs-content]:border-b data-[slot=tabs-content]:[border-bottom-style:solid] data-[slot=tabs-content]:border-l data-[slot=tabs-content]:[border-left-style:solid] [@media(width<=560px)]:data-[slot=tabs-content]:pt-[23px] data-[slot=tabs-content]:pt-[24px] [@media(width<=560px)]:data-[slot=tabs-content]:pb-[17px] data-[slot=tabs-content]:pb-[16px] [@media(width<=560px)]:data-[slot=tabs-content]:min-h-[420px] data-[slot=tabs-content]:min-h-[400px] data-[slot=tabs-content]:[box-shadow:0_25px_55px_#0004] data-[slot=tabs-content]:[transform:rotate(-2deg)] [@media(width<=560px)]:data-[slot=tabs-content]:px-[22px] [@media(560px<width<=850px)]:data-[slot=tabs-content]:px-[30px] [@media(850px<width<=1100px)]:data-[slot=tabs-content]:px-[22px] data-[slot=tabs-content]:px-[26px] data-[slot=tabs-content]:border-[#e1eff5] data-[slot=tabs-content]:rounded-[3px]"
          >
            <div className="zen-paper-meta flex justify-between not-italic font-normal text-[7px] leading-[1.6] font-sans tracking-[0.07em] text-[#5b737e] gap-[10px]">
              <span>A CONSIDERED INTRODUCTION</span>
              <span>01 / 01</span>
            </div>
            <h3 className="text-[26px] tracking-[-0.055em] font-medium mt-[22px]">
              Maya Chen
              <span className="block text-[11px] tracking-[0] text-[#466571] mt-[4px]">
                Product Designer
              </span>
            </h3>
            <p className="zen-paper-contact text-[8px] mt-[12px] leading-[1.75] text-[#354e5b]">
              maya.chen@example.com · San Francisco, CA
            </p>
            <div className="zen-paper-rule h-px bg-[#829ca766] bg-none my-[16px]" />
            <small className="block not-italic font-normal text-[7px] leading-[normal] font-sans tracking-[0.1em] text-[#527180] mt-[17px]">
              RE: PRODUCT DESIGNER
            </small>
            <p className="text-[10px] leading-[1.75] mt-[9px] text-[#354e5b]">
              Dear hiring team,
            </p>
            <p className="text-[10px] leading-[1.75] mt-[9px] text-[#354e5b]">
              I’m drawn to products that make complex work feel simple. Your
              focus on thoughtful, accessible experiences is the kind of
              challenge I want to help solve.
            </p>
            <p className="zen-paper-highlight text-[10px] leading-[1.75] mt-[9px] text-[#23434f] bg-[#6aa4b724] bg-none border-l-[2px] [border-left-style:solid] border-l-[#598a9b] py-[9px] px-[11px] mx-[-11px]">
              In my current role, I redesigned onboarding to reduce first-run
              drop-off by 24%, combining user research with close engineering
              collaboration.
            </p>
            <p className="text-[10px] leading-[1.75] mt-[9px] text-[#354e5b]">
              I’d welcome the opportunity to bring that same care to your team.
            </p>
            <p className="zen-paper-signature text-[22px] leading-[1.75] mt-[9px] text-[#3a5a6b] [font-family:Georgia,_serif] italic">
              Maya Chen
            </p>
            <div className="zen-paper-bottom flex justify-between border-t [border-top-style:solid] border-t-[#8ca3ad66] pt-[10px] mt-[24px] text-[#537381] not-italic font-normal text-[7px] leading-[normal] font-sans">
              <span>YOUR STORY. THEIR OPPORTUNITY.</span>
              <span>↗</span>
            </div>
          </TabsContent>
        </div>
      </Tabs>
      <div className="zen-document-caption flex items-center justify-center mt-[28px] text-[11px] text-[#abc8d4] flex-wrap gap-[7px]">
        <Check size={13} /> A clearer story. Still yours.
        <span className="block w-full text-center not-italic font-normal text-[8px] leading-[normal] font-sans text-[#688a99] mt-[3px]">
          ILLUSTRATIVE PROFILE
        </span>
      </div>
    </div>
  );
}

export function JourneyLine() {
  return (
    <svg
      className="zen-journey-line absolute top-0 right-0 bottom-0 left-0 w-full h-[95px] pointer-events-none [@media(width<=560px)]:hidden"
      viewBox="0 0 1200 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="zen-journey-gradient">
          <stop stopColor="#70b7c2" stopOpacity=".15" />
          <stop offset=".5" stopColor="#a6dbe3" />
          <stop offset="1" stopColor="#70b7c2" stopOpacity=".2" />
        </linearGradient>
      </defs>
      <path
        d="M0 75 C200 75 220 35 400 35 S700 65 820 28 S1080 18 1200 10"
        stroke="url(#zen-journey-gradient)"
        fill="none"
      />
      <path
        d="M0 85 C200 85 220 45 400 45 S700 75 820 38 S1080 28 1200 20"
        stroke="#70b7c2"
        strokeOpacity=".13"
        fill="none"
      />
    </svg>
  );
}

"use client";

import { useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue } from "motion/react";
import { Pause, Play } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAmbientPlayback } from "@/components/use-ambient-playback";

const views = ["outlook", "salary", "skills"] as const;
const viewDuration = 6000;
const sectors = [
  {
    name: "Healthcare",
    ink: "#c9edf0",
    dash: "",
    path: "M10 175 C75 179 82 140 120 147 S190 117 222 126 S282 71 330 82 S410 48 500 29",
  },
  {
    name: "Finance",
    ink: "#85bac6",
    dash: "7 5",
    path: "M10 193 C60 177 91 187 130 169 S203 165 248 142 S313 155 350 121 S430 129 500 89",
  },
  {
    name: "Education",
    ink: "#698e9b",
    dash: "2 5",
    path: "M10 156 C73 148 87 160 135 148 S211 149 255 129 S334 131 382 116 S452 118 500 108",
  },
  {
    name: "Manufacturing",
    ink: "#a0ccd2",
    dash: "12 5 2 5",
    path: "M10 207 C75 191 99 209 147 185 S210 196 263 166 S335 173 380 143 S446 147 500 127",
  },
];

function OutlookPreview() {
  return (
    <>
      <div className="zen-lens-title flex items-center justify-between [&_small]:text-[#76939e] [&_small]:not-italic [&_small]:font-normal [&_small]:text-[9px] [&_small]:leading-[normal] [&_small]:font-sans [&_small]:tracking-[0.09em] [&_>_svg]:text-[#88b4c1] [@media(width<=560px)]:[.zen-industry-carousel_&_h3]:text-[21px] gap-[20px] [@media(width<=560px)]:[.zen-industry-carousel_&]:gap-[12px]">
        <div>
          <h3 className="[@media(width<=560px)]:text-[21px] text-[22px] font-normal tracking-[-0.04em] mt-[9px]">
            See where work is moving.
          </h3>
        </div>
      </div>
      <p className="zen-range-intro text-[#9db3bc] text-[13px] leading-[1.8] mt-[15px] max-w-[360px] [.zen-industry-carousel_&]:max-w-[440px]">
        Hiring trends and market outlooks, shaped around the industry you work
        in.
      </p>
      <div className="zen-market-plot mt-[22px]">
        <div className="zen-chart-label flex items-center text-[#a5bec5] text-[11px] mb-[7px] gap-[8px]">
          <span className="zen-status last:ml-auto last:not-italic last:font-normal last:text-[8px] last:leading-[normal] last:font-sans last:tracking-[0.1em] last:text-[#6b8b95] w-[6px] h-[6px] bg-[#9bd4dc] bg-none [box-shadow:0_0_0_4px_#70b7c20b,_0_0_14px_#70b7c24d] rounded-[50%]" />{" "}
          Hiring momentum{" "}
          <span className="last:ml-auto last:not-italic last:font-normal last:text-[8px] last:leading-[normal] last:font-sans last:tracking-[0.1em] last:text-[#6b8b95]">
            ILLUSTRATIVE TRENDS
          </span>
        </div>
        <svg
          className="w-full overflow-visible"
          viewBox="0 0 520 240"
          role="img"
          aria-label="Illustrative hiring trends for healthcare, finance, education, and manufacturing. These demonstrate industry coverage, not live market data."
        >
          <defs>
            <linearGradient id="zen-sector-fill" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#a9dce4" stopOpacity=".14" />
              <stop offset="1" stopColor="#70b7c2" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[40, 90, 140, 190].map((y) => (
            <line
              key={y}
              x1="10"
              y1={y}
              x2="500"
              y2={y}
              stroke="#29434b"
              strokeDasharray="2 6"
            />
          ))}
          {[10, 108, 206, 304, 402, 500].map((x) => (
            <line
              key={x}
              x1={x}
              y1="15"
              x2={x}
              y2="210"
              stroke="#29434b"
              opacity=".3"
            />
          ))}
          <path
            d={sectors[0].path + " L500 212 L10 212 Z"}
            fill="url(#zen-sector-fill)"
          />
          {sectors.map((sector) => (
            <g key={sector.name}>
              <path
                d={sector.path}
                fill="none"
                stroke={sector.ink}
                strokeWidth="2"
                strokeDasharray={sector.dash}
              />
              <circle
                cx="500"
                cy={
                  sector.name === "Healthcare"
                    ? 29
                    : sector.name === "Finance"
                      ? 89
                      : sector.name === "Education"
                        ? 108
                        : 127
                }
                r="3"
                fill={sector.ink}
              />
            </g>
          ))}
          {["JAN", "FEB", "MAR", "APR", "MAY", "JUN"].map((month, i) => (
            <text
              key={month}
              x={i * 96 + 10}
              y="235"
              fill="#7f989f"
              fontSize="10"
              fontFamily="Inter"
            >
              {month}
            </text>
          ))}
        </svg>
      </div>
      <div className="zen-sector-legend grid grid-cols-[repeat(2,_1fr)] [@media(width<=560px)]:gap-y-[14px] gap-y-[13px] [@media(width<=560px)]:gap-x-[12px] gap-x-[25px] [@media(width<=560px)]:text-[10px] text-[11px] text-[#a7c0c8] mt-[18px]">
        {sectors.map((sector) => (
          <span className="flex items-center gap-[10px]" key={sector.name}>
            <svg
              className="w-[28px] h-[6px] shrink-0"
              viewBox="0 0 28 6"
              aria-hidden="true"
            >
              <path
                d="M0 3 H28"
                stroke={sector.ink}
                strokeWidth="2"
                strokeDasharray={sector.dash}
              />
            </svg>
            {sector.name}
          </span>
        ))}
      </div>
      <p className="zen-demo-note text-[#839fa9] text-[11px] leading-[1.7] mt-[20px]">
        From healthcare and education to technology, retail, and beyond. Start
        with your field.
      </p>
    </>
  );
}

function SalaryPreview() {
  return (
    <>
      <div className="zen-lens-title flex items-center justify-between [&_small]:text-[#76939e] [&_small]:not-italic [&_small]:font-normal [&_small]:text-[9px] [&_small]:leading-[normal] [&_small]:font-sans [&_small]:tracking-[0.09em] [&_>_svg]:text-[#88b4c1] [@media(width<=560px)]:[.zen-industry-carousel_&_h3]:text-[21px] gap-[20px] [@media(width<=560px)]:[.zen-industry-carousel_&]:gap-[12px]">
        <div>
          <h3 className="[@media(width<=560px)]:text-[21px] text-[22px] font-normal tracking-[-0.04em] mt-[9px]">
            Put a range to your potential.
          </h3>
        </div>
      </div>
      <p className="zen-range-intro text-[#9db3bc] text-[13px] leading-[1.8] mt-[15px] max-w-[360px] [.zen-industry-carousel_&]:max-w-[440px]">
        Explore salary estimates for the roles that matter to you, across
        professional fields.
      </p>
      <div className="zen-salary-demo zen-cross-industry-salaries mt-[24px] grid gap-[20px]">
        {[
          {
            role: "Registered nurse",
            sector: "Healthcare",
            low: 65,
            mid: 85,
            high: 115,
          },
          {
            role: "Financial analyst",
            sector: "Finance",
            low: 60,
            mid: 85,
            high: 120,
          },
          {
            role: "Mechanical engineer",
            sector: "Engineering",
            low: 65,
            mid: 90,
            high: 125,
          },
          {
            role: "Graphic designer",
            sector: "Creative & media",
            low: 40,
            mid: 60,
            high: 85,
          },
        ].map((row) => (
          <div key={row.role}>
            <div className="first:flex first:items-center first:justify-between first:text-[12px]">
              <span>
                {row.role}
                <small className="block text-[#6e909e] not-italic font-normal text-[9px] leading-[1.5] font-sans mt-[4px]">
                  {row.sector}
                </small>
              </span>
              <strong className="not-italic font-normal text-[12px] leading-[normal] font-sans text-[#add1da]">
                ${row.low}–{row.high}k
              </strong>
            </div>
            <div className="zen-salary-track first:flex first:items-center first:justify-between first:text-[12px] h-[11px] mt-[12px] relative bg-transparent [background-image:repeating-linear-gradient(_90deg,_#36556042_0_1px,_transparent_1px_20px_)]">
              <span
                className="h-full absolute bg-transparent [background-image:linear-gradient(90deg,_#284c59,_#6a9da9)] rounded-[2px]"
                style={{
                  left: (row.low - 30) / 1.2 + "%",
                  width: (row.high - row.low) / 1.2 + "%",
                }}
              />
              <i
                className="absolute w-[3px] h-[19px] top-[-4px] bg-[#d1ecf1] bg-none"
                style={{ left: (row.mid - 30) / 1.2 + "%" }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="zen-range-key flex mt-[22px] text-[#9ab2bb] text-[10px] gap-[18px]">
        <span className="flex items-center last:ml-auto last:not-italic last:font-normal last:text-[8px] last:leading-[normal] last:font-sans gap-[6px]">
          <i className="w-[18px] h-[6px] bg-[#608b96] bg-none" /> Range
        </span>
        <span className="flex items-center last:ml-auto last:not-italic last:font-normal last:text-[8px] last:leading-[normal] last:font-sans gap-[6px]">
          <b className="w-[2px] h-[9px] bg-[#d1ecf1] bg-none" /> Median
        </span>
        <span className="flex items-center last:ml-auto last:not-italic last:font-normal last:text-[8px] last:leading-[normal] last:font-sans gap-[6px]">
          USD / YEAR
        </span>
      </div>
      <p className="zen-demo-note text-[#839fa9] text-[11px] leading-[1.7] mt-[20px]">
        Sample figures for demonstration. Your workspace generates estimates for
        your selected industry.
      </p>
    </>
  );
}

function SkillsPreview() {
  return (
    <>
      <div className="zen-lens-title flex items-center justify-between [&_small]:text-[#76939e] [&_small]:not-italic [&_small]:font-normal [&_small]:text-[9px] [&_small]:leading-[normal] [&_small]:font-sans [&_small]:tracking-[0.09em] [&_>_svg]:text-[#88b4c1] [@media(width<=560px)]:[.zen-industry-carousel_&_h3]:text-[21px] gap-[20px] [@media(width<=560px)]:[.zen-industry-carousel_&]:gap-[12px]">
        <div>
          <h3 className="[@media(width<=560px)]:text-[21px] text-[22px] font-normal tracking-[-0.04em] mt-[9px]">
            Find the skills for your next step.
          </h3>
        </div>
      </div>
      <p className="zen-range-intro text-[#9db3bc] text-[13px] leading-[1.8] mt-[15px] max-w-[360px] [.zen-industry-carousel_&]:max-w-[440px]">
        Recommendations connect your experience to the needs of your industry.
      </p>
      <div
        className="zen-skill-network zen-industry-network relative [@media(width<=560px)]:mt-[40px] mt-[26px] [@media(width<=560px)]:mb-[32px] mb-[30px]"
        role="img"
        aria-label="Examples of skills in different fields: patient care in healthcare, instruction in education, leadership in business, and visual storytelling in creative work. Your recommendations depend on your profile."
      >
        <svg className="w-full" viewBox="0 0 520 270" aria-hidden="true">
          <defs>
            <radialGradient id="zen-network-light">
              <stop stopColor="#70b7c2" stopOpacity=".18" />
              <stop offset="1" stopColor="#70b7c2" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse
            cx="260"
            cy="135"
            rx="235"
            ry="135"
            fill="url(#zen-network-light)"
          />
          <g fill="none" stroke="#6495a1" strokeWidth=".8">
            <path d="M260 135 Q180 45 95 55 M260 135 Q335 35 425 55 M260 135 Q135 135 95 225 M260 135 Q385 135 425 225" />
            <ellipse
              cx="260"
              cy="135"
              rx="178"
              ry="95"
              strokeDasharray="2 7"
              opacity=".4"
            />
            <circle cx="260" cy="135" r="66" opacity=".25" />
          </g>
        </svg>
        <span className="zen-skill-core absolute bg-[#11242bf2] bg-none [border-top-style:solid] [border-right-style:solid] [border-bottom-style:solid] [border-left-style:solid] [@media(width<=560px)]:text-[12px] text-[16px] [transform:translate(-50%,_-50%)] whitespace-nowrap top-[50%] left-[50%] text-center text-[#d9eef2] [box-shadow:0_0_30px_#5898ab20] [@media(width<=560px)]:p-[11px] py-[16px] px-[23px] border border-[#496d78] rounded-[4px]">
          Your profile
          <small className="block not-italic font-normal [@media(width<=560px)]:text-[6px] text-[8px] leading-[normal] font-sans text-[#8bb4c0] mt-[6px]">
            YOUR INDUSTRY + EXPERIENCE
          </small>
        </span>
        <span className="zen-skill-node zen-skill-a absolute bg-[#11242bf2] bg-none [border-top-style:solid] [border-right-style:solid] [border-bottom-style:solid] [border-left-style:solid] [@media(width<=560px)]:text-[9px] text-[11px] [transform:translate(-50%,_-50%)] whitespace-nowrap top-[20%] left-[18%] text-[#bdd9df] [@media(width<=560px)]:p-[9px] py-[12px] px-[16px] border border-[#496d78] rounded-[4px]">
          <small className="block text-[#719ba8] not-italic font-normal [@media(width<=560px)]:text-[6px] text-[8px] leading-[1.6] font-sans tracking-[0.05em] [@media(width<=560px)]:mb-[4px] mb-[6px]">
            HEALTHCARE
          </small>
          Patient care
        </span>
        <span className="zen-skill-node zen-skill-b absolute bg-[#11242bf2] bg-none [border-top-style:solid] [border-right-style:solid] [border-bottom-style:solid] [border-left-style:solid] [@media(width<=560px)]:text-[9px] text-[11px] [transform:translate(-50%,_-50%)] whitespace-nowrap top-[20%] left-[82%] text-[#bdd9df] [@media(width<=560px)]:p-[9px] py-[12px] px-[16px] border border-[#496d78] rounded-[4px]">
          <small className="block text-[#719ba8] not-italic font-normal [@media(width<=560px)]:text-[6px] text-[8px] leading-[1.6] font-sans tracking-[0.05em] [@media(width<=560px)]:mb-[4px] mb-[6px]">
            EDUCATION
          </small>
          Instruction
        </span>
        <span className="zen-skill-node zen-skill-c absolute bg-[#11242bf2] bg-none [border-top-style:solid] [border-right-style:solid] [border-bottom-style:solid] [border-left-style:solid] [@media(width<=560px)]:text-[9px] text-[11px] [transform:translate(-50%,_-50%)] whitespace-nowrap top-[83%] left-[18%] text-[#bdd9df] [@media(width<=560px)]:p-[9px] py-[12px] px-[16px] border border-[#496d78] rounded-[4px]">
          <small className="block text-[#719ba8] not-italic font-normal [@media(width<=560px)]:text-[6px] text-[8px] leading-[1.6] font-sans tracking-[0.05em] [@media(width<=560px)]:mb-[4px] mb-[6px]">
            BUSINESS
          </small>
          Leadership
        </span>
        <span className="zen-skill-node zen-skill-d absolute bg-[#11242bf2] bg-none [border-top-style:solid] [border-right-style:solid] [border-bottom-style:solid] [border-left-style:solid] [@media(width<=560px)]:text-[9px] text-[11px] [transform:translate(-50%,_-50%)] whitespace-nowrap top-[82%] left-[82%] text-[#bdd9df] [@media(width<=560px)]:p-[9px] py-[12px] px-[16px] border border-[#496d78] rounded-[4px]">
          <small className="block text-[#719ba8] not-italic font-normal [@media(width<=560px)]:text-[6px] text-[8px] leading-[1.6] font-sans tracking-[0.05em] [@media(width<=560px)]:mb-[4px] mb-[6px]">
            CREATIVE
          </small>
          Visual storytelling
        </span>
      </div>
      <p className="zen-demo-note text-[#839fa9] text-[11px] leading-[1.7] mt-[20px]">
        A few examples from a much wider landscape. Your workspace recommends
        skills for your own professional path.
      </p>
    </>
  );
}

export function IndustryLens() {
  const { ref, canPlay, reducedMotion } = useAmbientPlayback();
  const [view, setView] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const elapsed = useRef(0);
  const progress = useMotionValue(0);
  const playing = canPlay && !paused && !hovered;

  useAnimationFrame((_, delta) => {
    if (!playing) return;
    elapsed.current += Math.min(delta, 100);
    if (elapsed.current >= viewDuration) {
      elapsed.current = 0;
      setView((current) => (current + 1) % views.length);
    }
    progress.set(elapsed.current / viewDuration);
  });

  return (
    <div
      className="zen-lens zen-industry-carousel min-w-0 pt-0 pb-[16px] [@media(width<=850px)]:max-w-[530px] [@media(width<=850px)]:w-full px-0 [@media(width<=850px)]:mx-auto"
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={(event) => {
        if (!(event.target as HTMLElement).closest(".zen-motion-control"))
          setPaused(true);
      }}
      role="region"
      aria-roledescription="carousel"
      aria-label="Explore career insights across industries"
    >
      <Tabs
        value={views[view]}
        onValueChange={(value) => {
          setView(views.indexOf(value as (typeof views)[number]));
          setPaused(true);
          elapsed.current = 0;
          progress.set(0);
        }}
        className="zen-instrument-tabs mt-[22px] gap-0"
      >
        <div className="zen-lens-controls flex items-center border-b [border-bottom-style:solid] border-b-[#344a53] [@media(width<=560px)]:gap-[12px] gap-[18px]">
          <TabsList
            className="zen-tabs data-[slot=tabs-list]:flex data-[slot=tabs-list]:w-full data-[slot=tabs-list]:h-auto data-[slot=tabs-list]:bg-transparent data-[slot=tabs-list]:bg-none data-[slot=tabs-list]:border-b-0 data-[slot=tabs-list]:[border-bottom-style:none] data-[slot=tabs-list]:border-b-[currentColor] data-[slot=tabs-list]:grow data-[slot=tabs-list]:shrink data-[slot=tabs-list]:basis-[0%] data-[slot=tabs-list]:[justify-content:flex-start] [&_[data-slot='tabs-trigger'][data-state='active']]:text-[#d2e9ed] [&_[data-slot='tabs-trigger'][data-state='active']]:bg-transparent [&_[data-slot='tabs-trigger'][data-state='active']]:bg-none [&_[data-slot='tabs-trigger'][data-state='active']]:[box-shadow:0_1px_0_#9ed0da] data-[slot=tabs-list]:p-0 data-[slot=tabs-list]:rounded-[0] [@media(width<=560px)]:data-[slot=tabs-list]:gap-[23px] data-[slot=tabs-list]:gap-[28px]"
            aria-label="Explore industry insights"
          >
            {views.map((value, index) => (
              <TabsTrigger
                className="data-[slot=tabs-trigger]:grow-0 data-[slot=tabs-trigger]:shrink data-[slot=tabs-trigger]:basis-auto data-[slot=tabs-trigger]:relative data-[slot=tabs-trigger]:min-h-[44px] data-[slot=tabs-trigger]:pt-[10px] data-[slot=tabs-trigger]:pb-[13px] data-[slot=tabs-trigger]:text-[13px] data-[slot=tabs-trigger]:text-[#8aa2ad] data-[slot=tabs-trigger]:bg-transparent data-[slot=tabs-trigger]:bg-none data-[slot=tabs-trigger]:[box-shadow:none] data-[slot=tabs-trigger]:font-normal data-[slot=tabs-trigger]:[border-top-style:none] data-[slot=tabs-trigger]:[border-right-style:none] data-[slot=tabs-trigger]:[border-bottom-style:none] data-[slot=tabs-trigger]:[border-left-style:none] data-[slot=tabs-trigger]:px-0 data-[slot=tabs-trigger]:border-0 data-[slot=tabs-trigger]:border-[currentColor] data-[slot=tabs-trigger]:rounded-[0]"
                key={value}
                value={value}
              >
                {["Outlook", "Pay ranges", "Skills"][index]}
                {view === index && !reducedMotion && (
                  <motion.span
                    className="zen-preview-progress absolute left-0 right-0 bottom-[-1px] h-[2px] bg-[#cbf3f6] bg-none [box-shadow:0_0_9px_#a1d9e15c] [transform-origin:left]"
                    style={{ scaleX: progress }}
                  />
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {!reducedMotion && (
            <button
              type="button"
              className="zen-motion-control grow-0 shrink-0 basis-[32px] [display:inline-grid] place-items-center w-[32px] h-[36px] text-[#8baab4] transition-[color,_background] [transition-duration:0.2s,_0.2s] [transition-timing-function:ease,_ease] [transition-delay:0s,_0s] hover:text-[#d0edf1] hover:bg-[#73a7b211] hover:bg-none focus-visible:[outline:1px_solid_#9acbd4] focus-visible:[outline-offset:3px] rounded-[4px]"
              onClick={() => setPaused(!paused)}
              aria-label={
                paused ? "Play industry previews" : "Pause industry previews"
              }
            >
              {paused ? <Play size={13} /> : <Pause size={13} />}
            </button>
          )}
        </div>
        <div
          className="zen-industry-panels grid isolate [&_>_.zen-lens-panel[data-state='active']]:opacity-100 [&_>_.zen-lens-panel[data-state='active']]:visible [&_>_.zen-lens-panel[data-state='active']]:transition-[opacity,_visibility] [&_>_.zen-lens-panel[data-state='active']]:[transition-duration:0.14s,_0s] [&_>_.zen-lens-panel[data-state='active']]:[transition-timing-function:ease-out,_ease] [&_>_.zen-lens-panel[data-state='active']]:[transition-delay:0.08s,_0.08s]"
          aria-live={paused ? "polite" : "off"}
        >
          {views.map((value, index) => (
            <TabsContent
              key={value}
              value={value}
              forceMount
              className="zen-lens-panel [@media(width<=560px)]:min-h-[470px] min-h-[460px] pt-[22px] [grid-row-start:1] [grid-column-start:1] [grid-row-end:auto] [grid-column-end:auto] min-w-0 opacity-0 invisible [will-change:opacity] transition-[opacity,_visibility] [transition-duration:0.08s,_0s] [transition-timing-function:ease-in,_ease] [transition-delay:0s,_0.08s] [@media(prefers-reduced-motion:_reduce)]:transition-[none] [@media(prefers-reduced-motion:_reduce)]:[transition-duration:0s] [@media(prefers-reduced-motion:_reduce)]:[transition-timing-function:ease] [@media(prefers-reduced-motion:_reduce)]:delay-0 [@media(prefers-reduced-motion:_reduce)]:[transform:none]"
              aria-hidden={view !== index}
              inert={view !== index}
              tabIndex={view === index ? 0 : -1}
            >
              {index === 0 ? (
                <OutlookPreview />
              ) : index === 1 ? (
                <SalaryPreview />
              ) : (
                <SkillsPreview />
              )}
            </TabsContent>
          ))}
        </div>
      </Tabs>
      <div className="zen-instrument-footer flex justify-between [@media(width<=560px)]:pt-[18px] pt-[20px] [@media(width<=560px)]:mt-[17px] mt-[20px] border-t [border-top-style:solid] border-t-[#31454c] not-italic font-normal [@media(width<=560px)]:text-[7px] text-[8px] leading-[1.8] font-sans text-[#729099] tracking-[0.035em] gap-[12px]">
        <span className="[@media(width<=560px)]:first:max-w-[180px]">
          ILLUSTRATIVE PREVIEW · PERSONALIZED IN YOUR WORKSPACE
        </span>
        <span className="[@media(width<=560px)]:first:max-w-[180px]">
          0{view + 1} / 03
        </span>
      </div>
    </div>
  );
}

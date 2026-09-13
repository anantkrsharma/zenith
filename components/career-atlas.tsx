"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue } from "motion/react";
import { Pause, Play } from "lucide-react";
import { useAmbientPlayback } from "@/components/use-ambient-playback";

// Traced in the source artwork's 1536 × 1024 coordinates. The moving light,
// its trail, and the image share one coordinate system without rasterizing
// the image and labels into a transformed 3D layer.
const pathway =
  "M240 730 C256 715 325 707 386 690 C450 673 478 635 518 606 C551 581 593 577 631 552 C662 532 677 510 693 481 C718 444 757 421 795 421 C844 406 882 423 941 424 C999 427 1047 410 1067 391 C1087 370 1061 355 1054 342 C1043 319 1080 313 1114 303 C1153 291 1194 277 1208 256 C1223 235 1186 225 1194 205 C1198 188 1226 176 1235 161 C1246 145 1227 133 1236 121";
const ascentDuration = 18000;
const cycleDuration = 22000;

const stages = [
  {
    name: "Understand",
    title: "Understand your industry.",
    text: "Explore market trends, salary ranges, and skills relevant to your field.",
    location: "Your starting point",
    x: 240,
    y: 702,
    lightX: 300,
    lightY: 700,
  },
  {
    name: "Develop",
    title: "Prepare with purpose.",
    text: "Practice interview questions and turn feedback into stronger answers.",
    location: "Your next step",
    x: 795,
    y: 398,
    lightX: 795,
    lightY: 440,
  },
  {
    name: "Become",
    title: "Put your experience forward.",
    text: "Build your resume and tailor a cover letter to your next opportunity.",
    location: "Your next level",
    x: 1238,
    y: 94,
    lightX: 1230,
    lightY: 210,
  },
];

export function CareerAtlas() {
  const { ref, canPlay, reducedMotion } = useAmbientPlayback();
  const [paused, setPaused] = useState(false);
  const [stage, setStage] = useState(0);
  const currentStage = useRef(0);
  const elapsed = useRef(0);
  const pathRef = useRef<SVGPathElement>(null);
  const pathLength = useRef(0);
  const lightX = useMotionValue(240);
  const lightY = useMotionValue(730);
  const trailOffset = useMotionValue(0.055);
  const lightOpacity = useMotionValue(0);

  useAnimationFrame((_, delta) => {
    if (!canPlay || paused || !pathRef.current) return;
    elapsed.current = (elapsed.current + Math.min(delta, 100)) % cycleDuration;
    const time = elapsed.current;
    // A short introduction, an 18-second ascent, and a summit dwell.
    // Reset only after the travelling light has faded out.
    const progress = Math.min(1, Math.max(0, (time - 700) / ascentDuration));
    pathLength.current ||= pathRef.current.getTotalLength();
    const point = pathRef.current.getPointAtLength(
      progress * pathLength.current,
    );
    lightX.set(point.x);
    lightY.set(point.y);
    trailOffset.set(0.055 - progress);
    lightOpacity.set(Math.min(1, time / 500, (cycleDuration - time) / 1200));
    // The middle beacon sits 48.8% along this traced path's arc length.
    const nextStage = progress < 0.48813 ? 0 : progress < 1 ? 1 : 2;
    if (nextStage !== currentStage.current) {
      currentStage.current = nextStage;
      setStage(nextStage);
    }
  });

  return (
    <div
      className="zen-atlas min-w-0 relative [@media(width<=850px)]:self-center self-stretch [@media(width>850px)]:grid [@media(width>850px)]:grid-rows-[subgrid] [@media(width>850px)]:[grid-column:2] [@media(width>850px)]:[grid-row:1_/_span_2] [@media(width<=560px)]:mt-[45px] [@media(560px<width<=850px)]:mt-[56px] [@media(width<=850px)]:w-full [@media(width<=850px)]:max-w-[620px] [@media(width<=850px)]:justify-self-center"
      ref={ref}
      data-stage={stage}
      data-static={reducedMotion}
    >
      <div className="zen-terrain relative [@media(width<=560px)]:w-[118%] [@media(560px<width<=850px)]:w-[105%] w-[125%] [@media(width<=560px)]:ml-[-9%] [@media(560px<width<=850px)]:ml-[-2.5%] ml-[-10%] [aspect-ratio:3_/_2] [@media(width>850px)]:self-center [@media(width<=850px)]:mt-[30px] [@media(width<=850px)]:mr-0 [@media(width<=850px)]:mb-0">
        <Image
          src="/art/career-landscape.png"
          width={1536}
          height={1024}
          sizes="(max-width: 560px) calc(118vw - 47.2px), (max-width: 850px) min(651px, calc(105vw - 67.2px)), (max-width: 1100px) calc(62.5vw - 40px), min(836px, calc(68.46vw - 65.72px))"
          quality={100}
          preload
          alt="A luminous career path climbs a teal landscape from understanding your industry, through interview preparation, to your next opportunity."
          className="zen-terrain-image block w-full h-auto mix-blend-screen [mask-image:linear-gradient(to_right,_transparent,_#000_5%,_#000_95%,_transparent),_linear-gradient(to_bottom,_transparent,_#000_12%,_#000_88%,_transparent)] [mask-composite:intersect] select-none pointer-events-none"
        />
        <svg
          className="zen-terrain-path absolute top-0 right-0 bottom-0 left-0 w-full h-full pointer-events-none overflow-visible"
          viewBox="0 0 1536 1024"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="zen-milestone-light">
              <stop stopColor="#a9eaf1" stopOpacity=".22" />
              <stop offset=".5" stopColor="#70b7c2" stopOpacity=".07" />
              <stop offset="1" stopColor="#70b7c2" stopOpacity="0" />
            </radialGradient>
            <filter
              id="zen-path-bloom"
              x="-10%"
              y="-10%"
              width="120%"
              height="120%"
            >
              <feGaussianBlur stdDeviation="5" />
            </filter>
            <filter
              id="zen-light-bloom"
              x="-100%"
              y="-100%"
              width="300%"
              height="300%"
            >
              <feGaussianBlur stdDeviation="5" />
            </filter>
          </defs>
          {stages.map((item, index) => (
            <ellipse
              key={item.name}
              cx={item.lightX}
              cy={item.lightY}
              rx="300"
              ry="230"
              fill="url(#zen-milestone-light)"
              className="zen-milestone-light opacity-0 transition-opacity [transition-duration:0.8s] [transition-timing-function:ease] delay-0 mix-blend-screen data-[active=true]:opacity-100 [@media(prefers-reduced-motion:_reduce)]:transition-[none] [@media(prefers-reduced-motion:_reduce)]:[transition-duration:0s] [@media(prefers-reduced-motion:_reduce)]:[transition-timing-function:ease] [@media(prefers-reduced-motion:_reduce)]:delay-0 [@media(prefers-reduced-motion:_reduce)]:[transform:none]"
              data-active={reducedMotion || stage === index}
            />
          ))}
          <path ref={pathRef} d={pathway} fill="none" stroke="none" />
          <motion.g style={{ opacity: reducedMotion ? 0 : lightOpacity }}>
            <motion.path
              d={pathway}
              pathLength="1"
              fill="none"
              stroke="#a1e4ed"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="0.055 1"
              style={{ strokeDashoffset: trailOffset }}
              filter="url(#zen-path-bloom)"
            />
            <motion.path
              d={pathway}
              pathLength="1"
              fill="none"
              stroke="#e0fcff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="0.055 1"
              style={{ strokeDashoffset: trailOffset }}
            />
            <motion.circle
              cx={lightX}
              cy={lightY}
              r="15"
              fill="#aceef7"
              filter="url(#zen-light-bloom)"
            />
            <motion.circle cx={lightX} cy={lightY} r="4" fill="#f0feff" />
          </motion.g>
        </svg>
        {stages.map((item, index) => (
          <div
            key={item.name}
            className="zen-terrain-beacon absolute grid place-items-center w-[44px] h-[44px] [transform:translate(-50%,_-50%)] pointer-events-none opacity-85 transition-opacity [transition-duration:0.6s] [transition-timing-function:ease] delay-0 data-[active=true]:opacity-100 [@media(prefers-reduced-motion:_reduce)]:transition-[none] [@media(prefers-reduced-motion:_reduce)]:[transition-duration:0s] [@media(prefers-reduced-motion:_reduce)]:[transition-timing-function:ease] [@media(prefers-reduced-motion:_reduce)]:delay-0 [@media(prefers-reduced-motion:_reduce)]:[transform:none] rounded-[50%]"
            data-active={reducedMotion || stage === index}
            data-milestone={index}
            style={{
              left: (item.x / 1536) * 100 + "%",
              top: (item.y / 1024) * 100 + "%",
            }}
          >
            <span className="zen-beacon-ring absolute top-[9px] right-[9px] bottom-[9px] left-[9px] [border-top-style:solid] [border-right-style:solid] [border-bottom-style:solid] [border-left-style:solid] transition-[box-shadow,_transform,_border-color] [transition-duration:0.6s] [transition-timing-function:ease,_ease,_ease] [transition-delay:0s,_0s,_0s] [.zen-terrain-beacon[data-active='true']_&]:[box-shadow:0_0_0_7px_#70b7c21a,_0_0_30px_#89d4e183] [.zen-terrain-beacon[data-active='true']_&]:[transform:scale(1.15)] border border-[#92d3dd7d] [.zen-terrain-beacon[data-active='true']_&]:border-[#c1ecf4] rounded-[50%]" />
            <span className="zen-beacon-label absolute [@media(width<=560px)]:bottom-[38px] bottom-[48px] [@media(width<=560px)]:left-[15px] left-[24px] whitespace-nowrap flex items-center text-[#a6b7be] [@media(width<=560px)]:text-[9px] text-[11px] bg-[#0a161a] bg-none [border-top-style:solid] [border-right-style:solid] [border-bottom-style:solid] [border-left-style:solid] transition-[color,_border-color] [transition-duration:0.6s] [transition-timing-function:ease,_ease] [transition-delay:0s,_0s] after:absolute after:[content:''] after:h-[24px] after:w-px after:bg-transparent after:[background-image:linear-gradient(#6296a3,_transparent)] after:top-full after:left-0 after:[transform:rotate(28deg)] after:[transform-origin:top] [.zen-terrain-beacon[data-milestone='2']_&]:left-auto [.zen-terrain-beacon[data-milestone='2']_&]:right-0 [.zen-terrain-beacon[data-milestone='2']_&::after]:left-auto [.zen-terrain-beacon[data-milestone='2']_&::after]:right-[20px] [.zen-terrain-beacon[data-milestone='2']_&::after]:[transform:rotate(-15deg)] [.zen-terrain-beacon[data-active='true']_&]:text-[#e3f2f5] [@media(width<=560px)]:py-[6px] py-[8px] [@media(width<=560px)]:px-[8px] px-[11px] border border-[#517b8340] [.zen-terrain-beacon[data-active='true']_&]:border-[#77b5c08c] rounded-[4px] [@media(width<=560px)]:gap-[5px] gap-[9px]">
              <small className="not-italic font-normal text-[9px] leading-[normal] font-sans text-[#7298a0]">
                0{index + 1}
              </small>
              {item.location}
            </span>
          </div>
        ))}
      </div>
      <div className="zen-atlas-console relative z-2 [@media(width<=560px)]:mt-0 [@media(560px<width<=850px)]:mt-[-2%] mt-[-5%] mr-0 mb-0 [@media(width<=560px)]:ml-[4%] [@media(560px<width<=850px)]:ml-[10%] [@media(850px<width<=1100px)]:ml-[6%] ml-[14%] pr-0 [@media(width<=560px)]:pl-[15px] pl-[20px] border-l [border-left-style:solid] border-l-[#344c52] py-0">
        <div className="zen-atlas-stage-row flex justify-between items-center [@media(width<=1100px)]:gap-[5px] gap-[12px]">
          <div
            className="zen-atlas-stages flex [@media(width<=380px)]:gap-[12px] [@media(380px<width<=560px)]:gap-[18px] [@media(560px<width<=1100px)]:gap-[17px] gap-[22px]"
            aria-label="Your career journey"
          >
            {stages.map((item, index) => (
              <span
                key={item.name}
                className="zen-atlas-stage relative flex items-center min-h-[44px] text-[#779098] [@media(width<=560px)]:text-[10px] text-[12px] transition-[color] [transition-duration:0.5s] [transition-timing-function:ease] delay-0 data-[active=true]:text-[#c4e5ea] [@media(width<=560px)]:gap-[5px] gap-[7px]"
                data-active={reducedMotion || stage === index}
              >
                <span className="first:text-[#57737a] first:not-italic first:font-normal [@media(width<=560px)]:first:text-[8px] first:text-[10px] first:leading-[normal] first:font-sans">
                  0{index + 1}
                </span>
                {item.name}
                <span className="zen-stage-indicator first:text-[#57737a] first:not-italic first:font-normal [@media(width<=560px)]:first:text-[8px] first:text-[10px] first:leading-[normal] first:font-sans absolute bottom-[2px] left-0 right-0 h-px bg-[#86bbc7] bg-none [transform:scaleX(0)] [transform-origin:left] transition-[transform] [transition-duration:0.5s] [transition-timing-function:ease] delay-0 [[data-active='true']_>_&]:[transform:scaleX(1)]" />
              </span>
            ))}
          </div>
          {!reducedMotion && (
            <button
              type="button"
              className="zen-motion-control grow-0 shrink-0 basis-[32px] [display:inline-grid] place-items-center w-[32px] h-[36px] text-[#8baab4] transition-[color,_background] [transition-duration:0.2s,_0.2s] [transition-timing-function:ease,_ease] [transition-delay:0s,_0s] [@media(width<=1100px)]:mr-0 mr-[7%] hover:text-[#d0edf1] hover:bg-[#73a7b211] hover:bg-none focus-visible:[outline:1px_solid_#9acbd4] focus-visible:[outline-offset:3px] rounded-[4px]"
              onClick={() => setPaused(!paused)}
              aria-label={
                paused
                  ? "Play career path animation"
                  : "Pause career path animation"
              }
            >
              {paused ? <Play size={13} /> : <Pause size={13} />}
            </button>
          )}
        </div>
        <div className="zen-atlas-description [@media(width<=850px)]:min-h-[80px] min-h-[90px] pt-[15px] grid">
          {stages.map((item, index) => (
            <div
              key={item.name}
              className="zen-atlas-caption [grid-row-start:1] [grid-column-start:1] [grid-row-end:auto] [grid-column-end:auto] opacity-0 invisible transition-[opacity,_visibility] [transition-duration:0.35s,_0s] [transition-timing-function:ease,_ease] [transition-delay:0s,_0.35s] data-[active=true]:opacity-100 data-[active=true]:visible data-[active=true]:delay-0 [@media(prefers-reduced-motion:_reduce)]:transition-[none] [@media(prefers-reduced-motion:_reduce)]:[transition-duration:0s] [@media(prefers-reduced-motion:_reduce)]:[transition-timing-function:ease] [@media(prefers-reduced-motion:_reduce)]:delay-0 [@media(prefers-reduced-motion:_reduce)]:[transform:none]"
              data-active={stage === index}
              aria-hidden={stage !== index}
            >
              <strong className="text-[14px] font-[450]">{item.title}</strong>
              <p className="max-w-[390px] mt-[5px] text-[#8fa4ac] text-[12px] leading-[1.7]">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

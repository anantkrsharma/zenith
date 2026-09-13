import Link from "next/link";
import { ArrowDown, ArrowUpRight, MoveUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CareerAtlas } from "@/components/career-atlas";

export default function HeroSection() {
  return (
    <section
      className="zen-hero relative [@media(width<=560px)]:pt-[100px] [@media(560px<width<=850px)]:pt-[112px] pt-[80px] bg-transparent [background-image:radial-gradient(ellipse_at_74%_36%,_#12303935,_transparent_58%)] before:[content:''] before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:pointer-events-none before:opacity-18 before:[background-image:linear-gradient(#44636b1c_1px,_transparent_1px),_linear-gradient(90deg,_#44636b1c_1px,_transparent_1px)] before:[background-size:96px_96px] before:[mask-image:linear-gradient(transparent,_#000_30%,_transparent_95%)] [@media(width<=560px)]:[&_.zen-kicker]:text-[9px] overflow-clip [@media(width<=560px)]:[&_.zen-kicker]:gap-[9px]"
      aria-labelledby="hero-title"
    >
      <div className="zen-hero-grid zen-container [@media(width<=560px)]:w-[calc(100%_-_40px)] [@media(560px<width<=1100px)]:w-[calc(100%_-_64px)] w-[min(1220px,_calc(100%_-_96px))] relative grid [@media(width<=850px)]:grid-cols-1 [@media(850px<width<=1100px)]:grid-cols-[1fr_1fr] grid-cols-[0.95fr_1.15fr] items-center [@media(width<=1100px)]:min-h-[530px] min-h-[550px] [@media(width>=1600px)]:min-h-[625px] [@media(width<=850px)]:pt-0 pt-[24px] [@media(width<=850px)]:pb-[45px] pb-[60px] [@media(width>850px)]:grid-rows-[auto_auto] mx-auto">
        <div className="zen-hero-copy relative z-2 [@media(width>850px)]:[grid-row-start:1] [@media(width>850px)]:[grid-column-start:1] [@media(width>850px)]:[grid-row-end:auto] [@media(width>850px)]:[grid-column-end:auto] [@media(width<=850px)]:p-0 py-[26px]">
          <h1
            className="[@media(width<=560px)]:mt-[23px] [@media(560px<width<=850px)]:mt-[24px] mt-0 [@media(width<=850px)]:mr-0 mr-[-72px] mb-[24px] ml-0 [@media(width<=560px)]:text-[clamp(40px,_11.3vw,_58px)] [@media(560px<width<=850px)]:text-[clamp(50px,_7.5vw,_64px)] [@media(850px<width<=1100px)]:text-[clamp(46px,_4.8vw,_53px)] text-[clamp(48px,_4.2vw,_72px)] tracking-[-0.075em] leading-[1] font-[420]"
            id="hero-title"
          >
            Your personal
            <br />
            <span className="text-[#8ebfc7]">AI career coach.</span>
          </h1>
          <p className="zen-hero-description [@media(width<=850px)]:max-w-[500px] max-w-[390px] text-[#a4b4bb] [@media(width<=560px)]:text-[15px] [@media(560px<width<=850px)]:text-[14px] text-[13px] leading-[1.55]">
            Understand your industry, prepare for interviews, and create resumes
            and cover letters tailored to your experience. Zenith brings your
            next career move into focus, whatever your field.
          </p>
          <div className="zen-hero-actions flex items-center [@media(width<=560px)]:mt-[25px] mt-[30px] [@media(width<=560px)]:flex-wrap [@media(width<=560px)]:gap-[18px] gap-[24px]">
            <Button
              asChild
              size="lg"
              className="zen-button data-[slot=button]:min-h-[44px] data-[slot=button]:text-[13px] data-[slot=button]:text-[#092126] data-[slot=button]:bg-transparent data-[slot=button]:[background-image:linear-gradient(145deg,_#acd4d9,_#70b7c2)] data-[slot=button]:border-t data-[slot=button]:[border-top-style:solid] data-[slot=button]:border-r data-[slot=button]:[border-right-style:solid] data-[slot=button]:border-b data-[slot=button]:[border-bottom-style:solid] data-[slot=button]:border-l data-[slot=button]:[border-left-style:solid] data-[slot=button]:[box-shadow:inset_0_1px_0_#e1f5f850,_0_4px_22px_#6eacb214] data-[slot=button]:transition-[transform,_box-shadow] data-[slot=button]:[transition-duration:0.25s,_0.25s] data-[slot=button]:[transition-timing-function:ease,_ease] data-[slot=button]:[transition-delay:0s,_0s] [&[data-slot='button']:hover]:[transform:translateY(-2px)] [&[data-slot='button']:hover]:[box-shadow:inset_0_1px_0_#e1f5f850,_0_8px_32px_#6eacb230] [@media(width<=560px)]:data-[slot=button]:px-[19px] data-[slot=button]:px-[21px] data-[slot=button]:border-[#aed4d96b] data-[slot=button]:rounded-[6px] [@media(width<=560px)]:data-[slot=button]:gap-[15px] data-[slot=button]:gap-[20px]"
            >
              <Link href="/dashboard">
                Get started with Zenith{" "}
                <ArrowUpRight
                  className="transition-[transform] [transition-duration:0.25s] [transition-timing-function:ease] delay-0 [.zen-button:hover_&]:[transform:translate(2px,_-2px)]"
                  size={18}
                />
              </Link>
            </Button>
            <Link
              className="zen-subtle-link inline-flex items-center text-[13px] text-[#d2dce0] min-h-[44px] hover:text-[#9dd3dd] gap-[10px]"
              href="#workspace"
            >
              Explore Zenith <ArrowDown size={15} />
            </Link>
          </div>
        </div>
        <CareerAtlas />
      </div>
      <div className="zen-hero-index zen-container [@media(width<=560px)]:w-[calc(100%_-_40px)] [@media(560px<width<=1100px)]:w-[calc(100%_-_64px)] w-[min(1220px,_calc(100%_-_96px))] relative grid [@media(width<=850px)]:grid-cols-[repeat(3,_1fr)] grid-cols-3 [border-top-style:solid] [border-bottom-style:solid] [@media(width<=560px)]:py-[18px] py-[24px] mx-auto border-y border-y-[#24353b]">
        <a
          className="flex [@media(width<=560px)]:items-start items-center border-l [border-left-style:solid] border-l-[#24353b] [@media(width<=560px)]:text-[11px] text-[13px] transition-[background] [transition-duration:0.25s] [transition-timing-function:ease] delay-0 [@media(width<=560px)]:flex-col [&:first-of-type]:border-l-0 [&:first-of-type]:[border-left-style:none] [&:first-of-type]:border-l-[currentColor] [@media(width<=850px)]:[&:first-of-type]:pl-0 hover:bg-[#13252b66] hover:bg-none [@media(width<=560px)]:py-[6px] py-[10px] [@media(width<=560px)]:px-[12px] [@media(560px<width<=1100px)]:px-[14px] px-[22px] [@media(width<=560px)]:gap-[8px] [@media(560px<width<=1100px)]:gap-[12px] gap-[18px]"
          href="#industry"
        >
          <span className="not-italic font-normal text-[11px] leading-[normal] font-sans text-[#74939c]">
            01
          </span>
          <div>
            Read the landscape
            <small className="block mt-[5px] [@media(width<=560px)]:text-[10px] text-[11px] text-[#7c949d] [@media(width<=560px)]:leading-[1.5]">
              Industry insights
            </small>
          </div>
          <MoveUpRight
            className="ml-auto text-[#78949c] transition-[transform] [transition-duration:0.25s] [transition-timing-function:ease] delay-0 [@media(width<=1100px)]:hidden [.zen-hero-index_>_a:hover_&]:[transform:translate(2px,_-2px)] [.zen-hero-index_>_a:hover_&]:text-[#b4dee6]"
            size={19}
          />
        </a>
        <a
          className="flex [@media(width<=560px)]:items-start items-center border-l [border-left-style:solid] border-l-[#24353b] [@media(width<=560px)]:text-[11px] text-[13px] transition-[background] [transition-duration:0.25s] [transition-timing-function:ease] delay-0 [@media(width<=560px)]:flex-col [&:first-of-type]:border-l-0 [&:first-of-type]:[border-left-style:none] [&:first-of-type]:border-l-[currentColor] [@media(width<=850px)]:[&:first-of-type]:pl-0 hover:bg-[#13252b66] hover:bg-none [@media(width<=560px)]:py-[6px] py-[10px] [@media(width<=560px)]:px-[12px] [@media(560px<width<=1100px)]:px-[14px] px-[22px] [@media(width<=560px)]:gap-[8px] [@media(560px<width<=1100px)]:gap-[12px] gap-[18px]"
          href="#practice"
        >
          <span className="not-italic font-normal text-[11px] leading-[normal] font-sans text-[#74939c]">
            02
          </span>
          <div>
            Build your confidence
            <small className="block mt-[5px] [@media(width<=560px)]:text-[10px] text-[11px] text-[#7c949d] [@media(width<=560px)]:leading-[1.5]">
              Interview preparation
            </small>
          </div>
          <MoveUpRight
            className="ml-auto text-[#78949c] transition-[transform] [transition-duration:0.25s] [transition-timing-function:ease] delay-0 [@media(width<=1100px)]:hidden [.zen-hero-index_>_a:hover_&]:[transform:translate(2px,_-2px)] [.zen-hero-index_>_a:hover_&]:text-[#b4dee6]"
            size={19}
          />
        </a>
        <a
          className="flex [@media(width<=560px)]:items-start items-center border-l [border-left-style:solid] border-l-[#24353b] [@media(width<=560px)]:text-[11px] text-[13px] transition-[background] [transition-duration:0.25s] [transition-timing-function:ease] delay-0 [@media(width<=560px)]:flex-col [&:first-of-type]:border-l-0 [&:first-of-type]:[border-left-style:none] [&:first-of-type]:border-l-[currentColor] [@media(width<=850px)]:[&:first-of-type]:pl-0 hover:bg-[#13252b66] hover:bg-none [@media(width<=560px)]:py-[6px] py-[10px] [@media(width<=560px)]:px-[12px] [@media(560px<width<=1100px)]:px-[14px] px-[22px] [@media(width<=560px)]:gap-[8px] [@media(560px<width<=1100px)]:gap-[12px] gap-[18px]"
          href="#documents"
        >
          <span className="not-italic font-normal text-[11px] leading-[normal] font-sans text-[#74939c]">
            03
          </span>
          <div>
            Make your next move
            <small className="block mt-[5px] [@media(width<=560px)]:text-[10px] text-[11px] text-[#7c949d] [@media(width<=560px)]:leading-[1.5]">
              Resume & cover letters
            </small>
          </div>
          <MoveUpRight
            className="ml-auto text-[#78949c] transition-[transform] [transition-duration:0.25s] [transition-timing-function:ease] delay-0 [@media(width<=1100px)]:hidden [.zen-hero-index_>_a:hover_&]:[transform:translate(2px,_-2px)] [.zen-hero-index_>_a:hover_&]:text-[#b4dee6]"
            size={19}
          />
        </a>
      </div>
    </section>
  );
}

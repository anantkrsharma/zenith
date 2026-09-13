import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Compass,
  Fingerprint,
  ScanLine,
  MessageSquare,
  FileText,
  Route,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FlowLines,
  PracticeLab,
  DocumentStudio,
  JourneyLine,
} from "@/components/landing-visuals";
import { IndustryLens } from "@/components/industry-lens";
import { faqs } from "@/data/faqs";

export default function Landing() {
  return (
    <div className="zen-landing overflow-clip">
      <section
        id="workspace"
        className="zen-intro zen-container grid [@media(width<=560px)]:grid-cols-1 [@media(560px<width<=850px)]:grid-cols-[1fr_1fr] grid-cols-[1.15fr_1fr] pt-[112px] pb-[92px] [@media(width<=560px)]:w-[calc(100%_-_40px)] [@media(560px<width<=1100px)]:w-[calc(100%_-_64px)] w-[min(1220px,_calc(100%_-_96px))] [@media(width<=560px)]:py-[56px] [@media(560px<width<=850px)]:py-[74px] mx-auto [@media(width<=560px)]:gap-[24px] [@media(560px<width<=850px)]:gap-[35px] [@media(850px<width<=1100px)]:gap-[48px] gap-[88px]"
      >
        <Reveal>
          <h2 className="font-[450] [@media(width<=850px)]:text-[35px] text-[clamp(34px,_3.4vw,_51px)] tracking-[-0.065em] leading-[1.12] mt-[28px]">
            Your career isn’t
            <br />a straight line.
            <br />
            <span className="text-[#7f9da7]">Connect the pieces.</span>
          </h2>
        </Reveal>
        <Reveal className="zen-intro-aside [@media(width<=560px)]:pt-0 [@media(560px<width<=850px)]:pt-[20px] pt-[34px] max-w-[460px] [justify-self:end]">
          <p className="text-[15px] leading-[1.8] text-[#a2b4bc]">
            What you know. What you’ve done. Where you want to go. Zenith brings
            it together, so your next step feels a little less like a leap.
          </p>
          <div className="zen-tool-list grid mt-[28px]">
            <Link
              className="flex items-center border-t [border-top-style:solid] border-t-[#27383f] text-[14px] text-[#c6d4d8] py-[16px] gap-[17px]"
              href="/dashboard"
            >
              <ScanLine
                className="text-[#83a7b2] last:ml-auto last:transition-[transform] last:[transition-duration:0.25s] last:[transition-timing-function:ease] last:delay-0 [.zen-tool-list_>_a:hover_>_&:last-child]:[transform:translate(2px,_-2px)]"
                size={18}
                strokeWidth={1.4}
              />
              <span>Understand your industry</span>
              <ArrowUpRight
                className="text-[#83a7b2] last:ml-auto last:transition-[transform] last:[transition-duration:0.25s] last:[transition-timing-function:ease] last:delay-0 [.zen-tool-list_>_a:hover_>_&:last-child]:[transform:translate(2px,_-2px)]"
                size={15}
              />
            </Link>
            <Link
              className="flex items-center border-t [border-top-style:solid] border-t-[#27383f] text-[14px] text-[#c6d4d8] py-[16px] gap-[17px]"
              href="/interview"
            >
              <MessageSquare
                className="text-[#83a7b2] last:ml-auto last:transition-[transform] last:[transition-duration:0.25s] last:[transition-timing-function:ease] last:delay-0 [.zen-tool-list_>_a:hover_>_&:last-child]:[transform:translate(2px,_-2px)]"
                size={18}
                strokeWidth={1.4}
              />
              <span>Practice with purpose</span>
              <ArrowUpRight
                className="text-[#83a7b2] last:ml-auto last:transition-[transform] last:[transition-duration:0.25s] last:[transition-timing-function:ease] last:delay-0 [.zen-tool-list_>_a:hover_>_&:last-child]:[transform:translate(2px,_-2px)]"
                size={15}
              />
            </Link>
            <Link
              className="flex items-center border-t [border-top-style:solid] border-t-[#27383f] text-[14px] text-[#c6d4d8] py-[16px] gap-[17px]"
              href="/resume"
            >
              <FileText
                className="text-[#83a7b2] last:ml-auto last:transition-[transform] last:[transition-duration:0.25s] last:[transition-timing-function:ease] last:delay-0 [.zen-tool-list_>_a:hover_>_&:last-child]:[transform:translate(2px,_-2px)]"
                size={18}
                strokeWidth={1.4}
              />
              <span>Put your experience into words</span>
              <ArrowUpRight
                className="text-[#83a7b2] last:ml-auto last:transition-[transform] last:[transition-duration:0.25s] last:[transition-timing-function:ease] last:delay-0 [.zen-tool-list_>_a:hover_>_&:last-child]:[transform:translate(2px,_-2px)]"
                size={15}
              />
            </Link>
          </div>
        </Reveal>
      </section>
      <section
        id="industry"
        className="zen-story zen-market relative isolate bg-transparent [@media(width<=850px)]:[background-image:radial-gradient(_ellipse_85%_35%_at_50%_76%,_#204f5a60,_#204f5a10_65%,_transparent_)] [background-image:radial-gradient(_ellipse_43%_50%_at_77%_48%,_#204f5a6b,_#204f5a26_40%,_#204f5a08_72%,_#204f5a00_)] [@media(width<=560px)]:py-[56px] [@media(560px<width<=850px)]:py-[70px] py-[96px]"
      >
        <div className="zen-container zen-story-grid static grid [@media(width<=850px)]:grid-cols-1 grid-cols-2 items-center z-1 [@media(width<=560px)]:w-[calc(100%_-_40px)] [@media(560px<width<=1100px)]:w-[calc(100%_-_64px)] w-[min(1220px,_calc(100%_-_96px))] mx-auto [@media(width<=560px)]:gap-[36px] [@media(560px<width<=850px)]:gap-[52px] [@media(850px<width<=1100px)]:gap-[48px] gap-[80px]">
          <div className="zen-market-copy min-w-0 [@media(width<=850px)]:relative [@media(width<=850px)]:isolate [@media(width<=850px)]:w-full [@media(width<=850px)]:max-w-[530px] [@media(width<=850px)]:justify-self-center">
            <FlowLines />
            <Reveal className="zen-story-copy relative z-1">
              <h2 className="font-[450] [@media(width<=560px)]:text-[38px] text-[clamp(34px,_3.65vw,_54px)] tracking-[-0.065em] leading-[1.12] [@media(width<=560px)]:my-[21px] my-[24px]">
                The world moves.
                <br />
                <span className="text-[#7f9da7]">Find your direction.</span>
              </h2>
              <p className="[@media(width<=850px)]:max-w-[480px] max-w-[400px] [@media(width<=850px)]:text-[15px] text-[14px] [@media(width<=560px)]:leading-[1.8] leading-[1.9] text-[#9fb1ba]">
                See where your industry is heading, which skills matter, and how
                roles compare. A wider perspective for your next decision.
              </p>
              <Link
                href="/dashboard"
                className="zen-feature-link inline-flex items-center justify-between border-b [border-bottom-style:solid] border-b-[#42616b] mt-[20px] text-[13px] py-[12px] gap-[35px]"
              >
                Explore industry insights{" "}
                <ArrowUpRight
                  className="text-[#8ebcc7] transition-[transform] [transition-duration:0.25s] [transition-timing-function:ease] delay-0 [.zen-feature-link:hover_>_&]:[transform:translate(3px,_-3px)]"
                  size={18}
                />
              </Link>
              <div className="zen-feature-notes flex flex-wrap [@media(width<=560px)]:gap-y-[6px] gap-y-[8px] [@media(width<=560px)]:gap-x-[12px] gap-x-[17px] text-[#7f9aa4] [@media(width<=560px)]:text-[10px] text-[11px] leading-[1.8] [@media(width<=560px)]:mt-[25px] mt-[30px] [&_>_span_+_span::before]:[content:'·'] [@media(width<=560px)]:[&_>_span_+_span::before]:mr-[12px] [&_>_span_+_span::before]:mr-[17px] [&_>_span_+_span::before]:text-[#4d717f]">
                <span>Industry outlook</span>
                <span>Salary benchmarks</span>
                <span>Skills to develop</span>
              </div>
            </Reveal>
          </div>
          <Reveal className="min-w-0">
            <IndustryLens />
          </Reveal>
        </div>
      </section>
      <section
        id="practice"
        className="zen-story zen-practice relative bg-transparent [background-image:linear-gradient(#080c0e00,_#0b1317_35%,_#0b1317_65%,_#080c0e00)] [@media(width<=560px)]:py-[56px] [@media(560px<width<=850px)]:py-[70px] py-[120px]"
      >
        <div className="zen-container zen-story-grid relative grid [@media(width<=850px)]:grid-cols-1 grid-cols-[minmax(0,_1.325fr)_minmax(0,_1fr)] items-center z-1 max-w-[1018px] [@media(width<=560px)]:w-[calc(100%_-_40px)] [@media(560px<width<=1100px)]:w-[calc(100%_-_64px)] w-[min(1220px,_calc(100%_-_96px))] mx-auto [@media(width<=560px)]:gap-[36px] [@media(560px<width<=850px)]:gap-[52px] [@media(850px<width<=1100px)]:gap-[48px] gap-[88px]">
          <Reveal className="zen-practice-art w-full max-w-[530px] justify-self-center min-w-0 [@media(width<=850px)]:order-[2]">
            <PracticeLab />
          </Reveal>
          <Reveal className="zen-story-copy relative z-1 w-full [@media(width<=850px)]:max-w-[530px] max-w-[400px] justify-self-center min-w-0">
            <h2 className="font-[450] [@media(width<=560px)]:text-[38px] text-[clamp(34px,_3.65vw,_54px)] tracking-[-0.065em] leading-[1.12] [@media(width<=560px)]:my-[21px] my-[24px]">
              Don’t just hope
              <br />
              you’re ready.
              <br />
              <span className="text-[#7f9da7]">Know you are.</span>
            </h2>
            <p className="[@media(width<=850px)]:max-w-[480px] max-w-[400px] [@media(width<=850px)]:text-[15px] text-[14px] [@media(width<=560px)]:leading-[1.8] leading-[1.9] text-[#9fb1ba]">
              Practice with questions shaped around your industry and skills.
              Understand the reasoning, learn from each attempt, and walk in
              with something better than a script.
            </p>
            <Link
              href="/interview"
              className="zen-feature-link inline-flex items-center justify-between border-b [border-bottom-style:solid] border-b-[#42616b] mt-[20px] text-[13px] py-[12px] gap-[35px]"
            >
              Find your strengths{" "}
              <ArrowUpRight
                className="text-[#8ebcc7] transition-[transform] [transition-duration:0.25s] [transition-timing-function:ease] delay-0 [.zen-feature-link:hover_>_&]:[transform:translate(3px,_-3px)]"
                size={18}
              />
            </Link>
          </Reveal>
        </div>
      </section>
      <section
        id="documents"
        className="zen-story zen-documents relative pt-[96px] pb-[136px] bg-transparent [background-image:radial-gradient(_ellipse_44%_50%_at_78%_50%,_#17353e5e,_transparent_)] [@media(width<=560px)]:py-[56px] [@media(560px<width<=850px)]:py-[70px]"
      >
        <div className="zen-container zen-story-grid relative grid [@media(width<=850px)]:grid-cols-1 grid-cols-2 items-center z-1 [@media(width<=560px)]:w-[calc(100%_-_40px)] [@media(560px<width<=1100px)]:w-[calc(100%_-_64px)] w-[min(1220px,_calc(100%_-_96px))] mx-auto [@media(width<=560px)]:gap-[36px] [@media(560px<width<=850px)]:gap-[52px] [@media(850px<width<=1100px)]:gap-[48px] gap-[80px]">
          <Reveal className="zen-story-copy relative z-1 min-w-0 [@media(width<=850px)]:w-full [@media(width<=850px)]:max-w-[530px] [@media(width<=850px)]:justify-self-center">
            <h2 className="font-[450] [@media(width<=560px)]:text-[38px] text-[clamp(34px,_3.65vw,_54px)] tracking-[-0.065em] leading-[1.12] [@media(width<=560px)]:my-[21px] my-[24px]">
              You’ve done
              <br />
              the work.
              <br />
              <span className="text-[#7f9da7]">Let it speak.</span>
            </h2>
            <p className="[@media(width<=850px)]:max-w-[480px] max-w-[400px] [@media(width<=850px)]:text-[15px] text-[14px] [@media(width<=560px)]:leading-[1.8] leading-[1.9] text-[#9fb1ba]">
              Good experience deserves a clear story. Build a considered resume,
              then connect your strengths to the opportunity with a tailored
              cover letter.
            </p>
            <div className="zen-document-links [@media(width<=560px)]:max-w-[none] max-w-[380px] mt-[28px]">
              <Link
                className="flex items-center justify-between border-b [border-bottom-style:solid] border-b-[#344b56] [@media(width<=560px)]:text-[16px] text-[17px] tracking-[-0.025em] py-[19px] gap-[20px]"
                href="/resume"
              >
                <span>
                  <small className="block text-[#7ea0ae] not-italic font-normal text-[9px] leading-[normal] font-sans tracking-[0.08em] mb-[8px]">
                    YOUR PROFESSIONAL STORY
                  </small>
                  The resume studio
                </span>
                <ArrowUpRight
                  className="text-[#90b9c8] transition-[transform] [transition-duration:0.25s] [transition-timing-function:ease] delay-0 [.zen-document-links_a:hover_&]:[transform:translate(2px,_-2px)]"
                  size={22}
                />
              </Link>
              <Link
                className="flex items-center justify-between border-b [border-bottom-style:solid] border-b-[#344b56] [@media(width<=560px)]:text-[16px] text-[17px] tracking-[-0.025em] py-[19px] gap-[20px]"
                href="/ai-cover-letter"
              >
                <span>
                  <small className="block text-[#7ea0ae] not-italic font-normal text-[9px] leading-[normal] font-sans tracking-[0.08em] mb-[8px]">
                    YOUR NEXT INTRODUCTION
                  </small>
                  The cover letter studio
                </span>
                <ArrowUpRight
                  className="text-[#90b9c8] transition-[transform] [transition-duration:0.25s] [transition-timing-function:ease] delay-0 [.zen-document-links_a:hover_&]:[transform:translate(2px,_-2px)]"
                  size={22}
                />
              </Link>
            </div>
          </Reveal>
          <Reveal className="min-w-0">
            <DocumentStudio />
          </Reveal>
        </div>
      </section>
      <section
        id="how-it-works"
        className="zen-journey zen-container [border-top-style:solid] [border-bottom-style:solid] [@media(width<=560px)]:w-[calc(100%_-_40px)] [@media(560px<width<=1100px)]:w-[calc(100%_-_64px)] w-[min(1220px,_calc(100%_-_96px))] [@media(width<=560px)]:py-[60px] [@media(560px<width<=850px)]:py-[70px] py-[88px] mx-auto border-y border-y-[#263d48]"
      >
        <Reveal className="zen-journey-heading relative [@media(width<=850px)]:[&_>_p:last-child]:static [&_>_p:last-child]:absolute [&_>_p:last-child]:bottom-[8px] [&_>_p:last-child]:right-0 [@media(width<=850px)]:[&_>_p:last-child]:text-[15px] [&_>_p:last-child]:text-[16px] [&_>_p:last-child]:leading-[1.8] [&_>_p:last-child]:text-[#98b0bb] [@media(width<=850px)]:[&_>_p:last-child]:mt-[25px]">
          <h2 className="font-[450] [@media(width<=560px)]:text-[35px] text-[clamp(34px,_3.65vw,_54px)] tracking-[-0.065em] leading-[1.12] mt-[25px]">
            A little perspective.
            <br />
            <span className="text-[#7f9da7]">A way forward.</span>
          </h2>
        </Reveal>
        <div className="zen-journey-steps relative grid [@media(width<=560px)]:grid-cols-1 grid-cols-[repeat(3,_1fr)] [@media(width<=560px)]:mt-[44px] [@media(560px<width<=850px)]:mt-[55px] mt-[62px] [@media(width<=560px)]:gap-[34px] [@media(560px<width<=850px)]:gap-[30px] [@media(850px<width<=1100px)]:gap-[35px] gap-[56px]">
          <JourneyLine />
          {[
            {
              n: "01",
              Icon: Fingerprint,
              title: "Bring your starting point.",
              text: "Your industry, experience, and skills. A few details help Zenith understand your professional world.",
              detail: "YOUR EXPERIENCE",
            },
            {
              n: "02",
              Icon: Compass,
              title: "Find your focus.",
              text: "Read the market. Test your knowledge. See what deserves your attention next.",
              detail: "YOUR DIRECTION",
            },
            {
              n: "03",
              Icon: Route,
              title: "Take your next step.",
              text: "Refine your resume, shape your introduction, and put yourself forward with more confidence.",
              detail: "YOUR NEXT CHAPTER",
            },
          ].map(({ n, Icon, title, text, detail }) => (
            <Reveal
              key={n}
              className="zen-journey-step relative [@media(width<=560px)]:grid [@media(width<=560px)]:grid-cols-[63px_1fr] [@media(width<=560px)]:gap-y-0 [@media(width<=560px)]:gap-x-[23px] [@media(width<=560px)]:[&:not(:last-child)::after]:[content:''] [@media(width<=560px)]:[&:not(:last-child)::after]:absolute [@media(width<=560px)]:[&:not(:last-child)::after]:left-[28px] [@media(width<=560px)]:[&:not(:last-child)::after]:top-[70px] [@media(width<=560px)]:[&:not(:last-child)::after]:bottom-[-18px] [@media(width<=560px)]:[&:not(:last-child)::after]:border-l [@media(width<=560px)]:[&:not(:last-child)::after]:[border-left-style:dashed] [@media(width<=560px)]:[&:not(:last-child)::after]:border-l-[#416473]"
            >
              <div className="zen-journey-icon [@media(width<=560px)]:w-[57px] w-[58px] [@media(width<=560px)]:h-[57px] h-[58px] grid place-items-center text-[#a1c6d6] bg-transparent [background-image:linear-gradient(135deg,_#1b323e,_#0d171d)] [box-shadow:inset_0_1px_0_#a7cddd19,_0_8px_30px_#0004] relative [@media(width<=560px)]:[grid-row:1_/_span_3] rounded-[13px]">
                <Icon size={26} strokeWidth={1.15} />
                <span className="absolute right-[-7px] top-[-7px] not-italic font-normal text-[9px] leading-[normal] font-sans bg-[#304f5f] bg-none text-[#c1dce8] py-[3px] px-[5px] rounded-[3px]">
                  {n}
                </span>
              </div>
              <small className="block not-italic font-normal text-[9px] leading-[normal] font-sans tracking-[0.09em] [@media(width<=560px)]:mt-px mt-[32px] text-[#789caa]">
                {detail}
              </small>
              <h3 className="[@media(width<=560px)]:text-[19px] text-[20px] font-[420] tracking-[-0.04em] [@media(width<=560px)]:mt-[10px] mt-[13px]">
                {title}
              </h3>
              <p className="[@media(560px<width<=850px)]:text-[13px] text-[14px] leading-[1.8] text-[#92aeb9] [@media(width<=560px)]:mt-[12px] mt-[15px] [@media(width<=560px)]:max-w-[none] max-w-[315px]">
                {text}
              </p>
            </Reveal>
          ))}
        </div>
      </section>
      <section
        id="faq"
        className="zen-faq zen-container grid [@media(width<=850px)]:grid-cols-1 grid-cols-[0.9fr_1.1fr] [@media(width<=560px)]:w-[calc(100%_-_40px)] [@media(560px<width<=1100px)]:w-[calc(100%_-_64px)] w-[min(1220px,_calc(100%_-_96px))] [@media(width<=560px)]:py-[60px] [@media(560px<width<=850px)]:py-[70px] py-[116px] mx-auto [@media(width<=850px)]:gap-[35px] [@media(850px<width<=1100px)]:gap-[48px] gap-[80px]"
      >
        <Reveal>
          <h2 className="font-[450] [@media(width<=560px)]:text-[34px] text-[clamp(32px,_3.1vw,_44px)] tracking-[-0.065em] leading-[1.12] mt-[27px]">
            Good questions.
            <br />
            <span className="text-[#7f9da7]">Straight answers.</span>
          </h2>
          <p className="text-[#8ca8b5] text-[14px] mt-[24px]">
            A little clarity before you begin.
          </p>
          <Link
            href="/dashboard"
            className="zen-subtle-link mt-[17px] inline-flex items-center text-[13px] text-[#d2dce0] min-h-[44px] hover:text-[#9dd3dd] gap-[10px]"
          >
            Explore your workspace <ArrowRight size={16} />
          </Link>
        </Reveal>
        <Reveal>
          <Accordion type="single" collapsible className="zen-faq-list">
            {faqs.map((faq, index) => (
              <AccordionItem
                className="data-[slot=accordion-item]:border-[#2c424e]"
                key={faq.question}
                value={"faq-" + index}
              >
                <AccordionTrigger className="data-[slot=accordion-trigger]:text-[14px] data-[slot=accordion-trigger]:font-normal data-[slot=accordion-trigger]:leading-[1.65] data-[slot=accordion-trigger]:[text-decoration:none] data-[slot=accordion-trigger]:py-[20px] [@media(width<=560px)]:data-[slot=accordion-trigger]:gap-[12px] data-[slot=accordion-trigger]:gap-[17px]">
                  <span className="zen-faq-number [.zen-faq-list_[data-slot='accordion-trigger']_>_&:nth-child(2)]:grow [.zen-faq-list_[data-slot='accordion-trigger']_>_&:nth-child(2)]:shrink [.zen-faq-list_[data-slot='accordion-trigger']_>_&:nth-child(2)]:basis-[0%] not-italic font-normal text-[10px] leading-[2.1] font-sans text-[#7598a9]">
                    0{index + 1}
                  </span>
                  <span className="[.zen-faq-list_[data-slot='accordion-trigger']_>_&:nth-child(2)]:grow [.zen-faq-list_[data-slot='accordion-trigger']_>_&:nth-child(2)]:shrink [.zen-faq-list_[data-slot='accordion-trigger']_>_&:nth-child(2)]:basis-[0%]">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </section>
      <section className="zen-closing relative [@media(width<=560px)]:min-h-[420px] [@media(560px<width<=850px)]:min-h-[440px] min-h-[480px] grid place-items-center text-center isolate bg-transparent [background-image:radial-gradient(_ellipse_50%_65%_at_50%_105%,_#204f5a8a,_#102b3529_70%,_transparent_)] border-t [border-top-style:solid] border-t-[#273c47] [&_.zen-kicker]:justify-center overflow-hidden">
        <div
          className="zen-closing-contours absolute top-0 right-0 bottom-0 left-0 z-[-1] [mask-image:linear-gradient(transparent,_#000_40%)] pointer-events-none"
          aria-hidden="true"
        >
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 600"
            preserveAspectRatio="none"
          >
            {Array.from({ length: 24 }, (_, i) => (
              <path
                key={i}
                d={
                  "M-100 " +
                  (470 + i * 12) +
                  " C300 " +
                  (490 - i * 9) +
                  " 430 " +
                  (160 - i * 3) +
                  " 760 " +
                  (280 - i * 5) +
                  " S1150 " +
                  (620 - i * 14) +
                  " 1550 " +
                  (170 + i * 5)
                }
                fill="none"
                stroke="#70b7c2"
                strokeOpacity={0.07 + i * 0.007}
                strokeWidth=".7"
              />
            ))}
          </svg>
        </div>
        <Reveal className="zen-closing-content relative py-[70px] px-[20px]">
          <h2 className="font-[450] [@media(width<=560px)]:text-[44px] text-[clamp(44px,_5.1vw,_74px)] tracking-[-0.065em] leading-[1.04] mt-[28px]">
            Your next chapter.
            <br />
            <span className="text-[#97bfcc]">Make it yours.</span>
          </h2>
          <p className="[@media(width<=560px)]:text-[14px] text-[15px] text-[#99b6c4] mt-[22px] [@media(width<=560px)]:max-w-[270px] [@media(width<=560px)]:leading-[1.7] [@media(width<=560px)]:mx-auto">
            A clearer perspective. A more confident next step.
          </p>
          <Button
            asChild
            size="lg"
            className="zen-button mt-[30px] data-[slot=button]:min-h-[44px] data-[slot=button]:text-[13px] data-[slot=button]:text-[#092126] data-[slot=button]:bg-transparent data-[slot=button]:[background-image:linear-gradient(145deg,_#acd4d9,_#70b7c2)] data-[slot=button]:border-t data-[slot=button]:[border-top-style:solid] data-[slot=button]:border-r data-[slot=button]:[border-right-style:solid] data-[slot=button]:border-b data-[slot=button]:[border-bottom-style:solid] data-[slot=button]:border-l data-[slot=button]:[border-left-style:solid] data-[slot=button]:[box-shadow:inset_0_1px_0_#e1f5f850,_0_4px_22px_#6eacb214] data-[slot=button]:transition-[transform,_box-shadow] data-[slot=button]:[transition-duration:0.25s,_0.25s] data-[slot=button]:[transition-timing-function:ease,_ease] data-[slot=button]:[transition-delay:0s,_0s] [&[data-slot='button']:hover]:[transform:translateY(-2px)] [&[data-slot='button']:hover]:[box-shadow:inset_0_1px_0_#e1f5f850,_0_8px_32px_#6eacb230] [@media(width<=560px)]:data-[slot=button]:px-[19px] data-[slot=button]:px-[21px] data-[slot=button]:border-[#aed4d96b] data-[slot=button]:rounded-[6px] [@media(width<=560px)]:data-[slot=button]:gap-[15px] data-[slot=button]:gap-[20px]"
          >
            <Link href="/dashboard">
              Let’s find your direction{" "}
              <ArrowUpRight
                className="transition-[transform] [transition-duration:0.25s] [transition-timing-function:ease] delay-0 [.zen-button:hover_&]:[transform:translate(2px,_-2px)]"
                size={18}
              />
            </Link>
          </Button>
        </Reveal>
      </section>
    </div>
  );
}

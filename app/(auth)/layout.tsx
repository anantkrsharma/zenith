import React from "react";
import Image from "next/image";

function layout({ children }: { children: React.ReactNode }): React.ReactNode {
  return (
    <div className="auth-shell min-h-[100vh] [@media(width<=560px)]:pt-[115px] pt-[120px] [@media(width<=560px)]:pb-[50px] pb-12.5 grid [@media(width<=850px)]:grid-cols-1 grid-cols-[1fr_1fr] items-center [@media(width<=850px)]:max-w-[560px] max-w-[1200px] [@media(width<=560px)]:px-[22px] px-7 m-auto [@media(width<=560px)]:gap-[30px] [@media(560px<width<=850px)]:gap-[35px] gap-[70px]">
      <div className="auth-intro [@media(width<=850px)]:text-center relative">
        <p className="eyebrow flex items-center text-[#8ebdca] text-[10px] leading-[normal] tracking-[0.08em] font-normal [@media(width<=850px)]:justify-center not-italic font-sans [.landing-stories_&]:mb-[1.5625rem] [.workspace-sidebar_>_&]:pl-3 [@media(width<=850px)]:[.workspace-sidebar_>_&]:hidden last:text-muted-foreground [@media(width<=560px)]:last:text-[0.875rem] last:text-[1rem] last:max-w-92.5 [&:not(.eyebrow)]:max-w-[390px] [@media(width<=560px)]:[&:not(.eyebrow)]:text-[15px] [&:not(.eyebrow)]:text-[16px] [&:not(.eyebrow)]:leading-[1.8] [&:not(.eyebrow)]:text-[#9db4c1] [@media(width<=850px)]:last:m-auto [@media(width<=850px)]:[&:not(.eyebrow)]:mx-auto gap-2.5">
          A NEW CHAPTER, WITH ZENITH
        </p>
        <h1 className="[@media(width<=560px)]:text-[39px] text-[clamp(40px,_4.5vw,_66px)] leading-[1.08] tracking-[-0.065em] font-[450] my-[1.5625rem] mx-0">
          Your ambition.
          <br />A clearer <span className="text-primary">direction.</span>
        </h1>
        <p className="max-w-[390px] [@media(width<=560px)]:text-[15px] text-[16px] leading-[1.8] text-[#9db4c1] [@media(width<=850px)]:last:my-auto [@media(width<=850px)]:mx-auto">
          Bring your experience. Find your focus. Build the confidence to take
          your next step.
        </p>
        <div className="zen-auth-landscape mt-[15px] mb-[-25px] [@media(width<=850px)]:hidden mx-[-40px]">
          <Image
            className="w-full h-auto mix-blend-screen [mask-image:radial-gradient(ellipse_at_center,_#000_45%,_transparent_74%)]"
            src="/art/career-landscape.png"
            width={1536}
            height={1024}
            sizes="(max-width: 850px) 100vw, 45vw"
            alt="A luminous path rises through a teal landscape toward a summit."
          />
          <span className="block text-center mt-[-15px] text-[#678b9c] not-italic font-normal text-[9px] leading-[normal] font-sans tracking-[0.09em]">
            YOUR STARTING POINT. YOUR POSSIBILITIES.
          </span>
        </div>
      </div>
      <div className="auth-form flex justify-center min-w-0">{children}</div>
    </div>
  );
}

export default layout;

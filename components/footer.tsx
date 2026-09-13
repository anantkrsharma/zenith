"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Code2 } from "lucide-react";
import { Brand } from "@/components/brand";

export default function Footer() {
  const path = usePathname();
  if (path.startsWith("/sign-in") || path.startsWith("/sign-up")) return null;
  if (path !== "/")
    return (
      <footer className="workspace-footer border-t [border-top-style:solid] [@media(width<=560px)]:text-[10px] text-[11px] text-[#7b9aa9] flex justify-between bg-[#0c161d] bg-none [@media(width<=560px)]:py-[17px] py-5 [@media(width<=560px)]:px-[20px] px-[2.1875rem] border-[#29414e] gap-5">
        <span>© {new Date().getFullYear()} Zenith</span>
        <Link
          className="flex items-center [@media(width<=560px)]:max-w-47.5 [@media(width<=560px)]:text-right gap-2"
          href="/#faq"
        >
          A little clarity for your next chapter
        </Link>
      </footer>
    );
  return (
    <footer className="site-footer [@media(width<=560px)]:pt-[45px] pt-[56px] bg-[#090f13] bg-none border-t [border-top-style:solid] border-t-[#29404b] overflow-hidden">
      <div className="zen-container [@media(width<=560px)]:w-[calc(100%_-_40px)] [@media(560px<width<=1100px)]:w-[calc(100%_-_64px)] w-[min(1220px,_calc(100%_-_96px))] mx-auto">
        <div className="footer-grid grid [@media(width<=560px)]:grid-cols-[1fr_1fr] [@media(560px<width<=850px)]:grid-cols-[1.2fr_1fr_1fr] grid-cols-[1.5fr_1fr_1fr] [@media(width<=560px)]:gap-y-[35px] [@media(width<=560px)]:gap-x-[25px] pb-15 [@media(560px<width<=850px)]:gap-[30px] gap-[70px]">
          <div className="[@media(width<=560px)]:first:[grid-column:1_/_-1]">
            <Brand />
            <p className="mt-5 max-w-xs text-[14px] leading-[1.85] text-[#859faa]">
              A little clarity. A lot of possibility.
              <br />
              Your personal AI career workspace.
            </p>
          </div>
          <div className="[@media(width<=560px)]:first:[grid-column:1_/_-1]">
            <h3 className="text-[#8eacbb] text-[10px] tracking-[0.1em] mb-[22px] not-italic font-normal leading-[normal] font-sans">
              THE WORKSPACE
            </h3>
            <Link
              className="[.footer-grid_>_div:not(:first-child)_&]:flex [.footer-grid_>_div:not(:first-child)_&]:items-center [.footer-grid_>_div:not(:first-child)_&]:text-[13px] [.footer-grid_>_div:not(:first-child)_&]:text-[#a1b7c2] [.footer-grid_>_div:not(:first-child)_&]:mt-[0.9375rem] [.footer-grid_>_div:not(:first-child)_&]:min-h-[32px] hover:text-primary [.footer-grid_>_div:not(:first-child)_&]:gap-2"
              href="/dashboard"
            >
              Industry insights
            </Link>
            <Link
              className="[.footer-grid_>_div:not(:first-child)_&]:flex [.footer-grid_>_div:not(:first-child)_&]:items-center [.footer-grid_>_div:not(:first-child)_&]:text-[13px] [.footer-grid_>_div:not(:first-child)_&]:text-[#a1b7c2] [.footer-grid_>_div:not(:first-child)_&]:mt-[0.9375rem] [.footer-grid_>_div:not(:first-child)_&]:min-h-[32px] hover:text-primary [.footer-grid_>_div:not(:first-child)_&]:gap-2"
              href="/resume"
            >
              Resume studio
            </Link>
            <Link
              className="[.footer-grid_>_div:not(:first-child)_&]:flex [.footer-grid_>_div:not(:first-child)_&]:items-center [.footer-grid_>_div:not(:first-child)_&]:text-[13px] [.footer-grid_>_div:not(:first-child)_&]:text-[#a1b7c2] [.footer-grid_>_div:not(:first-child)_&]:mt-[0.9375rem] [.footer-grid_>_div:not(:first-child)_&]:min-h-[32px] hover:text-primary [.footer-grid_>_div:not(:first-child)_&]:gap-2"
              href="/interview"
            >
              Interview preparation
            </Link>
            <Link
              className="[.footer-grid_>_div:not(:first-child)_&]:flex [.footer-grid_>_div:not(:first-child)_&]:items-center [.footer-grid_>_div:not(:first-child)_&]:text-[13px] [.footer-grid_>_div:not(:first-child)_&]:text-[#a1b7c2] [.footer-grid_>_div:not(:first-child)_&]:mt-[0.9375rem] [.footer-grid_>_div:not(:first-child)_&]:min-h-[32px] hover:text-primary [.footer-grid_>_div:not(:first-child)_&]:gap-2"
              href="/ai-cover-letter"
            >
              Cover letters
            </Link>
          </div>
          <div className="[@media(width<=560px)]:first:[grid-column:1_/_-1]">
            <h3 className="text-[#8eacbb] text-[10px] tracking-[0.1em] mb-[22px] not-italic font-normal leading-[normal] font-sans">
              EXPLORE
            </h3>
            <Link
              className="[.footer-grid_>_div:not(:first-child)_&]:flex [.footer-grid_>_div:not(:first-child)_&]:items-center [.footer-grid_>_div:not(:first-child)_&]:text-[13px] [.footer-grid_>_div:not(:first-child)_&]:text-[#a1b7c2] [.footer-grid_>_div:not(:first-child)_&]:mt-[0.9375rem] [.footer-grid_>_div:not(:first-child)_&]:min-h-[32px] hover:text-primary [.footer-grid_>_div:not(:first-child)_&]:gap-2"
              href="/#how-it-works"
            >
              How it works
            </Link>
            <Link
              className="[.footer-grid_>_div:not(:first-child)_&]:flex [.footer-grid_>_div:not(:first-child)_&]:items-center [.footer-grid_>_div:not(:first-child)_&]:text-[13px] [.footer-grid_>_div:not(:first-child)_&]:text-[#a1b7c2] [.footer-grid_>_div:not(:first-child)_&]:mt-[0.9375rem] [.footer-grid_>_div:not(:first-child)_&]:min-h-[32px] hover:text-primary [.footer-grid_>_div:not(:first-child)_&]:gap-2"
              href="/#faq"
            >
              Common questions
            </Link>
            <a
              className="[.footer-grid_>_div:not(:first-child)_&]:flex [.footer-grid_>_div:not(:first-child)_&]:items-center [.footer-grid_>_div:not(:first-child)_&]:text-[13px] [.footer-grid_>_div:not(:first-child)_&]:text-[#a1b7c2] [.footer-grid_>_div:not(:first-child)_&]:mt-[0.9375rem] [.footer-grid_>_div:not(:first-child)_&]:min-h-[32px] hover:text-primary [.footer-grid_>_div:not(:first-child)_&]:gap-2"
              href="https://github.com/anantkrsharma/Zenith"
              target="_blank"
              rel="noreferrer"
            >
              View the source <Code2 size={13} />
            </a>
            <a
              className="[.footer-grid_>_div:not(:first-child)_&]:flex [.footer-grid_>_div:not(:first-child)_&]:items-center [.footer-grid_>_div:not(:first-child)_&]:text-[13px] [.footer-grid_>_div:not(:first-child)_&]:text-[#a1b7c2] [.footer-grid_>_div:not(:first-child)_&]:mt-[0.9375rem] [.footer-grid_>_div:not(:first-child)_&]:min-h-[32px] hover:text-primary [.footer-grid_>_div:not(:first-child)_&]:gap-2"
              href="https://anant.im"
              target="_blank"
              rel="noreferrer"
            >
              Made by{" "}
              <span className="text-cyan-200/65 hover:text-cyan-200/80 transition-all duration-150">
                Anant Kr Sharma
              </span>
            </a>
          </div>
        </div>
        <div
          className="zen-footer-signature flex justify-between items-center [@media(width<=560px)]:h-[130px] h-[clamp(150px,_18.5vw,_268px)] [@media(width<=560px)]:mt-[20px] mt-[35px] [@media(width<=560px)]:mb-[5px] mb-[15px] border-b [border-bottom-style:solid] border-b-[#263b46] text-[#16333d]"
          aria-hidden="true"
        >
          <span className="[@media(width<=560px)]:text-[29vw] text-[clamp(132px,_21vw,_304px)] font-medium leading-[1] tracking-[-0.09em] ml-[-0.055em] bg-transparent [background-image:linear-gradient(120deg,_#294752,_#162e38_65%)] bg-clip-text [-webkit-text-fill-color:transparent]">
            zenith
          </span>
          <ArrowUpRight
            className="[@media(width<=560px)]:w-[19vw] w-[15vw] [@media(width<=560px)]:h-[19vw] h-[15vw] max-w-[220px] max-h-[220px] text-[#294854]"
            strokeWidth={0.6}
          />
        </div>
        <div className="footer-bottom border-t-0 [border-top-style:none] border-t-[currentColor] pt-[16px] pb-[30px] flex justify-between text-[#708d9b] [@media(width<=560px)]:text-[9px] text-[10px] [@media(width<=560px)]:flex-col mt-0 [@media(width<=560px)]:flex-wrap [@media(width<=560px)]:gap-[12px] gap-5">
          <span className="[@media(width<=560px)]:last:text-[8px] last:text-[9px] last:tracking-[0.1em] last:not-italic last:font-normal last:leading-[normal] last:font-sans">
            © {new Date().getFullYear()} Zenith. All rights reserved.
          </span>
          <span className="flex items-center gap-2 [@media(width<=560px)]:last:text-[8px] last:text-[9px] last:tracking-[0.1em] last:not-italic last:font-normal last:leading-[normal] last:font-sans">
            BUILT FOR WHAT’S NEXT
          </span>
        </div>
      </div>
    </footer>
  );
}

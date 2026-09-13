"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  Compass,
  FileText,
  Mail,
  MessageSquare,
  ScanLine,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { workspaceNavigation as navigation } from "@/components/workspace-navigation";

const toolIcons = [ScanLine, FileText, MessageSquare, Mail];

export function WorkspaceShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  if (path.startsWith("/onboarding"))
    return (
      <div className="onboarding-shell [@media(width<=560px)]:mt-18 mt-21 mb-0 [@media(width<=560px)]:pt-[2.1875rem] pt-16 [@media(width<=560px)]:pb-12.5 pb-20 min-h-[calc(100vh_-_8.75rem)] [@media(width<=560px)]:px-[1.0625rem] px-7 mx-auto">
        {children}
      </div>
    );
  return (
    <div className="workspace-shell max-w-430 [@media(width<=560px)]:mt-[70px] mt-[76px] mb-0 [@media(width<=850px)]:block grid [@media(width<=1100px)]:grid-cols-[218px_minmax(0,_1fr)] grid-cols-[235px_minmax(0,_1fr)] min-h-[calc(100vh_-_8.75rem)] bg-transparent [background-image:radial-gradient(ellipse_at_70%_0,_#142b342c,_transparent_55%)] mx-auto">
      <aside className="workspace-sidebar [@media(width<=850px)]:border-r-0 border-r [@media(width<=850px)]:[border-right-style:none] [border-right-style:solid] [@media(width<=850px)]:border-r-[currentColor] bg-transparent [background-image:linear-gradient(170deg,_#102027,_#0b1318_70%)] [@media(width<=850px)]:border-b [@media(width<=850px)]:[border-bottom-style:solid] [@media(width<=850px)]:border-b-[#344e5a] [@media(width<=850px)]:static sticky top-[76px] [align-self:start] [@media(width<=850px)]:min-h-0 min-h-[calc(100vh_-_76px)] [@media(width<=560px)]:py-[11px] [@media(560px<width<=850px)]:py-[14px] py-[30px] [@media(width<=560px)]:px-[14px] [@media(560px<width<=850px)]:px-[22px] px-[16px] border-[#29414d]">
        <nav
          className="grid [@media(width<=850px)]:grid-cols-[repeat(4,_minmax(0,_1fr))] [@media(width<=560px)]:gap-[5px] [@media(560px<width<=850px)]:gap-[7px] gap-[8px]"
          aria-label="Workspace navigation"
        >
          {navigation.map(({ href, label }, index) => {
            const Icon = toolIcons[index];
            return (
              <Link
                key={href}
                href={href}
                aria-current={path.startsWith(href) ? "page" : undefined}
                className={cn(
                  "workspace-link",
                  path.startsWith(href) && "active",
                  "flex items-center [@media(width<=560px)]:text-[10px] [@media(560px<width<=850px)]:text-[11px] text-[13px] text-[#b4c2c8] [border-top-style:solid] [border-right-style:solid] [border-bottom-style:solid] [border-left-style:solid] [@media(width<=850px)]:justify-center [@media(width<=560px)]:flex-col [@media(width<=560px)]:min-h-[62px] [@media(560px<width<=850px)]:min-h-[44px] min-h-[50px] transition-[color,_background,_border-color] [transition-duration:0.2s,_0.2s,_0.2s] [transition-timing-function:ease,_ease,_ease] [transition-delay:0s,_0s,_0s] hover:text-foreground hover:bg-[#1b3541] hover:bg-none [&.active]:text-[#c8e8ed] [&.active]:bg-transparent [&.active]:[background-image:linear-gradient(100deg,_#26444f,_#142b3544)] [&.active]:[box-shadow:inset_2px_0_0_#8cc7d1] [@media(width<=560px)]:py-[9px] [@media(560px<width<=850px)]:py-[10px] p-[12px] [@media(width<=560px)]:px-[3px] [@media(560px<width<=850px)]:px-[7px] border border-[transparent] [&.active]:border-[#5e8c9c6e] rounded-[6px] [@media(width<=560px)]:gap-[6px] [@media(560px<width<=850px)]:gap-[7px] gap-[11px]",
                )}
              >
                <Icon
                  className="shrink-0 text-[#7fa6b4] [.workspace-link.active_&]:text-[#addbe2]"
                  size={17}
                  strokeWidth={1.4}
                  aria-hidden="true"
                />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="sidebar-note mt-[36px] mb-0 pt-[23px] pb-4 border-t [border-top-style:solid] [@media(width<=850px)]:hidden px-2 mx-[5px] border-[#2e4855]">
          <span className="zen-sidebar-caption not-italic font-normal text-[8px] leading-[1.8] font-sans text-[#6a8d9e]">
            A LITTLE CLARITY GOES A LONG WAY.
          </span>
          <Link
            className="flex items-center mt-[14px] text-[12px] text-[#a0c3cf] justify-between gap-[0.4375rem]"
            href="/#faq"
          >
            Workspace guide <ArrowUpRight size={14} />
          </Link>
        </div>
      </aside>
      <div className="workspace-main min-w-0 pt-0 [@media(width<=560px)]:pb-[35px] pb-15 [@media(width<=560px)]:px-[20px] [@media(560px<width<=1100px)]:px-[25px] px-[clamp(24px,_3vw,_50px)]">
        <div className="workspace-breadcrumb [@media(width<=560px)]:h-[48px] [@media(560px<width<=850px)]:h-[55px] h-[65px] flex items-center border-b [border-bottom-style:solid] text-[#728f9f] text-[11px] border-[#273e4a] gap-3">
          <span className="last:text-[12px] last:tracking-[0] last:text-[#abc7d2]">
            Workspace
          </span>
          <span className="last:text-[12px] last:tracking-[0] last:text-[#abc7d2]">
            /
          </span>
          <span className="last:text-[12px] last:tracking-[0] last:text-[#abc7d2]">
            {navigation.find((item) => path.startsWith(item.href))?.label}
          </span>
        </div>
        <div className="workspace-page [@media(width<=560px)]:pt-[25px] pt-[32px] [&_.wmde-markdown]:[--color-canvas-default:#0c1215] [&_.wmde-markdown]:[--color-fg-default:#e4ebee] [&_.wmde-markdown]:[--color-border-default:#1d2b30] [&_.w-md-editor]:[--color-canvas-default:#0c1215] [&_.w-md-editor]:[--color-fg-default:#e4ebee] [&_.w-md-editor]:[--color-border-default:#1d2b30] [&_[data-slot='tabs-trigger'][data-state='active']]:bg-[#2c4a58] [&_[data-slot='tabs-trigger'][data-state='active']]:bg-none [&_[data-slot='tabs-trigger'][data-state='active']]:text-[#d8edf2] [&_[data-slot='tabs-trigger'][data-state='active']]:[box-shadow:inset_0_1px_0_#7fabb51a]">
          {children}
        </div>
      </div>
    </div>
  );
}

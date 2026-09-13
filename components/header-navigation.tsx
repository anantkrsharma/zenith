"use client";

import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Brand } from "@/components/brand";
import { usePathname } from "next/navigation";
import { workspaceNavigation } from "@/components/workspace-navigation";

export default function HeaderNavigation() {
  const pathname = usePathname();
  const isLanding = pathname === "/";
  const hasWorkspaceNavigation = workspaceNavigation.some(
    ({ href }) => pathname === href || pathname.startsWith(`${href}/`),
  );
  return (
    <header
      className="site-header fixed top-0 right-0 bottom-auto left-0 z-50 bg-[#080e12dc] bg-none border-b [border-bottom-style:solid] border-b-[#45616b35] [backdrop-filter:blur(20px)] [@media(width<=380px)]:[&_nav_>_a]:text-[18px] [@media(width<=380px)]:[&_nav_>_a]:gap-[6px]"
      data-landing={isLanding}
    >
      <nav
        className="site-container flex items-center justify-between gap-4 [@media(width<=560px)]:w-[calc(100%_-_2.5rem)] [@media(560px<width<=1150px)]:w-[calc(100%_-_4rem)] w-[min(82.5rem,_calc(100%_-_7rem))] [@media(width<=560px)]:h-[70px] h-[76px] [@media(width<=560px)]:[.site-header[data-landing='true']_&]:w-[calc(100%_-_40px)] [@media(560px<width<=1100px)]:[.site-header[data-landing='true']_&]:w-[calc(100%_-_64px)] [.site-header[data-landing='true']_&]:w-[min(1220px,_calc(100%_-_96px))] [@media(width<=560px)]:[.site-header[data-landing='true']_&]:h-[64px] [.site-header[data-landing='true']_&]:h-[68px] mx-auto [@media(width<=380px)]:gap-[6px]"
        aria-label="Main navigation"
      >
        <Brand />
        {isLanding && (
          <div className="hidden md:flex items-center gap-8 text-muted-foreground text-[13px] leading-[calc(1/0.75)]">
            <Link className="hover:text-primary" href="/#workspace">
              The workspace
            </Link>
            <Link className="hover:text-primary" href="/#how-it-works">
              How it works
            </Link>
            <Link className="hover:text-primary" href="/#faq">
              FAQ
            </Link>
          </div>
        )}
        <div className="zen-header-actions flex items-center gap-3 [@media(width<=560px)]:[&_>_button]:px-[9px] [@media(width<=380px)]:gap-[2px] [@media(380px<width<=560px)]:gap-[4px]">
          <Show when="signed-in">
            {!hasWorkspaceNavigation && (
              <Button
                asChild
                variant="ghost"
                className="hidden lg:inline-flex text-[13px] data-[slot=button]:text-[13px] [@media(width<=560px)]:data-[slot=button]:px-2.5 leading-[calc(1/0.75)]"
              >
                <Link href="/dashboard">Workspace</Link>
              </Button>
            )}
            {!hasWorkspaceNavigation && (
              <div>
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className="text-[13px] data-[slot=button]:text-[13px] [@media(width<=560px)]:data-[slot=button]:px-2.5 leading-[calc(1/0.75)]"
                      variant="outline"
                      size="sm"
                      aria-label="Open career tools"
                    >
                      <Menu className="md:hidden" />
                      <span className="hidden md:inline">Career tools</span>
                      <ChevronDown className="hidden md:block" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 p-2">
                    {workspaceNavigation.map(({ href, label }) => (
                      <DropdownMenuItem key={href} asChild>
                        <Link href={href} className="gap-3 py-3">
                          {label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
            <UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }} />
          </Show>
          <Show when="signed-out">
            <SignInButton>
              <Button
                className="text-[13px] data-[slot=button]:text-[13px] [@media(width<=560px)]:data-[slot=button]:px-2.5 leading-[calc(1/0.75)]"
                variant="ghost"
                size="sm"
              >
                Sign in
              </Button>
            </SignInButton>
            <Button
              asChild
              size="sm"
              className="zen-header-cta text-[13px] data-[slot=button]:text-[13px] data-[slot=button]:bg-transparent data-[slot=button]:[background-image:linear-gradient(135deg,_#b1d6dd,_#70b7c2)] data-[slot=button]:text-[#12313b] data-[slot=button]:h-[37px] [@media(width<=560px)]:data-[slot=button]:min-h-[38px] [@media(width<=560px)]:data-[slot=button]:px-[11px] data-[slot=button]:px-[17px] data-[slot=button]:rounded-[5px] [@media(width<=560px)]:data-[slot=button]:gap-[6px] data-[slot=button]:gap-[13px] leading-[calc(1/0.75)]"
            >
              <Link href="/sign-up">
                Get started{" "}
                <ArrowUpRight
                  className="[@media(width<=380px)]:hidden"
                  size={14}
                />
              </Link>
            </Button>
          </Show>
        </div>
      </nav>
    </header>
  );
}

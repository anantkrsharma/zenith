import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[80vh] max-w-xl flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="eyebrow flex items-center text-primary [@media(width<=560px)]:text-[0.6875rem] text-[0.75rem] leading-[1.6] tracking-[0.12em] font-medium [.landing-stories_&]:mb-[1.5625rem] [.landing-stories_&]:text-[0.6875rem] [.story-documents_&]:text-[#8eafb8] [.workspace-sidebar_>_&]:text-[0.6875rem] [.workspace-sidebar_>_&]:text-[#91a5ad] [.workspace-sidebar_>_&]:pl-3 [@media(width<=850px)]:[.workspace-sidebar_>_&]:hidden gap-2.5">
        404 / A SMALL DETOUR
      </span>
      <h1 className="text-4xl font-medium tracking-tight md:text-5xl">
        Let’s get you
        <br />
        <span className="text-primary">back on track.</span>
      </h1>
      <p className="max-w-sm text-sm leading-7 text-muted-foreground">
        This page may have moved, or the link may be incomplete. Your next
        chapter is still waiting.
      </p>
      <Button asChild size="lg">
        <Link href="/">Back to Zenith</Link>
      </Button>
    </div>
  );
}

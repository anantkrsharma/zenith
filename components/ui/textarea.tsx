import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "[.workspace-page_&[data-slot='textarea']]:bg-[#0a171d] [.workspace-page_&[data-slot='textarea']]:bg-none [.workspace-page_&[data-slot='textarea']]:text-[16px] [.workspace-page_&[data-slot='textarea']]:min-h-[44px] [.workspace-page_&[data-slot='textarea']]:transition-[border-color,_box-shadow] [.workspace-page_&[data-slot='textarea']]:[transition-duration:0.2s,_0.2s] [.workspace-page_&[data-slot='textarea']]:[transition-timing-function:ease,_ease] [.workspace-page_&[data-slot='textarea']]:[transition-delay:0s,_0s] [.workspace-page_&[data-slot='textarea']:focus-visible]:[box-shadow:0_0_0_3px_#70b7c216] [.workspace-page_&[data-slot='textarea']]:border-[#3c5967] [.workspace-page_&[data-slot='textarea']:focus-visible]:border-[#8fbdc8] [.workspace-page_&[data-slot='textarea']]:rounded-[6px]",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };

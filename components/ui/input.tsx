import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        "[.workspace-page_&[data-slot='input']]:bg-[#0a171d] [.workspace-page_&[data-slot='input']]:bg-none [.workspace-page_&[data-slot='input']]:text-[16px] [.workspace-page_&[data-slot='input']]:min-h-[44px] [.workspace-page_&[data-slot='input']]:transition-[border-color,_box-shadow] [.workspace-page_&[data-slot='input']]:[transition-duration:0.2s,_0.2s] [.workspace-page_&[data-slot='input']]:[transition-timing-function:ease,_ease] [.workspace-page_&[data-slot='input']]:[transition-delay:0s,_0s] [@media(width<=560px)]:data-[slot=input]:min-h-[44px] [.workspace-page_&[data-slot='input']:focus-visible]:[box-shadow:0_0_0_3px_#70b7c216] [.workspace-page_&[data-slot='input']]:border-[#3c5967] [.workspace-page_&[data-slot='input']:focus-visible]:border-[#8fbdc8] [.workspace-page_&[data-slot='input']]:rounded-[6px]",
        className,
      )}
      {...props}
    />
  );
}

export { Input };

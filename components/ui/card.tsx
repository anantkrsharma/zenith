import * as React from "react";

import { cn } from "@/lib/utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-5 rounded-md border py-5",
        "[.workspace-page_&[data-slot='card']]:[box-shadow:inset_0_1px_0_#b8dce70a,_0_12px_30px_#0002] [.workspace-page_&[data-slot='card']]:bg-transparent [.workspace-page_&[data-slot='card']]:[background-image:linear-gradient(145deg,_#13242b,_#0e191f)] [.workspace-page_&[data-slot='card']]:border-[#36515e] [.workspace-page_&[data-slot='card']]:rounded-[10px]",
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-1.5 px-6", className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "leading-none font-semibold",
        "[.workspace-page_&[data-slot='card-title']]:tracking-[-0.025em] [.workspace-page_&[data-slot='card-title']]:text-[20px] [.workspace-page_&[data-slot='card-title']]:font-[450]",
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};

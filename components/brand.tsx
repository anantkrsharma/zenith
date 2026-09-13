import Link from "next/link";
import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "brand-mark",
        "w-7 h-[1.6875rem] inline-flex items-end [transform:skewX(-19deg)] gap-[3px]",
        className,
      )}
      aria-hidden="true"
    >
      <span className="block w-1.5 bg-primary bg-none [&:nth-child(1)]:h-3 [&:nth-child(1)]:opacity-65 [&:nth-child(2)]:h-5 [&:nth-child(2)]:opacity-85 [&:nth-child(3)]:h-[1.6875rem] rounded-[1px]" />
      <span className="block w-1.5 bg-primary bg-none [&:nth-child(1)]:h-3 [&:nth-child(1)]:opacity-65 [&:nth-child(2)]:h-5 [&:nth-child(2)]:opacity-85 [&:nth-child(3)]:h-[1.6875rem] rounded-[1px]" />
      <span className="block w-1.5 bg-primary bg-none [&:nth-child(1)]:h-3 [&:nth-child(1)]:opacity-65 [&:nth-child(2)]:h-5 [&:nth-child(2)]:opacity-85 [&:nth-child(3)]:h-[1.6875rem] rounded-[1px]" />
    </span>
  );
}

export function Brand({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Zenith home"
      className={cn(
        "inline-flex items-center gap-2.5 text-xl font-semibold tracking-[-0.06em]",
        className,
      )}
    >
      <BrandMark />
      zenith
    </Link>
  );
}

import { cn } from "@/lib/utils";

export function PageHeading({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "page-heading",
        "flex justify-between [@media(width<=560px)]:[align-items:start] [align-items:end] [@media(width<=560px)]:mb-[25px] mb-[32px] [@media(width<=560px)]:flex-col [@media(width<=560px)]:flex-wrap [@media(width<=560px)]:gap-[20px] gap-6",
        className,
      )}
    >
      <div>
        <h1 className="[@media(width<=560px)]:text-[31px] text-[clamp(22px,_3vw,_30px)] leading-[1.12] tracking-[-0.05em] font-[450] mt-[0.8125rem]">
          {title}
        </h1>
        <p className="page-description [@media(width<=560px)]:text-[10px] text-[12px] leading-[1.3] text-[#9db4c1] mt-3 max-w-142.5">
          {description}
        </p>
      </div>
      {children && (
        <div className="flex shrink-0 flex-wrap gap-2">{children}</div>
      )}
    </div>
  );
}

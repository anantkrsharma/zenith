"use client";
import { useState } from "react";
import Link from "next/link";
import { format, formatDistanceToNow } from "date-fns";
import { IndustryInsight } from "@prisma/client";
import { ArrowRight, TrendingDown, TrendingUp, Minus } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";

type SalaryRange = {
  role: string;
  min: number;
  max: number;
  median: number;
  location?: string;
};
const salaryColors = {
  min: "#68757b",
  median: "#edf2f3",
  max: "#70b7c2",
} as const;
const nextSteps = [
  {
    label: "Understand the market",
    title: "Find the skills worth your attention.",
    text: "Start with the skills and trends below. Use your industry's outlook to choose what to explore next.",
    href: "#market-skills",
    action: "Explore the signals",
  },
  {
    label: "Test my knowledge",
    title: "Turn what you know into confidence.",
    text: "Take a personalized assessment, review each answer, and identify where a little practice could make a difference.",
    href: "/interview",
    action: "Open interview prep",
  },
  {
    label: "Prepare my application",
    title: "Put your experience into words.",
    text: "Build a focused resume, then pair it with a cover letter that connects your experience to the opportunity.",
    href: "/resume",
    action: "Open resume studio",
  },
];
export const DashboardView = ({ insights }: { insights: IndustryInsight }) => {
  const [focus, setFocus] = useState(0);
  const mobile = useMediaQuery("(max-width: 768px)");
  const ranges = insights.salaryRanges as SalaryRange[];
  const salaryData = ranges.map((r) => ({
    name: r.role,
    min: r.min / 1000,
    median: r.median / 1000,
    max: r.max / 1000,
  }));
  const industry = insights.industry
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
  const OutlookIcon =
    insights.marketOutlook === "POSITIVE"
      ? TrendingUp
      : insights.marketOutlook === "NEGATIVE"
        ? TrendingDown
        : Minus;
  return (
    <div className="career-dashboard grid gap-7">
      <section
        className="career-orientation grid [@media(width<=750px)]:grid-cols-1 [@media(750px<width<=1150px)]:grid-cols-[1fr_1.3fr] grid-cols-[0.8fr_1.2fr] [border-top-style:solid] [border-right-style:solid] [border-bottom-style:solid] [border-left-style:solid] bg-transparent [background-image:linear-gradient(115deg,_#1b333d,_#111f28)] [box-shadow:inset_0_1px_0_#8cafba17] border border-[#3a5865]/40 rounded-[9px] overflow-hidden"
        aria-labelledby="career-focus-title"
      >
        <div className="orientation-context relative bg-transparent bg-[radial-gradient(ellipse_at_0_0,#70b7c21a,transparent_80%)] [@media(width<=750px)]:p-[1.5625rem] [@media(750px<width<=1150px)]:p-6 p-7.5 overflow-hidden">
          <h2 className="[@media(width<=1150px)]:text-[1.625rem] text-[1.875rem] font-[450] leading-[1.25] tracking-[-0.04em] [@media(width<=750px)]:mt-[0.9375rem] mt-5 [@media(width<=750px)]:mb-2 mb-3">
            {industry}
          </h2>
          <p className="text-[0.8125rem] leading-[1.3] [@media(width<=750px)]:max-w-[none] max-w-74 text-[#b4c2c8]">
            Choose what you want to move forward today.
          </p>
        </div>
        <div className="orientation-action bg-[#0e171b] bg-none min-w-0 [@media(width<=750px)]:py-5 p-6 [@media(width<=480px)]:px-[1.0625rem] [@media(480px<width<=750px)]:px-5">
          <div
            className="focus-options flex [@media(width<=480px)]:flex-nowrap flex-wrap border-b [border-bottom-style:solid] border-b-[#1d2b30] pb-[1.0625rem] [@media(width<=480px)]:gap-[3px] gap-[0.4375rem]"
            role="group"
            aria-label="Choose your next step"
          >
            {nextSteps.map((step, i) => (
              <button
                className="[@media(width<=560px)]:text-[11px] text-[12px] [border-top-style:solid] [border-right-style:solid] [border-bottom-style:solid] [border-left-style:solid] text-[#b4c2c8] min-h-[40px] [@media(width<=480px)]:grow [@media(width<=480px)]:shrink [@media(width<=480px)]:basis-[0%] aria-[pressed=true]:text-[#d6e9ef] aria-[pressed=true]:bg-[#2c4a58] aria-[pressed=true]:bg-none [@media(width<=480px)]:py-2 py-[0.5625rem] [@media(width<=480px)]:px-1.5 px-2.5 aria-[pressed=true]:border-[#6c98a6] rounded-[4px]"
                key={step.label}
                type="button"
                aria-pressed={focus === i}
                onClick={() => setFocus(i)}
              >
                {step.label}
              </button>
            ))}
          </div>
          <div
            className="focus-content pt-5.5 [&_>_svg]:text-primary [&_>_svg]:mb-3"
            aria-live="polite"
          >
            <h3
              className="text-[1.4375rem] tracking-[-0.03em] leading-[1.35]"
              id="career-focus-title"
            >
              {nextSteps[focus].title}
            </h3>
            <p className="text-[14px] text-[#b4c2c8] leading-[1.8] mt-2.5 mb-5">
              {nextSteps[focus].text}
            </p>
            <Button asChild>
              <Link href={nextSteps[focus].href}>
                {nextSteps[focus].action}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="data-section-heading flex flex-wrap [align-items:end] justify-between mt-6 gap-5">
        <div>
          <h2 className="[@media(width<=560px)]:text-[18px] text-[22px] font-normal tracking-[-0.045em] leading-[1.2]">
            Read the signals.
          </h2>
        </div>
        <span className="text-[0.6975rem] text-muted-foreground">
          Updated {format(new Date(insights.lastUpdated), "dd MMM yyyy")}
        </span>
      </div>
      <section
        className="market-overview grid [@media(width<=750px)]:grid-cols-[1fr_1fr] grid-cols-[1.3fr_1fr_1fr] [border-top-style:solid] [border-bottom-style:solid] bg-transparent [background-image:linear-gradient(100deg,_#13283255,_transparent)] [&_>_div_+_div]:border-l [&_>_div_+_div]:[border-left-style:solid] [&_>_div_+_div]:border-l-[#2c4552] border-y border-y-[#344f5d]/40"
        aria-label="Industry overview"
      >
        <div className="market-primary [@media(width<=750px)]:[grid-column:span_2] first:pl-4 [@media(width<=750px)]:first:border-r-0 [@media(width<=750px)]:first:[border-right-style:none] [@media(width<=750px)]:first:border-r-[currentColor] [@media(width<=750px)]:first:border-b [@media(width<=750px)]:first:[border-bottom-style:solid] [@media(width<=750px)]:first:border-b-[#1d2b30] last:[border-top-style:none] last:[border-right-style:none] last:[border-bottom-style:none] last:[border-left-style:none] [@media(width<=750px)]:last:pl-5.5 [@media(width<=560px)]:[&:nth-child(3)]:border-l-0 [@media(width<=560px)]:[&:nth-child(3)]:[border-left-style:none] [@media(width<=560px)]:[&:nth-child(3)]:border-l-[currentColor] [@media(width<=750px)]:py-[1.4375rem] py-6.5 [@media(width<=560px)]:px-[16px] px-[24px] last:border-0 last:border-[currentColor]">
          <p className="text-[0.6875rem] tracking-[0.09em] text-[#b4c2c8] mb-[1.1875rem]">
            MARKET OUTLOOK
          </p>
          <div className="flex items-center text-primary [@media(width<=750px)]:justify-between gap-[1.15rem]">
            <strong className="capitalize [@media(width<=750px)]:text-[1.5rem] text-[1.75rem] font-normal tracking-[-0.04em] text-[#c5e2e8]">
              {insights.marketOutlook.toLowerCase()}
            </strong>
            <OutlookIcon size={20} aria-hidden="true" />
          </div>
          <span className="block mt-[0.8125rem] text-[#b4c2c8] text-[0.75rem]">
            Next refresh{" "}
            {formatDistanceToNow(new Date(insights.nextUpdate), {
              addSuffix: true,
            })}
          </span>
        </div>
        <div className="market-stat border-r [border-right-style:solid] border-r-[#1d2b30] first:pl-0 [@media(width<=750px)]:first:border-r-0 [@media(width<=750px)]:first:[border-right-style:none] [@media(width<=750px)]:first:border-r-[currentColor] [@media(width<=750px)]:first:border-b [@media(width<=750px)]:first:[border-bottom-style:solid] [@media(width<=750px)]:first:border-b-[#1d2b30] last:[border-top-style:none] last:[border-right-style:none] last:[border-bottom-style:none] last:[border-left-style:none] [@media(width<=750px)]:last:pl-5.5 [@media(width<=560px)]:[&:nth-child(3)]:border-l-0 [@media(width<=560px)]:[&:nth-child(3)]:[border-left-style:none] [@media(width<=560px)]:[&:nth-child(3)]:border-l-[currentColor] [@media(width<=750px)]:py-[1.4375rem] py-6.5 [@media(width<=560px)]:px-[16px] px-[24px] last:border-0 last:border-[currentColor]">
          <p className="text-[0.6875rem] tracking-[0.09em] text-[#b4c2c8] mb-[1.1875rem]">
            INDUSTRY GROWTH
          </p>
          <strong className="[@media(width<=750px)]:text-[1.5rem] text-[1.75rem] leading-[1.2] font-normal tracking-[-0.04em] text-[#c5e2e8]">
            {insights.growthRate.toFixed(1)}
            <span className="text-[1.5rem] text-[#b4c2c8]">%</span>
          </strong>
          <span className="block mt-[0.8125rem] text-[#b4c2c8] text-[0.75rem]">
            Estimated annual growth
          </span>
        </div>
        <div className="market-stat border-r [border-right-style:solid] border-r-[#1d2b30] first:pl-0 [@media(width<=750px)]:first:border-r-0 [@media(width<=750px)]:first:[border-right-style:none] [@media(width<=750px)]:first:border-r-[currentColor] [@media(width<=750px)]:first:border-b [@media(width<=750px)]:first:[border-bottom-style:solid] [@media(width<=750px)]:first:border-b-[#1d2b30] last:[border-top-style:none] last:[border-right-style:none] last:[border-bottom-style:none] last:[border-left-style:none] [@media(width<=750px)]:last:pl-5.5 [@media(width<=560px)]:[&:nth-child(3)]:border-l-0 [@media(width<=560px)]:[&:nth-child(3)]:[border-left-style:none] [@media(width<=560px)]:[&:nth-child(3)]:border-l-[currentColor] [@media(width<=750px)]:py-[1.4375rem] py-6.5 [@media(width<=560px)]:px-[16px] px-[24px] last:border-0 last:border-[currentColor]">
          <p className="text-[0.6875rem] tracking-[0.09em] text-[#b4c2c8] mb-[1.1875rem]">
            HIRING DEMAND
          </p>
          <strong className="[@media(width<=750px)]:text-[1.5rem] text-[1.75rem] leading-[1.2] font-normal tracking-[-0.04em] text-[#c5e2e8]">
            {insights.demandLevel}
          </strong>
          <div className="demand-scale flex mt-2.5 gap-1" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <span
                className="w-6.5 h-1 bg-[#1d2b30] bg-none data-[active=true]:bg-primary data-[active=true]:bg-none"
                key={i}
                data-active={
                  i < { Low: 1, Medium: 2, High: 3 }[insights.demandLevel]
                }
              />
            ))}
          </div>
          <span className="block mt-[0.8125rem] text-[#b4c2c8] text-[0.75rem]">
            Industry demand level
          </span>
        </div>
      </section>
      <p className="data-note text-[0.75rem] text-muted-foreground leading-[1.7] -mt-3.5">
        AI-generated estimates, refreshed weekly. Use these as a starting point
        for your own market research.
      </p>

      <section
        id="market-skills"
        className="market-skills-section pt-[0.3125rem] pb-[2.1875rem] border-b [border-bottom-style:solid] border-b-[var(--border)]"
      >
        <div>
          <div className="data-section-heading flex flex-wrap [align-items:end] justify-between mt-6 mb-5 gap-5">
            <div>
              <h2 className="[@media(width<=560px)]:text-[18px] text-[22px] font-normal tracking-[-0.045em] leading-[1.2]">
                What matters in your field.
              </h2>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-7 mb-6">
            Explore the connections between today’s in-demand skills and areas
            to develop next.
          </p>
        </div>
        <div className="skill-landscape grid [@media(width<=750px)]:grid-cols-1 grid-cols-[1fr_2.1875rem_1fr] items-stretch bg-[#12252d] bg-none border-[#355460] rounded-[8px] [@media(width<=750px)]:gap-[0.9375rem] gap-4">
          <div className="skill-column bg-[#131e22] bg-none [border-top-style:solid] [border-right-style:solid] [border-bottom-style:solid] [border-left-style:solid] [@media(width<=1150px)]:p-5 p-6 border border-[#35474f] rounded-[0.3125rem]">
            <h3 className="flex items-center [@media(width<=1150px)]:text-[0.875rem] text-[1rem] mb-6 gap-2.5">
              In demand now{" "}
              <span className="last:ml-auto last:text-[0.6875rem] last:text-[#91a5ad] [@media(width<=1150px)]:last:hidden">
                {insights.topSkills.length} skills
              </span>
            </h3>
            <div className="skill-tags flex flex-wrap gap-[0.5625rem]">
              {insights.topSkills.map((skill, i) => (
                <span
                  className="inline-block text-[0.75rem] bg-[#131e22] bg-none text-[#b4c2c8] border-l-[2px] [border-left-style:solid] border-l-[#91a5ad] rounded-tl-[0] rounded-tr-[3px] rounded-br-[3px] rounded-bl-[0] wrap-anywhere py-2 px-[0.6875rem]"
                  key={i}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div
            className="skill-bridge self-center text-[#91a5ad] [@media(width<=750px)]:[transform:rotate(90deg)] [@media(width<=750px)]:justify-self-center"
            aria-hidden="true"
          >
            <ArrowRight />
          </div>
          <div className="skill-column skill-future bg-[#0c1215] bg-none [border-top-style:dashed] [border-right-style:dashed] [border-bottom-style:dashed] [border-left-style:dashed] [@media(width<=1150px)]:p-5 p-6 border border-[#35474f] rounded-[0.3125rem]">
            <h3 className="flex items-center [@media(width<=1150px)]:text-[0.875rem] text-[1rem] mb-6 gap-2.5">
              Worth exploring{" "}
              <span className="last:ml-auto last:text-[0.6875rem] last:text-[#91a5ad] [@media(width<=1150px)]:last:hidden">
                {insights.recommendedSkills.length} skills
              </span>
            </h3>
            <div className="skill-tags flex flex-wrap gap-[0.5625rem]">
              {insights.recommendedSkills.map((skill, i) => (
                <span
                  className="inline-block text-[0.75rem] bg-[#131e22] bg-none text-[#b4c2c8] border-l-[2px] [border-left-style:solid] rounded-tl-[0] rounded-tr-[3px] rounded-br-[3px] rounded-bl-[0] wrap-anywhere py-2 px-[0.6875rem] border-[#6b838d]"
                  key={i}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
        <Link
          href="/interview"
          className="text-link mt-6 inline-flex items-center text-[0.875rem] font-medium [text-underline-offset:0.3em] [&_svg]:transition-[transform] [&_svg]:[transition-duration:0.2s] [&_svg]:[transition-timing-function:ease] [&_svg]:delay-0 hover:text-primary hover:[text-decoration:underline] [&:hover_svg]:[transform:translate(2px,_-2px)] [.intro-aside_&]:mt-2 [.story-copy_>_&]:mt-7.5 [.story-copy_>_&]:pb-[0.5625rem] [.story-copy_>_&]:border-b [.story-copy_>_&]:[border-bottom-style:solid] [.story-copy_>_&]:border-b-[#35474f] [@media(width<=560px)]:[.hero-actions_&]:text-[0.75rem] gap-3"
        >
          See where your knowledge stands
        </Link>
      </section>

      <section className="salary-section border-b [border-bottom-style:solid] border-b-[var(--border)] pb-7">
        <div className="data-section-heading flex flex-wrap [align-items:end] justify-between mt-6 gap-5">
          <div>
            <h2 className="[@media(width<=560px)]:text-[18px] text-[22px] font-normal tracking-[-0.045em] leading-[1.2]">
              Salary, in context.
            </h2>
          </div>
          <span className="text-[0.6875rem] text-muted-foreground">
            Annual salary · USD, thousands
          </span>
        </div>
        <div className="chart-legend flex flex-wrap mt-[1.5625rem] mb-2 text-[0.75rem] text-[#b4c2c8] mx-0 gap-5">
          <span className="flex items-center gap-2">
            <i
              className="w-[0.5625rem] h-[0.5625rem] rounded-[2px]"
              style={{ background: salaryColors.min }}
            />{" "}
            Minimum
          </span>
          <span className="flex items-center gap-2">
            <i
              className="w-[0.5625rem] h-[0.5625rem] rounded-[2px]"
              style={{ background: salaryColors.median }}
            />{" "}
            Median
          </span>
          <span className="flex items-center gap-2">
            <i
              className="w-[0.5625rem] h-[0.5625rem] rounded-[2px]"
              style={{ background: salaryColors.max }}
            />{" "}
            Maximum
          </span>
        </div>
        {salaryData.length ? (
          <div
            className="salary-chart"
            style={{
              height: Math.max(250, salaryData.length * (mobile ? 68 : 58)),
            }}
          >
            <ResponsiveContainer
              className="[&_.recharts-cartesian-grid_line]:[stroke:#1d2b30] [&_.recharts-text]:[fill:#b4c2c8] [&_.recharts-text]:text-[0.75rem]"
              width="100%"
              height="100%"
            >
              <BarChart
                data={salaryData}
                layout="vertical"
                margin={{ left: 0, right: 15, top: 15, bottom: 15 }}
                barCategoryGap="22%"
              >
                <CartesianGrid horizontal={false} strokeDasharray="3 5" />
                <XAxis type="number" tickFormatter={(v) => "$" + v + "k"} />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={mobile ? 100 : 175}
                  tick={{ fontSize: mobile ? 10 : 12 }}
                />
                <Tooltip
                  cursor={{ fill: "#70b7c208" }}
                  content={({ active, payload, label }) =>
                    active && payload?.length ? (
                      <div className="chart-tooltip bg-[#0c1215] bg-none [border-top-style:solid] [border-right-style:solid] [border-bottom-style:solid] [border-left-style:solid] text-[0.75rem] leading-[1.8] py-3.5 px-[1.0625rem] border border-[#6b838d] rounded-[0.25rem]">
                        <strong>{label}</strong>
                        {payload.map((p) => (
                          <p key={String(p.dataKey)}>
                            {p.name}: ${Number(p.value).toLocaleString("en-US")}
                            k
                          </p>
                        ))}
                      </div>
                    ) : null
                  }
                />
                <Bar
                  isAnimationActive={false}
                  dataKey="min"
                  name="Minimum"
                  fill={salaryColors.min}
                  radius={[0, 2, 2, 0]}
                />
                <Bar
                  isAnimationActive={false}
                  dataKey="median"
                  name="Median"
                  fill={salaryColors.median}
                  radius={[0, 2, 2, 0]}
                />
                <Bar
                  isAnimationActive={false}
                  dataKey="max"
                  name="Maximum"
                  fill={salaryColors.max}
                  radius={[0, 2, 2, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="empty-note text-center [border-top-style:dashed] [border-right-style:dashed] [border-bottom-style:dashed] [border-left-style:dashed] mt-[1.5625rem] py-10 px-[1.5625rem] border border-[#35474f] rounded-[0.3125rem]">
            No salary ranges are available yet.
          </p>
        )}
        <details className="data-table-disclosure mt-4.5 text-[0.75rem] text-[#81bbd4]">
          <summary className="[cursor:pointer] py-3 px-0">
            View all salary figures and locations
          </summary>
          <div className="table-scroll overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <caption className="sr-only">
                Annual salary estimates in US dollars
              </caption>
              <thead className="text-primary bg-[#0c1215] bg-none">
                <tr>
                  <th
                    className="text-[0.75rem] border-b [border-bottom-style:solid] border-b-[var(--border)] whitespace-nowrap font-medium py-[0.8125rem] px-3"
                    scope="col"
                  >
                    Role
                  </th>
                  <th
                    className="text-[0.75rem] border-b [border-bottom-style:solid] border-b-[var(--border)] whitespace-nowrap font-medium py-[0.8125rem] px-3"
                    scope="col"
                  >
                    Minimum
                  </th>
                  <th
                    className="text-[0.75rem] border-b [border-bottom-style:solid] border-b-[var(--border)] whitespace-nowrap font-medium py-[0.8125rem] px-3"
                    scope="col"
                  >
                    Median
                  </th>
                  <th
                    className="text-[0.75rem] border-b [border-bottom-style:solid] border-b-[var(--border)] whitespace-nowrap font-medium py-[0.8125rem] px-3"
                    scope="col"
                  >
                    Maximum
                  </th>
                  <th
                    className="text-[0.75rem] border-b [border-bottom-style:solid] border-b-[var(--border)] whitespace-nowrap font-medium py-[0.8125rem] px-3"
                    scope="col"
                  >
                    Location
                  </th>
                </tr>
              </thead>
              <tbody>
                {ranges.map((r, i) => (
                  <tr key={i}>
                    <th
                      className="text-[0.75rem] border-b [border-bottom-style:solid] border-b-[var(--border)] whitespace-nowrap font-medium py-[0.8125rem] px-3"
                      scope="row"
                    >
                      {r.role}
                    </th>
                    <td className="text-[0.75rem] border-b [border-bottom-style:solid] border-b-[var(--border)] whitespace-nowrap py-[0.8125rem] px-3">
                      ${r.min.toLocaleString("en-US")}
                    </td>
                    <td className="text-[0.75rem] border-b [border-bottom-style:solid] border-b-[var(--border)] whitespace-nowrap py-[0.8125rem] px-3">
                      ${r.median.toLocaleString("en-US")}
                    </td>
                    <td className="text-[0.75rem] border-b [border-bottom-style:solid] border-b-[var(--border)] whitespace-nowrap py-[0.8125rem] px-3">
                      ${r.max.toLocaleString("en-US")}
                    </td>
                    <td className="text-[0.75rem] border-b [border-bottom-style:solid] border-b-[var(--border)] whitespace-nowrap py-[0.8125rem] px-3">
                      {r.location || "Not specified"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </section>

      <section className="industry-trends [&_svg]:shrink-0 [&_svg]:text-[#6b838d] [&_svg]:ml-auto [&_svg]:mt-[3px]">
        <div className="data-section-heading flex flex-wrap [align-items:end] justify-between mt-6 gap-5">
          <div>
            <h2 className="[@media(width<=560px)]:text-[18px] text-[22px] font-normal tracking-[-0.045em] leading-[1.2]">
              What’s shaping your industry.
            </h2>
          </div>
        </div>
        <ol className="mt-6 grid [@media(width<=750px)]:grid-cols-1 grid-cols-[1fr_1fr] gap-x-10">
          {insights.keyTrends.map((trend, i) => (
            <li
              className="flex border-t [border-top-style:solid] border-t-[var(--border)] [align-items:start] py-5 px-0 gap-4"
              key={i}
            >
              <span className="text-[#91a5ad] text-[0.6875rem] mt-[3px]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-[0.8125rem] leading-[1.8] text-[#b4c2c8]">
                {trend}
              </p>
            </li>
          ))}
        </ol>
      </section>
      <div className="workspace-next flex flex-wrap items-center bg-transparent [background-image:linear-gradient(115deg,_#1a3b47,_#112630)] [border-top-style:solid] [border-right-style:solid] [border-bottom-style:solid] [border-left-style:solid] mt-3.5 [@media(width<=750px)]:p-[1.4375rem] p-5.5 rounded-[14px] gap-4.5">
        <div className="mr-auto [@media(width<=750px)]:w-full">
          <h3 className="text-[1rem] tracking-[-0.03em]">
            Make your experience count.
          </h3>
        </div>
        <Button
          className="[@media(width<=480px)]:data-[slot=button]:text-[0.75rem]"
          asChild
          variant="outline"
        >
          <Link href="/resume">Build your resume</Link>
        </Button>
        <Button
          className="[@media(width<=480px)]:data-[slot=button]:text-[0.75rem]"
          asChild
          variant="outline"
        >
          <Link href="/ai-cover-letter">Tailor your introduction</Link>
        </Button>
      </div>
    </div>
  );
};

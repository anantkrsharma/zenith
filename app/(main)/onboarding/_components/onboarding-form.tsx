"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema } from "@/lib/form-schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { updateUser } from "@/actions/user";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Controller } from "react-hook-form";

interface OnboardingFormProps {
  industries: {
    id: string;
    name: string;
    subIndustries: string[];
  }[];
}

type OnboardingSchemaType = z.infer<typeof onboardingSchema>;

interface Industry {
  id: string;
  name: string;
  subIndustries: string[];
}

export const OnboardingForm = ({ industries }: OnboardingFormProps) => {
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(
    null,
  );
  const router = useRouter();

  const { fn: onboardUserFn, loading: onboardLoading } =
    useFetch<Awaited<ReturnType<typeof updateUser>>>();

  const {
    control,
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm({
    resolver: zodResolver(onboardingSchema),
  });

  const watchIndustry = useWatch({ control, name: "industry" });
  const identity = useWatch({ control });
  const identitySkills = (identity.skills || "")
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

  const onSubmit = async (values: OnboardingSchemaType) => {
    try {
      const formattedIndustry = `${values.industry}-${values.subIndustry.toLowerCase().replace(/ /g, "-")}`;

      const result = await onboardUserFn(updateUser, {
        ...values,
        bio: values.bio ?? "",
        skills: values.skills ?? [],
        industry: formattedIndustry,
      });
      if (result) {
        toast.success("Profile updated successfully");
        router.push("/dashboard");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error while onboarding the user");
      } else {
        toast.error("An unknown error occured. Please try again later.");
      }
    }
  };

  return (
    <div className="identity-onboarding grid [@media(width<=750px)]:grid-cols-1 grid-cols-[1fr_1fr] w-[min(68.75rem,_100%)] [align-items:start] [@media(width<=750px)]:max-w-140 m-auto [@media(width<=750px)]:gap-[2.1875rem] [@media(750px<width<=1150px)]:gap-[2.8125rem] gap-22.5">
      <aside className="identity-intro [@media(width<=750px)]:pt-0 pt-5.5">
        <p className="eyebrow flex items-center text-primary [@media(width<=560px)]:text-[0.6875rem] text-[0.75rem] leading-[1.6] tracking-[0.12em] font-medium [.landing-stories_&]:mb-[1.5625rem] [.landing-stories_&]:text-[0.6875rem] [.story-documents_&]:text-[#8eafb8] [.workspace-sidebar_>_&]:text-[0.6875rem] [.workspace-sidebar_>_&]:text-[#91a5ad] [.workspace-sidebar_>_&]:pl-3 [@media(width<=850px)]:[.workspace-sidebar_>_&]:hidden [&:not(.eyebrow)]:text-[1rem] [&:not(.eyebrow)]:leading-[1.9] [&:not(.eyebrow)]:text-[#b4c2c8] [@media(width<=750px)]:[&:not(.eyebrow)]:max-w-[none] [&:not(.eyebrow)]:max-w-[23.4375rem] gap-2.5">
          01 / YOUR STARTING POINT
        </p>
        <h1 className="[@media(width<=750px)]:text-[2.625rem] [@media(750px<width<=1150px)]:text-[2.875rem] text-[3.3125rem] font-normal leading-[1.1] tracking-[-0.06em] my-[1.5625rem]">
          Every direction
          <br />
          begins with <span className="text-primary">you.</span>
        </h1>
        <p className="text-[1rem] leading-[1.9] text-[#b4c2c8] [@media(width<=750px)]:max-w-[none] max-w-[23.4375rem]">
          A few details connect your experience to useful guidance. Let’s get to
          know your professional world.
        </p>
        <div className="identity-map [@media(width<=750px)]:mt-[1.5625rem] mt-10 bg-[#101c21] bg-none [border-top-style:solid] [border-right-style:solid] [border-bottom-style:solid] [border-left-style:solid] p-[1.5625rem] border border-[#35474f] rounded-[0.3125rem]">
          <div className="identity-map-title flex items-center text-[0.6875rem] text-[#b4c2c8] tracking-[0.1em] mb-[0.9375rem] gap-[0.5625rem]">
            YOUR PROFESSIONAL PROFILE
          </div>
          <div
            className="identity-line flex items-center border-b [border-bottom-style:solid] [@media(width<=750px)]:py-[0.9375rem] py-5 border-[#365865] gap-[1.0625rem]"
            data-filled={!!identity.industry}
          >
            <span className="text-[#91a5ad] text-[0.75rem] [border-top-style:solid] [border-right-style:solid] [border-bottom-style:solid] [border-left-style:solid] w-7 h-7 grid place-items-center [.identity-line[data-filled='true']_>_&]:text-[#ceebee] [.identity-line[data-filled='true']_>_&]:bg-[#28505c] [.identity-line[data-filled='true']_>_&]:bg-none border border-[#35474f] [.identity-line[data-filled='true']_>_&]:border-[#76a6b4] rounded-[3px]">
              01
            </span>
            <div>
              <small className="block text-[0.6875rem] tracking-[0.1em] text-[#91a5ad] mb-2">
                YOUR LANDSCAPE
              </small>
              <strong className="text-[0.9375rem] font-normal">
                {selectedIndustry?.name || "Your industry"}
              </strong>
            </div>
          </div>
          <div
            className="identity-line flex items-center border-b [border-bottom-style:solid] [@media(width<=750px)]:py-[0.9375rem] py-5 border-[#365865] gap-[1.0625rem]"
            data-filled={!!identity.subIndustry}
          >
            <span className="text-[#91a5ad] text-[0.75rem] [border-top-style:solid] [border-right-style:solid] [border-bottom-style:solid] [border-left-style:solid] w-7 h-7 grid place-items-center [.identity-line[data-filled='true']_>_&]:text-[#ceebee] [.identity-line[data-filled='true']_>_&]:bg-[#28505c] [.identity-line[data-filled='true']_>_&]:bg-none border border-[#35474f] [.identity-line[data-filled='true']_>_&]:border-[#76a6b4] rounded-[3px]">
              02
            </span>
            <div>
              <small className="block text-[0.6875rem] tracking-[0.1em] text-[#91a5ad] mb-2">
                YOUR SPECIALIZATION
              </small>
              <strong className="text-[0.9375rem] font-normal">
                {identity.subIndustry || "Your area of focus"}
              </strong>
            </div>
          </div>
          <div
            className="identity-line flex items-center border-b [border-bottom-style:solid] [@media(width<=750px)]:py-[0.9375rem] py-5 border-[#365865] gap-[1.0625rem]"
            data-filled={
              identity.experience !== undefined && identity.experience !== ""
            }
          >
            <span className="text-[#91a5ad] text-[0.75rem] [border-top-style:solid] [border-right-style:solid] [border-bottom-style:solid] [border-left-style:solid] w-7 h-7 grid place-items-center [.identity-line[data-filled='true']_>_&]:text-[#ceebee] [.identity-line[data-filled='true']_>_&]:bg-[#28505c] [.identity-line[data-filled='true']_>_&]:bg-none border border-[#35474f] [.identity-line[data-filled='true']_>_&]:border-[#76a6b4] rounded-[3px]">
              03
            </span>
            <div>
              <small className="block text-[0.6875rem] tracking-[0.1em] text-[#91a5ad] mb-2">
                YOUR EXPERIENCE
              </small>
              <strong className="text-[0.9375rem] font-normal">
                {identity.experience !== undefined && identity.experience !== ""
                  ? `${identity.experience} years of experience`
                  : "Your journey so far"}
              </strong>
            </div>
          </div>
          <div className="identity-skills pt-5.5">
            <small className="block text-[0.6875rem] tracking-[0.1em] text-[#91a5ad] mb-2">
              YOUR SKILLS
            </small>
            <div className="flex flex-wrap gap-[0.4375rem]">
              {identitySkills.length ? (
                identitySkills.map((skill, index) => (
                  <span
                    className="text-[0.75rem] [border-top-style:solid] [border-right-style:solid] [border-bottom-style:solid] [border-left-style:solid] text-[#70b7c2] bg-[#70b7c209] bg-none wrap-anywhere py-[0.4375rem] px-[0.5625rem] border border-[#6b838d] rounded-[3px]"
                    key={index}
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-[0.75rem] text-[#91a5ad]">
                  The skills you add will connect here.
                </p>
              )}
            </div>
          </div>
        </div>
        <p className="identity-note text-[0.75rem]! leading-[1.9] text-[#b4c2c8] [@media(width<=750px)]:max-w-[none] max-w-[23.4375rem] mt-[1.4375rem] [@media(width<=750px)]:hidden">
          Your profile shapes your insights, practice questions, and cover
          letters.
        </p>
      </aside>
      <Card className="identity-form pt-2.5 bg-transparent [background-image:linear-gradient(135deg,_#192f3a,_#101f28)] [box-shadow:0_24px_60px_#0003] border-[#446370] rounded-[10px]">
        <CardHeader>
          <CardTitle className="gradient-title text-2xl text-foreground font-normal tracking-[-0.045em]">
            Let’s connect the pieces.
          </CardTitle>
          <CardDescription>
            Select your industry to get personalised career insights and
            recommendations.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            action=""
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Industry */}
            <div className="space-y-2 [@media(width<=560px)]:[.workspace-page_form_>_&]:p-[1.0625rem]">
              <Label
                className="data-[slot=label]:text-[14px] data-[slot=label]:text-[#b7cdd6]"
                htmlFor="industry"
              >
                * Industry
              </Label>
              <Controller
                control={control}
                name="industry"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(val) => {
                      field.onChange(val);
                      setSelectedIndustry(
                        industries.find((ind) => ind.id === val) || null,
                      );
                      setValue("subIndustry", "");
                    }}
                  >
                    <SelectTrigger
                      id="industry"
                      className="w-full cursor-pointer"
                    >
                      <SelectValue placeholder="Select an Industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((ind) => (
                        <SelectItem
                          value={ind.id}
                          key={ind.id}
                          className="cursor-pointer"
                        >
                          {ind.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.industry && (
                <p className="text-red-500 text-xs md:text-sm">
                  {errors.industry.message}
                </p>
              )}
            </div>

            {/* Sub-Industry (Specialization) */}
            {selectedIndustry && watchIndustry && (
              <div className="space-y-2 [@media(width<=560px)]:[.workspace-page_form_>_&]:p-[1.0625rem]">
                <Label
                  className="data-[slot=label]:text-[14px] data-[slot=label]:text-[#b7cdd6]"
                  htmlFor="sub-industry"
                >
                  * Specialization
                </Label>
                <Controller
                  control={control}
                  name="subIndustry"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="sub-industry"
                        className="w-full cursor-pointer"
                      >
                        <SelectValue placeholder="Select a Sub-Industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedIndustry.subIndustries.map((subInd) => (
                          <SelectItem
                            value={subInd}
                            key={subInd}
                            className="cursor-pointer"
                          >
                            {subInd}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.subIndustry && (
                  <p className="text-red-500 text-xs md:text-sm">
                    {errors.subIndustry.message}
                  </p>
                )}
              </div>
            )}

            {/* YOE */}
            <div className="space-y-2 [@media(width<=560px)]:[.workspace-page_form_>_&]:p-[1.0625rem]">
              <Label
                className="data-[slot=label]:text-[14px] data-[slot=label]:text-[#b7cdd6]"
                htmlFor="experience"
              >
                Years of Experience
              </Label>
              <Input
                className="[@media(width<=560px)]:text-[16px] data-[slot=input]:text-[16px] data-[slot=input]:bg-[#0a171d] data-[slot=input]:bg-none data-[slot=input]:min-h-[44px] data-[slot=input]:transition-[border-color,_box-shadow] data-[slot=input]:[transition-duration:0.2s,_0.2s] data-[slot=input]:[transition-timing-function:ease,_ease] data-[slot=input]:[transition-delay:0s,_0s] data-[slot=input]:border-[#3c5967] data-[slot=input]:rounded-[6px]"
                id="experience"
                type="number"
                min={0}
                max={50}
                placeholder="Years of Experience"
                {...register("experience", {
                  required: "Please enter your years of experience",
                })}
              />
              {errors.experience && (
                <p className="text-red-500 text-xs md:text-sm">
                  Enter valid years of experience (0 - 50)
                </p>
              )}
            </div>

            {/* Skills */}
            <div className="space-y-2 [@media(width<=560px)]:[.workspace-page_form_>_&]:p-[1.0625rem]">
              <Label
                className="data-[slot=label]:text-[14px] data-[slot=label]:text-[#b7cdd6]"
                htmlFor="skills"
              >
                Skills
              </Label>
              <Input
                className="[@media(width<=560px)]:text-[16px] data-[slot=input]:text-[16px] data-[slot=input]:bg-[#0a171d] data-[slot=input]:bg-none data-[slot=input]:min-h-[44px] data-[slot=input]:transition-[border-color,_box-shadow] data-[slot=input]:[transition-duration:0.2s,_0.2s] data-[slot=input]:[transition-timing-function:ease,_ease] data-[slot=input]:[transition-delay:0s,_0s] data-[slot=input]:border-[#3c5967] data-[slot=input]:rounded-[6px]"
                id="skills"
                type="text"
                placeholder="e.g. React, Node.js, Python"
                {...register("skills", {
                  required: "Please enter your skills",
                })}
              />
              <p className="text-sm text-muted-foreground">
                Separate multiple skills with commas (,)
              </p>
              {errors.skills && (
                <p className="text-red-500 text-xs md:text-sm">
                  {errors.skills.message}
                </p>
              )}
            </div>

            {/* Bio */}
            <div className="space-y-2 [@media(width<=560px)]:[.workspace-page_form_>_&]:p-[1.0625rem]">
              <Label
                className="data-[slot=label]:text-[14px] data-[slot=label]:text-[#b7cdd6]"
                htmlFor="bio"
              >
                Bio
              </Label>
              <Controller
                control={control}
                name="bio"
                render={({ field }) => (
                  <Textarea
                    {...field}
                    id="bio"
                    placeholder="Tell us about your professional background and interests."
                    className="resize-none [@media(width<=560px)]:text-[16px] data-[slot=textarea]:text-[16px] data-[slot=textarea]:bg-[#0a171d] data-[slot=textarea]:bg-none data-[slot=textarea]:min-h-[44px] data-[slot=textarea]:transition-[border-color,_box-shadow] data-[slot=textarea]:[transition-duration:0.2s,_0.2s] data-[slot=textarea]:[transition-timing-function:ease,_ease] data-[slot=textarea]:[transition-delay:0s,_0s] data-[slot=textarea]:border-[#3c5967] data-[slot=textarea]:rounded-[6px]"
                  />
                )}
              />
              {errors.bio && (
                <p className="text-red-500 text-xs md:text-sm">
                  {errors.bio.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={onboardLoading}
            >
              {onboardLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Complete Profile"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

"use client";

import { PageHeading } from "@/components/page-heading";
import { createCoverLetter } from "@/actions/cover-letter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hooks/use-fetch";
import { coverLetterSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { motion } from "motion/react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const NewCover = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(coverLetterSchema),
    defaultValues: {
      jobTitle: "",
      companyName: "",
      jobDescription: "",
    },
  });

  const { loading: newLetterLoading, fn: newLetterFn } =
    useFetch<Awaited<ReturnType<typeof createCoverLetter>>>();
  const letterContext = useWatch({ control });

  const onSubmit = async (data: z.infer<typeof coverLetterSchema>) => {
    try {
      const result = await newLetterFn(createCoverLetter, data);
      if (result) {
        toast.success("Cover letter created successfully");
        router.push(`/ai-cover-letter/${result.id}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error while creating cover letter");
        console.error("Error while creating cover letter" + error.message);
      } else {
        toast.error("Error while creating cover letter");
        console.error("Error while creating cover letter" + error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Link href={"/ai-cover-letter"}>
          <Button
            variant={"outline"}
            className="flex items-center pl-0 gap-2 border bg-neutral-950 border-zinc-700 hover:bg-black hover:border-zinc-500 cursor-pointer hover:no-underline transition-colors duration-75 ease-in-out"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </Link>
        <PageHeading
          className="mt-6"
          title="A letter with your name on it."
          description="Tell us about the opportunity. We’ll help you connect your experience to the role."
        />
      </div>

      <motion.div
        className="letter-composer grid [@media(width<=1150px)]:grid-cols-1 grid-cols-[1.15fr_0.85fr] [align-items:start] gap-7.5"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.33, ease: [0.4, 0, 0.2, 1] }}
      >
        <Card className="bg-card letter-input-panel pt-6.5">
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 flex flex-col [@media(width<=560px)]:[.workspace-page_form_>_&]:p-[1.0625rem]">
                  <Label htmlFor="job-title">* Job Title</Label>
                  <Input
                    {...register("jobTitle")}
                    id="job-title"
                    placeholder="e.g. Software Engineer"
                    className="bg-background"
                  />
                  {errors.jobTitle && (
                    <p className="text-xs sm:text-sm text-red-500">
                      {errors.jobTitle.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2 flex flex-col [@media(width<=560px)]:[.workspace-page_form_>_&]:p-[1.0625rem]">
                  <Label htmlFor="company-name">* Company Name</Label>
                  <Input
                    {...register("companyName")}
                    id="company-name"
                    placeholder="e.g. Google"
                    className="bg-background"
                  />
                  {errors.companyName && (
                    <p className="text-xs sm:text-sm text-red-500">
                      {errors.companyName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2 [@media(width<=560px)]:[.workspace-page_form_>_&]:p-[1.0625rem]">
                <Label htmlFor="job-desc">Job Description</Label>
                <Controller
                  control={control}
                  name="jobDescription"
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      id="job-desc"
                      placeholder="Tell us more about your job role."
                      className="min-h-48 bg-background"
                    />
                  )}
                />
                {errors.jobDescription && (
                  <p className="text-xs sm:text-sm text-red-500">
                    {errors.jobDescription.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                variant={"outline"}
                size={"lg"}
                className="text-md flex items-center bg-primary text-primary-foreground border-primary cursor-pointer hover:bg-primary/90 hover:border-primary transition-colors duration-200"
                disabled={newLetterLoading}
              >
                {newLetterLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>Create cover letter</>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        <aside className="letter-context-panel [border-top-style:solid] [border-right-style:solid] [border-bottom-style:solid] [border-left-style:solid] bg-transparent [background-image:radial-gradient(ellipse_at_90%_5%,_#21414f,_#11242d_85%)] [@media(width<=480px)]:block [@media(480px<width<=1150px)]:grid [@media(width<=1150px)]:grid-cols-[1fr_1fr] [@media(width<=1150px)]:gap-y-0 [@media(width<=1150px)]:gap-x-6 [@media(width<=480px)]:p-6 p-7 border border-[#3e6170] rounded-[9px]">
          <p className="eyebrow flex items-center text-primary text-[0.6875rem] leading-[1.6] tracking-[0.12em] font-medium [@media(width<=1150px)]:[grid-column:span_2] [.landing-stories_&]:mb-[1.5625rem] [.story-documents_&]:text-[#8eafb8] [.workspace-sidebar_>_&]:text-[#91a5ad] [.workspace-sidebar_>_&]:pl-3 [@media(width<=850px)]:[.workspace-sidebar_>_&]:hidden [@media(width<=1150px)]:last:[grid-column:span_2] gap-2.5">
            A THOUGHTFUL CONNECTION
          </p>
          <h2 className="text-[1.9375rem] tracking-[-0.04em] leading-[1.2] mt-5 mb-7.5 [@media(width<=1150px)]:[grid-column:span_2] mx-0">
            Your story.
            <br />
            Their next chapter.
          </h2>
          <div className="letter-context-step flex border-t [border-top-style:solid] py-5.5 border-[#426370] gap-[1.0625rem]">
            <span className="text-[0.6875rem] text-[#b4c2c8] mt-[3px]">01</span>
            <div>
              <small className="block text-[0.6875rem] tracking-[0.09em] text-[#b4c2c8] mb-[0.5625rem]">
                THE STARTING POINT
              </small>
              <strong className="block text-[1rem] font-normal wrap-anywhere">
                Your professional experience
              </strong>
              <p className="text-[1rem] text-[#b4c2c8] leading-[1.8] mt-2">
                From the profile you shared with Zenith.
              </p>
            </div>
          </div>
          <div className="letter-context-step flex border-t [border-top-style:solid] py-5.5 border-[#426370] gap-[1.0625rem]">
            <span className="text-[0.6875rem] text-[#b4c2c8] mt-[3px]">02</span>
            <div>
              <small className="block text-[0.6875rem] tracking-[0.09em] text-[#b4c2c8] mb-[0.5625rem]">
                THE OPPORTUNITY
              </small>
              <strong className="block text-[1rem] font-normal wrap-anywhere">
                {letterContext.jobTitle || "Your target role"}
              </strong>
              <p className="text-[1rem] text-[#b4c2c8] leading-[1.8] mt-2">
                {letterContext.companyName || "The company you want to join"}
              </p>
            </div>
          </div>
          <div className="letter-context-step flex border-t [border-top-style:solid] py-5.5 border-[#426370] gap-[1.0625rem]">
            <span className="text-[0.6875rem] text-[#b4c2c8] mt-[3px]">03</span>
            <div>
              <small className="block text-[0.6875rem] tracking-[0.09em] text-[#b4c2c8] mb-[0.5625rem]">
                THE CONNECTION
              </small>
              <strong className="block text-[1rem] font-normal wrap-anywhere">
                A tailored introduction
              </strong>
              <p className="text-[1rem] text-[#b4c2c8] leading-[1.8] mt-2">
                {letterContext.jobDescription
                  ? "Your job context helps connect the right experience to this role."
                  : "Add the job description to give your letter a clear focus."}
              </p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-6 mt-8 [@media(width<=1150px)]:last:[grid-column:span_2]">
            Your letter is saved after generation. Review it, then download a
            PDF when you’re ready.
          </p>
        </aside>
      </motion.div>
    </div>
  );
};

export default NewCover;

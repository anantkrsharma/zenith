"use client";

import { PageHeading } from "@/components/page-heading";
import { downloadPdf } from "@/lib/pdf";
import { resolveResumeDraft, type ResumeDraft } from "@/lib/resume-draft";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hooks/use-fetch";
import {
  educationSchema,
  projectSchema,
  resumeSchema,
  workExpSchema,
} from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Download,
  Edit,
  Loader2,
  Monitor,
  Save,
  TriangleAlert,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import ExperienceForm from "./experience-form";
import ProjectForm from "./project-form";
import EducationForm from "./education-form";
import { generateAiSummary, saveResume } from "@/actions/resume";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import rehypeRaw from "rehype-raw";
import {
  contactToMarkdown,
  workExpToMarkdown,
  projectsToMarkdown,
  educationToMarkdown,
} from "@/lib/toMarkdown";
import { useUser } from "@clerk/nextjs";
import { z } from "zod";

const ResumeBuilder = ({ initialContent }: { initialContent: string }) => {
  const [activeTab, setActiveTab] = useState<string>(
    initialContent ? "md-preview" : "form",
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedDraft, setEditedDraft] = useState<ResumeDraft | null>(null);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const { user } = useUser();

  const {
    control,
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      contactInfo: {},
      summary: "",
      skills: "",
      education: [],
      workExp: [],
      projects: [],
    },
  });

  const formValues = useWatch({ control }) as z.input<typeof resumeSchema>;

  //save resume data
  const { fn: saveResumeFn, loading: saveResumeLoading } =
    useFetch<Awaited<ReturnType<typeof saveResume>>>();

  //generate AI Professional Summary
  const {
    data: aiSummaryData,
    fn: aiSummaryFn,
    loading: aiSummaryLoading,
  } = useFetch<Awaited<ReturnType<typeof generateAiSummary>>>();

  const getMarkdownContent = React.useCallback(() => {
    const { contactInfo, skills, summary, workExp, projects, education } =
      formValues;
    return [
      contactToMarkdown(user?.fullName || "", contactInfo),
      summary && `## Professional Summary\n\n${summary}`,
      skills && `## Skills\n\n${skills}`,
      workExp &&
        workExpToMarkdown(
          workExp.map((exp) => ({
            ...exp,
            current: exp.current ?? false,
          })),
        ),
      projects &&
        projectsToMarkdown(
          projects.map((proj) => ({
            ...proj,
            current: proj.current ?? false,
          })),
        ),
      education &&
        educationToMarkdown(
          education.map((edu) => ({
            ...edu,
            current: edu.current ?? false,
          })),
        ),
    ]
      .filter(Boolean)
      .join("\n\n");
  }, [formValues, user?.fullName]);

  const isFormEmpty = () => {
    const { contactInfo, summary, skills, education, workExp, projects } =
      formValues || {};
    const isContactEmpty =
      !contactInfo || Object.values(contactInfo).every((v) => !v);
    const isSummaryEmpty = !summary;
    const isSkillsEmpty = !skills;
    const isEducationEmpty = !education || education.length === 0;
    const isWorkExpEmpty = !workExp || workExp.length === 0;
    const isProjectsEmpty = !projects || projects.length === 0;
    return (
      isContactEmpty &&
      isSummaryEmpty &&
      isSkillsEmpty &&
      isEducationEmpty &&
      isWorkExpEmpty &&
      isProjectsEmpty
    );
  };

  const formSource = JSON.stringify(formValues);
  const previewContent = resolveResumeDraft(
    editedDraft,
    formSource,
    initialContent && isFormEmpty() ? initialContent : getMarkdownContent(),
  );

  const handleAiSummary = async () => {
    const { summary, skills, workExp, projects, education } = formValues;
    if (!skills || skills.length === 0) {
      toast.error(
        "Please enter your skills before generating AI Professional Summary",
      );
      return;
    }
    try {
      await aiSummaryFn(generateAiSummary, {
        summary: summary ?? "",
        skills: skills,
        workExp: workExp?.map((item) => JSON.stringify(item)),
        projects: projects?.map((item) => JSON.stringify(item)),
        education: education?.map((item) => JSON.stringify(item)),
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error while generating AI Professional Summary");
        console.error(error.message);
      } else {
        toast.error("Error while generating AI Professional Summary");
        console.error(error);
      }
    }
  };

  //update summary field when aiSummaryData changes
  useEffect(() => {
    if (typeof aiSummaryData === "string" && aiSummaryData.length > 0) {
      setValue("summary", aiSummaryData, { shouldDirty: true });
      toast.success("AI Professional Summary generated successfully");
    }
  }, [aiSummaryData, setValue]);

  const onSubmit = async () => {
    try {
      const result = await saveResumeFn(saveResume, previewContent);
      if (result) {
        toast.success("Saved resume successfully");
        setActiveTab("md-preview");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error while saving the resume");
        console.error(error.message);
      } else {
        toast.error("Error while saving the resume");
        console.error(error);
      }
    }
  };

  const generatePDF = async () => {
    setIsDownloading(true);
    try {
      await downloadPdf("resume-pdf", `${user?.fullName || "My"} Resume.pdf`);

      toast.success("PDF generated successfully");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error("PDF generation error");
      } else {
        console.error("Unexpected error:", error);
        toast.error("PDF generation error");
      }
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-4 resume-studio [&_.w-md-editor-preview]:bg-[#f5f7f8] [&_.w-md-editor-preview]:bg-none [&_.w-md-editor-preview_.wmde-markdown]:[--color-canvas-default:#f5f7f8] [&_.w-md-editor-preview_.wmde-markdown]:[--color-fg-default:#131e22] [&_.w-md-editor-preview_.wmde-markdown]:[--color-border-default:#b4c2c8] [&_.w-md-editor-preview_.wmde-markdown]:[--color-accent-fg:#35474f] [&_.w-md-editor-preview_.wmde-markdown]:bg-[#f5f7f8] [&_.w-md-editor-preview_.wmde-markdown]:bg-none [&_.w-md-editor-preview_.wmde-markdown]:text-[#131e22] [@media(width<=560px)]:[&_.w-md-editor-preview]:p-5.5 [&_.w-md-editor-preview]:p-8.5">
      <PageHeading
        title="Your experience. In its best light."
        description="Build, refine, and export a resume that does your experience justice."
      >
        <div className="flex items-center space-x-2 md:space-x-4">
          <Button
            variant={"outline"}
            className="flex items-center bg-card border-input cursor-pointer hover:bg-accent hover:border-primary/40 transition-colors duration-200"
            onClick={activeTab === "form" ? handleSubmit(onSubmit) : onSubmit}
            disabled={saveResumeLoading}
          >
            {saveResumeLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save
              </>
            )}
          </Button>

          <Button
            variant={"outline"}
            className="flex items-center text-primary-foreground bg-primary border-primary cursor-pointer hover:bg-primary/90 hover:border-primary transition-colors duration-200"
            disabled={isDownloading}
            onClick={generatePDF}
          >
            {isDownloading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download />
                Download PDF
              </>
            )}
          </Button>
        </div>
      </PageHeading>

      <Tabs
        className="space-y-2 [@media(width<=560px)]:[.workspace-page_form_>_&]:p-[1.0625rem]"
        value={activeTab}
        onValueChange={(val) => setActiveTab(val)}
      >
        <TabsList className="[&>*]:cursor-pointer">
          <TabsTrigger value="form">Build your resume</TabsTrigger>
          <TabsTrigger value="md-preview">Preview & export</TabsTrigger>
        </TabsList>

        <TabsContent value="form" className="p-1">
          <div
            className="resume-section-nav flex flex-wrap pb-4.5 border-b [border-bottom-style:solid] border-b-[var(--border)] my-5 [@media(width<=480px)]:gap-1.5 gap-[0.4375rem]"
            aria-label="Resume sections"
          >
            {[
              ["contact", "Contact"],
              ["summary", "Summary"],
              ["skills", "Skills"],
              ["experience", "Experience"],
              ["projects", "Projects"],
              ["education", "Education"],
            ].map(([id, label]) => (
              <a
                className="[@media(width<=480px)]:text-[0.6875rem] text-[0.75rem] text-[#b4c2c8] [border-top-style:solid] [border-right-style:solid] [border-bottom-style:solid] [border-left-style:solid] hover:text-primary hover:bg-[#70b7c20a] hover:bg-none [@media(width<=480px)]:py-[0.4375rem] py-2 [@media(width<=480px)]:px-2 px-[0.6875rem] border border-[#35474f] rounded-[0.25rem]"
                key={id}
                href={`#resume-${id}`}
              >
                {label}
              </a>
            ))}
          </div>
          <div className="resume-composer grid [@media(width<=1000px)]:grid-cols-1 [@media(1000px<width<=1150px)]:grid-cols-[1fr_0.8fr] grid-cols-[1fr_0.86fr] [align-items:start] min-w-0 [@media(width<=1150px)]:gap-4.5 gap-[1.6875rem]">
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 min-w-0"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {/* Contact Info */}
              <div
                id="resume-contact"
                className="space-y-2 [border-top-style:solid] [border-right-style:solid] [border-bottom-style:solid] [border-left-style:solid] bg-transparent [background-image:linear-gradient(135deg,_#172a34,_#10212a)] [@media(480px<width<=1000px)]:[.resume-composer_#resume-contact_>_&]:grid-cols-[1fr_1fr] [.resume-composer_#resume-contact_>_&]:grid-cols-1 [@media(width<=560px)]:p-[19px] p-[24px] border border-[#3e5c6b] rounded-[8px] [.resume-composer_#resume-contact_>_&]:gap-4.5"
              >
                <h3 className="text-lg font-medium">Contact Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-lg bg-card [@media(480px<width<=1000px)]:[.resume-composer_#resume-contact_>_&]:grid-cols-[1fr_1fr] [.resume-composer_#resume-contact_>_&]:grid-cols-1 [.resume-composer_#resume-contact_>_&]:bg-transparent [.resume-composer_#resume-contact_>_&]:bg-none [.resume-composer_#resume-contact_>_&]:p-0 [.resume-composer_#resume-contact_>_&]:gap-4.5">
                  <div className="space-y-2 [@media(480px<width<=1000px)]:[.resume-composer_#resume-contact_>_&]:grid-cols-[1fr_1fr] [.resume-composer_#resume-contact_>_&]:grid-cols-1 [.resume-composer_#resume-contact_>_&]:bg-transparent [.resume-composer_#resume-contact_>_&]:bg-none [@media(width<=560px)]:[.workspace-page_form_>_&]:p-[1.0625rem] [.resume-composer_#resume-contact_>_&]:p-0 [.resume-composer_#resume-contact_>_&]:gap-4.5">
                    <Label htmlFor="email" className="text-sm">
                      {" "}
                      * Email{" "}
                    </Label>
                    <Input
                      {...register("contactInfo.email")}
                      id="email"
                      type="email"
                      placeholder="example@gmail.com"
                      className="bg-background"
                    />
                    {errors.contactInfo?.email && (
                      <p className="text-xs md:text-sm text-red-500">
                        {errors.contactInfo.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 [@media(480px<width<=1000px)]:[.resume-composer_#resume-contact_>_&]:grid-cols-[1fr_1fr] [.resume-composer_#resume-contact_>_&]:grid-cols-1 [.resume-composer_#resume-contact_>_&]:bg-transparent [.resume-composer_#resume-contact_>_&]:bg-none [@media(width<=560px)]:[.workspace-page_form_>_&]:p-[1.0625rem] [.resume-composer_#resume-contact_>_&]:p-0 [.resume-composer_#resume-contact_>_&]:gap-4.5">
                    <Label htmlFor="mobile" className="text-sm">
                      {" "}
                      Mobile Number{" "}
                    </Label>
                    <Input
                      {...register("contactInfo.mobile")}
                      id="mobile"
                      type="text"
                      placeholder="+1 234 567 8900"
                      className="bg-background"
                    />
                    {errors.contactInfo?.mobile && (
                      <p className="text-xs md:text-sm text-red-500">
                        {errors.contactInfo.mobile.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 [@media(480px<width<=1000px)]:[.resume-composer_#resume-contact_>_&]:grid-cols-[1fr_1fr] [.resume-composer_#resume-contact_>_&]:grid-cols-1 [.resume-composer_#resume-contact_>_&]:bg-transparent [.resume-composer_#resume-contact_>_&]:bg-none [@media(width<=560px)]:[.workspace-page_form_>_&]:p-[1.0625rem] [.resume-composer_#resume-contact_>_&]:p-0 [.resume-composer_#resume-contact_>_&]:gap-4.5">
                    <Label htmlFor="linkedin" className="text-sm">
                      {" "}
                      LinkedIn{" "}
                    </Label>
                    <Input
                      {...register("contactInfo.linkedin")}
                      id="linkedin"
                      type="url"
                      placeholder="https://www.linkedin.com/in/your-username"
                      className="bg-background"
                    />
                    {errors.contactInfo?.linkedin && (
                      <p className="text-xs md:text-sm text-red-500">
                        {errors.contactInfo.linkedin.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 [@media(480px<width<=1000px)]:[.resume-composer_#resume-contact_>_&]:grid-cols-[1fr_1fr] [.resume-composer_#resume-contact_>_&]:grid-cols-1 [.resume-composer_#resume-contact_>_&]:bg-transparent [.resume-composer_#resume-contact_>_&]:bg-none [@media(width<=560px)]:[.workspace-page_form_>_&]:p-[1.0625rem] [.resume-composer_#resume-contact_>_&]:p-0 [.resume-composer_#resume-contact_>_&]:gap-4.5">
                    <Label htmlFor="twitter" className="text-sm">
                      {" "}
                      Twitter (X){" "}
                    </Label>
                    <Input
                      {...register("contactInfo.twitter")}
                      id="twitter"
                      type="url"
                      placeholder="https://x.com/your-username"
                      className="bg-background"
                    />
                    {errors.contactInfo?.twitter && (
                      <p className="text-xs md:text-sm text-red-500">
                        {errors.contactInfo.twitter.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Professional Summary */}
              <div
                id="resume-summary"
                className="space-y-2 [border-top-style:solid] [border-right-style:solid] [border-bottom-style:solid] [border-left-style:solid] bg-transparent [background-image:linear-gradient(135deg,_#172a34,_#10212a)] [@media(480px<width<=1000px)]:[.resume-composer_#resume-contact_>_&]:grid-cols-[1fr_1fr] [.resume-composer_#resume-contact_>_&]:grid-cols-1 [@media(width<=560px)]:p-[19px] p-[24px] border border-[#3e5c6b] rounded-[8px] [.resume-composer_#resume-contact_>_&]:gap-4.5"
              >
                <Label htmlFor="summary" className="text-lg font-medium">
                  {" "}
                  Professional Summary{" "}
                </Label>
                <Controller
                  name="summary"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      id="summary"
                      className="bg-background h-24"
                      placeholder="Write an appropriate professional summary"
                    />
                  )}
                />
                {errors.summary && (
                  <p className="text-xs md:text-sm text-red-500">
                    {errors.summary.message}
                  </p>
                )}
                <Button
                  variant={"ghost"}
                  className="cursor-pointer border hover:border-primary/50 hover:bg-primary/10 transition-all duration-150 ease-in-out"
                  type="button"
                  onClick={handleAiSummary}
                  size={"sm"}
                  disabled={aiSummaryLoading || !formValues.summary}
                >
                  {aiSummaryLoading ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4" />
                      <p className="text-sm">Improving...</p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm">Improve with AI</p>
                    </>
                  )}
                </Button>
              </div>

              {/* Skills */}
              <div
                id="resume-skills"
                className="space-y-2 [border-top-style:solid] [border-right-style:solid] [border-bottom-style:solid] [border-left-style:solid] bg-transparent [background-image:linear-gradient(135deg,_#172a34,_#10212a)] [@media(480px<width<=1000px)]:[.resume-composer_#resume-contact_>_&]:grid-cols-[1fr_1fr] [.resume-composer_#resume-contact_>_&]:grid-cols-1 [@media(width<=560px)]:p-[19px] p-[24px] border border-[#3e5c6b] rounded-[8px] [.resume-composer_#resume-contact_>_&]:gap-4.5"
              >
                <Label htmlFor="skills" className="text-lg font-medium">
                  {" "}
                  * Skills{" "}
                </Label>
                <p className="text-sm text-muted-foreground ml-0.5">
                  Separate multiple skills with commas (,)
                </p>
                <Controller
                  name="skills"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      id="skills"
                      className="bg-background h-24"
                      placeholder="Enter your key skills"
                    />
                  )}
                />
                {errors.skills && (
                  <p className="text-xs md:text-sm text-red-500">
                    {errors.skills.message}
                  </p>
                )}
              </div>

              {/* Work Experience */}
              <div
                id="resume-experience"
                className="space-y-2 [border-top-style:solid] [border-right-style:solid] [border-bottom-style:solid] [border-left-style:solid] bg-transparent [background-image:linear-gradient(135deg,_#172a34,_#10212a)] [@media(480px<width<=1000px)]:[.resume-composer_#resume-contact_>_&]:grid-cols-[1fr_1fr] [.resume-composer_#resume-contact_>_&]:grid-cols-1 [@media(width<=560px)]:p-[19px] p-[24px] border border-[#3e5c6b] rounded-[8px] [.resume-composer_#resume-contact_>_&]:gap-4.5"
              >
                <h3 className="text-lg font-medium"> Work Experience </h3>
                <Controller
                  name="workExp"
                  control={control}
                  render={({ field }) => (
                    <ExperienceForm
                      entries={
                        (field.value ?? []).map((exp) => ({
                          ...exp,
                          current: exp.current ?? false,
                        })) as z.infer<typeof workExpSchema>[]
                      }
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.workExp && (
                  <p className="text-xs md:text-sm text-red-500">
                    {errors.workExp.message}
                  </p>
                )}
              </div>

              {/* Projects */}
              <div
                id="resume-projects"
                className="space-y-2 [border-top-style:solid] [border-right-style:solid] [border-bottom-style:solid] [border-left-style:solid] bg-transparent [background-image:linear-gradient(135deg,_#172a34,_#10212a)] [@media(480px<width<=1000px)]:[.resume-composer_#resume-contact_>_&]:grid-cols-[1fr_1fr] [.resume-composer_#resume-contact_>_&]:grid-cols-1 [@media(width<=560px)]:p-[19px] p-[24px] border border-[#3e5c6b] rounded-[8px] [.resume-composer_#resume-contact_>_&]:gap-4.5"
              >
                <h3 className="text-lg font-medium"> Projects </h3>
                <Controller
                  name="projects"
                  control={control}
                  render={({ field }) => (
                    <ProjectForm
                      entries={
                        (field.value ?? []).map((proj) => ({
                          ...proj,
                          current: proj.current ?? false,
                        })) as z.infer<typeof projectSchema>[]
                      }
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.projects && (
                  <p className="text-xs md:text-sm text-red-500">
                    {errors.projects.message}
                  </p>
                )}
              </div>

              {/* Education */}
              <div
                id="resume-education"
                className="space-y-2 [border-top-style:solid] [border-right-style:solid] [border-bottom-style:solid] [border-left-style:solid] bg-transparent [background-image:linear-gradient(135deg,_#172a34,_#10212a)] [@media(480px<width<=1000px)]:[.resume-composer_#resume-contact_>_&]:grid-cols-[1fr_1fr] [.resume-composer_#resume-contact_>_&]:grid-cols-1 [@media(width<=560px)]:p-[19px] p-[24px] border border-[#3e5c6b] rounded-[8px] [.resume-composer_#resume-contact_>_&]:gap-4.5"
              >
                <h3 className="text-lg font-medium"> Education </h3>
                <Controller
                  name="education"
                  control={control}
                  render={({ field }) => (
                    <EducationForm
                      entries={
                        (field.value ?? []).map((edu) => ({
                          ...edu,
                          current: edu.current ?? false,
                        })) as z.infer<typeof educationSchema>[]
                      }
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.education && (
                  <p className="text-xs md:text-sm text-red-500">
                    {errors.education.message}
                  </p>
                )}
              </div>
            </motion.form>
            <aside className="resume-live-preview [@media(width<=1000px)]:static sticky top-[6.5625rem] grid bg-transparent [background-image:radial-gradient(ellipse_at_50%_0,_#203d4a,_#0e2029)] [border-top-style:solid] [border-right-style:solid] [border-bottom-style:solid] [border-left-style:solid] min-w-0 [box-shadow:0_20px_45px_#0003] [&_.wmde-markdown]:[--color-canvas-default:#f5f7f8] [&_.wmde-markdown]:[--color-fg-default:#131e22] [&_.wmde-markdown]:[--color-border-default:#b4c2c8] [&_.wmde-markdown]:[--color-accent-fg:#35474f] [&_.wmde-markdown]:bg-[#f5f7f8] [&_.wmde-markdown]:bg-none [&_.wmde-markdown]:text-[#131e22] [&_.wmde-markdown]:text-[0.75rem] [&_.wmde-markdown]:leading-[1.8] [&_.wmde-markdown_h1]:text-[1.5rem] [&_.wmde-markdown_h2]:text-[1.0625rem] [&_.wmde-markdown_h3]:text-[0.875rem] [@media(width<=480px)]:p-3.5 [@media(480px<width<=1150px)]:p-[0.9375rem] p-5.5 border border-[#446573] rounded-[8px] gap-4.5">
              <div className="visual-heading flex items-center justify-between text-[0.6875rem] text-[#b4c2c8] tracking-[0.1em] [@media(480px<width<=1000px)]:[.resume-composer_#resume-contact_>_&]:grid-cols-[1fr_1fr] [.resume-composer_#resume-contact_>_&]:grid-cols-1 [.resume-composer_#resume-contact_>_&]:bg-transparent [.resume-composer_#resume-contact_>_&]:bg-none [.resume-composer_#resume-contact_>_&]:p-0 [@media(width<=560px)]:[.signal-field_&]:px-1.5 gap-2.5 [.resume-composer_#resume-contact_>_&]:gap-4.5">
                <span className="flex items-center gap-2">YOUR DOCUMENT</span>
                <span className="flex items-center gap-2">LIVE PREVIEW</span>
              </div>
              <div
                className="resume-live-paper [@media(480px<width<=1000px)]:[.resume-composer_#resume-contact_>_&]:grid-cols-[1fr_1fr] [.resume-composer_#resume-contact_>_&]:grid-cols-1 [.resume-composer_#resume-contact_>_&]:bg-transparent [.resume-composer_#resume-contact_>_&]:bg-none bg-[#f5f7f8] bg-none text-[#131e22] [@media(width<=1000px)]:min-h-87.5 min-h-130 [border-top-style:solid] [border-right-style:solid] [border-bottom-style:solid] [border-left-style:solid] [box-shadow:0_20px_45px_#0005] wrap-anywhere [@media(width<=1000px)]:max-h-[none] max-h-[70vh] overflow-y-auto [.resume-composer_#resume-contact_>_&]:p-0 [@media(width<=1150px)]:p-5 p-7 border border-[#b4c2c8] [.resume-composer_#resume-contact_>_&]:gap-4.5"
                data-color-mode="light"
              >
                {previewContent.trim() ? (
                  <MDEditor.Markdown
                    source={previewContent}
                    rehypePlugins={[[rehypeRaw], [rehypeSanitize]]}
                  />
                ) : (
                  <div className="resume-paper-empty [@media(480px<width<=1000px)]:[.resume-composer_#resume-contact_>_&]:grid-cols-[1fr_1fr] [.resume-composer_#resume-contact_>_&]:grid-cols-1 [.resume-composer_#resume-contact_>_&]:bg-transparent [.resume-composer_#resume-contact_>_&]:bg-none pt-4.5 [.resume-composer_#resume-contact_>_&]:p-0 [.resume-composer_#resume-contact_>_&]:gap-4.5">
                    <span className="text-[#6b838d] text-[0.6875rem] tracking-[0.1em]">
                      YOUR NAME
                    </span>
                    <h2 className="text-[2.125rem] leading-[1.12] tracking-[-0.05em] my-[1.5625rem]">
                      Your story
                      <br />
                      starts here.
                    </h2>
                    <p className="text-[0.75rem] leading-[1.9] text-[#6b838d]">
                      Add your contact details, skills, and experience. Your
                      resume takes shape as you write.
                    </p>
                    <div className="paper-lines grid mt-[2.8125rem] mb-5.5 [@media(480px<width<=1000px)]:[.resume-composer_#resume-contact_>_&]:grid-cols-[1fr_1fr] [.resume-composer_#resume-contact_>_&]:grid-cols-1 [.resume-composer_#resume-contact_>_&]:bg-transparent [.resume-composer_#resume-contact_>_&]:bg-none [.resume-composer_#resume-contact_>_&]:p-0 gap-2 [.resume-composer_#resume-contact_>_&]:gap-4.5">
                      <i className="h-[3px] bg-[#e4ebee] bg-none last:w-[60%]" />
                      <i className="h-[3px] bg-[#e4ebee] bg-none last:w-[60%]" />
                      <i className="h-[3px] bg-[#e4ebee] bg-none last:w-[60%]" />
                      <i className="h-[3px] bg-[#e4ebee] bg-none last:w-[60%]" />
                    </div>
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground leading-6">
                Refine each section, review your document, then save your
                changes. Use Preview &amp; export for manual editing.
              </p>
            </aside>
          </div>
        </TabsContent>

        <TabsContent value="md-preview" className="p-1">
          {initialContent ||
          previewContent.trim().replace(/^\n+|\n+$/g, "").length > 0 ? (
            <>
              <Button
                variant={"outline"}
                type="button"
                className="mb-2 flex items-center bg-black border-neutral-700 cursor-pointer hover:bg-neutral-900 hover:border-zinc-500 transition-colors duration-200"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? (
                  <>
                    <Monitor className="h-4 w-4" />
                    Markdown Preview
                  </>
                ) : (
                  <>
                    <Edit className="h-4 w-4" />
                    Edit Resume
                  </>
                )}
              </Button>

              {isEditing && (
                <AnimatePresence>
                  {isEditing && (
                    <motion.div
                      className="flex items-center justify-center mb-2"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="w-full flex items-center justify-center px-2 py-1.5 my-1 rounded-md text-neutral-300 bg-yellow-700/15 border-r border-b border-yellow-600/55 ">
                        <TriangleAlert className="h-5 w-5 mr-2 text-yellow-500" />
                        <p className="text-sm md:text-base">
                          You will lose the edited markdown if you update the
                          form data
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}

              <motion.div
                className="container"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <MDEditor
                  value={previewContent}
                  onChange={(val) =>
                    setEditedDraft({ source: formSource, content: val || "" })
                  }
                  hideToolbar={!isEditing}
                  textareaProps={{ "aria-label": "Resume Markdown" }}
                  previewOptions={{
                    rehypePlugins: [[rehypeRaw], [rehypeSanitize]],
                  }}
                  height={800}
                  style={{ borderRadius: "0.5rem", overflow: "hidden" }}
                  preview={
                    isEditing
                      ? typeof window !== "undefined" &&
                        window.matchMedia("(min-width: 768px)").matches
                        ? "live"
                        : "edit"
                      : "preview"
                  }
                />
              </motion.div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center h-full">
                <p className="text-lg text-neutral-500">
                  No content to preview, please enter your resume details
                </p>
              </div>
            </>
          )}
        </TabsContent>

        <div className="hidden">
          <div id="resume-pdf">
            <MDEditor.Markdown
              source={previewContent}
              rehypePlugins={[[rehypeRaw], [rehypeSanitize]]}
              style={{ background: "white", color: "black" }}
            />
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default ResumeBuilder;

"use client";
export const dynamic = "force-dynamic";

import { getCoverLetter } from "@/actions/cover-letter";
import { downloadPdf } from "@/lib/pdf";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import MDEditor from "@uiw/react-md-editor";
import { ArrowLeft, Download, Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import CoverLetterSkeleton from "../_components/cover-letter-skeleton";

const CoverLetterPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = React.use(params);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const {
    data: letterData,
    loading: letterLoading,
    fn: letterFn,
  } = useFetch<Awaited<ReturnType<typeof getCoverLetter>>>();

  useEffect(() => {
    async function fetchLetter() {
      try {
        await letterFn(getCoverLetter, id);
      } catch (error) {
        if (error instanceof Error) {
          toast.error("Error while fetching cover letter");
          console.error("Error while fetching cover letter" + error.message);
        } else {
          toast.error("Error while fetching cover letter");
          console.error("Error while fetching cover letter" + error);
        }
      }
    }
    fetchLetter();
  }, [id, letterFn]);

  const generatePDF = async () => {
    setIsDownloading(true);
    try {
      await downloadPdf("cover-letter", `Cover Letter.pdf`);

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
    <div className="container mx-auto">
      {letterData ? (
        <div className="flex flex-col space-y-2 md:space-y-4 [@media(width<=560px)]:[.workspace-page_form_>_&]:p-[1.0625rem]">
          <Link href={"/ai-cover-letter"}>
            <Button
              variant={"outline"}
              className="flex items-center pl-0 gap-2 border bg-neutral-950 border-zinc-700 hover:bg-black hover:border-zinc-500 cursor-pointer hover:no-underline transition-colors duration-75 ease-in-out"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Cover Letters
            </Button>
          </Link>
          <div className="flex flex-col sm:flex-row md:items-center justify-between">
            <h1 className="text-3xl md:text-5xl gradient-title text-foreground font-normal tracking-[-0.045em]">
              {letterData?.jobTitle}{" "}
              <span className="font-normal text-muted-foreground"> at </span>{" "}
              {letterData?.companyName}
            </h1>
            <div className="flex justify-end">
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
          </div>
          <motion.div
            className="letter-document-paper [&_.wmde-markdown]:[--color-canvas-default:#f5f7f8] [&_.wmde-markdown]:[--color-fg-default:#131e22] [&_.wmde-markdown]:[--color-border-default:#b4c2c8] [&_.wmde-markdown]:[--color-accent-fg:#35474f] [&_.wmde-markdown]:bg-[#f5f7f8] [&_.wmde-markdown]:bg-none [&_.wmde-markdown]:text-[#131e22] [@media(width<=480px)]:[&_.wmde-markdown]:text-[0.875rem] [&_.wmde-markdown]:text-[0.9375rem] [&_.wmde-markdown]:leading-[1.95] [&_.wmde-markdown]:[box-shadow:none] max-w-205 w-full bg-[#131e22] bg-none [border-top-style:solid] [border-right-style:solid] [border-bottom-style:solid] [border-left-style:solid] mt-7.5 [@media(width<=480px)]:[&_.wmde-markdown]:p-[1.5625rem]! [&_.wmde-markdown]:p-12.5! [@media(width<=480px)]:p-3 p-5.5 mx-auto border border-[#35474f] [&_.wmde-markdown]:rounded-[1px]! rounded-[0.25rem]"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
          >
            <MDEditor.Markdown
              source={letterData?.content}
              style={{
                borderRadius: "0.7rem",
                overflow: "hidden",
                paddingLeft: 30,
                paddingRight: 30,
                paddingTop: 30,
                paddingBottom: 30,
                border: "1px solid #333333",
              }}
            />
          </motion.div>
          <div className="hidden">
            <div id="cover-letter">
              <MDEditor.Markdown
                source={letterData?.content}
                style={{ background: "white", color: "black" }}
              />
            </div>
          </div>
        </div>
      ) : letterLoading ? (
        <CoverLetterSkeleton />
      ) : (
        <div className="flex items-center justify-center gap-1 min-h-[70vh] w-full text-muted-foreground">
          We could not find the cover letter.
          <Link href={"/ai-cover-letter/new"}>
            {" "}
            <span className="underline decoration-primary underline-offset-2">
              Create one
            </span>{" "}
          </Link>
        </div>
      )}
    </div>
  );
};

import { motion } from "motion/react";
export default CoverLetterPage;

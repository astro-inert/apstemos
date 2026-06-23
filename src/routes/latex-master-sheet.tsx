import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

const PDF_URL = "https://drive.google.com/file/d/1O6iD6MP3R_p4NZzZ4vt-7kVAHrUBYtdJ/view?usp=drive_open";

export const Route = createFileRoute("/latex-master-sheet")({
  head: () => ({
    meta: [
      { title: "Master Sheet — APCalcExamPrep" },
      { name: "description", content: "Condensed 10-page LaTeX master sheet for AP Calculus AB/BC." },
    ],
  }),
  component: LatexMasterSheet,
});

function LatexMasterSheet() {
  useEffect(() => {
    window.location.replace(PDF_URL);
  }, []);
  return (
    <div className="min-h-screen grid place-items-center bg-background text-foreground p-6 text-center">
      <div>
        <p className="text-sm text-muted-foreground">Opening Formula Sheet…</p>
        <a href={PDF_URL} className="mt-3 inline-block text-sm text-primary underline">
          Click here if it doesn't open automatically
        </a>
      </div>
    </div>
  );
}

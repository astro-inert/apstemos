import { useEffect } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { HeroSection } from "@/components/home/HeroSection";
import { PipelineSection } from "@/components/home/PipelineSection";
import { DiagnosisSection } from "@/components/home/DiagnosisSection";
import { CommandCenterSection } from "@/components/home/CommandCenterSection";
import { MistakesSection } from "@/components/home/MistakesSection";
import { NavigatorSection } from "@/components/home/NavigatorSection";
import { PillarsSection } from "@/components/home/PillarsSection";
import { ResourcesSection } from "@/components/home/ResourcesSection";
import { ManifestoSection } from "@/components/home/ManifestoSection";
import { FinalCTASection } from "@/components/home/FinalCTASection";
import type { SubjectConfig } from "@/lib/subjects";
import { useHomeInstrument } from "@/lib/use-home-instrument";
import { persistCurrentSubject } from "@/lib/use-subject";

export function SubjectHome({ subject }: { subject: SubjectConfig }) {
  useEffect(() => {
    persistCurrentSubject(subject.id);
  }, [subject.id]);

  const data = useHomeInstrument(subject);

  return (
    <div
      data-subject={subject.id}
      className="subject-theme relative min-h-screen overflow-x-hidden bg-background text-foreground"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[46rem]">
        <div className="absolute inset-0 atmosphere opacity-80" />
        <div className="absolute inset-0 bg-grid opacity-50" />
      </div>

      <SiteNav subject={subject.id} />
      <HeroSection subject={subject} data={data} />
      <PipelineSection subject={subject} />
      <DiagnosisSection subject={subject} />
      <CommandCenterSection subject={subject} data={data} />
      <MistakesSection subject={subject} />
      <NavigatorSection subject={subject} />
      <PillarsSection subject={subject} />
      <ResourcesSection subject={subject} />
      <ManifestoSection />
      <FinalCTASection />
      <SiteFooter />
    </div>
  );
}

import type { Metadata } from "next";

import { JoinWizard } from "@/components/join/join-wizard";

export const metadata: Metadata = {
  title: "Join Gems of Drogheda",
  description: "Tell us about your business and how you'd like to get involved with Gems of Drogheda.",
};

export default function JoinPage() {
  return (
    <section className="mx-auto w-full max-w-3xl px-5 pb-16 pt-12 md:px-10 md:pb-24 md:pt-16">
      <div className="mb-8 flex flex-col gap-3">
        <span className="text-xs font-bold uppercase tracking-[0.12em] text-primary">Join Gems of Drogheda</span>
        <h1 className="font-heading text-[clamp(1.875rem,4vw,3rem)] font-semibold leading-[1.05] tracking-tight">
          Tell us about your business
        </h1>
        <p className="max-w-[34em] text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          Four quick steps. You can review everything before you submit.
        </p>
      </div>
      <JoinWizard />
    </section>
  );
}

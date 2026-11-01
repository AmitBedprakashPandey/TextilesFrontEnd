import type { Metadata } from "next";

import KarigarForm from "@/components/karigar/karigar-form";

export const metadata: Metadata = {
  title: "Karigar Cloth Meter Entry",
  description: "Karigar cloth meter register - 300 entry slots",
};

export default function KarigarPage() {
  return (
    <div className="min-h-dvh">
      <div className="print-hidden border-b border-border bg-card px-3 py-2">
        <h1 className="text-base font-bold">Karigar Cloth Meter Entry</h1>
        
      </div>

      <KarigarForm />
    </div>
  );
}

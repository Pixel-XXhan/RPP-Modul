
import { Hero } from "@/components/sections/Hero";
import { ValueProp } from "@/components/sections/ValueProp";
import { Showcase } from "@/components/sections/Showcase";
import { Visualization } from "@/components/sections/Visualization";
import { TrustProof } from "@/components/sections/TrustProof";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-sans selection:bg-accent/30 selection:text-primary-dark">
      <main className="flex-1">
        <Hero />
        <ValueProp />
        <Visualization />
        <TrustProof />
        <FinalCTA />
      </main>
    </div>
  );
}

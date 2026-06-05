import type { Metadata } from "next";
import PlayGround from "@/components/playground/playground";
import ProgrssiveBlur from "@/components/animate/progessive-blur";

export const metadata: Metadata = {
  title: "Playground",
  description:
    "Interactive playground to explore and customize components in real-time. Test various component states and configurations.",
};

export default function PlaygroundPage() {
  return (
    <div className="h-full w-full rounded-3xl border bg-background px-6 py-16">
      <h1 className="sr-only">Playground</h1>
      <ProgrssiveBlur
        position="top"
        height="100px"
        backgroundColor="var(--background)"
      />
      <ProgrssiveBlur
        position="bottom"
        height="100px"
        backgroundColor="var(--background)"
      />
      <PlayGround />
    </div>
  );
}

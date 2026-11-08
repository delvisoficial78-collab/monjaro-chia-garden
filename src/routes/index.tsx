import { useEffect, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { mountFunnel } from "@/lib/funnel-engine";

const OG_IMAGE =
  "https://chia-journey-quiz.lovable.app/images/fd6286bf8b4a849b952314445d815de4_1793096013579.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mounjaro de Chia — Protocolo Personalizado" },
      {
        name: "description",
        content:
          "Avaliação gratuita de 1 minuto para receber seu Protocolo Personalizado do Mounjaro de Chia.",
      },
      { property: "og:title", content: "Mounjaro de Chia — Protocolo Personalizado" },
      {
        property: "og:description",
        content: "Avaliação gratuita para receber seu protocolo personalizado do Mounjaro de Chia.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Mounjaro de Chia — Protocolo Personalizado" },
      {
        name: "twitter:description",
        content: "Avaliação gratuita para receber seu protocolo personalizado do Mounjaro de Chia.",
      },
      { name: "twitter:image", content: OG_IMAGE },
    ],
  }),
  component: FunnelPage,
});

function FunnelPage() {
  const shellRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shellRef.current || !barRef.current) return;
    return mountFunnel(shellRef.current, barRef.current);
  }, []);

  return (
    <>
      <div id="app">
        <main className="shell" id="shell" ref={shellRef} />
      </div>
      <div className="actionbar" id="bar" ref={barRef} hidden />
    </>
  );
}

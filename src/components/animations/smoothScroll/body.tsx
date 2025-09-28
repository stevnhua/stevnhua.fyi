// src/components/animations/smoothScroll/body.tsx
"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type BodyItem = {
  src: string;            // image filename under /public/images
  color?: string;         // optional bg color
};

type BodyProps = {
  body: BodyItem[];
  selectedProject: number; // index into body[]
  description: string;
  text: string;
};

export default function Body({ body, selectedProject, description, text }: BodyProps) {
  const container = useRef<HTMLDivElement>(null);
  const imageContainer = useRef<HTMLDivElement>(null);
  const projectList = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    // Desktop-only pinning; mobile uses sticky
    mm.add("(min-width: 1024px)", () => {
      const ctx = gsap.context(() => {
        if (!imageContainer.current || !projectList.current) return;

        ScrollTrigger.create({
          trigger: imageContainer.current,
          pin: true,
          start: "top top",
          end: () => `+=${Math.max(0, (projectList.current?.offsetHeight ?? 0) - 110)}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          pinSpacing: true,
        });
      }, container);

      // re-calc when fonts/layout settle (prevents drift)
      (document as any).fonts?.ready?.then(() => ScrollTrigger.refresh());

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  const current = body[selectedProject] ?? body[0];

  return (
    <section ref={container} className="relative w-full bg-background text-foreground">
      <div className="mx-auto flex h-[300px] w-full justify-between gap-[5%] px-4 sm:h-[700px] lg:max-w-6xl lg:px-0">
        {/* Image column */}
        <div
          ref={imageContainer}
          className="
            relative h-full w-[42%]
            lg:w-[40%]
            /* Mobile: sticky fallback (GSAP pin is desktop-only) */
            sticky top-4 lg:static
          "
        >
          <Image
            src={`/images/${current.src}`}
            alt="Project visual"
            fill
            priority={false}
            sizes="(max-width: 1024px) 42vw, 40vw"
            className="object-cover"
          />
        </div>

        {/* Text column */}
        <div ref={projectList} className="flex w-[58%] flex-col lg:w-[60%]">
          <div className="flex h-full pb-5 text-[1.7vh] text-foreground/90 sm:text-[1.6vw] lg:mix-blend-difference">
            <p>{description}</p>
          </div>
          <div className="align flex h-full self-end text-[1.2vh] text-foreground/80 sm:w-[70%] sm:text-[1vw] lg:mix-blend-difference">
            <p>{text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

/* ========= Experiences ========= */
type Experience = {
  company: string;
  role: string;
  period: string;
  summary: string;
  bullets?: string[];
  logoKey?: string; // file name without extension in /public/logos
};

const EXPERIENCES: Experience[] = [
  {
    company: "Scene+",
    role: "Incoming — Marketing Data Scientist",
    period: "September 2025 • Toronto, ON",
    summary: "",
    bullets: [],
    logoKey: "sceneplus",
  },
  {
    company: "Loblaw Companies Limited",
    role: "Data Science Intern — Customer & Business Insights",
    period: "May–Aug 2024 • Toronto, ON",
    summary:
      "A/B testing for PC Optimum incentives; customer analytics for a 15M+ member base; real-time segmentation dashboards.",
    bullets: [
      "60% boost in offer redemption via A/B testing (GCP, SQL, Python)",
      "400+ planogram changes → +15% margins for center-of-store items",
      "Segmentation & dashboards; reporting cycles ↓ 75% (Looker, SQL)",
    ],
    logoKey: "loblaw",
  },
  {
    company: "Loblaw Companies Limited",
    role: "Data Science Intern — Market Analytics & Loyalty",
    period: "Sep–Dec 2023 • Toronto, ON",
    summary:
      "Targeting, dormant re-engagement, and price elasticity analytics to grow routine shopping behavior.",
    bullets: [
      "23% incremental revenue lift across 5 categories (GCP, SQL, A/B tests)",
      "Reactivated 150k+ dormant customers (Python, regression analysis)",
      "5 dashboards on price elasticity for weekly exec briefings (Looker, SQL)",
    ],
    logoKey: "loblaw",
  },
  {
    company: "Shoppers Drug Mart",
    role: "Data Analyst Intern — Health Clinic Strategy & Ops",
    period: "May–Aug 2023 • Toronto, ON",
    summary:
      "Predictive analytics for 2,400+ stores and clinic network strategy with automated pipelines and dashboards.",
    bullets: [
      "Built predictive models for trends (Decision Trees, Python/R)",
      "Measured value of 3k+ physician partnerships (clustering, spatial)",
      "Automated data pipeline across 4 teams; minutes-level refresh (sklearn, Pandas, Tableau Prep)",
    ],
    logoKey: "shoppers",
  },
  {
    company: "Prosper Marketplace",
    role: "Data Analyst — Loan Verification",
    period: "Dec 2021–Jun 2022 • Newmarket, ON",
    summary:
      "Analysis and reporting on loan applications with financial closes and KPI tracking.",
    bullets: [
      "Analyzed $5M+ in loan applications (Spark, Excel)",
      "$250k+ financial discrepancies identified & resolved",
    ],
    logoKey: "prosper",
  },
  {
    company: "University of Toronto",
    role: "Honours BSc — Applied Statistics & Computer Science",
    period: "2019–2025 • Toronto, ON",
    summary:
      "Foundations in statistical modeling, ML, experimental design, and data engineering.",
    bullets: ["SQL, Python, R • Pandas/NumPy/Matplotlib/sklearn • BigQuery/Looker/Tableau"],
    logoKey: "uoft",
  },
];

/* ========= Config ========= */
const START_HOLD_VH = 12; // short scroll pause at start

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fixedRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLDivElement>(null);
  const lastCardRef = useRef<HTMLDivElement>(null);

  const [maxShift, setMaxShift] = useState(0);
  const [sectionH, setSectionH] = useState(0);
  const [progress, setProgress] = useState(0); // 0..1 after hold
  const [spacers, setSpacers] = useState({ left: 0, right: 0 });

  /* Measure widths, spacers, heights */
  useLayoutEffect(() => {
    const measure = () => {
      const vw = window.innerWidth;

      const firstW = firstCardRef.current?.getBoundingClientRect().width ?? Math.min(920, vw * 0.92);
      const lastW  = lastCardRef.current?.getBoundingClientRect().width ?? firstW;

      const leftSpacer  = Math.max(0, (vw - firstW) / 2);
      const rightSpacer = Math.max(0, (vw - lastW) / 2);
      setSpacers({ left: leftSpacer, right: rightSpacer });

      const trackW = trackRef.current?.scrollWidth ?? vw;
      const shift = Math.max(0, trackW - vw);
      setMaxShift(shift);

      const holdPx = (START_HOLD_VH / 100) * window.innerHeight;
      const buffer = vw * 0.5;
      const totalPx = holdPx + shift + buffer + window.innerHeight;
      setSectionH(totalPx);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, []);

  /* Scroll/pin + progress with hold */
  useEffect(() => {
    const el = containerRef.current;
    const fixed = fixedRef.current;
    if (!el || !fixed) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const inRange = rect.top <= 0 && rect.bottom - window.innerHeight >= 0;

        fixed.style.position = inRange ? "fixed" : "absolute";
        fixed.style.top =
          inRange
            ? "0"
            : rect.bottom <= window.innerHeight
            ? `${sectionH - window.innerHeight}px`
            : "0";

        const total = sectionH - window.innerHeight;
        const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
        const holdPx = (START_HOLD_VH / 100) * window.innerHeight;
        const afterHold = Math.max(0, scrolled - holdPx);
        const denom = Math.max(1, total - holdPx);
        const raw = afterHold / denom;
        setProgress(easeInOutQuad(raw));
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [sectionH]);

  const translateX = -(maxShift * progress);
  const activeIndex = useMemo(() => {
    const n = EXPERIENCES.length;
    return Math.round(progress * (n - 1));
  }, [progress]);

  /* show the hint until slight progress */
  const showHint = progress < 0.08;

  return (
    <section className="relative w-full bg-foreground text-white" style={{ height: sectionH }}>
      <div ref={containerRef} className="relative h-full">
        <div ref={fixedRef} className="absolute left-0 right-0 top-0 h-screen overflow-hidden">
          {/* calmer grid */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.10) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.10) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          {/* header */}
          <header className="relative mx-auto max-w-7xl px-6 pt-20 md:pt-24">
            {/* aurora glow behind */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 -top-8 -z-10 mx-auto h-[20rem] w-[38rem] blur-3xl opacity-70"
              style={{
                background:
                  "radial-gradient(60% 60% at 30% 40%, rgba(37,99,235,.18), transparent 60%), radial-gradient(55% 55% at 70% 60%, rgba(59,130,246,.25), transparent 60%)",
              }}
            />

            {/* stack everything centered with clean vertical rhythm */}
            <div className="flex flex-col items-center text-center space-y-4">
              {/* headline */}
              <motion.h1
                whileHover={{ y: -2, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 320, damping: 22, mass: 0.35 }}
                className="
                  relative inline-block
                  bg-gradient-to-b from-white to-zinc-300 bg-clip-text text-transparent
                  text-balance text-[46px] font-extrabold leading-[1.05] tracking-tight
                  md:text-6xl lg:text-7xl
                  drop-shadow-[0_2px_24px_rgba(16,185,129,0.08)]
                "
              >
                {"Companies I've worked with."}
                {/* underline sweep (safe offset) */}
                <span
                  aria-hidden
                  className="
                    absolute left-1/2 bottom-[-14px] h-[2px] w-0 -translate-x-1/2
                    bg-gradient-to-r from-blue-400 via-blue-500 to-sky-400
                    transition-all duration-500 ease-out
                    group-hover:w-full
                  "
                />
              </motion.h1>

              {/* tiny skill chips */}
              <div className="flex flex-wrap justify-center gap-2 pt-1">
                {["A/B testing", "Customer Segmentation", "SQL · Python · GCP", "Tableau · Looker"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-zinc-700/40 bg-black/40 px-3 py-1 text-[11px] text-zinc-300/90"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </header>

          {/* timeline */}
          <div className="relative mt-20 md:mt-20">
            {/* softened center line */}
            <div className="pointer-events-none absolute left-0 right-0 top-1/2 -z-20 hidden -translate-y-1/2 border-t border-zinc-700/20 md:block" />
            <div
              ref={trackRef}
              className="mx-auto flex w-max items-stretch gap-12 px-0 pb-14 pt-6"
              style={{
                transform: `translate3d(${translateX}px,0,0)`,
                transition: "transform 0.06s linear",
                willChange: "transform",
              }}
            >
              {/* center first / last */}
              <div style={{ width: `${spacers.left}px` }} aria-hidden />
              {EXPERIENCES.map((exp, i) => (
                <Card
                  key={i}
                  refProp={
                    i === 0
                      ? firstCardRef
                      : i === EXPERIENCES.length - 1
                      ? lastCardRef
                      : undefined
                  }
                  exp={exp}
                  active={i === activeIndex}
                  distanceFromActive={Math.abs(i - activeIndex)}
                />
              ))}
              <div style={{ width: `${spacers.right}px` }} aria-hidden />
            </div>
          </div>

          {/* scroll hint */}
          <ScrollHint visible={showHint} />

          {/* bottom progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-800/60">
            <div
              className="h-full bg-[#0047AB]/80 transition-[width] duration-150 ease-linear"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========= Card ========= */
function Card({
  exp,
  active,
  distanceFromActive,
  refProp,
}: {
  exp: Experience;
  active: boolean;
  distanceFromActive: number;
  refProp?: React.RefObject<HTMLDivElement>;
}) {
  const scale = active ? 1.09 : distanceFromActive === 1 ? 1.01 : 0.95;
  const opacity = active ? 1 : distanceFromActive === 1 ? 0.58 : 0.3;
  const blur = active ? "blur(0px)" : "blur(1.2px)";
  const saturate = active ? "saturate(1)" : "saturate(0.7)";

  return (
    <article
      ref={refProp}
      className="relative w-[92vw] min-w-[22rem] rounded-3xl border p-8 md:w-[50rem] lg:w-[58rem] lg:p-10"
      style={{
        minHeight: "24rem",
        borderColor: active ? "rgba(0,71,171,.65)" : "rgba(82,82,91,.6)",
        background: active
          ? "linear-gradient(180deg, rgba(0,71,171,.12), rgba(0,0,0,.46))"
          : "rgba(0,0,0,.40)",
        boxShadow: active
          ? "0 28px 90px rgba(0,0,0,.52), 0 0 0 1px rgba(0,71,171,.35) inset"
          : "0 16px 44px rgba(0,0,0,.40)",
        transform: `scale(${scale})`,
        opacity,
        filter: `${blur} ${saturate}`,
        transition:
          "opacity .25s ease, transform .25s ease, filter .25s ease, box-shadow .25s ease, background .25s ease, border-color .25s ease",
      }}
    >
      {/* soft halo only when active */}
      {active && (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-4 rounded-[2rem] blur-2xl"
          style={{
            background:
              "radial-gradient(24rem 14rem at 50% 35%, rgba(0,71,171,.25), transparent 60%)",
          }}
        />
      )}

      {/* header row with logo + meta */}
      <div className="relative">
        <div className="mb-4 flex items-center gap-3">
          <LogoBadge name={exp.company} logoKey={exp.logoKey} active={active} />
          <div className="flex items-center gap-2 text-xs text-zinc-300">
            <span
              className={
                active
                  ? "h-2.5 w-2.5 rounded-full bg-[#158CFF] ring-4 ring-[#158CFF]/30"
                  : "h-2.5 w-2.5 rounded-full bg-zinc-500/70 ring-4 ring-zinc-500/10"
              }
            />
            <span>{exp.period}</span>
          </div>
        </div>

        <h3 className="text-[28px] font-semibold leading-tight lg:text-[32px]">
          {exp.company}
        </h3>
        <p className={`text-[15px] ${active ? "text-[#3B82F6]" : "text-[#158CFF]/80"}`}>
          {exp.role}
        </p>

        {/* subtle divider */}
        <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-zinc-700/40 to-transparent" />
      </div>

      {/* body */}
      <p className="mt-4 text-[16px] leading-relaxed text-zinc-300">{exp.summary}</p>
      {exp.bullets?.length ? (
        <ul className="mt-3 space-y-1.5 pl-5 text-[15px] text-zinc-400 marker:text-zinc-500">
          {exp.bullets.map((b, j) => (
            <li key={j} className="list-disc">
              {b}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

/* ========= Logo Badge ========= */
function LogoBadge({
  name,
  logoKey,
  active,
}: {
  name: string;
  logoKey?: string;
  active: boolean;
}) {
  const [src, setSrc] = useState<string | null>(logoKey ? `/logos/${logoKey}.svg` : null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setSrc(logoKey ? `/logos/${logoKey}.svg` : null);
    setFailed(false);
  }, [logoKey]);

  const onError = () => {
    if (!failed && logoKey) {
      // try PNG fallback once
      setSrc(`/logos/${logoKey}.png`);
      setFailed(true);
    }
  };

  // fallback initials
  const initials = name
    .split(" ")
    .map((s) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return src ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      onError={onError}
      alt={`${name} logo`}
      className={`h-7 w-7 rounded-lg object-contain ${active ? "opacity-95" : "opacity-75"}`}
    />
  ) : (
    <div
      aria-hidden
      className={`flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-800/70 text-[11px] font-semibold ${
        active ? "text-zinc-200" : "text-zinc-400"
      }`}
    >
      {initials}
    </div>
  );
}

/* ========= Scroll Hint ========= */
function ScrollHint({ visible }: { visible: boolean }) {
  return (
    <div
      className={`pointer-events-none absolute bottom-6 left-1/2 z-[5] -translate-x-1/2 select-none transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 text-xs text-zinc-300 backdrop-blur">
        <span className="inline-block animate-bounce-slow">↓</span>
        <span>Scroll to explore</span>
      </div>
      {/* tiny helper style for bounce */}
      <style>{`
        @keyframes bounce-slow { 
          0%, 100% { transform: translateY(0); } 
          50% { transform: translateY(3px); } 
        }
        .animate-bounce-slow { animation: bounce-slow 1.6s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

/* ========= helpers ========= */
function easeInOutQuad(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

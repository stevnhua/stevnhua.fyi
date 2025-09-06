'use client';

import React from 'react';

/**
 * SleepingOtter
 * - Pure SVG + CSS animation (no deps).
 * - Gentle breathing, tail sway, floating Zs.
 * - Works anywhere in your Next/Tailwind project.
 */
export default function SleepingOtter({
  width = 560,
  height = 220,
  fur = '#8b5e3c',
  belly = '#c8a889',
  nose = '#1f2937',
  bg = 'transparent', // set to 'white' if you want a solid card fill
  accent = '#3b82f6', // your blue for the Z's
}: {
  width?: number;
  height?: number;
  fur?: string;
  belly?: string;
  nose?: string;
  bg?: string;
  accent?: string;
}) {
  return (
    <div
      className="rounded-2xl border border-foreground/10 bg-white shadow-sm ring-1 ring-black/5"
      style={{ maxWidth: width }}
    >
      <div className="flex items-center justify-between px-4 py-2 text-xs text-foreground/60">
        <span>Shh… the otter is napping</span>
        <span className="rounded-full border border-foreground/20 px-2 py-0.5">animated</span>
      </div>

      <div className="px-3 pb-3">
        <div className="relative w-full overflow-hidden rounded-xl" style={{ background: bg }}>
          <svg
            viewBox="0 0 560 220"
            width="100%"
            height={height}
            className="block w-full"
            aria-label="Sleeping otter animation"
          >
            {/* Soft ground */}
            <ellipse cx="280" cy="185" rx="240" ry="22" fill="rgba(0,0,0,0.05)" />

            {/* Tail (sways) */}
            <g className="tail" transform="translate(360,150)">
              <path
                d="M0 0 C 40 10, 70 25, 90 45 C 98 55, 88 62, 78 58 C 45 45, 20 28, -4 10 Z"
                fill={fur}
              />
            </g>

            {/* Body (breathes) */}
            <g className="breath" transform="translate(210,110)">
              {/* Body shape */}
              <path
                d="M0 40 C 10 10, 55 -10, 120 -8 C 185 -5, 220 15, 240 40 C 260 68, 240 95, 210 108
                   C 180 121, 60 120, 20 108 C -10 98, -12 70, 0 40 Z"
                fill={fur}
              />
              {/* Belly patch */}
              <path
                d="M58 20 C 78 8, 130 6, 168 16 C 196 24, 205 44, 188 62 C 172 79, 122 86, 92 82
                   C 58 78, 42 55, 58 20 Z"
                fill={belly}
                opacity="0.95"
              />
              {/* Paws */}
              <g transform="translate(40,78)">
                <ellipse rx="18" ry="10" fill={fur} />
                <g transform="translate(155,-2)">
                  <ellipse rx="18" ry="10" fill={fur} />
                </g>
              </g>
            </g>

            {/* Head (breathes with body) */}
            <g className="breath" transform="translate(170,78)">
              <g transform="translate(0,0)">
                <ellipse cx="0" cy="0" rx="52" ry="44" fill={fur} />
                {/* Ears */}
                <circle cx="-34" cy="-30" r="9" fill={fur} />
                <circle cx="34" cy="-30" r="9" fill={fur} />
                {/* Snout */}
                <ellipse cx="0" cy="10" rx="34" ry="24" fill={belly} />
                {/* Nose */}
                <path d="M-6 6 Q 0 0 6 6 Q 0 14 -6 6 Z" fill={nose} />
                {/* Eyes (closed) */}
                <path d="M-20 -2 q 10 6 20 0" stroke="#1f2937" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M 20 -2 q -10 6 -20 0" stroke="#1f2937" strokeWidth="3" fill="none" strokeLinecap="round" />
                {/* Whiskers */}
                <path d="M-18 14 q -16 2 -28 8" stroke="#374151" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M-18 18 q -18 8 -30 14" stroke="#374151" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M 18 14 q 16 2 28 8" stroke="#374151" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M 18 18 q 18 8 30 14" stroke="#374151" strokeWidth="2" fill="none" strokeLinecap="round" />
              </g>
            </g>

            {/* Floating Z's */}
            <g className="zz">
              <text x="420" y="70" fontFamily="ui-sans-serif, system-ui" fontSize="20" fill={accent} opacity="0.8">
                Z
              </text>
              <text x="440" y="50" fontFamily="ui-sans-serif, system-ui" fontSize="26" fill={accent} opacity="0.7">
                Z
              </text>
              <text x="462" y="30" fontFamily="ui-sans-serif, system-ui" fontSize="32" fill={accent} opacity="0.55">
                Z
              </text>
            </g>
          </svg>
        </div>
      </div>

      {/* Scoped animation styles */}
      <style jsx>{`
        .breath {
          transform-origin: 280px 140px;
          animation: breathe 3.2s ease-in-out infinite;
        }
        @keyframes breathe {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-2.5px) scale(1.008); }
        }

        .tail {
          transform-origin: 360px 155px;
          animation: sway 3.6s ease-in-out infinite;
        }
        @keyframes sway {
          0%, 100% { transform: translate(360px,150px) rotate(2deg); }
          50% { transform: translate(360px,150px) rotate(-4deg); }
        }

        .zz text {
          animation: floatZ 4.2s ease-in-out infinite;
        }
        .zz text:nth-child(2) {
          animation-delay: 0.9s;
        }
        .zz text:nth-child(3) {
          animation-delay: 1.8s;
        }
        @keyframes floatZ {
          0% { transform: translateY(0px); opacity: 0.0; }
          10% { opacity: 0.7; }
          60% { opacity: 0.7; }
          100% { transform: translateY(-18px); opacity: 0.0; }
        }
      `}</style>
    </div>
  );
}

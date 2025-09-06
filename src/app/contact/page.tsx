'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion, Variants } from 'framer-motion';
import { Playfair_Display, Inter } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
});
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
});

const ease = [0.22, 1, 0.36, 1] as const;

/* =========================
   Icons
========================= */
const IconLinkedIn = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
    <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.5 8.5h4.9V24H.5V8.5Zm7.5 0h4.7v2.1h.1c.7-1.3 2.4-2.6 4.9-2.6 5.3 0 6.3 3.5 6.3 8V24h-5v-6.9c0-1.6 0-3.7-2.3-3.7-2.3 0-2.7 1.7-2.7 3.6V24h-5V8.5Z" />
  </svg>
);
const IconGitHub = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
    <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.4.7-4.1-1.6-4.1-1.6-.6-1.5-1.4-1.9-1.4-1.9-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.9 3 1.3 3.7 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.6-1.3-5.6-6a4.7 4.7 0 0 1 1.3-3.2c-.1-.3-.6-1.6.1-3.3 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 3 .1 3.3.8.9 1.3 2 1.3 3.2 0 4.7-2.9 5.7-5.6 6 .5.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
  </svg>
);

/* =========================
   Subtle ambient pulse
========================= */
function SubtleBackdrop() {
  const reduce = useReducedMotion();
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <motion.div
        aria-hidden
        initial={{ scale: 1, opacity: 0.10 }}
        animate={
          reduce
            ? { opacity: 0.10 }
            : { scale: [1, 1.04, 1], opacity: [0.10, 0.16, 0.10] }
        }
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-[8%] top-[14%] h-[22rem] w-[22rem] rounded-full blur-2xl md:h-[26rem] md:w-[26rem] mix-blend-multiply"
        style={{
          background:
            'radial-gradient(60% 60% at 70% 30%, rgba(0,0,0,0.22), rgba(0,0,0,0) 70%)',
        }}
      />
    </div>
  );
}

/* =========================
   Social link
========================= */
function Social({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2.5 text-[15px] text-zinc-900/80 transition-colors hover:text-zinc-900"
    >
      <motion.span
        className="text-zinc-900/70"
        whileHover={{ rotate: -8, scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 400, damping: 12 }}
      >
        {icon}
      </motion.span>
      <span className="relative">
        {label}
        <span className="absolute -bottom-0.5 left-0 block h-[2px] w-0 bg-current transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:w-full" />
      </span>
    </Link>
  );
}

/* =========================
   Page variants
========================= */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};
const line: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.6, ease } },
};

export default function ContactPage() {
  return (
    <div
      className={`${playfair.variable} ${inter.variable} relative min-h-screen bg-white text-black`}
    >
      <SubtleBackdrop />

      {/* z-10 so content sits above the pulse */}
      <div className="mx-auto relative z-10 flex min-h-screen max-w-7xl items-center justify-center px-6 py-10 lg:px-8">
        <div className="grid w-full grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-12">
          {/* LEFT */}
          <div className="md:col-span-7">
            <motion.h1
              variants={container}
              initial="hidden"
              animate="show"
              className="font-serif leading-[0.9] tracking-tight"
            >
              <motion.span
                variants={line}
                className="block text-[16vw] sm:text-[12vw] md:text-[7.5rem] lg:text-[9rem]"
              >
                Want to
              </motion.span>
              <motion.span
                variants={line}
                whileHover={{ skewY: 2 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                className="block italic text-[16vw] sm:text-[12vw] md:text-[7.5rem] lg:text-[9rem]"
              >
                work
              </motion.span>
              <motion.span
                variants={line}
                whileHover={{ skewY: -2 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                className="block italic text-[16vw] sm:text-[12vw] md:text-[7.5rem] lg:text-[9rem]"
              >
                together?
              </motion.span>
            </motion.h1>

            <motion.p
              variants={line}
              initial="hidden"
              animate="show"
              className="mt-5 font-[var(--font-sans)] text-[18px] text-black/70"
            >
              Or just say hello.
            </motion.p>
          </div>

          {/* RIGHT */}
          <div className="md:col-span-5 md:pl-6 lg:pl-10">
            <motion.div variants={line} initial="hidden" animate="show" className="mb-8">
              <a
                href="mailto:steven_hua@outlook.com"
                className="group inline-block border-b border-black/15 pb-2 font-serif text-[2rem] leading-none text-primary"
              >
                <span className="relative inline-block">
                  <span className="relative z-10">steven_hua@outlook.com</span>
                  {/* one-time shimmer on hover */}
                  <span className="absolute inset-0 -z-0 overflow-hidden rounded-sm">
                    <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-black/[.06] to-transparent transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-[120%]" />
                  </span>
                </span>
                <span className="block h-[2px] w-0 bg-current transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:w-full" />
              </a>
            </motion.div>

            <motion.div
              variants={line}
              initial="hidden"
              animate="show"
              className="flex flex-wrap gap-x-8 gap-y-3"
            >
              <Social href="https://www.linkedin.com/in/stevnhua/" label="LinkedIn" icon={<IconLinkedIn />} />
              <Social href="https://github.com/stevnhua" label="GitHub" icon={<IconGitHub />} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';
import Layout from '@/components/layout';
import { useSpotify } from '@/hooks/useSpotify';
import { useGitHub } from '@/hooks/useGithub';

const ease = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.48, ease }
  }
});

function Counter({
  from = 0,
  to,
  suffix = '',
  duration = 1.2,
  className = ''
}: {
  from?: number;
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const [val, setVal] = React.useState(from);
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20% 0px' });

  React.useEffect(() => {
    if (!isInView) return;
    const start = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(from + eased * (to - from)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, from, to, duration]);

  return (
    <span ref={ref} className={className}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function About() {
  const {
    playlists,
    isLoading: spotifyLoading,
    error: spotifyError
  } = useSpotify();
  const {
    githubData,
    isLoading: githubLoading,
    error: githubError
  } = useGitHub();

  return (
    <div className="relative overflow-hidden bg-background">
      {/* Subtle animated top glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[-140px] h-[420px]
                   bg-[radial-gradient(60%_50%_at_50%_0%,white,transparent_70%)]"
        animate={{ opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <Layout title="I'm Steven" center>
        <div className="relative mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            {/* LEFT — Portrait & Chips */}
            <section className="relative flex flex-col items-center gap-8">
              {/* soft glow behind image */}
              <motion.div
                aria-hidden="true"
                className="absolute -z-10 h-[420px] w-[420px] rounded-full
                           bg-gradient-to-b from-primary/25 to-transparent blur-3xl"
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* portrait card */}
              <motion.div
                variants={fadeUp(0.05)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-20% 0px' }}
                whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
                transition={{ type: 'spring', stiffness: 240, damping: 18 }}
                className="relative w-full max-w-sm overflow-hidden rounded-[2rem]
                           bg-white/60 shadow-xl ring-1 ring-black/5 backdrop-blur"
              >
                <Image
                  className="h-auto w-full select-none object-cover"
                  width={1200}
                  height={1500}
                  src="/images/profile2.jpg"
                  alt="Steven Hua portrait"
                  priority
                />
              </motion.div>

              {/* impact chips */}
              <motion.ul
                variants={fadeUp(0.15)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-20% 0px' }}
                className="flex flex-wrap items-center justify-center gap-3"
              >
                <li className="group relative rounded-full border border-foreground/10 bg-white/70 px-4 py-1.5 text-sm text-foreground/80 shadow-sm backdrop-blur">
                  <span className="font-semibold">
                    <Counter to={15000000} />+
                  </span>{' '}
                  <span className="text-foreground/60">Canadians Reached</span>
                  <span className="pointer-events-none absolute inset-0 rounded-full bg-white/0 transition group-hover:bg-white/20" />
                </li>

                <li className="group relative rounded-full border border-foreground/10 bg-white/70 px-4 py-1.5 text-sm text-foreground/80 shadow-sm backdrop-blur">
                  <span className="font-semibold">
                    <Counter to={50} />+
                  </span>{' '}
                  <span className="text-foreground/60">campaigns</span>
                  <span className="pointer-events-none absolute inset-0 rounded-full bg-white/0 transition group-hover:bg-white/20" />
                </li>
              </motion.ul>
            </section>

            {/* RIGHT — Copy & CTA */}
            <section className="space-y-7 text-foreground">
              <motion.p
                variants={fadeUp(0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="text-xl font-semibold sm:text-2xl"
              >
                I’m a data scientist / analyst using data to drive clear, measurable impact.
              </motion.p>

              <motion.p
                variants={fadeUp(0.18)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="text-lg sm:text-xl"
              >
                I recently graduated from the University of Toronto in Computer Science and Applied
                Statistics. Since graduating, I’ve worked across some of Canada’s most everyday experiences -
                grocery shopping, picking up everyday essentials at Shoppers, and even earning Scene points. 
                Basically, if you’ve ever bought grocerys, stepped into a Shoppers Drug Mart, or went to the theatres, 
                there’s a good chance some part of your experience was shaped by the analytics or targeting work I helped build behind the scenes.
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={fadeUp(0.26)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-wrap gap-3 pt-2"
              >
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full border border-primary px-5 py-2 text-sm font-semibold text-primary transition
                             hover:bg-primary hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  Get in touch
                  <span className="translate-x-0 transition group-hover:translate-x-0.5">→</span>
                </Link>

                <Link
                  href="/projects"
                  className="group inline-flex items-center gap-2 rounded-full border border-foreground/20 px-5 py-2 text-sm font-medium text-foreground transition
                             hover:bg-foreground/5 focus:outline-none focus:ring-2 focus:ring-foreground/20"
                >
                  View projects
                  <span className="translate-x-0 transition group-hover:translate-x-0.5">↗</span>
                </Link>
              </motion.div>
            </section>
          </div>
        </div>
      </Layout>
    </div>
  );
}

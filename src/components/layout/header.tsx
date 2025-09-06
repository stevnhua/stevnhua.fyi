'use client';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import Menu from '../nav';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { isMobile } from '@/components/util';
import Magnetic from '@/components/animations/magnetic';
import Image from 'next/image';

export default function Header() {
  const header = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();
  const button = useRef(null);

  useEffect(() => {
    if (isActive) setIsActive(false);
  }, [pathname]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(button.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,
        onLeave: () => {
          gsap.to(button.current, {
            scale: 1,
            duration: 0.25,
            ease: 'power1.out'
          });
        },
        onEnterBack: () => {
          gsap.to(button.current, {
            scale: 0,
            duration: 0.25,
            ease: 'power1.out'
          });
        }
      }
    });
  }, []);

  return (
    <>
      <div
        ref={header}
        className="absolute top-0 z-20 box-border flex w-full items-center p-4 font-light text-white mix-blend-difference lg:p-8"
      >
        {/* Logo + Name */}
        <div className="flex lg:pr-56">
          <Link href={'/'} className="group z-10 flex items-center space-x-2">
            <Magnetic>
              <Image
                height={32}
                width={32}
                src="/images/logo.jpg"
                alt="Stevens logo"
                priority
              />
            </Magnetic>
            {!isMobile() && (
              <>
                <div className="hover:rotate-[360deg]">©</div>
                <div className="relative flex overflow-hidden">
                  <div className="ease-custom-cubic transition-transform duration-500 group-hover:translate-x-[-100%]">
                    coded by
                  </div>
                  <div className="ease-custom-cubic px-1 transition-transform duration-500 group-hover:translate-x-[-65px]">
                    Steven
                  </div>
                  <div className="ease-custom-cubic translate-x-full transition-transform duration-500 group-hover:translate-x-[-65px]">
                    Hua
                  </div>
                </div>
              </>
            )}
          </Link>
        </div>

        {/* Inline Nav */}
        {!isMobile() && (
          <div className="flex flex-1 items-center justify-end font-semibold space-x-12">
            <Magnetic>
              <Link href={'/about'}>About</Link>
            </Magnetic>
            <Magnetic>
              <Link href={'/projects'}>Projects</Link>
            </Magnetic>
            <Magnetic>
              <div className="flex items-center">
                <Link href={'/contact'}>Contact</Link>
                <ArrowUpRight size={18} />
              </div>
            </Magnetic>
          </div>
        )}
      </div>

      {/* Floating Menu (desktop scroll trigger + mobile fallback) */}
      {!isMobile() && (
        <div ref={button} className="fixed right-0 z-20 scale-0 transform">
          <Menu />
        </div>
      )}
      {isMobile() && (
        <div className="fixed right-2 z-20 transform">
          <Menu />
        </div>
      )}
    </>
  );
}

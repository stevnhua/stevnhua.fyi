import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import MenuButton from "@/components/nav/menuButton";
import React, { useState } from "react";
import NavLinks from "@/components/nav/NavLinks";

const links = [
  { title: "home", href: "/" },
  { title: "about", href: "/about" },
  { title: "projects", href: "/projects" },
  { title: "contact", href: "/contact" },
];

const menu = {
  open: {
    transition: { duration: 0.5, type: "tween", ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    transition: {
      duration: 0.5,
      delay: 0.2,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export default function Menu() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="fixed right-[20px] top-[20px] z-20 lg:right-[30px] lg:top-[30px]">
      <motion.div
        className={cn(
          "relative rounded-2xl border border-black bg-white text-black shadow-xl",
          {
            "h-[340px] w-[260px] sm:h-[360px] sm:w-[280px] lg:h-[380px] lg:w-[300px]":
              isActive,
            "right-0 top-0 h-[40px] w-[100px] opacity-0": !isActive,
          }
        )}
        variants={menu}
        animate={isActive ? "open" : "closed"}
        initial="closed"
      >
        <AnimatePresence>
          {isActive && (
            <div className="relative flex h-full flex-col p-[40px_24px_28px]">
              {/* Close button stays top-right */}
              <button
                onClick={() => setIsActive(false)}
                className="absolute right-4 top-4 rounded-full bg-blue-500 px-4 py-1 text-sm text-white shadow"
              >
                Close
              </button>

              {/* Links pushed down */}
              <nav className="mt-16 flex flex-col space-y-5 text-lg italic font-medium tracking-wide">
                <NavLinks links={links} setIsActive={setIsActive} />
              </nav>
            </div>
          )}
        </AnimatePresence>
      </motion.div>

      <MenuButton
        isActive={isActive}
        toggleMenu={() => setIsActive(!isActive)}
      />
    </div>
  );
}

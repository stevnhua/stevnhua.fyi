import { motion } from "framer-motion";

type ButtonProps = {
  isActive: boolean;
  toggleMenu: () => void;
};

export default function MenuButton({ isActive, toggleMenu }: ButtonProps) {
  return (
    <div
      className="absolute right-4 top-4 z-20 cursor-pointer"
      onClick={toggleMenu}
    >
      <motion.div
        className="flex h-[40px] w-[100px] items-center justify-center rounded-full border border-blue-600 bg-blue-600 text-white shadow-md transition hover:bg-white hover:text-blue-600"
        animate={{ opacity: isActive ? 0.9 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {isActive ? "Close" : "Menu"}
      </motion.div>
    </div>
  );
}

function PerspectiveText({ label }: { label: string }) {
  return (
    <div className="transform-style-3d hover:transform-rotateX-90 hover:p:nth-of-type(1):transform-translateY-full hover:p:nth-of-type(1):opacity-0 hover:p:nth-of-type(2):opacity-100 duration-[0.75s] ease-[cubic-bezier(0.76,0,0.24,1)] flex h-full w-full flex-col items-center justify-center transition">
      <p className="duration-[0.75s] ease-[cubic-bezier(0.76,0,0.24,1)] pointer-events-none m-0 uppercase transition">
        {label}
      </p>
      <p className="transform-origin-bottom-center transform-rotateX--90 duration-[0.75s] ease-[cubic-bezier(0.76,0,0.24,1)] pointer-events-none absolute m-0 translate-y-[9px] uppercase opacity-0 transition">
        {label}
      </p>
    </div>
  );
}

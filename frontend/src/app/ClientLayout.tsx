"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import NavigationMenu from "@/components/NavigationMenu";

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.9, // Starts with a smaller scale
  },
  enter: {
    opacity: 1,
    scale: 1, // Increases to normal size
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Condition render the navigation bar based on the route
  const showNavigationMenu = [
    "/profile",
    "/select",
    "/notification",
    "/form",
  ].includes(pathname ?? ""); // Ensures pathname is never null

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          variants={pageVariants}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          {children}
        </motion.div>
      </AnimatePresence>
      {showNavigationMenu && <NavigationMenu />}
    </>
  );
}
"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import NavigationMenu from "@/components/NavigationMenu";

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.9, // Começa com uma escala menor
  },
  enter: {
    opacity: 1,
    scale: 1, // Aumenta para o tamanho normal
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

  // Condiciona a renderização da barra de navegação com base na rota
  const showNavigationMenu = [
    "/profile",
    "/select",
    "/notification",
    "/form",
  ].includes(pathname ?? ""); // Garante que pathname nunca será null

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

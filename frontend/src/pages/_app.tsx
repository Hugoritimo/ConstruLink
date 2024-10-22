import { ThemeProvider } from "next-themes";
import { AppProps } from "next/app";
import { AnimatePresence, motion } from "framer-motion";
import "../app/globals.css";
import NavigationMenu from "@/components/NavigationMenu";

function MyApp({ Component, pageProps, router }: AppProps) {
  // Verifica se a rota atual é "/select"
  const isSelectPage = router.pathname === "/select";

  return (
    <ThemeProvider attribute="class">
      <AnimatePresence mode="wait">
        <motion.div
          key={router.route}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          {/* Renderiza a barra de navegação apenas na página "/select" */}
          {isSelectPage && <NavigationMenu />}
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default MyApp;

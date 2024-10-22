import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  HomeIcon,
  BuildingOfficeIcon,
  BellIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

const navItems = [
  {
    label: "Home",
    href: "/home",
    icon: HomeIcon,
  },
  {
    label: "Empresa",
    href: "/select",
    icon: BuildingOfficeIcon,
  },
  {
    label: "Notificações",
    href: "/notification",
    icon: BellIcon,
  },
  {
    label: "Perfil",
    href: "/profile",
    icon: UserIcon,
  },
];

const NavigationMenu = () => {
  const router = useRouter();
  const currentPath = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 flex justify-around shadow-lg z-50">
      {navItems.map((item) => {
        const isActive = currentPath === item.href;

        return (
          <motion.button
            key={item.label}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push(item.href)}
            className={clsx(
              "flex flex-col items-center text-gray-600 hover:text-blue-600 focus:outline-none",
              { "text-blue-600": isActive }
            )}
            aria-label={item.label}
          >
            <item.icon className="h-6 w-6" aria-hidden="true" />
            <span className="text-xs">{item.label}</span>
          </motion.button>
        );
      })}
    </nav>
  );
};

export default NavigationMenu;

// components/NavBar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

export default function NavBar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Flavors", path: "/flavors" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "About", path: "/about" },
    { name: "Account", path: "/protected" },
  ];

  return (
    <header className="bg-gray-800 shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="text-xl font-bold text-white hover:text-purple-300 transition-colors duration-200"
          >
            Hibbard&apos;s Custard
          </Link>
          <div className="flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === item.path
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                } transition-colors duration-200`}
              >
                {item.name}
              </Link>
            ))}
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}

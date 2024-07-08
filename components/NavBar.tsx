"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { useState, useEffect } from "react";

export default function NavBar() {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener('change', handleChange);

    return () => darkModeMediaQuery.removeEventListener('change', handleChange);
  }, []);

  const navStyle = {
    position: 'static' as const,
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 40px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(10px)',
    color: isDarkMode ? '#ffffff' : '#333333',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  };

  const logoStyle = {
    fontSize: '1.75rem',
    fontWeight: 'bold' as const,
    textDecoration: 'none',
    color: isDarkMode ? '#ffffff' : '#1a202c',
    letterSpacing: '0.5px',
  };

  const navItemsStyle = {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
  };

  const linkStyle = (isActive: boolean) => ({
    color: isActive 
      ? (isDarkMode ? '#bb86fc' : '#4a5568') 
      : (isDarkMode ? '#e2e8f0' : '#718096'),
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: isActive ? '600' : 'normal',
    padding: '0.5rem 0.75rem',
    borderRadius: '0.375rem',
    transition: 'all 0.3s ease',
    backgroundColor: isActive 
      ? (isDarkMode ? 'rgba(187, 134, 252, 0.1)' : 'rgba(74, 85, 104, 0.1)')
      : 'transparent',
  });

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Flavors", path: "/flavors" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "About", path: "/about" },
    { name: "Account", path: "/protected" },
  ];

  return (
    <nav style={navStyle}>
      <Link href="/" style={logoStyle}>
        Hibbard&apos;s Custard
      </Link>
      <div style={navItemsStyle}>
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            style={linkStyle(pathname === item.path)}
          >
            {item.name}
          </Link>
        ))}
        <ThemeToggle />
      </div>
    </nav>
  );
}
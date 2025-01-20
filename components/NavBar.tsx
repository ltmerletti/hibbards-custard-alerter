"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { useState, useEffect } from "react";
import Image from "next/image";

<style>@import url(https://fonts.googleapis.com/css2?family=Raleway%3Aital%2Cwght%400%2C100..900%3B1%2C100..900&amp;display=swap);</style>


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
    { name: "Dashboard", path: "/dashboard" },
    { name: "Flavors", path: "/flavors" },
    { name: "About", path: "/about" },
    { name: "Account", path: "/protected" },
  ];

  return (
    <nav style={navStyle}>
    <Link href="/" style={logoStyle}>
      <Image
        src="/static/Navbar-Thing.svg"
        alt="logo"
        width={340}
        height={70}
        style={{ maxHeight: '70px' }}
        priority
      />
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
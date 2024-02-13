"use client";
import logo_of_blaise_mzyk from "@/public/images/logo_of_blaise_mzyk.png";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Button from "../button";
import styles from "./NavBar.module.css";
import MenuButton from "./menu-button/menuButton";
import MobileMenu from "./mobile-menu";
import MyNavLink from "./my-nav-link";

interface Navlink {
  label: string;
  href: string;
}

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks: Navlink[] = [
    { label: "Philosophy", href: "/philosophy" },
    { label: "Programming", href: "/programming" },
    { label: "Book Notes", href: "/book-notes" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <nav className={styles.navigation}>
      <Link href="/" onClick={() => setMenuOpen(false)}>
        <div className={styles.navBrand}>
          <Image
            src={logo_of_blaise_mzyk}
            alt="Logo of Blaise Mzyk"
            fill
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
            style={{
              objectFit: "cover",
            }}
          />
        </div>
      </Link>
      <ul className={styles.navList}>
        {navLinks.map((navLink) => (
          <li key={navLink.href} className={styles.navItem}>
            <MyNavLink href={navLink.href}>
              {navLink.label === "Blog" && (
                <Button variant="outline">{navLink.label}</Button>
              )}
              {navLink.label !== "Blog" && navLink.label}
            </MyNavLink>
          </li>
        ))}
      </ul>
      <div className={styles.navMenu}>
        <MenuButton
          onClick={() => setMenuOpen(!menuOpen)}
          ariaExpanded={menuOpen}
        />
      </div>
      <AnimatePresence>
        {menuOpen && (
          <MobileMenu navLinks={navLinks} onClick={() => setMenuOpen(false)} />
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;

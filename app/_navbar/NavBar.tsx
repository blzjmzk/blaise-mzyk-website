"use client";
import Link from "next/link";
import React, { useState } from "react";
import styles from "./NavBar.module.css";
import Image from "next/image";
import logo_of_blaise_mzyk from "../../public/images/logo_of_blaise_mzyk.png";
import MenuButton from "./menu-button/menuButton";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const currentPath = usePathname();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const navLinks = [
    { label: "Philosophy", href: "/philosophy" },
    { label: "Programming", href: "/programming" },
    { label: "Book Notes", href: "/book-notes" },
    { label: "Contact", href: "/contact" },
  ];

  const menuLinkVars = {
    initial: {
      y: "30vh",
      transition: {
        duration: 0.5,
        ease: [0.37, 1, 0.63, 1],
      },
    },
    open: {
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0, 0.55, 0.45, 1],
      },
    },
  };

  const containerVars = {
    initial: {
      transition: {
        staggerChildren: 0.09,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        staggerChildren: 0.09,
        delayChildren: 0.3,
        staggerDirection: 1,
      },
    },
  };

  const menuVars = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.5,
        ease: [0.12, 0, 0.39, 0],
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        delay: 0.5,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <nav className={styles.navigation}>
      <Link href="/" onClick={closeMenu}>
        <div className={styles.navBrand}>
          <Image
            src={logo_of_blaise_mzyk}
            alt="Logo of Blaise Mzyk"
            // width={164}
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
            <Link
              href={navLink.href}
              className={`${styles.navLink} ${
                navLink.href === currentPath
                  ? styles.activeNavLink
                  : styles.nonActiveNavLink
              }`}
              onClick={closeMenu}
            >
              {navLink.label}
            </Link>
          </li>
        ))}
        <div className={styles.hidden}>
          <motion.li variants={menuLinkVars} className={styles.navItem}>
            <Link href="/blog" className={styles.navLink} onClick={closeMenu}>
              <button className="btn btn-outline">Blog</button>
            </Link>
          </motion.li>
        </div>
      </ul>

      <div className={styles.navMenu}>
        <MenuButton
          onClick={() => setMenuOpen(!menuOpen)}
          ariaExpanded={menuOpen}
        />
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className={styles.navListOpen}
          >
            <motion.ul
              variants={containerVars}
              initial="initial"
              animate="open"
              exit="initial"
              className={styles.navListOpen}
            >
              {navLinks.map((navLink) => (
                <div key={navLink.href} className={styles.hidden}>
                  <motion.li variants={menuLinkVars} className={styles.navItem}>
                    <Link
                      href={navLink.href}
                      className={`${styles.navLink} ${
                        navLink.href === currentPath
                          ? styles.activeNavLink
                          : styles.nonActiveNavLink
                      }`}
                      onClick={closeMenu}
                    >
                      {navLink.label}
                    </Link>
                  </motion.li>
                </div>
              ))}
              <div className={styles.hidden}>
                <motion.li variants={menuLinkVars} className={styles.navItem}>
                  <Link
                    href="/blog"
                    className={styles.navLink}
                    onClick={closeMenu}
                  >
                    <button className="btn btn-outline">Blog</button>
                  </Link>
                </motion.li>
              </div>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;

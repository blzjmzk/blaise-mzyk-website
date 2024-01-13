"use client";
import Link from "next/link";
import React, { useState } from "react";
import styles from "./NavBar.module.css";
import Image from "next/image";
import logo_of_blaise_mzyk from "../../public/images/logo_of_blaise_mzyk.png";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className={`${styles.navigation} container`}>
      <Link className="navBrand" href="/">
        <Image src={logo_of_blaise_mzyk} alt="Logo of Blaise Mzyk" />
      </Link>
      <div className={styles.navMenu} onClick={() => setMenuOpen(!menuOpen)}>
        MENU
      </div>
      <ul className={menuOpen ? styles.navOpen : styles.navList}>
        <li className={styles.navItem}>
          <Link href="/philosophy" className={styles.navLink}>
            Philosophy
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/programming" className={styles.navLink}>
            Programming
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/book-notes" className={styles.navLink}>
            Book Notes
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/contact" className={styles.navLink}>
            Contact
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/blog" className={styles.navLink}>
            Blog
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

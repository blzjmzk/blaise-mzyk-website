"use client";
import Link from "next/link";
import React, { useState } from "react";
import styles from "./NavBar.module.css";
import Image from "next/image";
import logo_of_blaise_mzyk from "../../public/images/logo_of_blaise_mzyk.png";
import MenuButton from "./menu-button/menuButton";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const currentPath = usePathname();

  const navLinks = [
    { label: "Philosophy", href: "/philosophy" },
    { label: "Programming", href: "/programming" },
    { label: "Book Notes", href: "/book-notes" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className={`${styles.navigation} container`}>
      <Link className={styles.navBrand} href="/">
        <Image
          src={logo_of_blaise_mzyk}
          alt="Logo of Blaise Mzyk"
          width={130}
        />
      </Link>
      <div className={styles.navMenu}>
        <MenuButton
          onClick={() => setMenuOpen(!menuOpen)}
          ariaExpanded={menuOpen}
        />
      </div>
      <ul className={menuOpen ? styles.navOpen : styles.navList}>
        {navLinks.map((navLink) => (
          <li key={navLink.href} className={styles.navItem}>
            <Link
              href={navLink.href}
              className={`${styles.navLink} ${
                navLink.href === currentPath
                  ? styles.activeNavLink
                  : styles.nonActiveNavLink
              }`}
            >
              {navLink.label}
            </Link>
          </li>
        ))}
        <li className={styles.navItem}>
          <Link href="/blog" className={styles.navLink}>
            <button className="btn btn-outline">Blog</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

{
  /* <li className={styles.navItem}>
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

</li> */
}

import { motion } from "framer-motion";
import Button from "../../button";
import styles from "../NavBar.module.css";
import MyNavLink from "../my-nav-link";

interface Props {
  navLinks: Navlink[];
  onClick: () => void;
}

interface Navlink {
  label: string;
  href: string;
}

const MobileMenu = ({ navLinks, onClick }: Props) => {
  const openMenuVariants = {
    initial: {
      scaleY: 0,
    },
    open: {
      scaleY: 1,
      transition: {
        duration: 0.5,
        ease: [0.1, 0, 0.4, 0],
        staggerChildren: 0.1,
        delayChildren: 0.3,
        staggerDirection: 1,
      },
    },
    close: {
      scaleY: 0,
      transition: {
        delay: 0.5,
        duration: 0.5,
        ease: [0.2, 1, 0.35, 1],
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
  };

  const mobileMenuLinksVariants = {
    initial: {
      y: "30vh",
    },
    open: {
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0, 0.5, 0.4, 1],
      },
    },
    close: {
      y: "30vh",
      transition: {
        duration: 0.5,
        ease: [0.35, 1, 0.6, 1],
      },
    },
  };

  return (
    <motion.ul
      variants={openMenuVariants}
      initial="initial"
      animate="open"
      exit="close"
      className={styles.navListOpen}
    >
      {navLinks.map((navLink, index) => (
        <div key={index} className={styles.hidden}>
          <motion.li
            variants={mobileMenuLinksVariants}
            className={styles.navItem}
          >
            <MyNavLink href={navLink.href} onClick={onClick}>
              {navLink.label === "Blog" && (
                <Button variant="outline">{navLink.label}</Button>
              )}
              {navLink.label !== "Blog" && navLink.label}
            </MyNavLink>
          </motion.li>
        </div>
      ))}
    </motion.ul>
  );
};

export default MobileMenu;

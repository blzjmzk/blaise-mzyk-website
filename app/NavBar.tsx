"use client";
import Link from "next/link";
import React, { useState } from "react";

const NavBar = () => {
  return (
    <nav className="nav">
      <Link className="nav__brand" href="/">
        blaisemzyk
      </Link>
      <ul className="list nav__list">
        <li className="nav__item">
          <Link href="/philosophy">Philosophy</Link>
        </li>
        <li className="nav__item">
          <Link href="/programming">Programming</Link>
        </li>
        <li className="nav__item">
          <Link href="/book-notes">Book Notes</Link>
        </li>
        <li className="nav__item">
          <Link href="/contact">Contact</Link>
        </li>
        <li className="nav__item">
          <Link href="/blog">Blog</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

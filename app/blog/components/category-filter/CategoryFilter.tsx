"use client";
import React, { useEffect, useState } from "react";
import styles from "./CategoryFilter.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/button";
import { CodeBlock, Student } from "@phosphor-icons/react";

interface Category {
  label: string;
  icon?: React.ReactNode;
}

const categories: Category[] = [
  { label: "All Posts" },
  { label: "Programming", icon: <CodeBlock size={18} /> },
  { label: "Studying", icon: <Student size={18} /> },
];

const CategoryFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "All Posts";

  const handleClick = (label: string) => {
    const query = label === "All Posts" ? "" : `?category=${label}`;
    router.push("/blog" + query);
  };

  return (
    <div className={styles.filtersContainer}>
      {categories.map((category) => (
        <Button
          variant={category.label === currentCategory ? "primary" : "outline"}
          key={category.label}
          onClick={() => handleClick(category.label)}
        >
          <div className={styles.categoryButton}>
            <span className={styles.iconContainer}>{category.icon}</span>
            {category.label}
          </div>
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;

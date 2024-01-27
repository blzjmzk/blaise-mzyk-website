"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeletePostButton = ({ postSlug }: { postSlug: string }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const deletePost = async () => {
    try {
      setIsDeleting(true);
      await axios.delete("/api/posts/" + postSlug);
      router.push("/blaise");
      router.refresh(); //przeciwdziałamy cachingowi
    } catch (error) {
      setIsDeleting(false);
      setError(true);
    }
  };
  return <button onClick={deletePost}>Delete</button>;
};

export default DeletePostButton;

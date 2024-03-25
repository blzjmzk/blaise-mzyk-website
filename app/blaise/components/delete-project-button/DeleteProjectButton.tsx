"use client";
import Button from "@/components/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteProjectButton = ({ projectId }: { projectId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteProject = async () => {
    try {
      setIsDeleting(true);
      await axios.delete("/api/projects/" + projectId);
      router.push("/blaise/projects");
      router.refresh(); //przeciwdziałamy cachingowi
    } catch (error) {
      setIsDeleting(false);
      setError(true);
    }
  };
  return (
    <Button variant="delete" onClick={deleteProject}>
      Delete
    </Button>
  );
};

export default DeleteProjectButton;

"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "../../components/Profile";
import { PromptProps } from "@components/Feed";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

export default function MyProfile() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: session }: any = useSession();
  const [prompts, setPrompts] = useState<PromptProps[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userid");
  const username = searchParams.get("username");

  const handleEdit = (prompt: PromptProps) => {
    router.push(`/update-prompt?id=${prompt._id}&userid=${prompt.creater._id}`);
  };

  const handleDelete = async (prompt: PromptProps) => {
    try {
      const response = await fetch(`/api/prompt/${prompt._id}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        toast.success("Successfully deleted!");
        setPrompts((prev) => {
          return prev.filter(({ _id }) => _id !== prompt._id);
        });
      }
    } catch (e: any) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    const getPrompts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/users/${userId}/posts`);
        const prompts = await res.json();
        setPrompts(prompts);
      } catch (e: any) {
        throw new Error(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    getPrompts();
  }, [userId]);

  return (
    <Profile
      name={session?.user?.id === userId ? "My" : `${username}`}
      desc={
        session?.user?.id === userId
          ? `Welcome to  personalized profile page`
          : ""
      }
      data={prompts}
      isLoading={isLoading}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}

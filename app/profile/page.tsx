"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "../../components/Profile";
import { PromptProps } from "@components/Feed";
import { useSearchParams } from "next/navigation";

export default function MyProfile() {
  const { data: session }: any = useSession();
  const [prompts, setPrompts] = useState<PromptProps[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userid");
  const username = searchParams.get("username");

  const handleEdit = (prompt: PromptProps) => {
    router.push(`/update-prompt?id=${prompt._id}`);
  };

  const handleDelete = async (prompt: PromptProps) => {
    try {
      await fetch(`/api/prompt/${prompt._id}`, {
        method: "DELETE",
      });
    } catch (e: any) {
      console.log(e.message);
    }

    router.push("/");
  };

  useEffect(() => {
    const getPrompts = async () => {
      try {
        const res = await fetch(`/api/users/${userId}/posts`);
        const prompts = await res.json();
        setPrompts(prompts);
      } catch (e: any) {
        throw new Error(e.message);
      }
    };
    getPrompts();
  }, [userId]);

  return (
    <Profile
      name={session?.user?.id === userId ? "My" : `${username}'s`}
      desc="Welcome to  personalized profile page"
      data={prompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}

"use client";
import Form from "@components/Form";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

export interface Post {
  prompt: string;
  tag: string;
}

export default function CreatePrompt() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<Post>({ prompt: "", tag: "" });
  const { data: session }: any = useSession();

  const router = useRouter();
  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/prompt/new", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          userId: session?.user?.id,
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      router.push("/");
      return response;
    } catch (e: any) {
      console.log(e.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Form
        post={post}
        type="Create"
        isSubmitting={isSubmitting}
        setPost={setPost}
        handleSubmit={handleCreate}
      />
    </div>
  );
}

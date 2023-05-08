"use client";
import Form from "@components/Form";
import { useRouter, useSearchParams } from "next/navigation";
import React, { FormEvent, useCallback, useEffect, useState } from "react";

export interface Post {
  prompt: string;
  tag: string;
}

export default function UpdatePrompt() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<Post>({ prompt: "", tag: "" });

  const router = useRouter();

  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({
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

  useEffect(() => {
    const getPrompts = async () => {
      try {
        const res = await fetch(`/api/prompt/${promptId}`);
        const prompt = await res.json();
        setPost({ prompt: prompt.prompt, tag: prompt.tag });
      } catch (e: any) {
        throw new Error(e.message);
      }
    };
    if (promptId) {
      getPrompts();
    }
  }, [promptId]);

  return (
    <div>
      <Form
        post={post}
        type="Update"
        isSubmitting={isSubmitting}
        setPost={setPost}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

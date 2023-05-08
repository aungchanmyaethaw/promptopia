"use client";
import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { toast } from "react-hot-toast";

export interface Post {
  prompt: string;
  tag: string;
}

export default function CreatePrompt() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<Post>({ prompt: "", tag: "" });
  const { data: session, status }: any = useSession();

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

      if (response.status === 201) {
        toast.success("Successfully created!");
      }
      setTimeout(() => router.push("/"), 1500);
    } catch (e: any) {
      console.log(e.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading") {
    return <BeatLoader />;
  }

  return (
    <div>
      {status === "authenticated" ? (
        <Form
          post={post}
          type="Create"
          isSubmitting={isSubmitting}
          setPost={setPost}
          handleSubmit={handleCreate}
        />
      ) : (
        <div className=" !text-xl md:!text-2xl font-semibold orange_gradient">
          Please sign in to access this page.
        </div>
      )}
    </div>
  );
}

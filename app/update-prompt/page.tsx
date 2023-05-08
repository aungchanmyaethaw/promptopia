"use client";
import Form from "@components/Form";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { toast } from "react-hot-toast";

export interface Post {
  prompt: string;
  tag: string;
}

export default function UpdatePrompt() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<Post>({ prompt: "", tag: "" });
  const { data: session, status }: any = useSession();
  const router = useRouter();

  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const userId = searchParams.get("userid");

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
      if (response.status === 200) {
        toast.success("Successfully updated!");
      }
      setTimeout(() => router.push("/"), 1500);
    } catch (e: any) {
      console.log(e.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const getPrompts = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/prompt/${promptId}`);
        const prompt = await res.json();
        setPost({ prompt: prompt.prompt, tag: prompt.tag });
      } catch (e: any) {
        throw new Error(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (promptId) {
      getPrompts();
    }
  }, [promptId]);

  if (status === "loading") {
    return <BeatLoader />;
  }

  if (status === "authenticated" && session?.user?.id !== userId) {
    return (
      <div className=" !text-xl md:!text-2xl font-semibold orange_gradient  ">
        You are not the owner of this post.{" "}
        <Link href="/" className="!underline !text-base !text-slate-800">
          back to home
        </Link>
      </div>
    );
  }

  return (
    <div>
      {status === "authenticated" ? (
        <Form
          post={post}
          type="Update"
          isSubmitting={isSubmitting}
          setPost={setPost}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      ) : (
        <div className=" !text-xl md:!text-2xl font-semibold orange_gradient">
          Please sign in to access this page.
        </div>
      )}
    </div>
  );
}

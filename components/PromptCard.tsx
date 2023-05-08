"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { PromptProps } from "@components/Feed";
import Link from "next/link";

interface PromptCardProps {
  post: PromptProps;
  handleTagClick?: (tag: string) => void;
  handleEdit?: () => void;
  handleDelete?: () => void;
}

export default function PromptCard({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}: PromptCardProps) {
  const [copied, setCopied] = useState<string>("");
  const { data: session }: any = useSession();
  const pathname = usePathname();

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <article className="prompt_card">
      <div className="flex items-start justify-between gap-5">
        <Link
          href={`/profile?userid=${post.creater._id}&username=${post.creater.username}`}
          className="flex items-center justify-start flex-1 gap-3 cursor-pointer"
        >
          <Image
            src={post.creater.image}
            alt="user_image"
            width={40}
            height={40}
            className="object-contain rounded-full"
          />
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-900 font-satoshi">
              {post.creater.username}
            </h3>
            <p className="text-sm text-gray-500 font-inter">
              {post.creater.email}
            </p>
          </div>
        </Link>

        <button className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
            alt="copied"
          />
        </button>
      </div>
      <p className="my-2 text-sm text-gray-700 font-satoshi">{post.prompt}</p>
      <p
        className="text-sm cursor-pointer font-inter blue_gradient"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>
      {session?.user?.id === post.creater._id && pathname === "/profile" ? (
        <div className="gap-4 pt-3 mt-5 border-t border-gray-100 flex-center">
          <button
            className="text-sm cursor-pointer font-inter green_gradient"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="text-sm cursor-pointer font-inter orange_gradient"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      ) : null}
    </article>
  );
}

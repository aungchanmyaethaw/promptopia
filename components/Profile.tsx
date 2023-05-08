import React from "react";
import { PromptProps } from "./Feed";
import PromptCard from "./PromptCard";
import { BeatLoader } from "react-spinners";
import { useSession } from "next-auth/react";

interface ProfileProps {
  name: string;
  desc: string;
  data: PromptProps[];
  isLoading: boolean;
  handleEdit: (prompt: PromptProps) => void;
  handleDelete: (prompt: PromptProps) => void;
}

export default function Profile({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
  isLoading,
}: ProfileProps) {
  return (
    <section className="w-full">
      {name ? (
        <h1 className="text-left head_text">
          <span className="blue_gradient">{name} </span>
          Profile
        </h1>
      ) : null}
      {desc ? <p className="text-left desc">{desc}</p> : null}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <BeatLoader />
        </div>
      ) : (
        <div className="mt-16 prompt_layout">
          {data?.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => {
                handleEdit && handleEdit(post);
              }}
              handleDelete={() => {
                handleDelete && handleDelete(post);
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}

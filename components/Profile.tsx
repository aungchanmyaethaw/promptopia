import React from "react";
import { PromptProps } from "./Feed";
import PromptCard from "./PromptCard";
interface ProfileProps {
  name: string;
  desc: string;
  data: PromptProps[];
  handleEdit: (prompt: PromptProps) => void;
  handleDelete: (prompt: PromptProps) => void;
}

export default function Profile({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
}: ProfileProps) {
  return (
    <section className="w-full">
      <h1 className="text-left head_text">
        <span className="blue_gradient">{name} </span>
        Profile
      </h1>
      <p className="text-left desc">{desc}</p>
      <div className="mt-16 prompt_layout">
        {data.map((post) => (
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
    </section>
  );
}

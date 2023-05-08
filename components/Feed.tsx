"use client";
import {
  ChangeEvent,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import PromptCard from "./PromptCard";

interface CreaterProps {
  __v: number;
  _id: string;
  email: string;
  image: string;
  username: string;
}

export interface PromptProps {
  _id: string;
  __v: number;
  prompt: string;
  tag: string;
  creater: CreaterProps;
}

interface PromptCardProps {
  data: PromptProps[];
  handleTagClick: Dispatch<SetStateAction<string>>;
}

const PromptCardList = ({ data, handleTagClick }: PromptCardProps) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

export default function Feed() {
  const [prompts, setPrompts] = useState<PromptProps[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const getPrompts = async () => {
      try {
        const res = await fetch(`/api/prompt?q=${searchText}`);
        const prompts = await res.json();
        setPrompts(prompts);
      } catch (e: any) {
        throw new Error(e.message);
      }
    };
    getPrompts();
  }, [searchText]);

  return (
    <section className="feed">
      <div className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </div>
      <PromptCardList data={prompts} handleTagClick={setSearchText} />
    </section>
  );
}

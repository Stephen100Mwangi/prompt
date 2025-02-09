"use client";
import React, { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

interface Prompt {
  _id: string;
  prompt: string;
  tags?: string[];
  creator: {
    image: string;
    username: string;
    email: string;
  };
}

interface PromptCardListProps {
  data: Prompt[];
  handleTagClick: (tag: string) => void;
}

const PromptCardList: React.FC<PromptCardListProps> = ({
  data=[],
  handleTagClick,
}) => {
  if (!Array.isArray(data)) {
    console.error("PromptCardList received non-array data:", data);
    return <p>No prompts available.</p>;
  }
  return (
    <div className="mt-16 prompt_layout">
      {data.map((prompt) => (
        <PromptCard
          key={prompt._id}
          prompt={prompt}
          handleTagClick={handleTagClick}
          handleEdit={function (): void {
            throw new Error("Function not implemented.");
          }}
          handleDelete={function (): void {
            throw new Error("Function not implemented.");
          }}
        ></PromptCard>
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [filteredPrompts, setFilteredPrompts] = useState<Prompt[]>([]);

  // Fetch Data
  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPrompts(data);
      setFilteredPrompts(data);
    };

    fetchPrompts();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const searchValue = e.target.value.toLowerCase();
    setSearchText(searchValue);

    const filtered = prompts.filter((prompt) =>
      prompt.prompt.toLowerCase().includes(searchValue)
    );
    setFilteredPrompts(filtered);
  };
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for prompts"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {/* Prompts */}
      <PromptCardList data={filteredPrompts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;

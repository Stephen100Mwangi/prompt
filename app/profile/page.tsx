"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Prompt from '../profile/page'
type Props = {
  id: string;
  name: string;
  desc: string;
  data: Prompt[];
  handleEdit: (prompt: Prompt) => void;
  handleDelete: (prompt: Prompt) => void;
};

import Profile from "@components/Profile";
const MyProfile = () => {
  const [prompts, setPrompts] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  // Fetch Personal Data
  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const response = await fetch(`/api/users/${session?.user?.id}/prompt`);
        if (!response.ok) throw new Error("Failed to fetch prompts");

        const data = await response.json();
        setPrompts(data);
      } catch (error) {
        console.error("Error fetching prompts:", error);
      }
    };

    if (session?.user?.id) {
      fetchPrompts();
    }
  }, [session?.user?.id]);

  const handleEdit = (prompt: Prompt) => {
    router.push(`/update-prompt?id=${prompt._id}`);
  };

 

  const handleDelete = async (prompt: Prompt) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/prompt/${prompt._id}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Failed to delete prompt");

        setPrompts((prev) => prev.filter((p) => p._id !== prompt._id));
      } catch (error) {
        console.error("Error deleting prompt:", error);
      }
    }
  };

  return (
    <>
      <h1>Profile</h1>
      <Profile
        name="My"
        desc="Welcome to your personalized profile page"
        data={prompts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <div>
        {prompts.map((eachPrompt) => (
          <div key={eachPrompt._id}>{eachPrompt.text}</div>
        ))}
      </div>
    </>
  );
};

export default MyProfile;

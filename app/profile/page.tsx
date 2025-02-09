/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
    const [prompts,setPrompts] = useState([])
    const { data: session } = useSession()
     
    // Fetch Personal Data
      useEffect(() => {
        const fetchPrompts = async () => {
          const response = await fetch(`/api/users/${session?.user.id}/posts`);
          const data = await response.json();
    
          setPrompts(data);
        };
    
        if (session?.user.id) {
            fetchPrompts();            
        }

      }, [session?.user.id]);

    const handleEdit = async () => {}
    const handleDelete = async () => {}
  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={prompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete} id={""}    />
  );
};

export default MyProfile;

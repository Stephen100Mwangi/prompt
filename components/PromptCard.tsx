/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

interface Prompt {
  _id: string;
  prompt: string;
  tag: string;
  creator: {
    image: string;
    username: string;
    email: string;
    _id: string;
  };
}

interface PromptCardProps {
  prompt: Prompt;
  handleTagClick?: (tag: string) => void;
  handleEdit: () => void;
  handleDelete: () => void;
}
const PromptCard: React.FC<PromptCardProps> = ({
  prompt,
  handleTagClick,
  handleEdit,
  handleDelete,
}) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);

    // Reset copied state after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const { data: session }  = useSession();
  const pathName = usePathname();
  const router = useRouter();

  return (
    <div className="prompt_card">
      <div className="flex items-start justify-between gap-5 relative">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={prompt.creator?.image || '/assets/images/profile.svg'}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          ></Image>
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-grey-900">
              {prompt.creator?.username || "Unknown User"}
            </h3>
            <p className="font-inter text-sm text-grey-500">
              {prompt.creator?.email || "No email available"}
            </p>
          </div>
        </div>
        <div className="copy_btn absolute -right-3 -top-3" onClick={handleCopy}>
          <Image
            src={copied ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"}
            alt="copy icon"
            width={18}
            height={18}
            className="object-cover"
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm font-light text-grey-700">{prompt.prompt}</p>
      <p>{prompt.tag}</p>

      {/* Check if we have a user logged in */}
      {
        session?.user.id === prompt.creator._id && pathName === '/profile' && (
          <div className="mt-5 flex-center gap-4 border-t border-grey-100 pt-3">
            <p className="green_gradient cursor-pointer font-inter text-sm" onClick={handleEdit}>Edit</p>
            <p className="orange_gradient cursor-pointer font-inter text-sm" onClick={handleDelete}>Delete</p>
          </div>
        )
      }



    </div>
  );
};

export default PromptCard;

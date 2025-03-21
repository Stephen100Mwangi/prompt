"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn, getProviders, useSession, ClientSafeProvider } from "next-auth/react";
import { signOut } from "next-auth/react";


const Nav = () => {
  // const isLoggedIn = true;
  const { data: session } = useSession();
  const [providers, setProviders] = useState<Record<string, ClientSafeProvider> | null>(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    fetchProviders();
  }, []);

  return (
    <nav className="w-full mb-16 pt-3 flex-between">
      <Link href="/" className="flex gap-2 flex-center">
        <Image alt="Logo" src="/assets/images/logo.svg" width={30} height={30} />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={()=>signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                 src={session.user.image ? session.user.image : "assets/images/profile.svg"}
                alt="Profile"
                className="rounded-full"
                height={37}
                width={37}
              />
            </Link>
          </div>
        ) : (
          providers &&
          Object.values(providers).map((provider) => (
            <button
              key={provider.name}
              onClick={() => signIn(provider.id)}
              className="black_btn"
            >
              Sign In
            </button>
          ))
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session.user.image ? session.user.image : "assets/images/profile.svg"}
              alt="Profile"
              onClick={() => setToggleDropDown((prev) => !prev)}
              className="rounded-full cursor-pointer"
              height={37}
              width={37}
            />
            {toggleDropDown && (
              <div className="dropdown">
                <Link href="/profile" className="dropdown_link" onClick={() => setToggleDropDown(false)}>
                  My Profile
                </Link>
                <Link href="/create-prompt" className="dropdown_link" onClick={() => setToggleDropDown(false)}>
                  Create Prompt
                </Link>
                <button className="black_btn mt-5 w-full" onClick={() => { setToggleDropDown(false); signOut(); }}>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          providers &&
          Object.values(providers).map((provider) => (
            <button key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
              Sign In
            </button>
          ))
        )}
      </div>
    </nav>
  );
};

export default Nav;
